from sqlmodel import Session
from app import crud
from app.models import Seat, SeatCreate
from app.tests.utils.screen import create_random_screen
from app.tests.utils.utils import random_lower_string


def create_random_seat(db: Session) -> Seat:
    screen = create_random_screen(db)
    seat_number = random_lower_string()
    seat_in = SeatCreate(
        seat_number=seat_number,
        screen_id=screen.id,
        seat_type="VIP",
        is_available=True
    )
    seat = crud.create_seat(session=db, seat_create=seat_in)
    return seat