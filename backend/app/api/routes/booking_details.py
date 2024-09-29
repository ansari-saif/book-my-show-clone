import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import BookingDetail, BookingDetailCreate, BookingDetailPublic, BookingDetailsPublic, BookingDetailUpdate, Message

router = APIRouter()

@router.get("/", response_model=BookingDetailsPublic)
def read_booking_details(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(BookingDetail)
    count = session.exec(count_statement).one()
    statement = select(BookingDetail).offset(skip).limit(limit)
    booking_details = session.exec(statement).all()
    return BookingDetailsPublic(data=booking_details, count=count)

@router.get("/{id}", response_model=BookingDetailPublic)
def read_booking_detail(session: SessionDep, id: uuid.UUID) -> Any:
    booking_detail = session.get(BookingDetail, id)
    if not booking_detail:
        raise HTTPException(status_code=404, detail="Booking detail not found")
    return booking_detail

@router.post("/", response_model=BookingDetailPublic)
def create_booking_detail(session: SessionDep, booking_detail_in: BookingDetailCreate) -> Any:
    booking_detail = BookingDetail.model_validate(booking_detail_in)
    session.add(booking_detail)
    session.commit()
    session.refresh(booking_detail)
    return booking_detail

@router.put("/{id}", response_model=BookingDetailPublic)
def update_booking_detail(session: SessionDep, id: uuid.UUID, booking_detail_in: BookingDetailUpdate) -> Any:
    booking_detail = session.get(BookingDetail, id)
    if not booking_detail:
        raise HTTPException(status_code=404, detail="Booking detail not found")
    update_dict = booking_detail_in.model_dump(exclude_unset=True)
    booking_detail.sqlmodel_update(update_dict)
    session.add(booking_detail)
    session.commit()
    session.refresh(booking_detail)
    return booking_detail

@router.delete("/{id}")
def delete_booking_detail(session: SessionDep, id: uuid.UUID) -> Message:
    booking_detail = session.get(BookingDetail, id)
    if not booking_detail:
        raise HTTPException(status_code=404, detail="Booking detail not found")
    session.delete(booking_detail)
    session.commit()
    return Message(message="Booking detail deleted successfully")
