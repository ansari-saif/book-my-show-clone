from sqlmodel import Session
from app import crud
from app.models import Crew, CrewCreate
from app.tests.utils.movie import create_random_movie
from app.tests.utils.utils import random_lower_string


def create_random_crew(db: Session) -> Crew:
    movie = create_random_movie(db)
    name = random_lower_string()
    role = "Director"
    crew_in = CrewCreate(
        movie_id=movie.id,
        name=name,
        role=role
    )
    crew = crud.create_crew(session=db, crew_create=crew_in)
    return crew
