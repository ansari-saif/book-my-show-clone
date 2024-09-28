from sqlmodel import Session
from app import crud
from app.models import CastUpdate
from app.tests.utils.cast import create_random_cast


def test_create_cast(db: Session) -> None:
    cast = create_random_cast(db)
    assert cast.name
    assert cast.role_in_movie


def test_update_cast(db: Session) -> None:
    cast = create_random_cast(db)
    new_role = "Lead Actor"
    cast_update = CastUpdate(role_in_movie=new_role)
    updated_cast = crud.update_cast(session=db, db_cast=cast, cast_in=cast_update)
    assert updated_cast.role_in_movie == new_role


def test_get_cast(db: Session) -> None:
    cast = create_random_cast(db)
    cast_from_db = crud.get_cast_by_id(session=db, cast_id=cast.id)
    assert cast_from_db
    assert cast_from_db.name == cast.name