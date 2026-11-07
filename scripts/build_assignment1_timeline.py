import os
import sys
import time
import requests

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

API_BASE = "http://127.0.0.1:9001"
PROJECT_NAME = "Assignment1-Grammar-Video"
VIDEO_PATH = r"H:\My Drive\01_Media_Assets\04_Videos\SaveClip.App_AQPRm_PF5wjUYIUDkFCHmr9Rr9sV_NG9yfQOCq0s5VE1xkxwBtAjvvhUQ7e6p5Lqm1Z5mRxicXQeL7r1KjsC6chihIQj3-8xxeT5B7Q.mp4"

def check_server():
    try:
        resp = requests.get(f"{API_BASE}/list_projects", timeout=3)
        return resp.status_code == 200
    except Exception as e:
        print(f"Error connecting to VectCutAPI: {e}")
        return False

def build_timeline():
    print(f"=== Starting CapCut Timeline Assembly for {PROJECT_NAME} ===")
    
    if not check_server():
        print("VectCutAPI server on port 9001 is not responding. Please ensure VectCutAPI is running.")
        sys.exit(1)
        
    print("1. Creating new 1080x1920 (9:16) Draft Canvas...")
    res = requests.post(f"{API_BASE}/create_draft", json={"width": 1080, "height": 1920}).json()
    if not res.get("success"):
        print(f"Failed to create draft: {res}")
        sys.exit(1)
        
    draft_id = res["output"]["draft_id"]
    print(f"   Created draft ID: {draft_id}")
    
    # 2. Add Video Footage Track
    print(f"2. Adding Video Track from: {VIDEO_PATH}...")
    video_payload = {
        "draft_id": draft_id,
        "video_url": VIDEO_PATH,
        "width": 1080,
        "height": 1920,
        "start": 0,
        "end": 47.27,
        "target_start": 0,
        "track_name": "video_main",
        "volume": 1.0
    }
    v_res = requests.post(f"{API_BASE}/add_video", json=video_payload).json()
    print(f"   Video Track Result: {v_res.get('success')}")
    
    # 3. Add Section Titles & Motion Badges
    print("3. Adding Chapter Titles & Highlights...")
    text_cues = [
        {"text": "JN60101: สรุปไวยากรณ์ 3 สเต็ป", "start": 0, "end": 5, "color": "#FFFFFF", "size": 9.0},
        {"text": "STEP 1: การบอกเวลา (〜時・〜分)", "start": 5, "end": 18, "color": "#FBBF24", "size": 8.0},
        {"text": "STEP 2: วัน วันที่ เดือน ปี (〜年・〜月・〜日)", "start": 18, "end": 32, "color": "#34D399", "size": 8.0},
        {"text": "STEP 3: คำช่วย 〜から・・・〜まで", "start": 32, "end": 47.27, "color": "#38BDF8", "size": 8.0}
    ]
    
    for cue in text_cues:
        t_res = requests.post(f"{API_BASE}/add_text", json={
            "draft_id": draft_id,
            "text": cue["text"],
            "start": cue["start"],
            "end": cue["end"],
            "transform_x": 0.0,
            "transform_y": 0.78,
            "font_size": cue["size"],
            "color": cue["color"],
            "bold": True,
            "track_name": "text_chapters"
        }).json()
        print(f"   Text added [{cue['text'][:20]}...]: {t_res.get('success')}")
        
    # 4. Add Synchronized Subtitles (SRT)
    print("4. Adding Synchronized 2-Language Subtitles...")
    srt_content = """1
00:00:00,500 --> 00:00:04,500
สวัสดีครับ วันนี้เราจะมาสรุปไวยากรณ์ภาษาญี่ปุ่น 3 สเต็ปสำคัญครับ

2
00:00:05,000 --> 00:00:10,000
สเต็ปที่ 1: การบอกเวลา โมง และ นาที (~ji / ~fun)

3
00:00:10,500 --> 00:00:14,500
จุดที่ต้องระวัง: 4:00 (yo-ji), 7:00 (shichi-ji), 9:00 (ku-ji)

4
00:00:15,000 --> 00:00:18,000
今、何時ですか。-> 4時半です。(Yo-ji han desu.)

5
00:00:18,500 --> 00:00:23,500
สเต็ปที่ 2: วัน วันที่ เดือน ปี ญี่ปุ่นเรียงจากใหญ่ไปเล็กครับ

6
00:00:24,000 --> 00:00:28,500
เดือนยกเว้น: เม.ย. (shi-gatsu), ก.ย. (ku-gatsu) และวันที่ 1 (tsuitachi), 14 (jū yok-ka)

7
00:00:29,000 --> 00:00:32,000
お誕生日はいつですか。-> 4月14日です。

8
00:00:32,500 --> 00:00:37,500
สเต็ปที่ 3: คำช่วย ...kara ...made (ตั้งแต่... ถึง...)

9
00:00:38,000 --> 00:00:43,000
銀行は何時から何時までですか。-> 9時から3時までです。

10
00:00:43,500 --> 00:00:47,000
9:00 ออกเสียงว่า ku-ji kara san-ji made desu ขอบคุณครับ!
"""
    sub_payload = {
        "draft_id": draft_id,
        "srt": srt_content,
        "font_size": 6.0,
        "font_color": "#FFFFFF",
        "bold": True,
        "border_color": "#000000",
        "border_width": 2.0,
        "transform_x": 0.0,
        "transform_y": -0.62
    }
    s_res = requests.post(f"{API_BASE}/add_subtitle", json=sub_payload).json()
    print(f"   Subtitle Track Result: {s_res.get('success')}")
    
    # 5. Save and Deploy to CapCut Desktop Drafts
    print(f"5. Saving and Deploying Draft to CapCut Project: '{PROJECT_NAME}'...")
    save_payload = {
        "draft_id": draft_id,
        "project_name": PROJECT_NAME,
        "auto_deploy": True
    }
    save_res = requests.post(f"{API_BASE}/save_draft", json=save_payload).json()
    print(f"   Save Draft Result: {save_res}")
    
    print("\n=== Timeline Assembly Finished Successfully! ===")
    return save_res

if __name__ == "__main__":
    build_timeline()
