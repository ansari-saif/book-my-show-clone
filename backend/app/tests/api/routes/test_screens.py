import json
from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.cinema import create_random_cinema


def test_create_screen(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    cinema = create_random_cinema(db)
    data = {"screen_name": "Screen 1", "cinema_id": str(cinema.id), "capacity": 200}
    r = client.post(f"api/v1/screens/", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_screen = r.json()
    screen_in_db = crud.get_screen_by_id(session=db, screen_id=created_screen["id"])
    assert screen_in_db
    assert screen_in_db.screen_name == created_screen["screen_name"]
