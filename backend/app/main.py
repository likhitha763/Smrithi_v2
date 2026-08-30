import logging
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.core.firebase_init import init_firebase
from app.routes import voice, languages, auth, caregiver

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("smrithi.main")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="FastAPI Backend for SMRITHI — AI Cognitive Gaming & Caregiver Platform",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static audio mount
audio_dir = settings.VOICE_AUDIO_DIR
os.makedirs(audio_dir, exist_ok=True)
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Include Routers
app.include_router(auth.router)
app.include_router(caregiver.router)
app.include_router(languages.router)
app.include_router(voice.router)


@app.on_event("startup")
async def startup_event():
    logger.info("Starting SMRITHI Backend Services...")
    init_firebase()

@app.get("/")
async def root():
    return {
        "project": settings.PROJECT_NAME,
        "status": "online",
        "version": "2.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
