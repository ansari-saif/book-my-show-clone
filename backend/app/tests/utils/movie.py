from sqlmodel import Session
from app import crud
from app.models import Movie, MovieCreate
from app.tests.utils.utils import random_lower_string


def create_random_movie(db: Session) -> Movie:
    title = random_lower_string()
    genre = random_lower_string()
    movie_in = MovieCreate(
        title=title,
        genre=genre,
        duration=120,  # Example duration
        description=random_lower_string(),
        release_date=None,
        rating=4.5,
        is_recommended=False
    )
    movie = crud.create_movie(session=db, movie_create=movie_in)
    return movie
