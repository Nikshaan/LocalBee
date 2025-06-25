from fastapi import FastAPI
from backend.info_router import info_router
app = FastAPI()

app.include_router(info_router)