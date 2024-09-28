from sqlmodel import Session
from app import crud
from app.models import MovieFormatUpdate
from app.tests.utils.movie_format import create_random_movie_format


def test_create_movie_format(db: Session) -> None:
    movie_format = create_random_movie_format(db)
    assert movie_format.movie_id
    assert movie_format.format
    assert movie_format.language


def test_update_movie_format(db: Session) -> None:
    movie_format = create_random_movie_format(db)
    new_format = "3D"
    format_update = MovieFormatUpdate(format=new_format)
    updated_format = crud.update_movie_format(session=db, db_format=movie_format, format_in=format_update)
    assert updated_format.format == new_format


def test_get_movie_format(db: Session) -> None:
    movie_format = create_random_movie_format(db)
    format_from_db = crud.get_movie_format_by_id(session=db, format_id=movie_format.id)
    assert format_from_db
    assert format_from_db.format == movie_format.format
