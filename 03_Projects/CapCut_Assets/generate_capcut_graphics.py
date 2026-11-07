"""
Generator script for 5 high-resolution CapCut visual assets (1080x1920)
Assignment 1 Japanese Grammar Video (JN60101)
"""

import os
import subprocess
import time
from PIL import Image

TARGET_DIR = r"C:\Users\iznamu\OneDrive - Panyapiwat Institute of Management\00_Active_Term\04_JN60101_Japanese-1\03_Projects\CapCut_Assets\images"
TEMP_DIR = os.environ.get("TEMP", r"C:\Users\iznamu\AppData\Local\Temp")
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

os.makedirs(TARGET_DIR, exist_ok=True)

# Shared CSS styles
SHARED_HEAD = """
<meta charset="utf-8">
<meta name="viewport" content="width=1080, height=1920, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800;900&family=Prompt:ital,wght@0,400;0,600;0,700;0,800;0,900&family=Inter:wght@600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }
  body {
    width: 1080px;
    height: 1920px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Prompt', 'M PLUS Rounded 1c', sans-serif;
    user-select: none;
  }
</style>
"""

# ==========================================
# ASSET 1: bg_classroom_chalkboard.png
# ==========================================
HTML_ASSET_1 = f"""<!DOCTYPE html>
<html>
<head>
{SHARED_HEAD}
<style>
  body {{
    background: #112217;
  }}
  .chalkboard-container {{
    position: relative;
    width: 1080px;
    height: 1920px;
    background: #173224;
    overflow: hidden;
  }}

  /* Outer Wood Frame */
  .wood-frame {{
    position: absolute;
    inset: 0;
    border: 44px solid transparent;
    border-image: linear-gradient(135deg, #78350f 0%, #9a3412 25%, #b45309 50%, #7c2d12 75%, #451a03 100%) 44;
    box-shadow: inset 0 0 35px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5);
    z-index: 10;
    pointer-events: none;
  }}
  
  .wood-frame-bevel {{
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    border: 6px solid #2e1065;
    border-color: #3e1f07 #a16207 #a16207 #3e1f07;
    box-shadow: inset 0 0 25px rgba(0,0,0,0.9);
    z-index: 11;
    pointer-events: none;
  }}

  /* Brass Corner Brackets */
  .corner-bracket {{
    position: absolute;
    width: 60px;
    height: 60px;
    z-index: 15;
  }}
  .corner-tl {{ top: 12px; left: 12px; }}
  .corner-tr {{ top: 12px; right: 12px; }}
  .corner-bl {{ bottom: 12px; left: 12px; }}
  .corner-br {{ bottom: 12px; right: 12px; }}

  /* Chalkboard Inner Surface */
  .board-surface {{
    position: absolute;
    top: 44px;
    left: 44px;
    width: 992px;
    height: 1832px;
    background: radial-gradient(circle at 50% 35%, #1f4231 0%, #173325 55%, #0f241a 100%);
    overflow: hidden;
  }}

  /* Grid lines on chalkboard */
  .grid-pattern {{
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px);
    background-size: 64px 64px;
  }}

  /* Chalk Dust smudges and clouds */
  .chalk-dust-1 {{
    position: absolute;
    top: 150px;
    left: 80px;
    width: 650px;
    height: 380px;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.02) 50%, transparent 80%);
    transform: rotate(-5deg);
    filter: blur(15px);
  }}
  .chalk-dust-2 {{
    position: absolute;
    top: 600px;
    right: 60px;
    width: 750px;
    height: 420px;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 60%, transparent 85%);
    transform: rotate(8deg);
    filter: blur(20px);
  }}
  .chalk-dust-3 {{
    position: absolute;
    bottom: 250px;
    left: 120px;
    width: 700px;
    height: 350px;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 50%, transparent 75%);
    filter: blur(18px);
  }}

  /* Horizontal eraser streaks */
  .eraser-streak-1 {{
    position: absolute;
    top: 320px;
    left: 50px;
    right: 50px;
    height: 90px;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.065) 50%, rgba(255,255,255,0.03) 80%, transparent 100%);
    filter: blur(8px);
  }}
  .eraser-streak-2 {{
    position: absolute;
    top: 850px;
    left: 70px;
    right: 70px;
    height: 110px;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.035) 30%, rgba(255,255,255,0.06) 60%, transparent 100%);
    filter: blur(10px);
  }}

  /* Bottom Chalk Ledge / Tray */
  .chalk-tray {{
    position: absolute;
    bottom: 44px;
    left: 44px;
    width: 992px;
    height: 42px;
    background: linear-gradient(180deg, #78350f 0%, #451a03 100%);
    box-shadow: 0 -6px 15px rgba(0,0,0,0.6), inset 0 2px 4px #b45309;
    z-index: 12;
    display: flex;
    align-items: center;
    padding: 0 40px;
  }}

  /* Chalk sticks */
  .chalk-stick {{
    position: absolute;
    bottom: 8px;
    height: 14px;
    border-radius: 4px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.5);
  }}
  .chalk-white {{
    left: 100px;
    width: 65px;
    background: #F8FAFC;
    transform: rotate(2deg);
  }}
  .chalk-yellow {{
    left: 180px;
    width: 50px;
    background: #FDE047;
    transform: rotate(-1deg);
  }}
  .chalk-red {{
    left: 245px;
    width: 40px;
    background: #F87171;
    transform: rotate(3deg);
  }}

  /* Classic Japanese Eraser */
  .eraser {{
    position: absolute;
    right: 90px;
    bottom: 6px;
    width: 110px;
    height: 28px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
  }}
  .eraser-top {{
    height: 12px;
    background: linear-gradient(180deg, #EA580C 0%, #C2410C 100%);
  }}
  .eraser-bottom {{
    height: 16px;
    background: linear-gradient(180deg, #1E3A8A 0%, #172554 100%);
    border-top: 1px solid #0F172A;
  }}
</style>
</head>
<body>
  <div class="chalkboard-container">
    <div class="board-surface">
      <div class="grid-pattern"></div>
      <div class="chalk-dust-1"></div>
      <div class="chalk-dust-2"></div>
      <div class="chalk-dust-3"></div>
      <div class="eraser-streak-1"></div>
      <div class="eraser-streak-2"></div>
    </div>
    
    <div class="wood-frame"></div>
    <div class="wood-frame-bevel"></div>

    <!-- SVG Corner Brackets -->
    <svg class="corner-bracket corner-tl" viewBox="0 0 60 60">
      <path d="M0,0 L60,0 L60,20 L20,20 L20,60 L0,60 Z" fill="#d4af37" stroke="#854d0e" stroke-width="2"/>
      <circle cx="10" cy="10" r="4" fill="#713f12"/>
    </svg>
    <svg class="corner-bracket corner-tr" viewBox="0 0 60 60">
      <path d="M60,0 L0,0 L0,20 L40,20 L40,60 L60,60 Z" fill="#d4af37" stroke="#854d0e" stroke-width="2"/>
      <circle cx="50" cy="10" r="4" fill="#713f12"/>
    </svg>
    <svg class="corner-bracket corner-bl" viewBox="0 0 60 60">
      <path d="M0,60 L60,60 L60,40 L20,40 L20,0 L0,0 Z" fill="#d4af37" stroke="#854d0e" stroke-width="2"/>
      <circle cx="10" cy="50" r="4" fill="#713f12"/>
    </svg>
    <svg class="corner-bracket corner-br" viewBox="0 0 60 60">
      <path d="M60,60 L0,60 L0,40 L40,40 L40,0 L60,0 Z" fill="#d4af37" stroke="#854d0e" stroke-width="2"/>
      <circle cx="50" cy="50" r="4" fill="#713f12"/>
    </svg>

    <!-- Bottom Tray -->
    <div class="chalk-tray">
      <div class="chalk-stick chalk-white"></div>
      <div class="chalk-stick chalk-yellow"></div>
      <div class="chalk-stick chalk-red"></div>
      <div class="eraser">
        <div class="eraser-top"></div>
        <div class="eraser-bottom"></div>
      </div>
    </div>
  </div>
</body>
</html>"""

