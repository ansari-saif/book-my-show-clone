
from sqlmodel import Session
from app import crud
from app.models import Screen, ScreenCreate
from app.tests.utils.cinema import create_random_cinema
from app.tests.utils.utils import random_lower_string


def create_random_screen(db: Session) -> Screen:
    cinema = create_random_cinema(db)
    screen_name = random_lower_string()
    screen_in = ScreenCreate(
        screen_name=screen_name,
        cinema_id=cinema.id,
        capacity=200  # Example capacity
    )
    screen = crud.create_screen(session=db, screen_create=screen_in)
    return screen