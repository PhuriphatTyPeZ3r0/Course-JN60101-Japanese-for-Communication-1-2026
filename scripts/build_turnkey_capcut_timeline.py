import os
import sys
import time
import requests
import shutil

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

API_BASE = "http://127.0.0.1:9001"
PROJECT_NAME = "Assignment1-Grammar-Video-Prompt"

WORKSPACE = r"C:\Users\iznamu\OneDrive - Panyapiwat Institute of Management\00_Active_Term\04_JN60101_Japanese-1"
IMAGES_DIR = os.path.join(WORKSPACE, "03_Projects", "CapCut_Assets", "images")
ROMAJI_DIR = os.path.join(IMAGES_DIR, "romaji_cards")
AUDIO_DIR = os.path.join(WORKSPACE, "03_Projects", "CapCut_Assets", "audio")
SAORI_DIR = os.path.join(AUDIO_DIR, "saori")
REF_VIDEO = r"H:\My Drive\01_Media_Assets\04_Videos\SaveClip.App_AQPRm_PF5wjUYIUDkFCHmr9Rr9sV_NG9yfQOCq0s5VE1xkxwBtAjvvhUQ7e6p5Lqm1Z5mRxicXQeL7r1KjsC6chihIQj3-8xxeT5B7Q.mp4"

# Visual Assets
BG_IMAGE = os.path.join(IMAGES_DIR, "bg_classroom_chalkboard.png")
CARD_WARN = os.path.join(ROMAJI_DIR, "card_warning_sign_romaji.png")

HEADER_STEP1 = os.path.join(ROMAJI_DIR, "step1_header.png")
CARD_1_1 = os.path.join(ROMAJI_DIR, "step1_card1.png")
CARD_1_2 = os.path.join(ROMAJI_DIR, "step1_card2.png")
CARD_1_3 = os.path.join(ROMAJI_DIR, "step1_card3.png")
CARD_1_4 = os.path.join(ROMAJI_DIR, "step1_card4.png")

HEADER_STEP2 = os.path.join(ROMAJI_DIR, "step2_header.png")
CARD_2_1 = os.path.join(ROMAJI_DIR, "step2_card1.png")
CARD_2_2 = os.path.join(ROMAJI_DIR, "step2_card2.png")
CARD_2_3 = os.path.join(ROMAJI_DIR, "step2_card3.png")
CARD_2_4 = os.path.join(ROMAJI_DIR, "step2_card4.png")

HEADER_STEP3 = os.path.join(ROMAJI_DIR, "step3_header.png")
CARD_3_1 = os.path.join(ROMAJI_DIR, "step3_card1.png")
CARD_3_2 = os.path.join(ROMAJI_DIR, "step3_card2.png")
CARD_3_3 = os.path.join(ROMAJI_DIR, "step3_card3.png")
CARD_3_4 = os.path.join(ROMAJI_DIR, "step3_card4.png")

# Audio Assets
SFX_POP = os.path.join(AUDIO_DIR, "sfx_pop.mp3")
SFX_WHOOSH = os.path.join(AUDIO_DIR, "sfx_whoosh.mp3")
SFX_BUZZER = os.path.join(AUDIO_DIR, "sfx_buzzer.mp3")
SFX_DING = os.path.join(AUDIO_DIR, "sfx_ding.mp3")
BGM_LOFI = os.path.join(AUDIO_DIR, "bgm_lofi_chill.mp3")

# Saori Hayami Voice Assistant Audio
SAORI_STEP1 = os.path.join(SAORI_DIR, "saori_step1_time.mp3")
SAORI_STEP2 = os.path.join(SAORI_DIR, "saori_step2_date.mp3")
SAORI_STEP3 = os.path.join(SAORI_DIR, "saori_step3_timeline.mp3")

TOTAL_DURATION = 47.27