# ==========================================
# ASSET 2: card_warning_sign.png
# ==========================================
HTML_ASSET_2 = f"""<!DOCTYPE html>
<html>
<head>
{SHARED_HEAD}
<style>
  body {{
    background: transparent;
  }}
  
  .warning-stage {{
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
    pointer-events: none;
  }}

  /* Upper Graphic Region: Y: 100 to 980 */
  .warning-content {{
    position: absolute;
    top: 90px;
    left: 50px;
    width: 980px;
    height: 860px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }}

  /* Ambient Danger Glow */
  .danger-glow {{
    position: absolute;
    width: 780px;
    height: 780px;
    background: radial-gradient(circle, rgba(239, 68, 68, 0.45) 0%, rgba(220, 38, 38, 0.15) 50%, transparent 75%);
    filter: blur(40px);
    z-index: 1;
  }}

  /* Octagon Shield */
  .octagon-shield {{
    position: relative;
    width: 720px;
    height: 720px;
    background: linear-gradient(145deg, #FF1E44 0%, #DC2626 50%, #991B1B 100%);
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.65);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 5;
    padding: 30px;
  }}

  /* Inner White Bevel Octagon */
  .octagon-inner {{
    position: absolute;
    inset: 18px;
    background: linear-gradient(145deg, #E11D48 0%, #B91C1C 60%, #881337 100%);
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    border: 8px solid #FFFFFF;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }}

  /* Danger Stripes Ribbon */
  .hazard-bar {{
    position: absolute;
    width: 100%;
    height: 24px;
    background: repeating-linear-gradient(
      -45deg,
      #FACC15,
      #FACC15 16px,
      #000000 16px,
      #000000 32px
    );
    opacity: 0.9;
  }}
  .hazard-top {{ top: 40px; }}
  .hazard-bottom {{ bottom: 40px; }}

  /* Exclamation Icon Circle */
  .alert-circle {{
    width: 95px;
    height: 95px;
    background: #FFFFFF;
    border-radius: 50%;
    box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 62px;
    font-weight: 900;
    color: #DC2626;
    margin-bottom: 8px;
    border: 4px solid #FDE047;
  }}

  /* Big 3D Extruded Text */
  .text-3d-hold-on {{
    font-size: 104px;
    font-weight: 900;
    font-family: 'Prompt', sans-serif;
    color: #FFF000;
    background: linear-gradient(180deg, #FFFFFF 0%, #FFEF5C 30%, #F59E0B 80%, #D97706 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 0 #B45309)
            drop-shadow(0 8px 0 #92400E)
            drop-shadow(0 12px 0 #78350F)
            drop-shadow(0 16px 20px rgba(0,0,0,0.85));
    letter-spacing: -2px;
    line-height: 1.1;
    margin-bottom: 6px;
    text-align: center;
  }}

  .text-sub-japanese {{
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-size: 38px;
    font-weight: 900;
    color: #FFFFFF;
    letter-spacing: 3px;
    text-shadow: 0 4px 10px rgba(0,0,0,0.6);
    background: rgba(0, 0, 0, 0.45);
    padding: 6px 28px;
    border-radius: 9999px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    margin-bottom: 12px;
  }}

  /* Subtitle Alert Pill */
  .alert-pill {{
    background: #FFFFFF;
    border: 4px solid #FDE047;
    border-radius: 9999px;
    padding: 10px 32px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
    margin-top: 6px;
  }}
  .alert-pill span {{
    font-size: 25px;
    font-weight: 800;
    color: #B91C1C;
    letter-spacing: 0.5px;
  }}
  .alert-pill .icon {{
    font-size: 28px;
  }}
</style>
</head>
<body>
  <div class="warning-stage">
    <div class="warning-content">
      <div class="danger-glow"></div>
      
      <div class="octagon-shield">
        <div class="octagon-inner">
          <div class="hazard-bar hazard-top"></div>
          
          <div class="alert-circle">!</div>
          <div class="text-3d-hold-on">เดี๋ยวก่อน!</div>
          <div class="text-sub-japanese">ちょっと待って！</div>
          
          <div class="alert-pill">
            <span class="icon">⚠️</span>
            <span>จุดอันตรายที่คนไทยชอบพูดผิดบ่อยที่สุด!</span>
          </div>

          <div class="hazard-bar hazard-bottom"></div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>"""

