# Design Specification: Japanese 1 (JN60101) Assignment 1 Grammar Video Automation
**Topic 4:** Telling Time (Hours & Minutes), Date Expressions (Day, Date, Month, Year), and Particle `...kara ...made`  
**Date:** 2026-10-28  
**Author:** Antigravity Agent & User  
**Status:** Approved  

---

## 1. Intent & The Why

### 1.1 Intent
Create a high-impact, professional micro-learning educational video (1–2 minutes, vertical 9:16) for JN60101 Assignment 1 covering Topic 4. The video must strictly satisfy the course rubric (10 points: Content Accuracy 3, Pronunciation 3, Media & Examples 2, Punctuality 2) while adopting an engaging TikTok/Reels-style aesthetic referenced in `SaveClip.App_AQPRm_...mp4`.

### 1.2 The Why & Technical Modernization
Rather than hand-crafting static slide decks in Canva and manually piecing together video layers in CapCut, this design formalizes an end-to-end automated pipeline combining:
1. **Hyperframes:** Code-driven web motion graphics (HTML/CSS/SVG/GSAP) for responsive, mathematical, animated grammar cards (spinning clock face, dynamic calendar, and timeline transitions).
2. **CapCut MCP & VectCutAPI:** Programmatic timeline orchestration placing speaker footage, transparent Hyperframes overlays, mascot reactions, kinetic subtitles, and sound effects directly into a local CapCut Desktop draft ready for instant review and export.

---

## 2. Goals, Non-Goals, and Anti-Goals

### 2.1 Goals
- **Full Rubric Compliance:** Clearly explain (1) ~ji / ~fun with exception numbers, (2) Year/Month/Date ordering with special day readings, and (3) `[Place] wa [Time] kara [Time] made desu`.
- **Reference Aesthetic Parity:**
  - Vertical 9:16 format (1080x1920).
  - Presenter auto-cutout with white stroke in the bottom-left corner.
  - 3D/Anime companion mascot in the bottom-right corner.
  - Dynamic kinetic cards and topic banners in the upper screen area.
  - Kinetic typography / captions in the center.
- **Reproducible Pipeline:** Programmatic assets built in Hyperframes and automatically stitched via CapCut MCP draft generation script.

### 2.2 Non-Goals
- Automated cloud rendering/uploading to university e-learning without human QA. The final draft is saved to CapCut Desktop so the student can verify, practice pronunciation, record camera footage, and press export.
- Complex 3D character rigging. The companion mascot will use animated sprite sequences, CSS/SVG keyframes, or animated stickers.

### 2.3 Anti-Goals
- **Cluttered Overcrowded Screen:** Never obscure the presenter's face or grammar text with oversized decorative items.
- **Audio Clashing:** Never let background music (BGM) overpower Japanese speech pronunciation (BGM must be ducked to ≤ -18dB while vocals stay clear at -3dB to -6dB).

---

## 3. Constraints

- **Platform:** Windows 11 with Node.js v26+, Python 3.12+, FFmpeg 8+, CapCut Desktop installed.
- **CapCut Draft Directory:** `%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft`
- **VectCutAPI Server:** Running on `http://localhost:9001` with `is_capcut_env: true`.
- **Target Duration:** 1:30 to 2:00 minutes total.

---

## 4. Architectural Decisions & Specifications

### 4.1 Video Layout Geometry (1080x1920)
- **Top Zone (Y: 100 – 900):** Hyperframes Dynamic Graphic Canvas
  - Scene 1: Analog/Digital Clock Dial showing hour hand & minute hand movement + exception pills (`yo-ji`, `ku-ji`, `han`, `ip-pun`, `rop-pun`).
  - Scene 2: Date Card (Year ➔ Month ➔ Date) with special highlight stickers (`tsuitachi`, `hatsuka`, `jū yok-ka`).
  - Scene 3: Timeline vector with start point (`...kara`) and end point (`...made`) linking business hours (`9:00 kara 15:00 made`).
- **Middle Zone (Y: 900 – 1200):** Kinetic Subtitles (3-tier: Kanji/Kana + Furigana/Romaji + Thai Translation).
- **Bottom Zone (Y: 1200 – 1920):**
  - Left (X: 50 – 500, Y: 1250 – 1920): Speaker video cutout with white stroke (12px).
  - Right (X: 600 – 1000, Y: 1350 – 1850): Animated mascot companion reacting with expressions.

### 4.2 Hyperframes Composition Architecture
- Located in: `03_Projects/Hyperframes/assignment1-grammar-video/`
- Render target: Transparent WebM / PNG image sequence / ProRes 4444 alpha or chromakey green background.
- Modular scenes:
  - `scene-clock.html` (Time module)
  - `scene-calendar.html` (Date module)
  - `scene-timeline.html` (Kara-Made module)

### 4.3 CapCut Timeline Track Hierarchy
- **Track 1 (V1 - Base):** Vibrant theme background (Sunburst / Polka dots looping motion).
- **Track 2 (V2):** Speaker camera video (Chroma key / Auto Cutout + white outline effect).
- **Track 3 (V3):** Companion Mascot (Animated overlay).
- **Track 4 (V4):** Hyperframes Motion Graphics Overlay.
- **Track 5 (V5):** Subtitle layer (`.srt` / CapCut text templates with bouncy animation).
- **Track A1 (Audio 1):** Speaker voice track (Cleaned vocal).
- **Track A2 (Audio 2):** Lo-fi / Cute Japanese Pop BGM (-20dB ducked).
- **Track A3 (Audio 3):** Sound Effects (Pop, Ding, Whoosh on card transitions).

---

## 5. Builder Responsibilities
- Implement Hyperframes project structure and HTML/CSS/JS components.
- Develop the Python automation script interfacing with `VectCutAPI` (`http://localhost:9001`) to generate and populate the CapCut draft.
- Provide verification tests to confirm the CapCut draft folder is successfully generated and loadable in CapCut Desktop.
