from sqlmodel import Session
from app import crud
from app.models import SeatUpdate
from app.tests.utils.seat import create_random_seat
from app.tests.utils.utils import random_lower_string


def test_create_seat(db: Session) -> None:
    seat = create_random_seat(db)
    assert seat.seat_number
    assert seat.is_available


def test_update_seat(db: Session) -> None:
    seat = create_random_seat(db)
    new_seat_number = random_lower_string()
    seat_update = SeatUpdate(seat_number=new_seat_number)
    updated_seat = crud.update_seat(session=db, db_seat=seat, seat_in=seat_update)
    assert updated_seat.seat_number == new_seat_number


def test_get_seat(db: Session) -> None:
    seat = create_random_seat(db)
    seat_from_db = crud.get_seat_by_id(session=db, seat_id=seat.id)
    assert seat_from_db
    assert seat_from_db.seat_number == seat.seat_number
