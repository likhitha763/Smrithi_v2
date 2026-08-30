#!/usr/bin/env python3
import os
import sys

print("🔥 Testing Firebase Admin SDK & Firestore Connection...")

try:
    from app.core.firebase_init import init_firebase, db
    init_firebase()
    print("✅ Firebase Admin SDK initialized successfully!")
    
    if db:
        print("✅ Firestore client instantiated successfully!")
        print(f"Project ID: {db.project}")
    else:
        print("❌ Firestore client is None.")
except Exception as e:
    print(f"❌ Firebase test failed: {e}")
    sys.exit(1)
