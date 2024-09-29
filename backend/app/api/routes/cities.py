import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import City, CityCreate, CityPublic, CitiesPublic, CityUpdate, Message

router = APIRouter()

@router.get("/", response_model=CitiesPublic)
def read_cities(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(City)
    count = session.exec(count_statement).one()
    statement = select(City).offset(skip).limit(limit)
    cities = session.exec(statement).all()
    return CitiesPublic(data=cities, count=count)

@router.get("/{id}", response_model=CityPublic)
def read_city(session: SessionDep, id: uuid.UUID) -> Any:
    city = session.get(City, id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
    return city

@router.post("/", response_model=CityPublic)
def create_city(session: SessionDep, city_in: CityCreate) -> Any:
    city = City.model_validate(city_in)
    session.add(city)
    session.commit()
    session.refresh(city)
    return city

@router.put("/{id}", response_model=CityPublic)
def update_city(session: SessionDep, id: uuid.UUID, city_in: CityUpdate) -> Any:
    city = session.get(City, id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
    update_dict = city_in.model_dump(exclude_unset=True)
    city.sqlmodel_update(update_dict)
    session.add(city)
    session.commit()
    session.refresh(city)
    return city

@router.delete("/{id}")
def delete_city(session: SessionDep, id: uuid.UUID) -> Message:
    city = session.get(City, id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
    session.delete(city)
    session.commit()
    return Message(message="City deleted successfully")
