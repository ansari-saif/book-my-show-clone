import json
from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.movie_format import create_random_movie_format
from app.tests.utils.utils import random_lower_string


def test_create_movie_format(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    movie_format = create_random_movie_format(db)
    data = {"movie_id": movie_format.movie_id, "format": "3D", "language": random_lower_string()}
    r = client.post(f"api/v1/movies_format/", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_format = r.json()
    format_in_db = crud.get_movie_format_by_id(session=db, format_id=created_format["id"])
    assert format_in_db
    assert format_in_db.format == created_format["format"]
