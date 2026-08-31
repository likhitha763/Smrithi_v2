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


def clean_pem_key(key: str) -> str:
    """
    Robustly formats and cleans a PEM RSA private key string from environment variables.
    Handles literal '\\n', quotes, trailing whitespace, and line breaks.
    """
    if not key:
        return ""
    
    # Strip quotes & whitespace
    k = key.strip().strip('"\'').strip()
    
    # Unescape escaped backslash-n sequences from env vars
    k = k.replace("\\n", "\n").replace("\\r", "").replace("\r", "")
    
    # Ensure standard PEM header & footer format
    if "-----BEGIN PRIVATE KEY-----" in k and "-----END PRIVATE KEY-----" in k:
        try:
            parts = k.split("-----BEGIN PRIVATE KEY-----")
            after_header = parts[-1]
            body_and_footer = after_header.split("-----END PRIVATE KEY-----")
            body = body_and_footer[0].strip()
            # Clean body of any extra spaces or broken lines
            clean_body = "\n".join([line.strip() for line in body.splitlines() if line.strip()])
            return f"-----BEGIN PRIVATE KEY-----\n{clean_body}\n-----END PRIVATE KEY-----\n"
        except Exception:
            pass

    return k


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

    formatted_pk = clean_pem_key(pk)

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
        logger.error(f"Failed to initialize Certificate credential from env vars: {err}")
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
        try:
            cred = _build_env_var_credentials()
            if cred:
                logger.info("Firebase Admin SDK: using credentials from environment variables.")
            else:
                logger.warning("No valid Firebase credentials found in environment variables.")
        except Exception as e:
            logger.warning(f"Error reading credentials from env vars: {e}")
            cred = None

    try:
        if cred:
            firebase_admin.initialize_app(cred)
        else:
            logger.warning("Initializing default Firebase app without credentials (offline mode).")
    except Exception as init_err:
        logger.error(f"Firebase app initialization failed: {init_err}")

    try:
        if cred:
            db = firestore.client()
    except Exception as e:
        logger.warning(f"Firestore client initialization failed: {e}")
        db = None


init_firebase()