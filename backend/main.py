from fastapi import FastAPI
from info_router import info_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000", "https://local-bee-git-main-nikshaans-projects.vercel.app", "https://local-bee.vercel.app", "https://local-8uwknb251-nikshaans-projects.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(info_router)