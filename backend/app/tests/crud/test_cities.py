from sqlmodel import Session
from app import crud
from app.models import CityUpdate
from app.tests.utils.city import create_random_city
from app.tests.utils.utils import random_lower_string


def test_create_city(db: Session) -> None:
    city = create_random_city(db)
    assert city.city_name
    assert city.country


def test_update_city(db: Session) -> None:
    city = create_random_city(db)
    new_city_name = random_lower_string()
    city_update = CityUpdate(city_name=new_city_name)
    updated_city = crud.update_city(session=db, db_city=city, city_in=city_update)
    assert updated_city.city_name == new_city_name


def test_get_city(db: Session) -> None:
    city = create_random_city(db)
    city_from_db = crud.get_city_by_id(session=db, city_id=city.id)
    assert city_from_db
    assert city_from_db.city_name == city.city_name