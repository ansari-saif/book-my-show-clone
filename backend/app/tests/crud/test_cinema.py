from sqlmodel import Session
from app import crud
from app.models import CinemaUpdate
from app.tests.utils.cinema import create_random_cinema
from app.tests.utils.utils import random_lower_string


def test_create_cinema(db: Session) -> None:
    cinema = create_random_cinema(db)
    assert cinema.name
    assert cinema.address


def test_update_cinema(db: Session) -> None:
    cinema = create_random_cinema(db)
    new_address = random_lower_string()
    cinema_update = CinemaUpdate(address=new_address)
    updated_cinema = crud.update_cinema(session=db, db_cinema=cinema, cinema_in=cinema_update)
    assert updated_cinema.address == new_address


def test_get_cinema(db: Session) -> None:
    cinema = create_random_cinema(db)
    cinema_from_db = crud.get_cinema_by_id(session=db, cinema_id=cinema.id)
    assert cinema_from_db
    assert cinema_from_db.name == cinema.name