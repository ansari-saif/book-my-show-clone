import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import Screen, ScreenCreate, ScreenPublic, ScreensPublic, ScreenUpdate, Message

router = APIRouter()

@router.get("/", response_model=ScreensPublic)
def read_screens(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(Screen)
    count = session.exec(count_statement).one()
    statement = select(Screen).offset(skip).limit(limit)
    screens = session.exec(statement).all()
    return ScreensPublic(data=screens, count=count)

@router.get("/{id}", response_model=ScreenPublic)
def read_screen(session: SessionDep, id: uuid.UUID) -> Any:
    screen = session.get(Screen, id)
    if not screen:
        raise HTTPException(status_code=404, detail="Screen not found")
    return screen

@router.post("/", response_model=ScreenPublic)
def create_screen(session: SessionDep, screen_in: ScreenCreate) -> Any:
    screen = Screen.model_validate(screen_in)
    session.add(screen)
    session.commit()
    session.refresh(screen)
    return screen

@router.put("/{id}", response_model=ScreenPublic)
def update_screen(session: SessionDep, id: uuid.UUID, screen_in: ScreenUpdate) -> Any:
    screen = session.get(Screen, id)
    if not screen:
        raise HTTPException(status_code=404, detail="Screen not found")
    update_dict = screen_in.model_dump(exclude_unset=True)
    screen.sqlmodel_update(update_dict)
    session.add(screen)
    session.commit()
    session.refresh(screen)
    return screen

@router.delete("/{id}")
def delete_screen(session: SessionDep, id: uuid.UUID) -> Message:
    screen = session.get(Screen, id)
    if not screen:
        raise HTTPException(status_code=404, detail="Screen not found")
    session.delete(screen)
    session.commit()
    return Message(message="Screen deleted successfully")
