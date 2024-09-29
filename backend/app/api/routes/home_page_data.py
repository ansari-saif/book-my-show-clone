import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import HomePageData, HomePageDataCreate, HomePageDataPublic, HomePageDatasPublic, HomePageDataUpdate, Message

router = APIRouter()

@router.get("/", response_model=HomePageDatasPublic)
def read_home_page_data(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(HomePageData)
    count = session.exec(count_statement).one()
    statement = select(HomePageData).offset(skip).limit(limit)
    home_page_data = session.exec(statement).all()
    return HomePageDatasPublic(data=home_page_data, count=count)

@router.get("/{id}", response_model=HomePageDataPublic)
def read_home_page_data_by_id(session: SessionDep, id: uuid.UUID) -> Any:
    home_page_data = session.get(HomePageData, id)
    if not home_page_data:
        raise HTTPException(status_code=404, detail="Home page data not found")
    return home_page_data

@router.post("/", response_model=HomePageDataPublic)
def create_home_page_data(session: SessionDep, home_page_data_in: HomePageDataCreate) -> Any:
    home_page_data = HomePageData.model_validate(home_page_data_in)
    session.add(home_page_data)
    session.commit()
    session.refresh(home_page_data)
    return home_page_data

@router.put("/{id}", response_model=HomePageDataPublic)
def update_home_page_data(session: SessionDep, id: uuid.UUID, home_page_data_in: HomePageDataUpdate) -> Any:
    home_page_data = session.get(HomePageData, id)
    if not home_page_data:
        raise HTTPException(status_code=404, detail="Home page data not found")
    update_dict = home_page_data_in.model_dump(exclude_unset=True)
    home_page_data.sqlmodel_update(update_dict)
    session.add(home_page_data)
    session.commit()
    session.refresh(home_page_data)
    return home_page_data

@router.delete("/{id}")
def delete_home_page_data(session: SessionDep, id: uuid.UUID) -> Message:
    home_page_data = session.get(HomePageData, id)
    if not home_page_data:
        raise HTTPException(status_code=404, detail="Home page data not found")
    session.delete(home_page_data)
    session.commit()
    return Message(message="Home page data deleted successfully")