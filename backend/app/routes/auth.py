from fastapi import APIRouter, HTTPException, Header, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.services.firebase_service import firebase_service

router = APIRouter(prefix="/api/auth", tags=["Auth"])

class VerifyTokenRequest(BaseModel):
    id_token: str

class AuthResponse(BaseModel):
    success: bool = True
    uid: str
    email: Optional[str] = None
    display_name: Optional[str] = None
    message: str = "Authenticated successfully"

@router.post("/verify", response_model=AuthResponse)
def verify_firebase_token(req: VerifyTokenRequest):
    """
    Verifies a Firebase ID token sent from the frontend/Postman.
    """
    decoded = firebase_service.verify_id_token(req.id_token)
    if not decoded:
        raise HTTPException(status_code=401, detail="Invalid or expired Firebase ID token.")
    
    return AuthResponse(
        success=True,
        uid=decoded.get("uid", ""),
        email=decoded.get("email"),
        display_name=decoded.get("name"),
        message="Token verified successfully."
    )

@router.post("/demo-login", response_model=AuthResponse)
def demo_login():
    """
    Demo login endpoint for quick Postman testing without requiring a live Firebase client token.
    """
    return AuthResponse(
        success=True,
        uid="demo_caregiver_123",
        email="caregiver.demo@smrithi.org",
        display_name="Asha Devi",
        message="Demo caregiver login successful."
    )
