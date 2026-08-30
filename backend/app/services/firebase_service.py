import logging
from typing import Optional, Dict, Any
from firebase_admin import auth

logger = logging.getLogger("smrithi.firebase_service")

class FirebaseService:
    def verify_id_token(self, token: str) -> Optional[Dict[str, Any]]:
        try:
            decoded_token = auth.verify_id_token(token)
            return decoded_token
        except Exception as e:
            logger.error(f"Error verifying Firebase ID token: {e}")
            return None

    def get_user_profile(self, uid: str) -> Optional[Dict[str, Any]]:
        try:
            user = auth.get_user(uid)
            return {
                "uid": user.uid,
                "email": user.email,
                "display_name": user.display_name,
                "photo_url": user.photo_url
            }
        except Exception as e:
            logger.error(f"Error getting Firebase user {uid}: {e}")
            return None

firebase_service = FirebaseService()
