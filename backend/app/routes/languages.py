from fastapi import APIRouter
from app.models.voice import LanguagesResponse
from app.services.localization_service import localization_service

router = APIRouter(prefix="/voice", tags=["Languages"])

@router.get("/languages", response_model=LanguagesResponse)
async def get_languages():
    languages = localization_service.get_supported_languages()
    return LanguagesResponse(success=True, languages=languages)
