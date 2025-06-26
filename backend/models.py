from backend.database import Base
from sqlalchemy import Column, Integer, Text, String, Float
from sqlalchemy.dialects.postgresql import ARRAY

class Place(Base):

    __tablename__ = "places"

    id = Column((Text), unique = True, nullable = False, primary_key = True)
    coord = Column(ARRAY(Float), nullable = False)
    name = Column(String(168), nullable = False)
    photos = Column(ARRAY(Text))
    info = Column(Text)
    rating = Column(Integer)
    tags = Column(ARRAY(Text))

    def __rep__(self):
        return f"<Place {self.name}"