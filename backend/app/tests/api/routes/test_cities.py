import json
from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.utils import random_lower_string


def test_create_city(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    data = {"city_name": random_lower_string(), "state": "State", "country": "Country"}
    r = client.post(f"api/v1/cities/", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_city = r.json()
    city_in_db = crud.get_city_by_id(session=db, city_id=created_city["id"])
    assert city_in_db
    assert city_in_db.city_name == created_city["city_name"]
