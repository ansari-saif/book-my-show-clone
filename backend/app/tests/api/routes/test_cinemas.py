from fastapi.testclient import TestClient
from sqlmodel import Session, select
from app.models import Cinema
from app import crud
from app.tests.utils.cinema import create_random_cinema
from app.tests.utils.utils import random_lower_string


def test_create_cinema(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    data = {
        "name": random_lower_string(),
        "address": random_lower_string(),
        "phone_number": "1234567890",
    }
    r = client.post(f"/cinemas/", headers=superuser_token_headers, json=data)
    assert r.status_code == 200
    created_cinema = r.json()
    cinema_in_db = crud.get_cinema_by_id(session=db, cinema_id=created_cinema["id"])
    assert cinema_in_db
    assert cinema_in_db.name == created_cinema["name"]


def test_get_cinema(client: TestClient, db: Session) -> None:
    cinema = create_random_cinema(db)
    r = client.get(f"/cinemas/{cinema.id}")
    assert r.status_code == 200
    api_cinema = r.json()
    assert api_cinema["name"] == cinema.name


def test_update_cinema(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    cinema = create_random_cinema(db)
    new_address = random_lower_string()
    data = {"address": new_address}
    r = client.patch(f"/cinemas/{cinema.id}", headers=superuser_token_headers, json=data)
    assert r.status_code == 200
    updated_cinema = r.json()
    assert updated_cinema["address"] == new_address


def test_delete_cinema(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    cinema = create_random_cinema(db)
    r = client.delete(f"/cinemas/{cinema.id}", headers=superuser_token_headers)
    assert r.status_code == 200
    result = db.exec(select(Cinema).where(Cinema.id == cinema.id)).first()
    assert result is None
