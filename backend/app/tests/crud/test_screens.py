from sqlmodel import Session
from app import crud
from app.models import ScreenUpdate
from app.tests.utils.screen import create_random_screen
from app.tests.utils.utils import random_lower_string


def test_create_screen(db: Session) -> None:
    screen = create_random_screen(db)
    assert screen.screen_name
    assert screen.capacity


def test_update_screen(db: Session) -> None:
    screen = create_random_screen(db)
    new_screen_name = random_lower_string()
    screen_update = ScreenUpdate(screen_name=new_screen_name)
    updated_screen = crud.update_screen(session=db, db_screen=screen, screen_in=screen_update)
    assert updated_screen.screen_name == new_screen_name


def test_get_screen(db: Session) -> None:
    screen = create_random_screen(db)
    screen_from_db = crud.get_screen_by_id(session=db, screen_id=screen.id)
    assert screen_from_db
    assert screen_from_db.screen_name == screen.screen_name
