from sqlmodel import Session
from app import crud
from app.models import BookingUpdate
from app.tests.utils.booking import create_random_booking


def test_create_booking(db: Session) -> None:
    booking = create_random_booking(db)
    assert booking.total_amount


def test_update_booking(db: Session) -> None:
    booking = create_random_booking(db)
    new_amount = 500.00
    booking_update = BookingUpdate(total_amount=new_amount)
    updated_booking = crud.update_booking(session=db, db_booking=booking, booking_in=booking_update)
    assert updated_booking.total_amount == new_amount


def test_get_booking(db: Session) -> None:
    booking = create_random_booking(db)
    booking_from_db = crud.get_booking_by_id(session=db, booking_id=booking.id)
    assert booking_from_db
    assert booking_from_db.total_amount == booking.total_amount