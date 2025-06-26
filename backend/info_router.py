from fastapi import APIRouter, status, Depends
from backend.models import Place
from backend.schemas import getPlaceInfo, updatePlaceInfo, checkUser
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from fastapi.encoders import jsonable_encoder
import os
from dotenv import load_dotenv

load_dotenv()
myPass = os.getenv("myPass")

info_router = APIRouter(prefix='/info', tags = ['information'])

@info_router.post('/place/add', status_code=status.HTTP_201_CREATED)
async def add_place_information(newPlace: getPlaceInfo, req: checkUser, db: Session = Depends(get_db)):
    
    if req.password == myPass:
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

        return {"message": "Place has been added!"}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail = "Wrong password!"
        )

@info_router.get('/places')
async def all_places_information(db: Session = Depends(get_db)):

    places = db.query(Place).all()

    return jsonable_encoder(places)

@info_router.get('/places/coordinates')
async def all_places_information(db: Session = Depends(get_db)):

    places = db.query(Place).all()

    placesCoordinates = list(map(lambda place: place.coord, places))
    placesNames = list(map(lambda place: place.name, places))
    placesInfo = [placesCoordinates, placesNames]
    
    return jsonable_encoder(placesInfo)

@info_router.get('/places/{tag}')
async def places_by_tag(tag: str, db: Session = Depends(get_db)):

    places = db.query(Place).filter(Place.tags.contains([tag])).all()

    return places

@info_router.get('/place/{lat}/{lon}')
async def places_by_tag(lat: float, lon: float, db: Session = Depends(get_db)):
    
    places = db.query(Place).filter(Place.coord == [lat, lon]).all()

    return places

@info_router.delete('/place/delete/{id}', status_code = status.HTTP_204_NO_CONTENT)
async def delete_place_information(id: str, req: checkUser, db: Session = Depends(get_db)):

    if req.password == myPass:
        place = db.query(Place).filter(Place.id == id).first()
        if not place:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = "Place not found."
            )
        db.query(Place).filter(Place.id == id).delete()
        db.commit()
        return {"message": "Place has been deleted!"}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail = "Wrong password!"
        )

@info_router.patch('/place/update/{id}')
async def delete_place_information(id: str, req: checkUser, placeUpdate: updatePlaceInfo, db: Session = Depends(get_db)):

    if req.password == myPass:
        place = db.query(Place).filter(Place.id == id).first()
        if not place:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = "Place not found."
            )
        
        update_data = placeUpdate.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(place, key, value)
        
        db.commit()
        db.refresh(place)
        return {"message": "Place has been updated!"}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail = "Wrong password!"
        )