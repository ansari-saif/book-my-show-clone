import json
from app.tests.utils.city import create_random_city
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
        "city_id": create_random_city(db).id
    }
    r = client.post(f"api/v1/cinemas/", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_cinema = r.json()
    cinema_in_db = crud.get_cinema_by_id(session=db, cinema_id=created_cinema["id"])
    assert cinema_in_db
    assert cinema_in_db.name == created_cinema["name"]


def test_get_cinema(client: TestClient, db: Session) -> None:
    cinema = create_random_cinema(db)
    r = client.get(f"api/v1/cinemas/{cinema.id}")
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    api_cinema = r.json()
    assert api_cinema["name"] == cinema.name


def test_update_cinema(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    cinema = create_random_cinema(db)
    new_address = random_lower_string()
    data = {"address": new_address}
    r = client.put(f"api/v1/cinemas/{cinema.id}", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    updated_cinema = r.json()
    assert updated_cinema["address"] == new_address


def test_delete_cinema(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    cinema = create_random_cinema(db)
    r = client.delete(f"api/v1/cinemas/{cinema.id}", headers=superuser_token_headers)
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    result = db.exec(select(Cinema).where(Cinema.id == cinema.id)).first()
    assert result is None
