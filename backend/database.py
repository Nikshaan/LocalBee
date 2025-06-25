from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()
DB_PASS = os.getenv("DB_PASS")
engine = create_engine(f'postgresql://postgres:{DB_PASS}@localhost:5432/localBee',
    echo = True
)
Base = declarative_base()
Session = sessionmaker(bind=engine, autoflush=False)

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()