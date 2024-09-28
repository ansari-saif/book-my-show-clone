from sqlmodel import Session
from app import crud
from app.models import MovieImage, MovieImageCreate
from app.tests.utils.movie import create_random_movie
from app.tests.utils.utils import random_lower_string


def create_random_movie_image(db: Session) -> MovieImage:
    movie = create_random_movie(db)
    image_url = random_lower_string() + ".jpg"
    image_type = "poster"
    movie_image_in = MovieImageCreate(
        movie_id=movie.id,
        image_url=image_url,
        image_type=image_type
    )
    movie_image = crud.create_movie_image(session=db, image_create=movie_image_in)
    return movie_image
