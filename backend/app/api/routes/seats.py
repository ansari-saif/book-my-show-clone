import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import Seat, SeatCreate, SeatPublic, SeatsPublic, SeatUpdate, Message

router = APIRouter()

@router.get("/", response_model=SeatsPublic)
def read_seats(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(Seat)
    count = session.exec(count_statement).one()
    statement = select(Seat).offset(skip).limit(limit)
    seats = session.exec(statement).all()
    return SeatsPublic(data=seats, count=count)

@router.get("/{id}", response_model=SeatPublic)
def read_seat(session: SessionDep, id: uuid.UUID) -> Any:
    seat = session.get(Seat, id)
    if not seat:
        raise HTTPException(status_code=404, detail="Seat not found")
    return seat

@router.post("/", response_model=SeatPublic)
def create_seat(session: SessionDep, seat_in: SeatCreate) -> Any:
    seat = Seat.model_validate(seat_in)
    session.add(seat)
    session.commit()
    session.refresh(seat)
    return seat

@router.put("/{id}", response_model=SeatPublic)
def update_seat(session: SessionDep, id: uuid.UUID, seat_in: SeatUpdate) -> Any:
    seat = session.get(Seat, id)
    if not seat:
        raise HTTPException(status_code=404, detail="Seat not found")
    update_dict = seat_in.model_dump(exclude_unset=True)
    seat.sqlmodel_update(update_dict)
    session.add(seat)
    session.commit()
    session.refresh(seat)
    return seat

@router.delete("/{id}")
def delete_seat(session: SessionDep, id: uuid.UUID) -> Message:
    seat = session.get(Seat, id)
    if not seat:
        raise HTTPException(status_code=404, detail="Seat not found")
    session.delete(seat)
    session.commit()
    return Message(message="Seat deleted successfully")
