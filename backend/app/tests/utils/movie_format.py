from sqlmodel import Session
from app import crud
from app.models import MovieFormat, MovieFormatCreate
from app.tests.utils.movie import create_random_movie
from app.tests.utils.utils import random_lower_string


def create_random_movie_format(db: Session) -> MovieFormat:
    movie = create_random_movie(db)
    movie_format_in = MovieFormatCreate(
        movie_id=movie.id,
        format="2D",  # Example format
        language=random_lower_string()  # Example language
    )
    movie_format = crud.create_movie_format(session=db, format_create=movie_format_in)
    return movie_format
