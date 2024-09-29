import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import Cast, CastCreate, CastPublic, CastsPublic, CastUpdate, Message

router = APIRouter()

@router.get("/", response_model=CastsPublic)
def read_casts(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(Cast)
    count = session.exec(count_statement).one()
    statement = select(Cast).offset(skip).limit(limit)
    casts = session.exec(statement).all()
    return CastsPublic(data=casts, count=count)

@router.get("/{id}", response_model=CastPublic)
def read_cast(session: SessionDep, id: uuid.UUID) -> Any:
    cast = session.get(Cast, id)
    if not cast:
        raise HTTPException(status_code=404, detail="Cast not found")
    return cast

@router.post("/", response_model=CastPublic)
def create_cast(session: SessionDep, cast_in: CastCreate) -> Any:
    cast = Cast.model_validate(cast_in)
    session.add(cast)
    session.commit()
    session.refresh(cast)
    return cast

@router.put("/{id}", response_model=CastPublic)
def update_cast(session: SessionDep, id: uuid.UUID, cast_in: CastUpdate) -> Any:
    cast = session.get(Cast, id)
    if not cast:
        raise HTTPException(status_code=404, detail="Cast not found")
    update_dict = cast_in.model_dump(exclude_unset=True)
    cast.sqlmodel_update(update_dict)
    session.add(cast)
    session.commit()
    session.refresh(cast)
    return cast

@router.delete("/{id}")
def delete_cast(session: SessionDep, id: uuid.UUID) -> Message:
    cast = session.get(Cast, id)
    if not cast:
        raise HTTPException(status_code=404, detail="Cast not found")
    session.delete(cast)
    session.commit()
    return Message(message="Cast deleted successfully")
