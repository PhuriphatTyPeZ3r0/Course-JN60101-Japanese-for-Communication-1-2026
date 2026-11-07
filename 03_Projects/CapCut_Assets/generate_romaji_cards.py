"""
Generates Romaji-Only sequential card assets for 1080x1920 CapCut Video.
- 100% Prompt Font exclusively across all cards, titles, badges, and romaji.
- Explicit widths, paddings, and font sizes to prevent any awkward text wrapping.
- Compact, clean badges including Saori AI co-speaker indicator.
"""

import os
import subprocess
from PIL import Image

TARGET_DIR = r"C:\Users\iznamu\OneDrive - Panyapiwat Institute of Management\00_Active_Term\04_JN60101_Japanese-1\03_Projects\CapCut_Assets\images\romaji_cards"
TEMP_DIR = os.environ.get("TEMP", r"C:\Users\iznamu\AppData\Local\Temp")
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

os.makedirs(TARGET_DIR, exist_ok=True)

SHARED_HEAD = """
<meta charset="utf-8">
<meta name="viewport" content="width=1080, height=1920, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
    -webkit-font-smoothing: antialiased; 
    font-family: 'Prompt', sans-serif !important;
  }
  body {
    width: 1080px; height: 1920px; margin: 0; padding: 0;
    overflow: hidden; background: transparent;
    font-family: 'Prompt', sans-serif !important;
    user-select: none;
  }
  .header-badge {
    position: absolute; top: 60px; left: 55px; width: 970px; height: 92px;
    border-radius: 46px; display: flex; align-items: center; justify-content: space-between;
    padding: 0 35px; box-shadow: 0 16px 36px rgba(0,0,0,0.35); z-index: 20;
  }
  .header-title { font-size: 32px; font-weight: 800; color: white; display: flex; align-items: center; gap: 14px; white-space: nowrap; }
  .header-tag { padding: 6px 18px; border-radius: 20px; font-size: 19px; font-weight: 800; background: rgba(255,255,255,0.25); color: white; white-space: nowrap; }

  /* 2x2 Grid Positions (55px margins, 20px gap, width 475px, height 425px) */
  .box-top-left { position: absolute; top: 180px; left: 55px; width: 475px; height: 425px; }
  .box-top-right { position: absolute; top: 180px; left: 550px; width: 475px; height: 425px; }
  .box-bottom-left { position: absolute; top: 630px; left: 55px; width: 475px; height: 425px; }
  .box-bottom-right { position: absolute; top: 630px; left: 550px; width: 475px; height: 425px; }

  /* Full Width Upper Cards (Step 3) */
  .box-full-1 { position: absolute; top: 180px; left: 55px; width: 970px; height: 175px; }
  .box-full-2 { position: absolute; top: 375px; left: 55px; width: 970px; height: 245px; }
  .box-full-3 { position: absolute; top: 640px; left: 55px; width: 970px; height: 235px; }
  .box-full-4 { position: absolute; top: 895px; left: 55px; width: 970px; height: 110px; }

  /* Card Base Styling */
  .card-base {
    background: #FFFFFF; border-radius: 28px; padding: 22px 24px;
    box-shadow: 0 20px 45px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15);
    display: flex; flex-direction: column; justify-content: space-between; height: 100%;
  }
  .card-pill { 
    display: inline-flex; align-items: center; gap: 8px; font-size: 19px; font-weight: 800; 
    padding: 5px 14px; border-radius: 12px; white-space: nowrap; 
  }
  .saori-pill {
    background: #FCE7F3; color: #9D174D; border: 1.5px solid #F472B6; 
    padding: 4px 12px; border-radius: 20px; font-size: 15px; font-weight: 800; 
    display: inline-flex; align-items: center; gap: 4px; white-space: nowrap;
  }
  .row-item { 
    display: flex; justify-content: space-between; align-items: center; 
    padding: 8px 14px; border-radius: 12px; font-size: 20px; margin-bottom: 7px; font-weight: 700; 
    white-space: nowrap;
  }
  .romaji-bold { font-weight: 800; letter-spacing: 0.3px; }
  .tip-row { 
    font-size: 16.5px; font-weight: 700; padding: 8px 12px; border-radius: 10px; 
    text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
  }
</style>
"""

