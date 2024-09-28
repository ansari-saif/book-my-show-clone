from sqlmodel import Session
from app import crud
from app.models import Show, ShowCreate
from app.tests.utils.utils import random_lower_string
from datetime import datetime
from app.tests.utils.movie import create_random_movie
from app.tests.utils.cinema import create_random_cinema


def create_random_show(db: Session) -> Show:
    movie = create_random_movie(db)
    cinema = create_random_cinema(db)
    show_in = ShowCreate(
        movie_id=movie.id,
        screen_id=cinema.screens[0].id,  # Assuming cinema has at least one screen
        show_time=datetime.utcnow()
    )
    show = crud.create_show(session=db, show_create=show_in)
    return show
