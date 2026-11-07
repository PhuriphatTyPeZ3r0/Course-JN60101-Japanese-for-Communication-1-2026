import os
import sys
import requests
import subprocess
import json

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

API_URL = "https://api.fish.audio/v1/tts"
API_KEY = "sk-fish-fdR6Ye2t-4qjNwW23w4F4fQXZpmhiPzP6ph2HyrVX-M"
REF_ID = "dea86d7359194b668a34750b472ced71" # Saori Hayami

AUDIO_OUT_DIR = r"C:\Users\iznamu\OneDrive - Panyapiwat Institute of Management\00_Active_Term\04_JN60101_Japanese-1\03_Projects\CapCut_Assets\audio\saori"
os.makedirs(AUDIO_OUT_DIR, exist_ok=True)

# Using Hiragana alongside Kanji to ensure 100% flawless pronunciation on exception readings:
# Step 1: yo-ji han (not yon-ji)
# Step 2: shi-gatsu jū yok-ka (not yon-gatsu, not ju-yon-nichi)
# Step 3: ku-ji kara san-ji made (not kyuu-ji)
LINES = [
    {
        "id": "saori_step1_time",
        "text": "いま何時ですか？よじ半です。", # yo-ji han
        "filename": "saori_step1_time.mp3",
        "description": "Step 1 Q&A: Ima nan-ji desu ka? Yo-ji han desu."
    },
    {
        "id": "saori_step2_date",
        "text": "お誕生日はいつですか？しがつ、じゅうよっかです。", # shi-gatsu, jū yok-ka
        "filename": "saori_step2_date.mp3",
        "description": "Step 2 Q&A: Otanjōbi wa itsu desu ka? Shi-gatsu jū yok-ka desu."
    },
    {
        "id": "saori_step3_timeline",
        "text": "銀行は何時から何時までですか？くじから、さんじまでです。", # ku-ji kara san-ji made
        "filename": "saori_step3_timeline.mp3",
        "description": "Step 3 Q&A: Ginkō wa nan-ji kara nan-ji made desu ka? Ku-ji kara san-ji made desu."
    }
]

def synthesize_line(item):
    out_path = os.path.join(AUDIO_OUT_DIR, item["filename"])
    payload = {
        "text": item["text"],
        "reference_id": REF_ID,
        "format": "mp3",
        "sample_rate": 44100,
        "mp3_bitrate": 128,
        "latency": "balanced",
        "prosody": {
            "speed": 1.0,
            "volume": 0
        }
    }
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "model": "s2.1-pro-free"
    }
    
    print(f"Synthesizing [{item['id']}]: '{item['text']}'...")
    res = requests.post(API_URL, headers=headers, json=payload, timeout=20)
    if res.status_code == 200:
        with open(out_path, "wb") as f:
            f.write(res.content)
        print(f"Saved: {out_path} ({len(res.content)} bytes)")
    else:
        print(f"Error {res.status_code}: {res.text}")

def main():
    print("=== Generating Saori Hayami Japanese Pronunciation Audio ===")
    for item in LINES:
        synthesize_line(item)
        
    print("\nVerifying durations with ffprobe...")
    for item in LINES:
        out_path = os.path.join(AUDIO_OUT_DIR, item["filename"])
        if os.path.exists(out_path):
            cmd = [
                "ffprobe", "-v", "error", "-show_entries", "format=duration",
                "-of", "default=noprint_wrappers=1:nokey=1", out_path
            ]
            dur_str = subprocess.check_output(cmd).decode().strip()
            print(f" - {item['filename']}: duration = {float(dur_str):.2f}s")

if __name__ == "__main__":
    main()
