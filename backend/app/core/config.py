import os
from pathlib import Path
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "SMRITHI - AI Caregiver Assistant API"
    ENVIRONMENT: str = "development"
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000", "*"]
    
    FIREBASE_CREDENTIALS_PATH: str = "serviceAccountKey.json"
    FIREBASE_STORAGE_BUCKET: str = ""
    
    DEFAULT_LANGUAGE: str = "en"
    VOICE_AUDIO_DIR: str = "app/static/audio"
    AUDIO_CACHE_DIR: str = "audio_cache"

    FIREBASE_CRED_PATH: str = "serviceAccountKey.json"
    FIREBASE_PROJECT_ID: str = ""
    FIREBASE_CLIENT_EMAIL: str = ""
    FIREBASE_PRIVATE_KEY: str = ""

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()

FIREBASE_CRED_PATH = os.getenv("FIREBASE_CRED_PATH", settings.FIREBASE_CRED_PATH)
FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID", settings.FIREBASE_PROJECT_ID)
FIREBASE_CLIENT_EMAIL = os.getenv("FIREBASE_CLIENT_EMAIL", settings.FIREBASE_CLIENT_EMAIL)
FIREBASE_PRIVATE_KEY = os.getenv("FIREBASE_PRIVATE_KEY", settings.FIREBASE_PRIVATE_KEY)

