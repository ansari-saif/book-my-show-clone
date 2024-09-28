from sqlmodel import Session
from app import crud
from app.models import CinemaCategoryUpdate
from app.tests.utils.cinema_category import create_random_cinema_category
from app.tests.utils.utils import random_lower_string


def test_create_cinema_category(db: Session) -> None:
    cinema_category = create_random_cinema_category(db)
    assert cinema_category.category_name


def test_update_cinema_category(db: Session) -> None:
    cinema_category = create_random_cinema_category(db)
    new_category_name = random_lower_string()
    cinema_category_update = CinemaCategoryUpdate(category_name=new_category_name)
    updated_category = crud.update_cinema_category(session=db, db_category=cinema_category, category_in=cinema_category_update)
    assert updated_category.category_name == new_category_name


def test_get_cinema_category(db: Session) -> None:
    cinema_category = create_random_cinema_category(db)
    category_from_db = crud.get_cinema_category_by_id(session=db, category_id=cinema_category.id)
    assert category_from_db
    assert category_from_db.category_name == cinema_category.category_name