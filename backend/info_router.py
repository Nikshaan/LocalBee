from fastapi import APIRouter,status

info_router = APIRouter(prefix='/info', tags = ['information'])

@info_router.post('/add_place', status_code=status.HTTP_201_CREATED)
async def add_place_information():
    return "hi"