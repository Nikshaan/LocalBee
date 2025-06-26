from pydantic import BaseModel
from typing import Optional, List

class getPlaceInfo(BaseModel):

    id: str
    coord: List[float]
    name: str
    photos: List[str]
    info: Optional[str] = "default text."
    rating: int
    tags: Optional[List[str]] = ["place"]

    class Config:
        from_attributes = True
        json_schema_extra = {
            'example': {
                "id": "abc123xyz",
                "coord": [19.0760, 72.8777],
                "name": "Mumbai",
                "photos": ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
                "info": "Finance capital of India.",
                "rating": 8,
                "tags": ["food", "transport", "weather"]
            }
        }