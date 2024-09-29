import json
from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.screen import create_random_screen


def test_create_seat(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    screen = create_random_screen(db)
    data = {"seat_number": "A1", "screen_id": str(screen.id), "seat_type": "VIP", "is_available": True}
    r = client.post(f"api/v1/seats/", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_seat = r.json()
    seat_in_db = crud.get_seat_by_id(session=db, seat_id=created_seat["id"])
    assert seat_in_db
    assert seat_in_db.seat_number == created_seat["seat_number"]
