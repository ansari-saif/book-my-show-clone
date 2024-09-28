from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.cast import create_random_cast


def test_create_cast(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    cast = create_random_cast(db)
    data = {"name": cast.name, "role_in_movie": cast.role_in_movie, "movie_id": cast.movie_id}
    r = client.post("/cast/", headers=superuser_token_headers, json=data)
    assert r.status_code == 200
    created_cast = r.json()
    cast_in_db = crud.get_cast_by_id(session=db, cast_id=created_cast["id"])
    assert cast_in_db
    assert cast_in_db.name == created_cast["name"]
