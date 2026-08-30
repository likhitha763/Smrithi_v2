from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from app.services import firestore_service

router = APIRouter(prefix="/api/caregiver", tags=["Caregiver & Patient Management"])

class CaregiverProfileRequest(BaseModel):
    caregiver_id: str = Field(..., example="demo_caregiver_123")
    full_name: str = Field(..., example="Asha Devi")
    email: str = Field(..., example="caregiver@smrithi.org")
    phone: Optional[str] = "+91 9876543210"

class PatientRequest(BaseModel):
    name: str = Field(..., example="Biren Sharma")
    age: int = Field(72, example=72)
    language: str = Field("as", example="as")
    notes: Optional[str] = "Dementia stage 1, early memory recall assistance"

class GameSessionRequest(BaseModel):
    game_type: str = Field(..., example="memory-match")
    correct_count: int = Field(2, example=2)
    missed_count: int = Field(1, example=1)
    wrong_count: int = Field(0, example=0)
    response_time_ms: int = Field(4820, example=4820)
    startedAt: Optional[str] = None

class ReminderRequest(BaseModel):
    title: str = Field(..., example="Morning Donepezil Medicine")
    time: str = Field("09:00 AM", example="09:00 AM")
    category: str = Field("Medicine", example="Medicine")

@router.post("/profile")
def upsert_caregiver_profile(req: CaregiverProfileRequest):
    """Creates or updates a caregiver profile in Firestore."""
    data = {
        "fullName": req.full_name,
        "email": req.email,
        "phone": req.phone,
    }
    firestore_service.upsert_caregiver(req.caregiver_id, data)
    return {"success": True, "caregiver_id": req.caregiver_id, "message": "Caregiver profile saved."}

@router.post("/patients/{caregiver_id}")
def add_patient(caregiver_id: str, req: PatientRequest):
    """Adds a new patient under a caregiver in Firestore."""
    patient_data = {
        "name": req.name,
        "age": req.age,
        "language": req.language,
        "notes": req.notes,
    }
    patient_id = firestore_service.create_patient(caregiver_id, patient_data)
    return {"success": True, "patient_id": patient_id, "message": "Patient created successfully."}

@router.get("/patients/{caregiver_id}/{patient_id}")
def get_patient(caregiver_id: str, patient_id: str):
    """Gets patient profile details from Firestore."""
    patient = firestore_service.get_patient(caregiver_id, patient_id)
    return {"success": True, "patient": patient}

@router.post("/sessions/{caregiver_id}/{patient_id}")
def log_game_session(caregiver_id: str, patient_id: str, req: GameSessionRequest):
    """Logs a cognitive game session result for a patient in Firestore."""
    session_data = {
        "gameType": req.game_type,
        "correctCount": req.correct_count,
        "missedCount": req.missed_count,
        "wrongCount": req.wrong_count,
        "responseTimeMs": req.response_time_ms,
        "startedAt": req.startedAt or "2026-08-30T10:00:00Z"
    }
    session_id = firestore_service.create_session(caregiver_id, patient_id, session_data)
    return {"success": True, "session_id": session_id, "message": "Game session logged to Firestore."}

@router.get("/sessions/{caregiver_id}/{patient_id}")
def list_game_sessions(caregiver_id: str, patient_id: str, limit: int = Query(20, ge=1, le=100)):
    """Lists recent game sessions for a patient from Firestore."""
    sessions = firestore_service.get_sessions(caregiver_id, patient_id, limit=limit)
    return {"success": True, "sessions": sessions}

@router.post("/reminders/{caregiver_id}/{patient_id}")
def add_reminder(caregiver_id: str, patient_id: str, req: ReminderRequest):
    """Adds a reminder for a patient in Firestore."""
    reminder_data = {
        "title": req.title,
        "time": req.time,
        "category": req.category,
    }
    reminder_id = firestore_service.create_reminder(caregiver_id, patient_id, reminder_data)
    return {"success": True, "reminder_id": reminder_id, "message": "Reminder created in Firestore."}

@router.get("/reminders/{caregiver_id}/{patient_id}")
def list_reminders(caregiver_id: str, patient_id: str):
    """Lists all reminders for a patient from Firestore."""
    reminders = firestore_service.get_reminders(caregiver_id, patient_id)
    return {"success": True, "reminders": reminders}
