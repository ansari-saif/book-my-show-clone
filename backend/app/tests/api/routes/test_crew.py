from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.crew import create_random_crew


def test_create_crew(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    crew = create_random_crew(db)
    data = {"name": crew.name, "role": crew.role, "movie_id": crew.movie_id}
    r = client.post("/crew/", headers=superuser_token_headers, json=data)
    assert r.status_code == 200
    created_crew = r.json()
    crew_in_db = crud.get_crew_by_id(session=db, crew_id=created_crew["id"])
    assert crew_in_db
    assert crew_in_db.name == created_crew["name"]
