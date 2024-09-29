import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlalchemy import delete
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import Cinema, CinemaCreate, CinemaPublic, CinemasPublic, CinemaUpdate, Message, MoviePricing, Screen

router = APIRouter()

@router.get("/", response_model=CinemasPublic)
def read_cinemas(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(Cinema)
    count = session.exec(count_statement).one()
    statement = select(Cinema).offset(skip).limit(limit)
    cinemas = session.exec(statement).all()
    return CinemasPublic(data=cinemas, count=count)

@router.get("/{id}", response_model=CinemaPublic)
def read_cinema(session: SessionDep, id: uuid.UUID) -> Any:
    cinema = session.get(Cinema, id)
    if not cinema:
        raise HTTPException(status_code=404, detail="Cinema not found")
    return cinema

@router.post("/", response_model=CinemaPublic)
def create_cinema(session: SessionDep, cinema_in: CinemaCreate) -> Any:
    cinema = Cinema.model_validate(cinema_in)
    session.add(cinema)
    session.commit()
    session.refresh(cinema)
    return cinema

@router.put("/{id}", response_model=CinemaPublic)
def update_cinema(session: SessionDep, id: uuid.UUID, cinema_in: CinemaUpdate) -> Any:
    cinema = session.get(Cinema, id)
    if not cinema:
        raise HTTPException(status_code=404, detail="Cinema not found")
    update_dict = cinema_in.model_dump(exclude_unset=True)
    cinema.sqlmodel_update(update_dict)
    session.add(cinema)
    session.commit()
    session.refresh(cinema)
    return cinema

@router.delete("/{id}")
def delete_cinema(session: SessionDep, id: uuid.UUID) -> Message:
    cinema = session.get(Cinema, id)
    
    if not cinema:
        raise HTTPException(status_code=404, detail="Cinema not found")
    # Manually delete related records
    session.exec(delete(Screen).where(Screen.cinema_id == id))
    session.exec(delete(MoviePricing).where(MoviePricing.cinema_id == id))

    session.delete(cinema)
    session.commit()
    return Message(message="Cinema deleted successfully")
