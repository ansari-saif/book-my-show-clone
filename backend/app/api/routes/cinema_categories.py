import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import CinemaCategory, CinemaCategoryCreate, CinemaCategoryPublic, CinemaCategoriesPublic, CinemaCategoryUpdate, Message

router = APIRouter()

@router.get("/", response_model=CinemaCategoriesPublic)
def read_cinema_categories(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(CinemaCategory)
    count = session.exec(count_statement).one()
    statement = select(CinemaCategory).offset(skip).limit(limit)
    cinema_categories = session.exec(statement).all()
    return CinemaCategoriesPublic(data=cinema_categories, count=count)

@router.get("/{id}", response_model=CinemaCategoryPublic)
def read_cinema_category(session: SessionDep, id: uuid.UUID) -> Any:
    cinema_category = session.get(CinemaCategory, id)
    if not cinema_category:
        raise HTTPException(status_code=404, detail="Cinema category not found")
    return cinema_category

@router.post("/", response_model=CinemaCategoryPublic)
def create_cinema_category(session: SessionDep, cinema_category_in: CinemaCategoryCreate) -> Any:
    cinema_category = CinemaCategory.model_validate(cinema_category_in)
    session.add(cinema_category)
    session.commit()
    session.refresh(cinema_category)
    return cinema_category

@router.put("/{id}", response_model=CinemaCategoryPublic)
def update_cinema_category(session: SessionDep, id: uuid.UUID, cinema_category_in: CinemaCategoryUpdate) -> Any:
    cinema_category = session.get(CinemaCategory, id)
    if not cinema_category:
        raise HTTPException(status_code=404, detail="Cinema category not found")
    update_dict = cinema_category_in.model_dump(exclude_unset=True)
    cinema_category.sqlmodel_update(update_dict)
    session.add(cinema_category)
    session.commit()
    session.refresh(cinema_category)
    return cinema_category

@router.delete("/{id}")
def delete_cinema_category(session: SessionDep, id: uuid.UUID) -> Message:
    cinema_category = session.get(CinemaCategory, id)
    if not cinema_category:
        raise HTTPException(status_code=404, detail="Cinema category not found")
    session.delete(cinema_category)
    session.commit()
    return Message(message="Cinema category deleted successfully")
