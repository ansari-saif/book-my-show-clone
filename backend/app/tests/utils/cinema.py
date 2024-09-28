from sqlmodel import Session
from app import crud
from app.models import Cinema, CinemaCreate
from app.tests.utils.utils import random_lower_string


def create_random_cinema(db: Session) -> Cinema:
    name = random_lower_string()
    address = random_lower_string()
    cinema_in = CinemaCreate(
        name=name,
        address=address,
        phone_number="1234567890"  # Example phone number
    )
    cinema = crud.create_cinema(session=db, cinema_create=cinema_in)
    return cinema