def add_image_item(draft_id, image_url, start, end, track_name, intro_anim=None, intro_dur=0.3):
    payload = {
        "draft_id": draft_id,
        "image_url": image_url,
        "start": float(start),
        "end": float(end),
        "width": 1080,
        "height": 1920,
        "scale_x": 1.0,
        "scale_y": 1.0,
        "transform_x": 0.0,
        "transform_y": 0.0,
        "track_name": track_name
    }
    if intro_anim:
        payload["intro_animation"] = intro_anim
        payload["intro_animation_duration"] = intro_dur
    res = requests.post(f"{API_BASE}/add_image", json=payload).json()
    return res

def run():
    print(f"=== Assembling Production CapCut Timeline: {PROJECT_NAME} ===")
    
    # 1. Create 1080x1920 draft canvas
    print("1. Creating Draft Canvas (1080x1920)...")
    res = requests.post(f"{API_BASE}/create_draft", json={"width": 1080, "height": 1920}).json()
    if not res.get("success"):
        print(f"Failed to create draft: {res}")
        sys.exit(1)
    draft_id = res["output"]["draft_id"]
    print(f"   Draft ID: {draft_id}")
    
    # 2. Add Chalkboard Background (Track: track_bg)
    print("2. Adding Japanese Classroom Chalkboard Background...")
    bg_res = add_image_item(draft_id, BG_IMAGE, 0.0, TOTAL_DURATION, "track_bg")
    print(f"   Background Added: {bg_res.get('success')}")

    # 3. Add Speaker Video (Track: track_speaker)
    print("3. Adding Speaker Footage Track...")
    v_res = requests.post(f"{API_BASE}/add_video", json={
        "draft_id": draft_id,
        "video_url": REF_VIDEO,
        "start": 0.0,
        "end": TOTAL_DURATION,
        "target_start": 0.0,
        "width": 1080,
        "height": 1920,
        "track_name": "track_speaker",
        "volume": 0.9
    }).json()
    print(f"   Speaker Track Added: {v_res.get('success')}")

    # 4. Add Dedicated Warning Card Track (Track: track_warn)
    print("4. Adding Dedicated Warning Card Track (0.0s - 5.0s)...")
    warn_res = add_image_item(draft_id, CARD_WARN, 0.0, 5.0, "track_warn", intro_anim="Fade_In", intro_dur=0.3)
    print(f"   Warning Card Track Added: {warn_res.get('success')}")

    # 5. Add Step Headers Track (Track: track_header)
    print("5. Adding Topic Header Badges Track (5.0s - 47.27s)...")
    headers = [
        {"file": HEADER_STEP1, "start": 5.0, "end": 19.0, "name": "เรื่องที่ 1 Header"},
        {"file": HEADER_STEP2, "start": 19.0, "end": 33.0, "name": "เรื่องที่ 2 Header"},
        {"file": HEADER_STEP3, "start": 33.0, "end": TOTAL_DURATION, "name": "เรื่องที่ 3 Header"}
    ]
    for h in headers:
        r = add_image_item(draft_id, h["file"], h["start"], h["end"], "track_header", intro_anim="Fade_In", intro_dur=0.25)
        print(f"   Header [{h['name']} @ {h['start']}s]: {r.get('success')}")

    # 6. Add Sequential Cards (Tracks: track_card1, track_card2, track_card3, track_card4)
    print("6. Adding Progressive Sequential Romaji Cards...")
    card_layers = [
        # Track Card 1 (Top-Left / Full Row 1)
        {"track": "track_card1", "items": [
            {"file": CARD_1_1, "start": 5.0, "end": 19.0, "name": "Step 1 Card 1 (Normal Rules)"},
            {"file": CARD_2_1, "start": 19.0, "end": 33.0, "name": "Step 2 Card 1 (Order)"},
            {"file": CARD_3_1, "start": 33.0, "end": TOTAL_DURATION, "name": "Step 3 Card 1 (Formula)"}
        ]},
        # Track Card 2 (Top-Right / Full Row 2)
        {"track": "track_card2", "items": [
            {"file": CARD_1_2, "start": 8.5, "end": 19.0, "name": "Step 1 Card 2 (3 Hour Exceptions)"},
            {"file": CARD_2_2, "start": 22.5, "end": 33.0, "name": "Step 2 Card 2 (3 Month Exceptions)"},
            {"file": CARD_3_2, "start": 36.5, "end": TOTAL_DURATION, "name": "Step 3 Card 2 (Bank Timeline)"}
        ]},
        # Track Card 3 (Bottom-Left / Full Row 3)
        {"track": "track_card3", "items": [
            {"file": CARD_1_3, "start": 12.0, "end": 19.0, "name": "Step 1 Card 3 (Minute Exceptions)"},
            {"file": CARD_2_3, "start": 26.0, "end": 33.0, "name": "Step 2 Card 3 (Special Days)"},
            {"file": CARD_3_3, "start": 40.0, "end": TOTAL_DURATION, "name": "Step 3 Card 3 (Bank Dialogue + Saori Badge)"}
        ]},
        # Track Card 4 (Bottom-Right / Full Row 4)
        {"track": "track_card4", "items": [
            {"file": CARD_1_4, "start": 15.5, "end": 19.0, "name": "Step 1 Card 4 (Dialogue + Saori Badge)"},
            {"file": CARD_2_4, "start": 29.5, "end": 33.0, "name": "Step 2 Card 4 (Birthday Dialogue + Saori Badge)"},
            {"file": CARD_3_4, "start": 43.5, "end": TOTAL_DURATION, "name": "Step 3 Card 4 (JN1 Pro-Tip)"}
        ]}
    ]

    for layer in card_layers:
        tname = layer["track"]
        for it in layer["items"]:
            cr = add_image_item(draft_id, it["file"], it["start"], it["end"], tname, intro_anim="Fade_In", intro_dur=0.2)
            print(f"   [{tname}] Card {it['name']} ({it['start']}s - {it['end']}s): {cr.get('success')}")

    # 7. Add Saori Hayami Voice Track (Track: track_saori)
    print("7. Adding Saori Hayami AI Coach Audio Track...")
    saori_cues = [
        {"file": SAORI_STEP1, "start": 15.5, "dur": 2.48, "name": "Saori: Ima nan-ji desu ka? Yo-ji han desu."},
        {"file": SAORI_STEP2, "start": 28.8, "dur": 4.02, "name": "Saori: Otanjōbi wa itsu desu ka? Shi-gatsu jū yok-ka desu."},
        {"file": SAORI_STEP3, "start": 40.0, "dur": 4.52, "name": "Saori: Ginkō wa nan-ji kara nan-ji made desu ka? Ku-ji kara san-ji made desu."}
    ]
    for sc in saori_cues:
        sc_res = requests.post(f"{API_BASE}/add_audio", json={
            "draft_id": draft_id,
            "audio_url": sc["file"],
            "start": 0.0,
            "end": sc["dur"],
            "target_start": sc["start"],
            "volume": 1.05,
            "track_name": "track_saori"
        }).json()
        print(f"   Saori Voice [{sc['name']} @ {sc['start']}s]: {sc_res.get('success')}")

    # 8. Add Sound Effects (Track: track_sfx)
    print("8. Adding Synchronized Sound Effects (SFX)...")
    sfx_cues = [
        # Intro
        {"file": SFX_WHOOSH, "start": 0.0, "dur": 0.42, "name": "Whoosh Intro Hook"},
        {"file": SFX_BUZZER, "start": 1.5, "dur": 0.48, "name": "Buzzer Chotto matte Warning"},
        # Step 1 Sequential Reveals
        {"file": SFX_POP, "start": 5.0, "dur": 0.18, "name": "Pop Step 1 Start & Card 1"},
        {"file": SFX_BUZZER, "start": 8.5, "dur": 0.48, "name": "Buzzer Hour Exception Card 2"},
        {"file": SFX_POP, "start": 12.0, "dur": 0.18, "name": "Pop Minute Exception Card 3"},
        {"file": SFX_DING, "start": 15.5, "dur": 0.65, "name": "Ding 4:30 Answer Card 4"},
        # Step 2 Sequential Reveals
        {"file": SFX_WHOOSH, "start": 19.0, "dur": 0.42, "name": "Whoosh Step 2 Transition & Card 1"},
        {"file": SFX_BUZZER, "start": 22.5, "dur": 0.48, "name": "Buzzer Month Exception Card 2"},
        {"file": SFX_POP, "start": 26.0, "dur": 0.18, "name": "Pop Special Days Card 3"},
        {"file": SFX_DING, "start": 29.5, "dur": 0.65, "name": "Ding Birthday Dialogue Card 4"},
        # Step 3 Sequential Reveals
        {"file": SFX_WHOOSH, "start": 33.0, "dur": 0.42, "name": "Whoosh Step 3 Transition & Card 1"},
        {"file": SFX_POP, "start": 36.5, "dur": 0.18, "name": "Pop Bank Timeline Card 2"},
        {"file": SFX_DING, "start": 40.0, "dur": 0.65, "name": "Ding Bank Dialogue Card 3"},
        {"file": SFX_DING, "start": 43.5, "dur": 0.65, "name": "Ding JN1 Exam Pro-Tip Card 4"}
    ]
    for s in sfx_cues:
        s_res = requests.post(f"{API_BASE}/add_audio", json={
            "draft_id": draft_id,
            "audio_url": s["file"],
            "start": 0.0,
            "end": s["dur"],
            "target_start": s["start"],
            "volume": 0.85,
            "track_name": "track_sfx"
        }).json()
        print(f"   SFX [{s['name']} @ {s['start']}s]: {s_res.get('success')}")

    # 9. Add Lo-fi Chill Study BGM (Track: track_bgm)
    print("9. Adding Lo-fi Chill Study BGM (Ducked bed volume: 0.25)...")
    bgm_res = requests.post(f"{API_BASE}/add_audio", json={
        "draft_id": draft_id,
        "audio_url": BGM_LOFI,
        "start": 0.0,
        "end": TOTAL_DURATION,
        "target_start": 0.0,
        "volume": 0.25,
        "track_name": "track_bgm"
    }).json()
    print(f"   BGM Track Added: {bgm_res.get('success')}")

    # 10. Add Synchronized Romaji + Thai Captions
    print("10. Adding Pure Romaji Kinetic Captions...")
    srt_content = """1
00:00:00,500 --> 00:00:04,800
เดี๋ยวก่อน! (Chotto matte!) ถ้าจะจำไวยากรณ์ญี่ปุ่น 3 ตัวนี้ อย่าจำสับสนเด็ดขาด!

2
00:00:05,000 --> 00:00:08,200
เรื่องที่ 1: การบอกเวลา โมงใช้ ~ji และ นาทีใช้ ~fun

3
00:00:08,500 --> 00:00:11,800
ระวัง 3 ชั่วโมงยกเว้น: 4 โมง yo-ji, 7 โมง shichi-ji, 9 โมง ku-ji

4
00:00:12,000 --> 00:00:15,200
นาทีเสียงกัก ip-pun, rop-pun, jup-pun และ 30 นาทีใช้ han (ครึ่ง)

5
00:00:15,500 --> 00:00:18,800
[🎙️ Saori Hayami AI] Ima nan-ji desu ka? -> Yo-ji han desu. (4 โมงครึ่งครับ)

6
00:00:19,000 --> 00:00:22,200
เรื่องที่ 2: วัน วันที่ เดือน ปี เรียงจาก ใหญ่ ไป เล็ก (nen, gatsu, nichi, yōbi)

7
00:00:22,500 --> 00:00:25,800
3 เดือนยกเว้น: เม.ย. (shi-gatsu), ก.ค. (shichi-gatsu), ก.ย. (ku-gatsu)

8
00:00:26,000 --> 00:00:28,800
วันที่พิเศษ: วันที่ 1 (tsuitachi), วันที่ 14 (jū yok-ka), วันที่ 20 (hatsuka)

9
00:00:28,800 --> 00:00:33,000
[🎙️ Saori Hayami AI] Otanjōbi wa itsu desu ka? -> Shi-gatsu jū yok-ka desu. (14 เม.ย. ครับ)

10
00:00:33,000 --> 00:00:36,200
เรื่องที่ 3: คำช่วย ~kara ... ~made (ตั้งแต่... ถึง...)

11
00:00:36,500 --> 00:00:39,800
ธนาคารเปิด 9:00 - 15:00: ku-ji kara san-ji made desu.

12
00:00:40,000 --> 00:00:44,500
[🎙️ Saori Hayami AI] Ginkō wa nan-ji kara nan-ji made desu ka? -> Ku-ji kara san-ji made desu.

13
00:00:44,500 --> 00:00:47,200
ทริกข้อสอบ: แยกใช้เดี่ยวๆ ได้ เช่น Kaigi wa 10-ji kara desu. จำครบ 3 เรื่องนี้ได้ A แน่นอน!
"""
    sub_res = requests.post(f"{API_BASE}/add_subtitle", json={
        "draft_id": draft_id,
        "srt": srt_content,
        "font_size": 6.5,
        "font_color": "#FFFFFF",
        "bold": True,
        "border_color": "#000000",
        "border_width": 2.5,
        "transform_x": 0.0,
        "transform_y": -0.62
    }).json()
    print(f"   Subtitles Added: {sub_res.get('success')}")

    # 11. Save Draft
    print(f"11. Saving Draft as '{PROJECT_NAME}'...")
    save_res = requests.post(f"{API_BASE}/save_draft", json={
        "draft_id": draft_id,
        "project_name": PROJECT_NAME,
        "auto_deploy": True
    }).json()
    print(f"   Save Result: {save_res}")

    # 12. Multi-Target Sync & Mirroring
    capcut_draft_dir = os.path.expandvars(r"%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft")
    raw_draft_dir = os.path.join(r"C:\Users\iznamu\.gemini\VectCutAPI", draft_id)
    
    # 12.1 Deploy fresh pristine target: Assignment1-Grammar-Video-Prompt
    prompt_target = os.path.join(capcut_draft_dir, "Assignment1-Grammar-Video-Prompt")
    if os.path.exists(raw_draft_dir):
        if os.path.exists(prompt_target):
            shutil.rmtree(prompt_target, ignore_errors=True)
        try:
            shutil.copytree(raw_draft_dir, prompt_target)
            shutil.copyfile(os.path.join(prompt_target, "draft_info.json"), os.path.join(prompt_target, "draft_content.json"))
            print(f"   Successfully deployed fresh project: '{prompt_target}'!")
        except Exception as e:
            print(f"   Notice deploying Prompt target: {e}")

    # 12.2 Mirror into Assignment1-Grammar-Video-Romaji, Assignment1-Grammar-Video, Assignment1-Grammar-Video-Automated
    for target_name in ["Assignment1-Grammar-Video-Romaji", "Assignment1-Grammar-Video", "Assignment1-Grammar-Video-Automated"]:
        dst = os.path.join(capcut_draft_dir, target_name)
        if os.path.exists(dst) and os.path.exists(raw_draft_dir):
            for f in os.listdir(raw_draft_dir):
                if f == ".locked": continue
                s_file = os.path.join(raw_draft_dir, f)
                d_file = os.path.join(dst, f)
                try:
                    if os.path.isfile(s_file):
                        shutil.copy2(s_file, d_file)
                    elif os.path.isdir(s_file):
                        if os.path.exists(d_file):
                            shutil.rmtree(d_file, ignore_errors=True)
                        shutil.copytree(s_file, d_file)
                except Exception:
                    pass
            try:
                shutil.copyfile(os.path.join(dst, "draft_info.json"), os.path.join(dst, "draft_content.json"))
            except Exception:
                pass
            print(f"   Synchronized latest changes to '{target_name}'!")

    print("\n🎉 === Complete CapCut Timeline Assembly with Prompt Font & Dedicated Warning Track! ===")

if __name__ == "__main__":
    run()
