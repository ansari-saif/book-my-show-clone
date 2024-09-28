from sqlmodel import Session
from app import crud
from app.models import Payment, PaymentCreate
from app.tests.utils.booking import create_random_booking


def create_random_payment(db: Session) -> Payment:
    booking = create_random_booking(db)
    payment_in = PaymentCreate(
        booking_id=booking.id,
        payment_method="Credit Card",
        payment_status="Success",
        amount_paid=500.00  # Example payment amount
    )
    payment = crud.create_payment(session=db, payment_create=payment_in)
    return payment