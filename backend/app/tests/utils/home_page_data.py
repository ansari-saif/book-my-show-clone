from sqlmodel import Session
from app import crud
from app.models import HomePageData, HomePageDataCreate
from app.tests.utils.movie import create_random_movie
from app.tests.utils.utils import random_lower_string


def create_random_home_page_data(db: Session) -> HomePageData:
    movie = create_random_movie(db)
    section_name = random_lower_string()
    home_page_data_in = HomePageDataCreate(
        section_name=section_name,
        movie_ids=[movie.id]
    )
    home_page_data = crud.create_home_page_data(session=db, home_page_data_create=home_page_data_in)
    return home_page_data