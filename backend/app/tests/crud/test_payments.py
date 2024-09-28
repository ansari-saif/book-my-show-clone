from sqlmodel import Session
from app import crud
from app.models import PaymentUpdate
from app.tests.utils.payment import create_random_payment


def test_create_payment(db: Session) -> None:
    payment = create_random_payment(db)
    assert payment.amount_paid
    assert payment.payment_method


def test_update_payment(db: Session) -> None:
    payment = create_random_payment(db)
    new_amount_paid = 300.00
    payment_update = PaymentUpdate(amount_paid=new_amount_paid)
    updated_payment = crud.update_payment(session=db, db_payment=payment, payment_in=payment_update)
    assert updated_payment.amount_paid == new_amount_paid


def test_get_payment(db: Session) -> None:
    payment = create_random_payment(db)
    payment_from_db = crud.get_payment_by_id(session=db, payment_id=payment.id)
    assert payment_from_db
    assert payment_from_db.amount_paid == payment.amount_paid
