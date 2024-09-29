import json
from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.payment import create_random_payment


def test_create_payment(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    payment = create_random_payment(db)
    data = {"booking_id": str(payment.booking_id), "payment_method": str(payment.payment_method), "amount_paid": payment.amount_paid, "payment_status":"Yes"}
    r = client.post(f"api/v1/payments/", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_payment = r.json()
    payment_in_db = crud.get_payment_by_id(session=db, payment_id=created_payment["id"])
    assert payment_in_db
    assert payment_in_db.amount_paid == created_payment["amount_paid"]
