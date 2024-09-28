from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.movie import create_random_movie


def test_create_home_page_data(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    movie = create_random_movie(db)
    data = {"section_name": "Top Movies", "movie_ids": [movie.id]}
    r = client.post("/home_page_data/", headers=superuser_token_headers, json=data)
    assert r.status_code == 200
    created_data = r.json()
    home_page_data_in_db = crud.get_home_page_data_by_id(session=db, data_id=created_data["id"])
    assert home_page_data_in_db
    assert home_page_data_in_db.section_name == created_data["section_name"]
