import json
from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.booking import create_random_booking


def test_create_booking(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    booking = create_random_booking(db)
    data = {
        "booking_time": "2024-09-29T01:56:20.469Z",
        "user_id": str(booking.user_id),  # Convert UUID to string
        "show_id": str(booking.show_id),  # Convert UUID to string
        "total_amount": booking.total_amount,
    }
    r = client.post(f"api/v1/bookings/",
                    headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_booking = r.json()
    booking_in_db = crud.get_booking_by_id(
        session=db, booking_id=created_booking["id"])
    assert booking_in_db
    assert booking_in_db.total_amount == created_booking["total_amount"]
