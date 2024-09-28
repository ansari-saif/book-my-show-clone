from sqlmodel import Session
from app import crud
from app.models import MovieImageUpdate
from app.tests.utils.movie_image import create_random_movie_image
from app.tests.utils.utils import random_lower_string


def test_create_movie_image(db: Session) -> None:
    movie_image = create_random_movie_image(db)
    assert movie_image.image_url
    assert movie_image.image_type


def test_update_movie_image(db: Session) -> None:
    movie_image = create_random_movie_image(db)
    new_image_url = random_lower_string() + ".jpg"
    movie_image_update = MovieImageUpdate(image_url=new_image_url)
    updated_image = crud.update_movie_image(session=db, db_image=movie_image, image_in=movie_image_update)
    assert updated_image.image_url == new_image_url


def test_get_movie_image(db: Session) -> None:
    movie_image = create_random_movie_image(db)
    image_from_db = crud.get_movie_image_by_id(session=db, image_id=movie_image.id)
    assert image_from_db
    assert image_from_db.image_url == movie_image.image_url
