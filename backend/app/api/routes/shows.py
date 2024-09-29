import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import Show, ShowCreate, ShowPublic, ShowsPublic, ShowUpdate, Message

router = APIRouter()

@router.get("/", response_model=ShowsPublic)
def read_shows(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select


@router.get("/{id}", response_model=ShowPublic)
def read_show(session: SessionDep, id: uuid.UUID) -> Any:
    show = session.get(Show, id)
    if not show:
        raise HTTPException(status_code=404, detail="Show not found")
    return show

@router.post("/", response_model=ShowPublic)
def create_show(session: SessionDep, show_in: ShowCreate) -> Any:
    show = Show.model_validate(show_in)
    session.add(show)
    session.commit()
    session.refresh(show)
    return show

@router.put("/{id}", response_model=ShowPublic)
def update_show(session: SessionDep, id: uuid.UUID, show_in: ShowUpdate) -> Any:
    show = session.get(Show, id)
    if not show:
        raise HTTPException(status_code=404, detail="Show not found")
    update_dict = show_in.model_dump(exclude_unset=True)
    show.sqlmodel_update(update_dict)
    session.add(show)
    session.commit()
    session.refresh(show)
    return show

@router.delete("/{id}")
def delete_show(session: SessionDep, id: uuid.UUID) -> Message:
    show = session.get(Show, id)
    if not show:
        raise HTTPException(status_code=404, detail="Show not found")
    session.delete(show)
    session.commit()
    return Message(message="Show deleted successfully")
