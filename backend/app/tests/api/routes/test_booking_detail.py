import json
from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.booking_detail import create_random_booking_detail


def test_create_booking_detail(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    booking_detail = create_random_booking_detail(db)
    data = {"booking_id": booking_detail.booking_id, "seat_id": booking_detail.seat_id, "price": booking_detail.price}
    r = client.post(f"api/v1/booking_details/", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_detail = r.json()
    detail_in_db = crud.get_booking_detail_by_id(session=db, detail_id=created_detail["id"])
    assert detail_in_db
    assert detail_in_db.price == created_detail["price"]
