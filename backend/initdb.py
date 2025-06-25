from database import engine, Base
from models import Place

Base.metadata.create_all(bind = engine)