# ==========================================
# ASSET 3: card_step1_time_2x2.png
# ==========================================
HTML_ASSET_3 = f"""<!DOCTYPE html>
<html>
<head>
{SHARED_HEAD}
<style>
  body {{
    background: transparent;
  }}

  .stage {{
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
    pointer-events: none;
  }}

  .content-container {{
    position: absolute;
    top: 50px;
    left: 40px;
    width: 1000px;
    height: 980px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }}

  /* Top Header Pill */
  .header-pill {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #E11D48 0%, #EA580C 100%);
    border: 4px solid #FFFFFF;
    border-radius: 9999px;
    padding: 12px 26px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
  }}
  .header-left {{
    display: flex;
    align-items: center;
    gap: 14px;
  }}
  .header-icon {{
    width: 48px;
    height: 48px;
    background: #FFFFFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }}
  .header-title {{
    font-size: 31px;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }}
  .header-badge {{
    background: #FACC15;
    color: #78350F;
    font-weight: 900;
    font-size: 19px;
    padding: 5px 16px;
    border-radius: 9999px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }}

  /* 2x2 Grid Layout */
  .grid-2x2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 16px;
    width: 1000px;
    height: 890px;
  }}

  /* Common Card Styling */
  .grid-card {{
    background: rgba(255, 255, 255, 0.98);
    border-radius: 26px;
    padding: 18px 22px;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }}

  /* Card 1: Normal Rule (Green Theme) */
  .card-rule {{
    border: 4px solid #10B981;
  }}
  .card-rule .card-header {{
    background: #ECFDF5;
    color: #065F46;
    border: 2px solid #A7F3D0;
  }}

  /* Card 2: Hour Exceptions (Red Theme) */
  .card-hour-ex {{
    border: 4px solid #EF4444;
  }}
  .card-hour-ex .card-header {{
    background: #FEF2F2;
    color: #991B1B;
    border: 2px solid #FECACA;
  }}

  /* Card 3: Minute Exceptions (Rose/Orange Theme) */
  .card-min-ex {{
    border: 4px solid #F97316;
  }}
  .card-min-ex .card-header {{
    background: #FFF7ED;
    color: #9A3412;
    border: 2px solid #FFEDD5;
  }}

  /* Card 4: Dialogue / Clock (Amber/Navy Theme) */
  .card-dialogue {{
    border: 4px solid #F59E0B;
  }}
  .card-dialogue .card-header {{
    background: #FFFBEB;
    color: #92400E;
    border: 2px solid #FDE68A;
  }}

  /* Card Header Pill */
  .card-header {{
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 19px;
    font-weight: 800;
    width: fit-content;
    margin-bottom: 10px;
  }}

  /* Content inside cards */
  .rule-row {{
    display: flex;
    align-items: center;
    gap: 10px;
    background: #F8FAFC;
    border-radius: 14px;
    padding: 8px 12px;
    margin-bottom: 8px;
    border: 1px solid #E2E8F0;
  }}
  .rule-label {{
    font-size: 17px;
    font-weight: 700;
    color: #475569;
    min-width: 65px;
  }}
  .rule-math {{
    font-size: 19px;
    font-weight: 800;
    color: #0F172A;
  }}
  .highlight-green {{
    color: #059669;
    font-weight: 900;
  }}

  /* Exception rows */
  .ex-item {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FEF2F2;
    border-radius: 12px;
    padding: 6px 12px;
    margin-bottom: 5px;
    border: 1px solid #FEE2E2;
  }}
  .ex-wrong {{
    font-size: 16px;
    font-weight: 700;
    color: #DC2626;
    text-decoration: line-through;
  }}
  .ex-arrow {{
    font-size: 15px;
    color: #64748B;
    font-weight: 900;
  }}
  .ex-right {{
    font-size: 19px;
    font-weight: 900;
    color: #15803D;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }}
  .ex-right span {{
    font-size: 14px;
    color: #166534;
    font-family: 'Prompt', sans-serif;
  }}

  /* Minute tags */
  .min-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-bottom: 6px;
  }}
  .min-tag {{
    background: #FFF7ED;
    border: 1px solid #FFEDD5;
    border-radius: 10px;
    padding: 5px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }}
  .min-num {{
    font-weight: 800;
    font-size: 16px;
    color: #C2410C;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }}
  .min-sound {{
    font-weight: 800;
    font-size: 15px;
    color: #0F172A;
  }}

  .tip-pill {{
    background: #FEF3C7;
    border: 1px solid #FDE68A;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 800;
    color: #92400E;
    text-align: center;
  }}

  /* Dialogue Box */
  .dialogue-q {{
    background: #EFF6FF;
    border-left: 4px solid #3B82F6;
    border-radius: 0 12px 12px 0;
    padding: 8px 12px;
    margin-bottom: 8px;
  }}
  .dialogue-a {{
    background: #ECFDF5;
    border-left: 4px solid #10B981;
    border-radius: 0 12px 12px 0;
    padding: 8px 12px;
    margin-bottom: 8px;
  }}
  .d-role {{
    font-size: 13px;
    font-weight: 800;
    color: #64748B;
  }}
  .d-jp {{
    font-size: 19px;
    font-weight: 900;
    color: #0F172A;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }}
  .d-th {{
    font-size: 14px;
    font-weight: 600;
    color: #475569;
  }}
  .clock-badge {{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #FEF3C7;
    border: 2px dashed #F59E0B;
    border-radius: 12px;
    padding: 6px;
    font-weight: 800;
    font-size: 16px;
    color: #92400E;
  }}
</style>
</head>
<body>
  <div class="stage">
    <div class="content-container">
      
      <!-- Top Header -->
      <div class="header-pill">
        <div class="header-left">
          <div class="header-icon">⏰</div>
          <div class="header-title">STEP 1: การบอกเวลา (โมง & นาที) 〜時・〜分</div>
        </div>
        <div class="header-badge">ไวยากรณ์หลัก</div>
      </div>

      <!-- 2x2 Grid -->
      <div class="grid-2x2">
        
        <!-- Box 1: Normal Rules -->
        <div class="grid-card card-rule">
          <div>
            <div class="card-header">
              <span>✅</span> กฎปกติ (Regular Rules)
            </div>
            <div class="rule-row">
              <span class="rule-label">ชั่วโมง</span>
              <span class="rule-math">เลข 1-12 + <span class="highlight-green">時 (ji)</span></span>
            </div>
            <div class="rule-row">
              <span class="rule-label">นาที</span>
              <span class="rule-math">เลข 1-59 + <span class="highlight-green">分 (fun)</span></span>
            </div>
          </div>
          <div class="tip-pill">
            💡 เช่น: 1時 (ichi-ji), 5分 (go-fun)
          </div>
        </div>

        <!-- Box 2: Hour Exceptions -->
        <div class="grid-card card-hour-ex">
          <div>
            <div class="card-header">
              <span>❌</span> 3 ชั่วโมงยกเว้น (ห้ามพลาด!)
            </div>
            <div class="ex-item">
              <span class="ex-wrong">4 ❌ yon-ji</span>
              <span class="ex-arrow">➔</span>
              <span class="ex-right">4時 <span>(yo-ji)</span></span>
            </div>
            <div class="ex-item">
              <span class="ex-wrong">7 ❌ nana-ji</span>
              <span class="ex-arrow">➔</span>
              <span class="ex-right">7時 <span>(shichi-ji)</span></span>
            </div>
            <div class="ex-item">
              <span class="ex-wrong">9 ❌ kyuu-ji</span>
              <span class="ex-arrow">➔</span>
              <span class="ex-right">9時 <span>(ku-ji)</span></span>
            </div>
          </div>
          <div class="tip-pill" style="background:#FEE2E2; color:#991B1B; border-color:#FECACA;">
            ⚠️ ห้าม yon-ji / nana-ji / kyuu-ji เด็ดขาด!
          </div>
        </div>

        <!-- Box 3: Minute Exceptions -->
        <div class="grid-card card-min-ex">
          <div>
            <div class="card-header">
              <span>❌</span> นาทีเสียงกัก: ห้าม ichi/roku-fun
            </div>
            <div class="min-grid">
              <div class="min-tag">
                <span class="min-num">1分</span>
                <span class="min-sound">ip-pun</span>
              </div>
              <div class="min-tag">
                <span class="min-num">6分</span>
                <span class="min-sound">rop-pun</span>
              </div>
              <div class="min-tag">
                <span class="min-num">10分</span>
                <span class="min-sound">jup-pun</span>
              </div>
              <div class="min-tag">
                <span class="min-num">30分</span>
                <span class="min-sound">han (半)</span>
              </div>
            </div>
          </div>
          <div class="tip-pill" style="background:#FFF7ED; color:#C2410C; border-color:#FFEDD5;">
            💡 1, 6, 10 อ่านลงท้าย -pun! (半 = ครึ่ง)
          </div>
        </div>

        <!-- Box 4: Example Dialogue -->
        <div class="grid-card card-dialogue">
          <div>
            <div class="card-header">
              <span>💡</span> นาฬิกาตัวอย่าง & บทสนทนา
            </div>
            <div class="dialogue-q">
              <div class="d-role">Q: 今、何時ですか。</div>
              <div class="d-th">(Ima, nan-ji desu ka? - ตอนนี้กี่โมง?)</div>
            </div>
            <div class="dialogue-a">
              <div class="d-role">A: 4時半です。</div>
              <div class="d-th">(Yo-ji han desu. - 4 โมงครึ่งครับ)</div>
            </div>
          </div>
          <div class="clock-badge">
            <span>🕒</span> 4:30 = yo-ji han (ห้าม ❌ yon-ji)
          </div>
        </div>

      </div>

    </div>
  </div>
</body>
</html>"""

