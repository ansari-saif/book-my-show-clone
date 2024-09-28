from sqlmodel import Session
from app import crud
from app.models import CinemaCategory, CinemaCategoryCreate
from app.tests.utils.utils import random_lower_string


def create_random_cinema_category(db: Session) -> CinemaCategory:
    category_name = random_lower_string()
    category_in = CinemaCategoryCreate(
        category_name=category_name
    )
    category = crud.create_cinema_category(session=db, category_create=category_in)
    return category
