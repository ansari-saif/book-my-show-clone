from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.cinema import create_random_cinema


def test_create_screen(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    cinema = create_random_cinema(db)
    data = {"screen_name": "Screen 1", "cinema_id": cinema.id, "capacity": 200}
    r = client.post("/screens/", headers=superuser_token_headers, json=data)
    assert r.status_code == 200
    created_screen = r.json()
    screen_in_db = crud.get_screen_by_id(session=db, screen_id=created_screen["id"])
    assert screen_in_db
    assert screen_in_db.screen_name == created_screen["screen_name"]