# ==========================================
# ASSET 4: card_step2_date_2x2.png
# ==========================================
HTML_ASSET_4 = f"""<!DOCTYPE html>
<html>
<head>
{SHARED_HEAD}
<style>
  body {{
    background: transparent;
  }}

  .stage {{
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
    pointer-events: none;
  }}

  .content-container {{
    position: absolute;
    top: 50px;
    left: 40px;
    width: 1000px;
    height: 980px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }}

  /* Top Header Pill */
  .header-pill {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #0284C7 0%, #2563EB 50%, #4F46E5 100%);
    border: 4px solid #FFFFFF;
    border-radius: 9999px;
    padding: 12px 26px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
  }}
  .header-left {{
    display: flex;
    align-items: center;
    gap: 14px;
  }}
  .header-icon {{
    width: 48px;
    height: 48px;
    background: #FFFFFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }}
  .header-title {{
    font-size: 30px;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }}
  .header-badge {{
    background: #FACC15;
    color: #78350F;
    font-weight: 900;
    font-size: 19px;
    padding: 5px 16px;
    border-radius: 9999px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }}

  /* 2x2 Grid Layout */
  .grid-2x2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 16px;
    width: 1000px;
    height: 890px;
  }}

  /* Common Card Styling */
  .grid-card {{
    background: rgba(255, 255, 255, 0.98);
    border-radius: 26px;
    padding: 18px 22px;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }}

  /* Card 1: Japanese Order (Blue Theme) */
  .card-order {{
    border: 4px solid #0284C7;
  }}
  .card-order .card-header {{
    background: #F0F9FF;
    color: #0369A1;
    border: 2px solid #BAE6FD;
  }}

  /* Card 2: Month Exceptions (Red/Coral Theme) */
  .card-month-ex {{
    border: 4px solid #EF4444;
  }}
  .card-month-ex .card-header {{
    background: #FEF2F2;
    color: #991B1B;
    border: 2px solid #FECACA;
  }}

  /* Card 3: Special Days (Orange/Amber Theme) */
  .card-day-ex {{
    border: 4px solid #F97316;
  }}
  .card-day-ex .card-header {{
    background: #FFF7ED;
    color: #9A3412;
    border: 2px solid #FFEDD5;
  }}

  /* Card 4: Birthday Example (Emerald Theme) */
  .card-bday {{
    border: 4px solid #10B981;
  }}
  .card-bday .card-header {{
    background: #ECFDF5;
    color: #065F46;
    border: 2px solid #A7F3D0;
  }}

  /* Card Header Pill */
  .card-header {{
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 19px;
    font-weight: 800;
    width: fit-content;
    margin-bottom: 10px;
  }}

  /* Order sequence styling */
  .seq-container {{
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 6px;
  }}
  .seq-item {{
    display: flex;
    align-items: center;
    background: #F8FAFC;
    border-radius: 12px;
    padding: 6px 12px;
    border: 1px solid #E2E8F0;
    gap: 10px;
  }}
  .seq-num {{
    width: 24px;
    height: 24px;
    background: #0284C7;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
  }}
  .seq-text {{
    font-size: 17px;
    font-weight: 800;
    color: #0F172A;
  }}
  .seq-text span {{
    font-weight: 600;
    font-size: 14px;
    color: #64748B;
  }}

  /* Month exception rows */
  .month-item {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FEF2F2;
    border-radius: 12px;
    padding: 6px 12px;
    margin-bottom: 5px;
    border: 1px solid #FEE2E2;
  }}
  .m-wrong {{
    font-size: 15px;
    font-weight: 700;
    color: #DC2626;
    text-decoration: line-through;
  }}
  .m-arrow {{
    font-size: 15px;
    color: #64748B;
    font-weight: 900;
  }}
  .m-right {{
    font-size: 19px;
    font-weight: 900;
    color: #15803D;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }}
  .m-right span {{
    font-size: 14px;
    color: #166534;
    font-family: 'Prompt', sans-serif;
  }}

  /* Special day list */
  .day-list {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-bottom: 6px;
  }}
  .day-tag {{
    background: #FFF7ED;
    border: 1px solid #FFEDD5;
    border-radius: 10px;
    padding: 6px 8px;
    display: flex;
    flex-direction: column;
  }}
  .day-num {{
    font-weight: 900;
    font-size: 18px;
    color: #C2410C;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }}
  .day-read {{
    font-weight: 700;
    font-size: 13px;
    color: #0F172A;
  }}

  /* Birthday dialogue */
  .bday-q {{
    background: #EFF6FF;
    border-left: 4px solid #3B82F6;
    border-radius: 0 12px 12px 0;
    padding: 8px 12px;
    margin-bottom: 8px;
  }}
  .bday-a {{
    background: #ECFDF5;
    border-left: 4px solid #10B981;
    border-radius: 0 12px 12px 0;
    padding: 8px 12px;
    margin-bottom: 8px;
  }}
  .b-role {{
    font-size: 13px;
    font-weight: 800;
    color: #64748B;
  }}
  .b-jp {{
    font-size: 19px;
    font-weight: 900;
    color: #0F172A;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }}
  .b-th {{
    font-size: 14px;
    font-weight: 600;
    color: #475569;
  }}
  .bday-badge {{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #ECFDF5;
    border: 2px dashed #10B981;
    border-radius: 12px;
    padding: 6px;
    font-weight: 800;
    font-size: 15px;
    color: #065F46;
  }}

  .tip-pill {{
    background: #FEF3C7;
    border: 1px solid #FDE68A;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 800;
    color: #92400E;
    text-align: center;
  }}
</style>
</head>
<body>
  <div class="stage">
    <div class="content-container">
      
      <!-- Top Header -->
      <div class="header-pill">
        <div class="header-left">
          <div class="header-icon">🗓️</div>
          <div class="header-title">STEP 2: วัน วันที่ เดือน ปี 〜年・〜月・〜日・〜曜日</div>
        </div>
        <div class="header-badge">ลำดับ & วันพิเศษ</div>
      </div>

      <!-- 2x2 Grid -->
      <div class="grid-2x2">
        
        <!-- Box 1: Sequence Order -->
        <div class="grid-card card-order">
          <div>
            <div class="card-header">
              <span>🗓️</span> ลำดับญี่ปุ่น (ใหญ่ ➔ เล็ก)
            </div>
            <div class="seq-container">
              <div class="seq-item">
                <div class="seq-num">1</div>
                <div class="seq-text">ปี (nen) ➔ <span>2026年</span></div>
              </div>
              <div class="seq-item">
                <div class="seq-num">2</div>
                <div class="seq-text">เดือน (gatsu) ➔ <span>10月</span></div>
              </div>
              <div class="seq-item">
                <div class="seq-num">3</div>
                <div class="seq-text">วันที่ (nichi) ➔ วัน (yōbi)</div>
              </div>
            </div>
          </div>
          <div class="tip-pill" style="background:#F0F9FF; color:#0369A1; border-color:#BAE6FD;">
            💡 2026年 10月 28日 (水) พุธ 28 ต.ค.
          </div>
        </div>

        <!-- Box 2: Month Exceptions -->
        <div class="grid-card card-month-ex">
          <div>
            <div class="card-header">
              <span>❌</span> 3 เดือนยกเว้น (ห้าม yon/nana/kyuu)
            </div>
            <div class="month-item">
              <span class="m-wrong">4月 ❌ yon</span>
              <span class="m-arrow">➔</span>
              <span class="m-right">4月 <span>(shi-gatsu)</span></span>
            </div>
            <div class="month-item">
              <span class="m-wrong">7月 ❌ nana</span>
              <span class="m-arrow">➔</span>
              <span class="m-right">7月 <span>(shichi-gatsu)</span></span>
            </div>
            <div class="month-item">
              <span class="m-wrong">9月 ❌ kyuu</span>
              <span class="m-arrow">➔</span>
              <span class="m-right">9月 <span>(ku-gatsu)</span></span>
            </div>
          </div>
          <div class="tip-pill" style="background:#FEE2E2; color:#991B1B; border-color:#FECACA;">
            ⚠️ จำ: "ชิ - ชิจิ - คุ" ห้ามอ่านเลขปกติ!
          </div>
        </div>

        <!-- Box 3: Special Days -->
        <div class="grid-card card-day-ex">
          <div>
            <div class="card-header">
              <span>❌</span> วันที่พิเศษ: 1, 14, 20, 24
            </div>
            <div class="day-list">
              <div class="day-tag">
                <span class="day-num">1日</span>
                <span class="day-read">tsuitachi (สึอิตะจิ)</span>
              </div>
              <div class="day-tag">
                <span class="day-num">14日</span>
                <span class="day-read">jū yok-ka (จูย๊กกะ)</span>
              </div>
              <div class="day-tag">
                <span class="day-num">20日</span>
                <span class="day-read">hatsuka (ฮะสึกะ)</span>
              </div>
              <div class="day-tag">
                <span class="day-num">24日</span>
                <span class="day-read">ni-jū yok-ka</span>
              </div>
            </div>
          </div>
          <div class="tip-pill" style="background:#FFF7ED; color:#C2410C; border-color:#FFEDD5;">
            💡 4日 yokka (ย๊กกะ) vs 8日 yōka (โยกะ)
          </div>
        </div>

        <!-- Box 4: Birthday Example -->
        <div class="grid-card card-bday">
          <div>
            <div class="card-header">
              <span>🎂</span> ตัวอย่างถามวันเกิด (4月14日)
            </div>
            <div class="bday-q">
              <div class="b-role">Q: お誕生日はいつですか。</div>
              <div class="b-th">(Otanjōbi wa itsu desu ka?)</div>
            </div>
            <div class="bday-a">
              <div class="b-role">A: 4月14日です。</div>
              <div class="b-th">(Shi-gatsu jū yok-ka desu.)</div>
            </div>
          </div>
          <div class="bday-badge">
            <span>🎉</span> 4月 (shi-gatsu) + 14日 (jū yok-ka)
          </div>
        </div>

      </div>

    </div>
  </div>
</body>
</html>"""

