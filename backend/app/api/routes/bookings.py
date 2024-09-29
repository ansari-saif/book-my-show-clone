import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import Booking, BookingCreate, BookingPublic, BookingsPublic, BookingUpdate, Message

router = APIRouter()

@router.get("/", response_model=BookingsPublic)
def read_bookings(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(Booking)
    count = session.exec(count_statement).one()
    statement = select(Booking).offset(skip).limit(limit)
    bookings = session.exec(statement).all()
    return BookingsPublic(data=bookings, count=count)

@router.get("/{id}", response_model=BookingPublic)
def read_booking(session: SessionDep, id: uuid.UUID) -> Any:
    booking = session.get(Booking, id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.post("/", response_model=BookingPublic)
def create_booking(session: SessionDep, booking_in: BookingCreate) -> Any:
    booking = Booking.model_validate(booking_in)
    session.add(booking)
    session.commit()
    session.refresh(booking)
    return booking

@router.put("/{id}", response_model=BookingPublic)
def update_booking(session: SessionDep, id: uuid.UUID, booking_in: BookingUpdate) -> Any:
    booking = session.get(Booking, id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    update_dict = booking_in.model_dump(exclude_unset=True)
    booking.sqlmodel_update(update_dict)
    session.add(booking)
    session.commit()
    session.refresh(booking)
    return booking

@router.delete("/{id}")
def delete_booking(session: SessionDep, id: uuid.UUID) -> Message:
    booking = session.get(Booking, id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    session.delete(booking)
    session.commit()
    return Message(message="Booking deleted successfully")