def render_html_to_png(html_content, filename):
    out_png = os.path.join(TARGET_DIR, filename)
    tmp_html = os.path.join(TEMP_DIR, f"romaji_temp_{filename}.html")
    
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--window-size=1080,1920",
        "--default-background-color=00000000",
        "--virtual-time-budget=3000",
        f"--screenshot={out_png}",
        f"file:///{tmp_html.replace(os.sep, '/')}"
    ]
    subprocess.run(cmd, check=True)
    if os.path.exists(out_png):
        img = Image.open(out_png)
        print(f"Generated {filename}: {img.size}, mode: {img.mode}, size: {os.path.getsize(out_png)//1024} KB")
    else:
        print(f"Failed to generate {filename}")

# ==============================================================
# WARNING CARD (ROMAJI ONLY + PROMPT FONT)
# ==============================================================
HTML_WARN = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}
<style>
  .warning-container {{
    position: absolute; top: 140px; left: 140px; width: 800px; height: 800px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }}
  .oct-shield {{
    width: 680px; height: 680px; background: linear-gradient(135deg, #EF4444 0%, #B91C1C 100%);
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    box-shadow: 0 25px 60px rgba(220, 38, 38, 0.45); border: 12px solid #FFFFFF;
  }}
  .warn-icon {{
    width: 95px; height: 95px; background: #FEF08A; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 60px; font-weight: 900; color: #DC2626; margin-bottom: 12px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  }}
  .warn-title {{
    font-size: 76px; font-weight: 900; color: #FBBF24; text-shadow: 0 6px 0 #92400E, 0 12px 25px rgba(0,0,0,0.5);
    letter-spacing: -1px; margin-bottom: 8px; white-space: nowrap;
  }}
  .sub-romaji {{
    background: #18181B; color: #FFFFFF; font-size: 32px; font-weight: 800;
    padding: 8px 32px; border-radius: 25px; margin-bottom: 18px;
    border: 2px solid #FBBF24; white-space: nowrap;
  }}
  .warn-pill {{
    background: #FFFFFF; color: #DC2626; font-size: 22px; font-weight: 800;
    padding: 10px 28px; border-radius: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.25);
    white-space: nowrap;
  }}
</style>
</head><body>
<div class="warning-container">
  <div class="oct-shield">
    <div class="warn-icon">!</div>
    <div class="warn-title">เดี๋ยวก่อน!</div>
    <div class="sub-romaji">Chotto matte!</div>
    <div class="warn-pill">⚠️ ระวังจุดที่คนไทยชอบออกเสียงผิด!</div>
  </div>
</div>
</body></html>"""

# ==============================================================
# STEP 1: TELLING TIME (4 CARDS)
# ==============================================================
HTML_STEP1_HEADER = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="header-badge" style="background: linear-gradient(90deg, #F97316 0%, #EA580C 100%); border: 3px solid #FFEDD5;">
  <div class="header-title">⏰ เรื่องที่ 1: Telling Time (~ji / ~fun)</div>
  <div class="header-tag">GRAMMAR 1</div>
</div>
</body></html>"""

HTML_STEP1_CARD1 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-top-left">
  <div class="card-base" style="border: 4px solid #10B981;">
    <div>
      <div class="card-pill" style="background: #D1FAE5; color: #065F46; margin-bottom: 10px;">✅ Normal Rules</div>
      <div class="row-item" style="background: #F8FAFC;">
        <span style="color: #475569;">Hour:</span>
        <span class="romaji-bold" style="color: #0F172A;">[1-12] + ji</span>
      </div>
      <div class="row-item" style="background: #F8FAFC;">
        <span style="color: #475569;">Minute:</span>
        <span class="romaji-bold" style="color: #0F172A;">[1-59] + fun</span>
      </div>
      <div style="font-size: 18px; color: #64748B; padding: 6px 10px; font-weight: 600; line-height: 1.45;">
        • 1:00 = ichi-ji &nbsp;• 2:00 = ni-ji<br>• 5-min = go-fun
      </div>
    </div>
    <div class="tip-row" style="background: #FEF3C7; color: #92400E;">💡 โมงใช้ ji | นาทีใช้ fun</div>
  </div>
</div>
</body></html>"""

HTML_STEP1_CARD2 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-top-right">
  <div class="card-base" style="border: 4px solid #EF4444;">
    <div>
      <div class="card-pill" style="background: #FEE2E2; color: #991B1B; margin-bottom: 10px;">❌ 3 Hour Exceptions</div>
      <div class="row-item" style="background: #FEF2F2;">
        <span style="color: #DC2626; text-decoration: line-through;">4:00 yon-ji</span>
        <span class="romaji-bold" style="color: #16A34A;">yo-ji ✅</span>
      </div>
      <div class="row-item" style="background: #FEF2F2;">
        <span style="color: #DC2626; text-decoration: line-through;">7:00 nana-ji</span>
        <span class="romaji-bold" style="color: #16A34A;">shichi-ji ✅</span>
      </div>
      <div class="row-item" style="background: #FEF2F2;">
        <span style="color: #DC2626; text-decoration: line-through;">9:00 kyuu-ji</span>
        <span class="romaji-bold" style="color: #16A34A;">ku-ji ✅</span>
      </div>
    </div>
    <div class="tip-row" style="background: #FEE2E2; color: #B91C1C;">⚠️ จำขึ้นใจ: Yo - Shichi - Ku!</div>
  </div>
</div>
</body></html>"""

HTML_STEP1_CARD3 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-bottom-left">
  <div class="card-base" style="border: 4px solid #F59E0B;">
    <div>
      <div class="card-pill" style="background: #FEF3C7; color: #92400E; margin-bottom: 10px;">⚡ Minute Exceptions</div>
      <div class="row-item" style="background: #FFFBEB;">
        <span>1-min:</span>
        <span class="romaji-bold" style="color: #D97706;">ip-pun</span>
      </div>
      <div class="row-item" style="background: #FFFBEB;">
        <span>6-min:</span>
        <span class="romaji-bold" style="color: #D97706;">rop-pun</span>
      </div>
      <div class="row-item" style="background: #FFFBEB;">
        <span>10-min:</span>
        <span class="romaji-bold" style="color: #D97706;">jup-pun</span>
      </div>
      <div class="row-item" style="background: #FFFBEB;">
        <span>30-min (half):</span>
        <span class="romaji-bold" style="color: #059669;">han</span>
      </div>
    </div>
    <div class="tip-row" style="background: #ECFDF5; color: #065F46;">💡 1, 6, 10 นาที เป็นเสียงกัก -pun</div>
  </div>
</div>
</body></html>"""

HTML_STEP1_CARD4 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-bottom-right">
  <div class="card-base" style="border: 4px solid #3B82F6;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <div class="card-pill" style="background: #DBEAFE; color: #1E40AF;">💬 Dialogue</div>
        <div class="saori-pill">🎙️ Saori AI</div>
      </div>
      <div style="background: #F0F9FF; border-left: 5px solid #0284C7; padding: 9px 12px; border-radius: 12px; margin-bottom: 9px;">
        <div style="font-size: 15px; color: #0369A1; font-weight: 700;">Q: ถามเวลา</div>
        <div class="romaji-bold" style="font-size: 19px; color: #0F172A; margin: 2px 0; white-space: nowrap;">Ima nan-ji desu ka?</div>
        <div style="font-size: 15px; color: #64748B; white-space: nowrap;">ตอนนี้กี่โมงแล้วครับ?</div>
      </div>
      <div style="background: #ECFDF5; border-left: 5px solid #10B981; padding: 9px 12px; border-radius: 12px;">
        <div style="font-size: 15px; color: #047857; font-weight: 700;">A: ตอบเวลา (4:30)</div>
        <div class="romaji-bold" style="font-size: 21px; color: #0F172A; margin: 2px 0; white-space: nowrap;"><span style="color:#D97706;">Yo-ji</span> <span style="color:#059669;">han</span> desu.</div>
        <div style="font-size: 14.5px; color: #64748B; white-space: nowrap;">4 โมงครึ่ง (ใช้ yo-ji ห้าม yon-ji)</div>
      </div>
    </div>
    <div class="tip-row" style="background: #FEF3C7; color: #92400E;">🎯 รวม 2 ข้อยกเว้น: yo-ji + han</div>
  </div>
</div>
</body></html>"""

# ==============================================================
# STEP 2: DATES (4 CARDS)
# ==============================================================
HTML_STEP2_HEADER = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="header-badge" style="background: linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%); border: 3px solid #BFDBFE;">
  <div class="header-title">📅 เรื่องที่ 2: Dates (nen / gatsu / nichi / yōbi)</div>
  <div class="header-tag">GRAMMAR 2</div>
</div>
</body></html>"""

HTML_STEP2_CARD1 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-top-left">
  <div class="card-base" style="border: 4px solid #3B82F6;">
    <div>
      <div class="card-pill" style="background: #DBEAFE; color: #1E40AF; margin-bottom: 8px;">🗓️ Japanese Order</div>
      <div style="font-size: 18px; color: #1E293B; font-weight: 800; margin-bottom: 6px;">เรียงจาก ใหญ่ ➔ เล็ก:</div>
      <div class="row-item" style="background: #EFF6FF;">
        <span>1. Year (ปี):</span><span class="romaji-bold">~nen</span>
      </div>
      <div class="row-item" style="background: #EFF6FF;">
        <span>2. Month (เดือน):</span><span class="romaji-bold">~gatsu</span>
      </div>
      <div class="row-item" style="background: #EFF6FF;">
        <span>3. Date (วันที่):</span><span class="romaji-bold">~nichi</span>
      </div>
      <div class="row-item" style="background: #EFF6FF;">
        <span>4. Day (วัน):</span><span class="romaji-bold">~yōbi</span>
      </div>
    </div>
    <div class="tip-row" style="background: #DBEAFE; color: #1E40AF;">💡 ตัวอย่าง: 2026-nen 10-gatsu 28-nichi</div>
  </div>
</div>
</body></html>"""

HTML_STEP2_CARD2 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-top-right">
  <div class="card-base" style="border: 4px solid #EF4444;">
    <div>
      <div class="card-pill" style="background: #FEE2E2; color: #991B1B; margin-bottom: 10px;">❌ 3 Month Exceptions</div>
      <div class="row-item" style="background: #FEF2F2;">
        <span style="color: #DC2626; text-decoration: line-through;">April yon-gatsu</span>
        <span class="romaji-bold" style="color: #16A34A;">shi-gatsu ✅</span>
      </div>
      <div class="row-item" style="background: #FEF2F2;">
        <span style="color: #DC2626; text-decoration: line-through;">July nana-gatsu</span>
        <span class="romaji-bold" style="color: #16A34A;">shichi-gatsu ✅</span>
      </div>
      <div class="row-item" style="background: #FEF2F2;">
        <span style="color: #DC2626; text-decoration: line-through;">Sept kyuu-gatsu</span>
        <span class="romaji-bold" style="color: #16A34A;">ku-gatsu ✅</span>
      </div>
    </div>
    <div class="tip-row" style="background: #FEF3C7; color: #92400E;">⚠️ ออกเสียงเหมือนชั่วโมง: shi - shichi - ku</div>
  </div>
</div>
</body></html>"""

HTML_STEP2_CARD3 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-bottom-left">
  <div class="card-base" style="border: 4px solid #F59E0B;">
    <div>
      <div class="card-pill" style="background: #FEF3C7; color: #92400E; margin-bottom: 10px;">⭐ Special Days (วันที่พิเศษ)</div>
      <div class="row-item" style="background: #FFFBEB;">
        <span>วันที่ 1:</span>
        <span class="romaji-bold" style="color: #D97706;">tsuitachi</span>
      </div>
      <div class="row-item" style="background: #FFFBEB;">
        <span>วันที่ 14:</span>
        <span class="romaji-bold" style="color: #DC2626;">jū yok-ka ⚠️</span>
      </div>
      <div class="row-item" style="background: #FFFBEB;">
        <span>วันที่ 20:</span>
        <span class="romaji-bold" style="color: #D97706;">hatsuka</span>
      </div>
      <div class="row-item" style="background: #FFFBEB;">
        <span>วันที่ 24:</span>
        <span class="romaji-bold" style="color: #DC2626;">ni-jū yok-ka ⚠️</span>
      </div>
    </div>
    <div class="tip-row" style="background: #FEE2E2; color: #B91C1C;">⚠️ วันที่ 14, 24 ลงท้าย -yok-ka (ห้าม yon)</div>
  </div>
</div>
</body></html>"""

HTML_STEP2_CARD4 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-bottom-right">
  <div class="card-base" style="border: 4px solid #10B981;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <div class="card-pill" style="background: #D1FAE5; color: #065F46;">🎂 Birthday</div>
        <div class="saori-pill">🎙️ Saori AI</div>
      </div>
      <div style="background: #F0FDF4; border-left: 5px solid #10B981; padding: 9px 12px; border-radius: 12px; margin-bottom: 9px;">
        <div style="font-size: 15px; color: #047857; font-weight: 700;">Q: ถามวันเกิด</div>
        <div class="romaji-bold" style="font-size: 19px; color: #0F172A; margin: 2px 0; white-space: nowrap;">Otanjōbi wa itsu desu ka?</div>
        <div style="font-size: 15px; color: #64748B; white-space: nowrap;">วันเกิดของคุณคือเมื่อไหร่ครับ?</div>
      </div>
      <div style="background: #ECFDF5; border-left: 5px solid #059669; padding: 9px 12px; border-radius: 12px;">
        <div style="font-size: 15px; color: #065F46; font-weight: 700;">A: ตอบ (วันที่ 14 เมษายน)</div>
        <div class="romaji-bold" style="font-size: 20px; color: #0F172A; margin: 2px 0; white-space: nowrap;"><span style="color:#DC2626;">Shi-gatsu</span> <span style="color:#D97706;">jū yok-ka</span> desu.</div>
        <div style="font-size: 14.5px; color: #64748B; white-space: nowrap;">14 เม.ย. (2 ข้อยกเว้นในประโยคเดียว)</div>
      </div>
    </div>
    <div class="tip-row" style="background: #ECFDF5; color: #047857;">🎯 จำสูตรนี้ ตอบถูกได้คะแนนเต็ม!</div>
  </div>
</div>
</body></html>"""

# ==============================================================
# STEP 3: TIMELINE KARA ... MADE (4 CARDS)
# ==============================================================
HTML_STEP3_HEADER = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="header-badge" style="background: linear-gradient(90deg, #10B981 0%, #047857 100%); border: 3px solid #A7F3D0;">
  <div class="header-title">⏳ เรื่องที่ 3: Particle ~kara ... ~made</div>
  <div class="header-tag">GRAMMAR 3</div>
</div>
</body></html>"""

HTML_STEP3_CARD1 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-full-1">
  <div class="card-base" style="border: 4px solid #10B981;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div class="card-pill" style="background: #D1FAE5; color: #065F46; margin: 0;">📐 Grammar Formula (โครงสร้างประโยค)</div>
      <div style="font-size: 17px; color: #64748B; font-weight: 700; white-space: nowrap;">บอกช่วงเวลา จาก... ถึง...</div>
    </div>
    <div style="background: #F8FAFC; border: 2px dashed #CBD5E1; border-radius: 16px; padding: 12px 20px; display: flex; align-items: center; justify-content: space-around; font-size: 23px; font-weight: 800; white-space: nowrap;">
      <span style="color: #334155;">[Place] wa</span>
      <span style="color: #0284C7;">[Time 1] <span style="background: #0284C7; color: white; padding: 2px 10px; border-radius: 8px;">kara (ตั้งแต่)</span></span>
      <span style="color: #E11D48;">[Time 2] <span style="background: #E11D48; color: white; padding: 2px 10px; border-radius: 8px;">made (ถึง)</span></span>
      <span style="color: #334155;">desu.</span>
    </div>
  </div>
</div>
</body></html>"""

HTML_STEP3_CARD2 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-full-2">
  <div class="card-base" style="border: 4px solid #0284C7;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <div class="card-pill" style="background: #E0F2FE; color: #0369A1; margin: 0;">🏦 Example: Ginkō (Bank Hours)</div>
      <div style="font-size: 19px; font-weight: 800; color: #0284C7; white-space: nowrap;">เวลาทำการ: 9:00 - 15:00</div>
    </div>
    <div style="position: relative; width: 100%; height: 105px; display: flex; align-items: center; justify-content: space-between; padding: 0 35px; background: #F0F9FF; border-radius: 18px;">
      <div style="text-align: center; white-space: nowrap;">
        <div style="font-size: 23px; font-weight: 900; color: #0369A1;">9:00 (ku-ji)</div>
        <div style="background: #0284C7; color: white; font-weight: 800; font-size: 17px; padding: 3px 12px; border-radius: 10px; margin-top: 3px;">kara (เริ่ม)</div>
      </div>
      <div style="flex: 1; height: 10px; background: linear-gradient(90deg, #0284C7 0%, #E11D48 100%); margin: 0 25px; border-radius: 5px; position: relative;">
        <div style="position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #1E293B; color: white; font-size: 15px; font-weight: 800; padding: 2px 12px; border-radius: 10px; white-space: nowrap;">เปิดทำการต่อเนื่อง ➔</div>
      </div>
      <div style="text-align: center; white-space: nowrap;">
        <div style="font-size: 23px; font-weight: 900; color: #BE123C;">15:00 (san-ji)</div>
        <div style="background: #E11D48; color: white; font-weight: 800; font-size: 17px; padding: 3px 12px; border-radius: 10px; margin-top: 3px;">made (ปิด)</div>
      </div>
    </div>
    <div class="tip-row" style="background: #FEF3C7; color: #92400E; margin-top: 6px;">⚠️ 9 โมงต้องอ่าน ku-ji kara (ไม่ใช่ kyuu-ji!)</div>
  </div>
</div>
</body></html>"""

HTML_STEP3_CARD3 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-full-3">
  <div class="card-base" style="border: 4px solid #8B5CF6;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <div class="card-pill" style="background: #EDE9FE; color: #6D28D9; margin: 0;">💬 Bank Dialogue Q&A</div>
      <div class="saori-pill">🎙️ Saori AI</div>
    </div>
    <div style="display: flex; gap: 18px;">
      <div style="flex: 1; background: #F5F3FF; border-left: 5px solid #8B5CF6; padding: 11px 14px; border-radius: 14px;">
        <div style="font-size: 15px; color: #6D28D9; font-weight: 700;">Q: ถามเวลาเปิด-ปิด</div>
        <div class="romaji-bold" style="font-size: 18px; color: #0F172A; margin: 3px 0; white-space: nowrap;">Ginkō wa nan-ji kara nan-ji made desu ka?</div>
        <div style="font-size: 15px; color: #64748B; white-space: nowrap;">ธนาคารเปิดกี่โมงถึงกี่โมงครับ?</div>
      </div>
      <div style="flex: 1; background: #ECFDF5; border-left: 5px solid #10B981; padding: 11px 14px; border-radius: 14px;">
        <div style="font-size: 15px; color: #047857; font-weight: 700;">A: ตอบช่วงเวลา</div>
        <div class="romaji-bold" style="font-size: 20px; color: #0F172A; margin: 3px 0; white-space: nowrap;"><span style="color:#0284C7;">Ku-ji kara</span> <span style="color:#E11D48;">san-ji made</span> desu.</div>
        <div style="font-size: 15px; color: #64748B; white-space: nowrap;">ตั้งแต่ 9 โมงเช้า ถึงบ่าย 3 โมงครับ</div>
      </div>
    </div>
  </div>
</div>
</body></html>"""

HTML_STEP3_CARD4 = f"""<!DOCTYPE html><html><head>{SHARED_HEAD}</head><body>
<div class="box-full-4">
  <div class="card-base" style="border: 3px dashed #F59E0B; padding: 14px 24px; flex-direction: row; align-items: center; justify-content: space-between; background: #FFFBEB;">
    <div style="display: flex; align-items: center; gap: 12px; white-space: nowrap;">
      <div style="font-size: 28px;">💡</div>
      <div style="font-size: 19px; font-weight: 800; color: #92400E; white-space: nowrap;">Pro-Tip JN1:</div>
      <div style="font-size: 18px; color: #78350F; font-weight: 700; white-space: nowrap;">kara กับ made แยกใช้เดี่ยวๆ ได้!</div>
    </div>
    <div style="background: white; border: 2px solid #FCD34D; padding: 6px 16px; border-radius: 12px; font-size: 18px; font-weight: 800; color: #1E293B; white-space: nowrap;">
      เช่น: <span style="color: #0284C7; font-weight: 900;">Kaigi wa 10-ji kara desu.</span> (ประชุมเริ่ม 10:00)
    </div>
  </div>
</div>
</body></html>"""

def generate_all():
    assets = [
        ("card_warning_sign_romaji.png", HTML_WARN),
        ("step1_header.png", HTML_STEP1_HEADER),
        ("step1_card1.png", HTML_STEP1_CARD1),
        ("step1_card2.png", HTML_STEP1_CARD2),
        ("step1_card3.png", HTML_STEP1_CARD3),
        ("step1_card4.png", HTML_STEP1_CARD4),
        ("step2_header.png", HTML_STEP2_HEADER),
        ("step2_card1.png", HTML_STEP2_CARD1),
        ("step2_card2.png", HTML_STEP2_CARD2),
        ("step2_card3.png", HTML_STEP2_CARD3),
        ("step2_card4.png", HTML_STEP2_CARD4),
        ("step3_header.png", HTML_STEP3_HEADER),
        ("step3_card1.png", HTML_STEP3_CARD1),
        ("step3_card2.png", HTML_STEP3_CARD2),
        ("step3_card3.png", HTML_STEP3_CARD3),
        ("step3_card4.png", HTML_STEP3_CARD4)
    ]
    for fn, html in assets:
        render_html_to_png(html, fn)

if __name__ == "__main__":
    generate_all()
