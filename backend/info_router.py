from fastapi import APIRouter, status, Depends
from backend.models import Place
from backend.schemas import getPlaceInfo
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from fastapi.encoders import jsonable_encoder

info_router = APIRouter(prefix='/info', tags = ['information'])

@info_router.post('/add/place', status_code=status.HTTP_201_CREATED)
async def add_place_information(newPlace: getPlaceInfo, db: Session = Depends(get_db)):

    exists = db.query(Place).filter(Place.coord == newPlace.coord).first()
    
    if exists:
        raise HTTPException(
        status_code = status.HTTP_409_CONFLICT,
        detail= "Place at this coordinate already exists!"
        )
    
    new_place = Place(
    id = newPlace.id,
    coord = newPlace.coord,
    name = newPlace.name,
    photos = newPlace.photos,
    info = newPlace.info,
    rating = newPlace.rating,
    tags = newPlace.tags
    )

    db.add(new_place)
    db.commit()
    db.refresh(new_place)

    return f"{newPlace.name} added successfully to database!"

@info_router.get('/places')
async def all_places_information(db: Session = Depends(get_db)):

    places = db.query(Place).all()

    return jsonable_encoder(places)

@info_router.get('/places/{tag}')
async def places_by_tag(tag: str, db: Session = Depends(get_db)):

    places = db.query(Place).filter(Place.tags.contains([tag])).all()

    return places

@info_router.get('/place/{lat}/{lon}')
async def places_by_tag(lat: float, lon: float, db: Session = Depends(get_db)):
    
    places = db.query(Place).filter(Place.coord == [lat, lon]).all()

    return places