from app.tests.utils.city import create_random_city
from sqlmodel import Session
from app import crud
from app.models import Cinema, CinemaCreate, ScreenCreate
from app.tests.utils.utils import random_lower_string


def create_random_cinema(db: Session) -> Cinema:
    name = random_lower_string()
    address = random_lower_string()
    city = create_random_city(db)
    cinema_in = CinemaCreate(
        name=name,
        address=address,
        phone_number="1234567890",
        city_id=city.id
    )
    cinema = crud.create_cinema(session=db, cinema_create=cinema_in)
    screen = crud.create_screen(session=db, screen_create=ScreenCreate(screen_name=random_lower_string(), cinema_id=cinema.id, capacity=100))

    return cinema
