from sqlmodel import Session
from app import crud
from app.models import Cast, CastCreate
from app.tests.utils.movie import create_random_movie
from app.tests.utils.utils import random_lower_string

def create_random_cast(db: Session) -> Cast:
    movie = create_random_movie(db)
    name = random_lower_string()
    role_in_movie = "Lead"
    cast_in = CastCreate(
        movie_id=movie.id,
        name=name,
        role_in_movie=role_in_movie
    )
    cast = crud.create_cast(session=db, cast_create=cast_in)
    return cast