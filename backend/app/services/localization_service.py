import logging
from typing import Dict, Any, Optional, List
from app.models.voice import LanguageInfo

logger = logging.getLogger("smrithi.localization")

class LocalizationService:
    def __init__(self):
        self._languages = [
            LanguageInfo(code="en", name="English", native_name="English", supported_tts=True, audio_available=True),
            LanguageInfo(code="as", name="Assamese", native_name="অসমীয়া", supported_tts=True, audio_available=True),
            LanguageInfo(code="hi", name="Hindi", native_name="हिन्दी", supported_tts=True, audio_available=True),
            LanguageInfo(code="kn", name="Kannada", native_name="ಕನ್ನಡ", supported_tts=True, audio_available=True),
        ]

        self._prompts: Dict[str, Dict[str, str]] = {
            "en": {
                "welcome": "Welcome to Smrithi, your gentle caring companion.",
                "select_object": "Please select the object from your memory.",
                "remember_objects": "Remember what we need from the local market today.",
                "correct": "Wonderful memory! That is correct.",
                "wrong": "That was a good try! Let us try again together.",
                "game_complete": "Great job! You completed the activity successfully.",
                "bazaar_prompt": "Shopping list for Sunday market: Assam Tea Leaves, Tender Bamboo Shoots, Fresh Ginger Root.",
                "family_question": "Who is Priya in your family portrait?",
            },
            "as": {
                "welcome": "স্মৃতি লৈ স্বাগতম, আপোনাৰ মৰমিয়াল সংগী।",
                "select_object": "অনুগ্ৰহ কৰি আপোনাৰ স্মৃতিৰ পৰা বস্তুটো বাছনি কৰক।",
                "remember_objects": "আজি বজাৰৰ পৰা আমাক কি লাগে মনত ৰাখক।",
                "correct": "বৰ ধুনীয়া স্মৃতি! এইটো শুদ্ধ।",
                "wrong": "ভাল চেষ্টা আছিল! আহক আকৌ চেষ্টা কৰোঁ।",
                "game_complete": "বৰ ভাল হ'ল! আপুনি খেলখন সফলতাৰে সম্পূৰ্ণ কৰিলে।",
            },
            "hi": {
                "welcome": "स्मृति में आपका स्वागत है, आपकी प्यारी साथी।",
                "select_object": "कृपया अपनी याददाश्त से वस्तु चुनें।",
                "remember_objects": "याद रखें कि आज बाजार से क्या चाहिए।",
                "correct": "बहुत बढ़िया याददाश्त! यह सही है।",
                "wrong": "अच्छा प्रयास था! आइए फिर से प्रयास करें।",
                "game_complete": "बहुत खूब! आपने गतिविधि सफलतापूर्वक पूरी कर ली।",
            },
            "kn": {
                "welcome": "ಸ್ಮೃತಿಗೆ ಸ್ವಾಗತ, ನಿಮ್ಮ ಪ್ರೀತಿಯ ಸಂಗಾತಿ.",
                "select_object": "ದಯವಿಟ್ಟು ನಿಮ್ಮ ನೆನಪಿನಿಂದ ವಸ್ತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
                "remember_objects": "ಇಂದು ಮಾರುಕಟ್ಟೆಯಿಂದ ನಮಗೆ ಏನು ಬೇಕು ಎಂಬುದನ್ನು ನೆನಪಿಡಿ.",
                "correct": "ಅದ್ಭುತ ನೆನಪು! ಇದು ಸರಿಯಾಗಿದೆ.",
                "wrong": "ಒಳ್ಳೆಯ ಪ್ರಯತ್ನ! ಮತ್ತೆ ಪ್ರಯತ್ನಿಸೋಣ.",
                "game_complete": "ಉತ್ತಮ ಕೆಲಸ! ನೀವು ಚಟುವಟಿಕೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ.",
            }
        }

    def get_supported_languages(self) -> List[LanguageInfo]:
        return self._languages

    def get_prompt_text(self, language: str, key: str) -> Optional[str]:
        lang_dict = self._prompts.get(language, self._prompts.get("en", {}))
        return lang_dict.get(key) or self._prompts.get("en", {}).get(key)

localization_service = LocalizationService()
