from sqlmodel import Session
from app import crud
from app.models import City, CityCreate
from app.tests.utils.utils import random_lower_string


def create_random_city(db: Session) -> City:
    city_name = random_lower_string()
    state = random_lower_string()
    country = random_lower_string()
    city_in = CityCreate(
        city_name=city_name,
        state=state,
        country=country
    )
    city = crud.create_city(session=db, city_create=city_in)
    return city
