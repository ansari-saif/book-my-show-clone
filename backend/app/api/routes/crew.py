import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import Crew, CrewCreate, CrewPublic, CrewsPublic, CrewUpdate, Message

router = APIRouter()

@router.get("/", response_model=CrewsPublic)
def read_crews(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(Crew)
    count = session.exec(count_statement).one()
    statement = select(Crew).offset(skip).limit(limit)
    crews = session.exec(statement).all()
    return CrewsPublic(data=crews, count=count)

@router.get("/{id}", response_model=CrewPublic)
def read_crew(session: SessionDep, id: uuid.UUID) -> Any:
    crew = session.get(Crew, id)
    if not crew:
        raise HTTPException(status_code=404, detail="Crew not found")
    return crew

@router.post("/", response_model=CrewPublic)
def create_crew(session: SessionDep, crew_in: CrewCreate) -> Any:
    crew = Crew.model_validate(crew_in)
    session.add(crew)
    session.commit()
    session.refresh(crew)
    return crew

@router.put("/{id}", response_model=CrewPublic)
def update_crew(session: SessionDep, id: uuid.UUID, crew_in: CrewUpdate) -> Any:
    crew = session.get(Crew, id)
    if not crew:
        raise HTTPException(status_code=404, detail="Crew not found")
    update_dict = crew_in.model_dump(exclude_unset=True)
    crew.sqlmodel_update(update_dict)
    session.add(crew)
    session.commit()
    session.refresh(crew)
    return crew

@router.delete("/{id}")
def delete_crew(session: SessionDep, id: uuid.UUID) -> Message:
    crew = session.get(Crew, id)
    if not crew:
        raise HTTPException(status_code=404, detail="Crew not found")
    session.delete(crew)
    session.commit()
    return Message(message="Crew deleted successfully")
