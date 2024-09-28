from sqlmodel import Session
from app import crud
from app.models import CrewUpdate
from app.tests.utils.crew import create_random_crew
from app.tests.utils.utils import random_lower_string


def test_create_crew(db: Session) -> None:
    crew = create_random_crew(db)
    assert crew.name
    assert crew.role


def test_update_crew(db: Session) -> None:
    # Create a random crew member
    crew = create_random_crew(db)

    # Generate new data for updating the crew member
    new_name = random_lower_string()
    new_role = random_lower_string()

    # Create a CrewUpdate object with the new data
    crew_update = CrewUpdate(name=new_name, role=new_role)

    # Call the update function
    updated_crew = crud.update_crew(session=db, db_crew=crew, crew_in=crew_update)

    # Verify that the crew member was updated correctly
    assert updated_crew.name == new_name
    assert updated_crew.role == new_role


def test_get_crew(db: Session) -> None:
    crew = create_random_crew(db)
    crew_from_db = crud.get_crew_by_id(session=db, crew_id=crew.id)
    assert crew_from_db
    assert crew_from_db.role == crew.role
