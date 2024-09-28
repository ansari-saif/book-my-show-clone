from sqlmodel import Session
from app import crud
from app.models import ShowUpdate
from app.tests.utils.show import create_random_show
from datetime import datetime


def test_create_show(db: Session) -> None:
    show = create_random_show(db)
    assert show.movie_id
    assert show.screen_id
    assert show.show_time


def test_update_show(db: Session) -> None:
    show = create_random_show(db)
    new_show_time = datetime.utcnow()
    show_update = ShowUpdate(show_time=new_show_time)
    updated_show = crud.update_show(session=db, db_show=show, show_in=show_update)
    assert updated_show.show_time == new_show_time


def test_get_show(db: Session) -> None:
    show = create_random_show(db)
    show_from_db = crud.get_show_by_id(session=db, show_id=show.id)
    assert show_from_db
    assert show_from_db.movie_id == show.movie_id
