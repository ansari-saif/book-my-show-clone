from sqlmodel import Session
from app import crud
from app.models import BookingDetailUpdate
from app.tests.utils.booking_detail import create_random_booking_detail


def test_create_booking_detail(db: Session) -> None:
    booking_detail = create_random_booking_detail(db)
    assert booking_detail.price


def test_update_booking_detail(db: Session) -> None:
    booking_detail = create_random_booking_detail(db)
    new_price = 100.00
    booking_detail_update = BookingDetailUpdate(price=new_price)
    updated_detail = crud.update_booking_detail(session=db, db_booking_detail=booking_detail, booking_detail_in=booking_detail_update)
    assert updated_detail.price == new_price


def test_get_booking_detail(db: Session) -> None:
    booking_detail = create_random_booking_detail(db)
    detail_from_db = crud.get_booking_detail_by_id(session=db, detail_id=booking_detail.id)
    assert detail_from_db
    assert detail_from_db.price == booking_detail.price