# ==========================================
# ASSET 5: card_step3_timeline.png
# ==========================================
HTML_ASSET_5 = f"""<!DOCTYPE html>
<html>
<head>
{SHARED_HEAD}
<style>
  body {{
    background: transparent;
  }}

  .stage {{
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
    pointer-events: none;
  }}

  .content-container {{
    position: absolute;
    top: 50px;
    left: 40px;
    width: 1000px;
    height: 1000px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }}

  /* Top Header Pill */
  .header-pill {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #059669 0%, #10B981 50%, #0D9488 100%);
    border: 4px solid #FFFFFF;
    border-radius: 9999px;
    padding: 12px 26px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
  }}
  .header-left {{
    display: flex;
    align-items: center;
    gap: 14px;
  }}
  .header-icon {{
    width: 48px;
    height: 48px;
    background: #FFFFFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }}
  .header-title {{
    font-size: 30px;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }}
  .header-badge {{
    background: #FACC15;
    color: #78350F;
    font-weight: 900;
    font-size: 19px;
    padding: 5px 16px;
    border-radius: 9999px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }}

  /* Formula Card */
  .formula-card {{
    background: rgba(255, 255, 255, 0.98);
    border: 4px solid #10B981;
    border-radius: 24px;
    padding: 18px 24px;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }}
  .formula-header {{
    font-size: 18px;
    font-weight: 800;
    color: #059669;
    display: flex;
    align-items: center;
    gap: 8px;
  }}
  .formula-box {{
    background: #F0FDF4;
    border: 2px dashed #86EFAC;
    border-radius: 16px;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 24px;
    font-weight: 900;
  }}
  .f-slot {{
    background: #FFFFFF;
    padding: 4px 12px;
    border-radius: 8px;
    border: 1px solid #CBD5E1;
    color: #1E293B;
  }}
  .f-kara {{
    background: #10B981;
    color: white;
    padding: 4px 14px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
  }}
  .f-made {{
    background: #E11D48;
    color: white;
    padding: 4px 14px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(225, 29, 72, 0.3);
  }}
  .f-particle {{
    color: #64748B;
  }}

  /* Vector Timeline Card */
  .timeline-card {{
    background: rgba(255, 255, 255, 0.98);
    border: 4px solid #3B82F6;
    border-radius: 24px;
    padding: 22px 28px;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22);
    display: flex;
    flex-direction: column;
    gap: 18px;
  }}
  .timeline-target {{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }}
  .target-badge {{
    display: flex;
    align-items: center;
    gap: 10px;
    background: #EFF6FF;
    border: 2px solid #BFDBFE;
    border-radius: 9999px;
    padding: 6px 18px;
  }}
  .target-name {{
    font-size: 24px;
    font-weight: 900;
    color: #1D4ED8;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }}
  .target-sub {{
    font-size: 16px;
    font-weight: 700;
    color: #475569;
  }}

  /* Timeline Graphic Bar */
  .timeline-graphic {{
    position: relative;
    width: 100%;
    height: 95px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }}
  .timeline-track {{
    position: absolute;
    left: 80px;
    right: 80px;
    height: 12px;
    background: linear-gradient(90deg, #10B981 0%, #3B82F6 50%, #E11D48 100%);
    border-radius: 9999px;
    box-shadow: 0 0 14px rgba(59, 130, 246, 0.5);
  }}
  .timeline-pin {{
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }}
  .pin-badge {{
    padding: 8px 18px;
    border-radius: 14px;
    color: white;
    font-weight: 900;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
  }}
  .pin-start {{
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    border: 3px solid #FFFFFF;
  }}
  .pin-end {{
    background: linear-gradient(135deg, #E11D48 0%, #BE123C 100%);
    border: 3px solid #FFFFFF;
  }}
  .pin-time {{
    font-size: 26px;
    line-height: 1.1;
  }}
  .pin-reading {{
    font-size: 14px;
    font-weight: 700;
    opacity: 0.95;
  }}
  .pin-particle {{
    font-size: 15px;
    background: rgba(255,255,255,0.25);
    padding: 2px 10px;
    border-radius: 9999px;
    margin-top: 4px;
  }}

  /* Dialogue Card */
  .dialogue-card {{
    background: rgba(255, 255, 255, 0.98);
    border: 4px solid #F59E0B;
    border-radius: 24px;
    padding: 18px 24px;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }}
  .dialogue-row {{
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 8px 14px;
    border-radius: 14px;
  }}
  .row-q {{
    background: #EFF6FF;
    border-left: 4px solid #3B82F6;
  }}
  .row-a {{
    background: #ECFDF5;
    border-left: 4px solid #10B981;
  }}
  .tag-role {{
    font-weight: 900;
    font-size: 16px;
    padding: 4px 10px;
    border-radius: 8px;
    color: white;
  }}
  .role-q {{ background: #3B82F6; }}
  .role-a {{ background: #10B981; }}
  .text-jp {{
    font-size: 22px;
    font-weight: 900;
    color: #0F172A;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }}
  .text-th {{
    font-size: 15px;
    font-weight: 600;
    color: #475569;
  }}

  /* Pro-Tip Pill */
  .protip-card {{
    background: #FFFBEB;
    border: 3px dashed #F59E0B;
    border-radius: 20px;
    padding: 14px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.15);
  }}
  .protip-left {{
    display: flex;
    align-items: center;
    gap: 12px;
  }}
  .protip-icon {{
    font-size: 26px;
  }}
  .protip-text {{
    font-size: 17px;
    font-weight: 800;
    color: #92400E;
  }}
  .protip-example {{
    background: #FFFFFF;
    border: 1px solid #FDE68A;
    border-radius: 12px;
    padding: 6px 14px;
    font-weight: 900;
    font-size: 18px;
    color: #1E293B;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }}
  .protip-example span {{
    font-family: 'Prompt', sans-serif;
    font-size: 14px;
    color: #059669;
    font-weight: 700;
  }}
</style>
</head>
<body>
  <div class="stage">
    <div class="content-container">
      
      <!-- Top Header -->
      <div class="header-pill">
        <div class="header-left">
          <div class="header-icon">⏳</div>
          <div class="header-title">STEP 3: คำช่วย 〜から・・・〜まで (~kara ... ~made)</div>
        </div>
        <div class="header-badge">ช่วงเวลา</div>
      </div>

      <!-- 1. Grammar Formula Card -->
      <div class="formula-card">
        <div class="formula-header">
          <span>📐</span> โครงสร้างประโยคบอกช่วงเวลา (จาก...ถึง...)
        </div>
        <div class="formula-box">
          <div class="f-slot">[สถานที่/เหตุการณ์]</div>
          <div class="f-particle">は</div>
          <div class="f-slot">[เวลาเริ่ม]</div>
          <div class="f-kara">から (จาก)</div>
          <div class="f-slot">[เวลาจบ]</div>
          <div class="f-made">まで (ถึง)</div>
          <div class="f-particle">です。</div>
        </div>
      </div>

      <!-- 2. Vector Timeline Card -->
      <div class="timeline-card">
        <div class="timeline-target">
          <div class="target-badge">
            <span style="font-size: 22px;">🏦</span>
            <span class="target-name">銀行 (Ginkō)</span>
            <span class="target-sub">ธนาคาร</span>
          </div>
          <div style="font-size: 16px; font-weight: 800; color: #64748B;">
            เวลาทำการ: 9:00 - 15:00
          </div>
        </div>

        <!-- Visual Timeline -->
        <div class="timeline-graphic">
          <div class="timeline-track"></div>

          <!-- Start Pin -->
          <div class="timeline-pin">
            <div class="pin-badge pin-start">
              <span class="pin-time">9:00</span>
              <span class="pin-reading">くじ (ku-ji)</span>
              <span class="pin-particle">から (เริ่ม)</span>
            </div>
          </div>

          <!-- Laser Arrow Middle -->
          <div style="z-index: 5; background: #FFFFFF; border: 2px solid #3B82F6; border-radius: 9999px; padding: 4px 16px; font-weight: 900; font-size: 15px; color: #1D4ED8; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
            ➔ ดำเนินต่อเนื่อง ➔
          </div>

          <!-- End Pin -->
          <div class="timeline-pin">
            <div class="pin-badge pin-end">
              <span class="pin-time">15:00 (3:00)</span>
              <span class="pin-reading">さんじ (san-ji)</span>
              <span class="pin-particle">まで (ถึง)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Example Dialogue Card -->
      <div class="dialogue-card">
        <div class="dialogue-row row-q">
          <span class="tag-role role-q">Q</span>
          <div>
            <div class="text-jp">銀行は何時から何時までですか。</div>
            <div class="text-th">(Ginkō wa nan-ji kara nan-ji made desu ka? - ธนาคารเปิดกี่โมงถึงกี่โมง?)</div>
          </div>
        </div>
        <div class="dialogue-row row-a">
          <span class="tag-role role-a">A</span>
          <div>
            <div class="text-jp">9時から3時までです。</div>
            <div class="text-th">(Ku-ji kara san-ji made desu. - เปิด 9 โมงถึงบ่าย 3 โมงครับ)</div>
          </div>
        </div>
      </div>

      <!-- 4. Pro-Tip Card -->
      <div class="protip-card">
        <div class="protip-left">
          <span class="protip-icon">💡</span>
          <div class="protip-text">
            Pro-Tip: แยกใช้เดี่ยวได้ ไม่จำเป็นต้องมาคู่กันเสมอไป!
          </div>
        </div>
        <div class="protip-example">
          会議は 10時からです。 <span>(เริ่ม 10 โมง)</span>
        </div>
      </div>

    </div>
  </div>
</body>
</html>"""

