from pathlib import Path
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse
from app.schemas import VoiceSynthesisRequest, VoiceSynthesisResponse, VoicePromptResponse
from app.services.voice_service import VoiceService
from app.core.config import settings

router = APIRouter(tags=["Voice & TTS"])

@router.post("/api/voice/synthesize", response_model=VoiceSynthesisResponse)
@router.post("/voice/synthesize", response_model=VoiceSynthesisResponse)
@router.post("/text-to-speech", response_model=VoiceSynthesisResponse)
@router.post("/voice/tts", response_model=VoiceSynthesisResponse)
def synthesize_speech(req: VoiceSynthesisRequest):
    """
    Synthesizes speech for cognitive game prompts and instructions.
    Returns audio reference URL and base64 audio data.
    """
    res = VoiceService.synthesize_speech(
        text=req.text,
        language=req.language or "as",
        speed_rate=req.speed_rate or 1.0
    )
    return VoiceSynthesisResponse(**res)

@router.get("/voice/prompt/{language}/{key}", response_model=VoicePromptResponse)
def get_voice_prompt(language: str, key: str):
    """
    Returns localized voice prompt text and optional pre-recorded audio URL.
    """
    result = VoiceService.get_voice_prompt(language, key)
    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=result.get("error", f"Voice prompt key '{key}' not found for language '{language}'.")
        )
    return VoicePromptResponse(**result)

@router.get("/api/voice/voices")
def get_supported_voices():
    """Returns supported TTS engines and language configurations."""
    return VoiceService.get_supported_voices()

@router.get("/api/voice/stream/{filename}")
def stream_audio_file(filename: str):
    """Streams a generated audio file from cache."""
    cache_dir = Path(settings.AUDIO_CACHE_DIR)
    file_path = cache_dir / filename
    if not file_path.exists() or not file_path.is_file():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Audio file '{filename}' not found."
        )
    return FileResponse(path=str(file_path), media_type="audio/mpeg", filename=filename)
