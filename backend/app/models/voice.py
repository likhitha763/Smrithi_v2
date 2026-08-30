from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class LanguageInfo(BaseModel):
    code: str = Field(..., example="en")
    name: str = Field(..., example="English")
    native_name: str = Field(..., example="English")
    supported_tts: bool = True
    audio_available: bool = True

class LanguagesResponse(BaseModel):
    success: bool = True
    languages: List[LanguageInfo]

class VoicePromptResponse(BaseModel):
    success: bool = True
    language: str
    key: str
    text: str
    audio_available: bool = False
    audio_url: Optional[str] = None
    error: Optional[str] = None

class TtsRequest(BaseModel):
    text: str
    language: str = "en"
    speed: Optional[float] = 0.85

class TtsResponse(BaseModel):
    success: bool = True
    text: str
    language: str
    audio_url: Optional[str] = None
    error: Optional[str] = None

class VoiceSynthesisRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Text to synthesize to speech")
    language: str = Field("as", description="Language code e.g. as, bn, hi, en, mni")
    speed_rate: Optional[float] = Field(1.0, ge=0.5, le=2.0, description="Speech rate multiplier")

class VoiceSynthesisResponse(BaseModel):
    audio_url: Optional[str] = None
    audio_base64: Optional[str] = None
    format: str = "mp3"
    duration_estimate_seconds: float
    language_used: str
    fallback_used: bool
    status: str
    message: str
