from sqlmodel import Session
from app import crud
from app.models import HomePageDataUpdate
from app.tests.utils.home_page_data import create_random_home_page_data


def test_create_home_page_data(db: Session) -> None:
    home_page_data = create_random_home_page_data(db)
    assert home_page_data.section_name
    assert home_page_data.movie_ids


def test_update_home_page_data(db: Session) -> None:
    home_page_data = create_random_home_page_data(db)
    new_section_name = "Recommended Movies"
    home_page_data_update = HomePageDataUpdate(section_name=new_section_name)
    updated_data = crud.update_home_page_data(session=db, db_data=home_page_data, data_in=home_page_data_update)
    assert updated_data.section_name == new_section_name


def test_get_home_page_data(db: Session) -> None:
    home_page_data = create_random_home_page_data(db)
    data_from_db = crud.get_home_page_data_by_id(session=db, data_id=home_page_data.id)
    assert data_from_db
    assert data_from_db.section_name == home_page_data.section_name