ASSETS = [
    ("bg_classroom_chalkboard.png", HTML_ASSET_1, False),
    ("card_warning_sign.png", HTML_ASSET_2, True),
    ("card_step1_time_2x2.png", HTML_ASSET_3, True),
    ("card_step2_date_2x2.png", HTML_ASSET_4, True),
    ("card_step3_timeline.png", HTML_ASSET_5, True),
]

def render_asset(filename, html_content, expect_transparent=True):
    print(f"\n--- Generating {filename} ---")
    temp_html = os.path.join(TEMP_DIR, f"temp_{filename}.html")
    out_png = os.path.join(TARGET_DIR, filename)

    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(html_content)

    bg_color = "00000000" if expect_transparent else "ff112217"

    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--window-size=1080,1920",
        f"--default-background-color={bg_color}",
        "--virtual-time-budget=4000",
        f"--screenshot={out_png}",
        f"file:///{temp_html.replace(os.sep, '/')}"
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if not os.path.exists(out_png):
        print(f"Error creating {filename}: {res.stderr}")
        return False

    img = Image.open(out_png)
    print(f"File created: {out_png}")
    print(f"  Dimensions: {img.size}")
    print(f"  Mode: {img.mode}")
    print(f"  Bounding Box: {img.getbbox()}")

    if expect_transparent and img.mode == "RGBA":
        alpha = img.split()[-1]
        bbox = alpha.getbbox()
        print(f"  Alpha Bounding Box: {bbox}")
        # Verify lower half is completely clear (Y > 1100)
        lower_crop = alpha.crop((0, 1100, 1080, 1920))
        lower_bbox = lower_crop.getbbox()
        if lower_bbox is None:
            print("  [VERIFIED] Lower half (Y: 1100-1920) is 100% transparent!")
        else:
            print(f"  [WARNING] Lower half has non-transparent pixels: {lower_bbox}")

    return True

def main():
    start_time = time.time()
    results = {}
    for filename, html, transparent in ASSETS:
        success = render_asset(filename, html, transparent)
        results[filename] = success

    elapsed = time.time() - start_time
    print(f"\nCompleted in {elapsed:.2f} seconds.")
    print("Summary:")
    all_ok = True
    for fn, ok in results.items():
        status = "SUCCESS" if ok else "FAILED"
        print(f" - {fn}: {status}")
        if not ok:
            all_ok = False

    return all_ok

if __name__ == "__main__":
    main()
