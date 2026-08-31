import os
import json
import logging

# ── SSL fix: PostgreSQL 18 on Windows clobbers SSL_CERT_FILE with a path that
# doesn't exist, breaking any HTTPS call (including firebase_admin token
# verification which fetches Google's public keys). Override before any import
# that might trigger a network call.
try:
    import certifi
    os.environ.setdefault("SSL_CERT_FILE", certifi.where())
    os.environ.setdefault("REQUESTS_CA_BUNDLE", certifi.where())
except ImportError:
    pass  # certifi not installed — proceed without override

import firebase_admin
from firebase_admin import credentials, firestore
from app.core.config import (
    FIREBASE_CRED_PATH,
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
)

logger = logging.getLogger("uvicorn")

db = None


def _build_env_var_credentials():
    """
    Build a Certificate credential from individual env vars.
    Used when serviceAccountKey.json is absent (Render / Cloud production).
    """
    pk = os.getenv("FIREBASE_PRIVATE_KEY") or FIREBASE_PRIVATE_KEY
    proj_id = os.getenv("FIREBASE_PROJECT_ID") or FIREBASE_PROJECT_ID
    client_email = os.getenv("FIREBASE_CLIENT_EMAIL") or FIREBASE_CLIENT_EMAIL

    if not (proj_id and client_email and pk):
        return None

    # Replace escaped \n (backslash + n) with actual newlines and strip surrounding quotes
    formatted_pk = pk.strip('"\'').replace("\\n", "\n")

    try:
        cert_dict = {
            "type": "service_account",
            "project_id": proj_id,
            "private_key_id": "env_var_key",
            "private_key": formatted_pk,
            "client_email": client_email,
            "token_uri": "https://oauth2.googleapis.com/token",
        }
        return credentials.Certificate(cert_dict)
    except Exception as err:
        logger.error(f"Failed to build Certificate credential from env vars: {err}")
        return None



def init_firebase():
    global db

    # Already initialised — just grab the Firestore client
    if firebase_admin._apps:
        try:
            db = firestore.client()
        except Exception:
            db = None
        return

    cred = None

    # 1. Try JSON file first (preferred for local dev)
    if os.path.exists(FIREBASE_CRED_PATH) and os.path.getsize(FIREBASE_CRED_PATH) > 0:
        try:
            cred = credentials.Certificate(FIREBASE_CRED_PATH)
            logger.info(f"Firebase Admin SDK: using credential file '{FIREBASE_CRED_PATH}'.")
        except (json.JSONDecodeError, ValueError, Exception) as e:
            logger.warning(f"Could not load '{FIREBASE_CRED_PATH}' ({e}). Trying env vars...")

    # 2. Fallback: build credential from env vars
    if cred is None:
        cred = _build_env_var_credentials()
        if cred:
            logger.info("Firebase Admin SDK: using credentials from environment variables.")
        else:
            logger.warning(
                "No valid Firebase credentials found. "
                "Set FIREBASE_CRED_PATH or FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY."
            )

    try:
        if cred:
            firebase_admin.initialize_app(cred)
        else:
            firebase_admin.initialize_app()  # ADC last resort
    except Exception as init_err:
        logger.error(f"Firebase app initialization failed: {init_err}")

    try:
        db = firestore.client()
    except Exception as e:
        logger.warning(f"Firestore client initialization failed: {e}")
        db = None


init_firebase()