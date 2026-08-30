#!/usr/bin/env python3
import json
import urllib.request
import urllib.error

BASE_URL = "http://localhost:8000"

def test_endpoint(name, method, path, data=None):
    url = f"{BASE_URL}{path}"
    print(f"\n────────────────────────────────────────────────────────────")
    print(f"Testing [{method}] {name} ({url})")
    
    headers = {"Content-Type": "application/json"}
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)

    try:
        with urllib.request.urlopen(req) as response:
            status = response.status
            res_body = response.read().decode("utf-8")
            try:
                formatted_json = json.dumps(json.loads(res_body), indent=2, ensure_ascii=False)
                print(f"Status: {status} OK")
                print(f"Response:\n{formatted_json[:400]}...")
            except Exception:
                print(f"Status: {status} OK")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.reason}")
        print(e.read().decode("utf-8"))
    except urllib.error.URLError as e:
        print(f"URL Error: {e.reason}")

if __name__ == "__main__":
    print("🚀 Starting Complete SMRITHI API Endpoint Verification...")

    # 1. Health & Status
    test_endpoint("Root Status", "GET", "/")
    test_endpoint("Health Check", "GET", "/health")

    # 2. Auth & Login
    test_endpoint("Demo Caregiver Login", "POST", "/api/auth/demo-login")

    # 3. Caregiver Profile & Patients (Live Firestore smrithi-80e52)
    test_endpoint("Save Caregiver Profile", "POST", "/api/caregiver/profile", {
        "caregiver_id": "demo_caregiver_123",
        "full_name": "Asha Devi",
        "email": "caregiver@smrithi.org",
        "phone": "+91 9876543210"
    })

    test_endpoint("Add Patient", "POST", "/api/caregiver/patients/demo_caregiver_123", {
        "name": "Biren Sharma",
        "age": 72,
        "language": "as",
        "notes": "Dementia stage 1, early memory recall assistance"
    })

    # 4. Voice & Regional Language
    test_endpoint("Supported Languages", "GET", "/voice/languages")
    test_endpoint("English Prompt", "GET", "/voice/prompt/en/welcome")
    test_endpoint("Synthesize Speech (gTTS)", "POST", "/api/voice/synthesize", {
        "text": "Welcome to Smrithi memory care",
        "language": "as",
        "speed_rate": 1.0
    })

    print("\n✅ Verification complete! Open http://localhost:8000/docs for Swagger UI.")
