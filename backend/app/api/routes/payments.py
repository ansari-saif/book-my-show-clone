import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import Payment, PaymentCreate, PaymentPublic, PaymentsPublic, PaymentUpdate, Message

router = APIRouter()

@router.get("/", response_model=PaymentsPublic)
def read_payments(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(Payment)
    count = session.exec(count_statement).one()
    statement = select(Payment).offset(skip).limit(limit)
    payments = session.exec(statement).all()
    return PaymentsPublic(data=payments, count=count)

@router.get("/{id}", response_model=PaymentPublic)
def read_payment(session: SessionDep, id: uuid.UUID) -> Any:
    payment = session.get(Payment, id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.post("/", response_model=PaymentPublic)
def create_payment(session: SessionDep, payment_in: PaymentCreate) -> Any:
    payment = Payment.model_validate(payment_in)
    session.add(payment)
    session.commit()
    session.refresh(payment)
    return payment

@router.put("/{id}", response_model=PaymentPublic)
def update_payment(session: SessionDep, id: uuid.UUID, payment_in: PaymentUpdate) -> Any:
    payment = session.get(Payment, id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    update_dict = payment_in.model_dump(exclude_unset=True)
    payment.sqlmodel_update(update_dict)
    session.add(payment)
    session.commit()
    session.refresh(payment)
    return payment

@router.delete("/{id}")
def delete_payment(session: SessionDep, id: uuid.UUID) -> Message:
    payment = session.get(Payment, id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    session.delete(payment)
    session.commit()
    return Message(message="Payment deleted successfully")
