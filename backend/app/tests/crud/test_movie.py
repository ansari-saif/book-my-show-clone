from sqlmodel import Session
from app import crud
from app.models import MovieUpdate
from app.tests.utils.movie import create_random_movie
from app.tests.utils.utils import random_lower_string


def test_create_movie(db: Session) -> None:
    movie = create_random_movie(db)
    assert movie.title
    assert movie.genre


def test_update_movie(db: Session) -> None:
    movie = create_random_movie(db)
    new_title = random_lower_string()
    movie_update = MovieUpdate(title=new_title)
    updated_movie = crud.update_movie(session=db, db_movie=movie, movie_in=movie_update)
    assert updated_movie.title == new_title


def test_get_movie(db: Session) -> None:
    movie = create_random_movie(db)
    movie_from_db = crud.get_movie_by_id(session=db, movie_id=movie.id)
    assert movie_from_db
    assert movie_from_db.title == movie.title