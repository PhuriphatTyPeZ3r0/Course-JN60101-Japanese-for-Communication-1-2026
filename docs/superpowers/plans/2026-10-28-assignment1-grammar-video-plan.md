# Implementation Plan: Assignment1 Grammar Video Automation (Hyperframes + CapCut MCP)

**Spec Authority:** [docs/superpowers/specs/2026-10-28-assignment1-grammar-video-design.md](../specs/2026-10-28-assignment1-grammar-video-design.md)  
**Date:** 2026-10-28  
**Target Duration:** ~90–120 seconds  
**Canvas Resolution:** 1080x1920 (9:16 Vertical)  

---

## Global Constraints

1. **Resolution & Aspect Ratio:** 1080x1920 (9:16 vertical orientation).
2. **Hyperframes Workspace:** `03_Projects/Hyperframes/assignment1-grammar-video/`
3. **CapCut Draft API Endpoint:** `http://localhost:9001` (VectCutAPI backend).
4. **CapCut Draft Directory:** `%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft`
5. **Aesthetic Anchor:** Must match reference clip style (`SaveClip.App_AQPRm_...mp4`):
   - Cutout presenter at bottom-left corner with 12px white stroke.
   - Companion mascot at bottom-right corner.
   - Upper half for animated grammar infographic cards.
   - 3-tier typography: Kanji/Kana + Romaji/Furigana + Thai translation.

---

## Tasks

### Task 1: Scaffold Hyperframes Project & Implement Scene 1 (Time: ~ji / ~fun)
- **Goal:** Create Hyperframes project and Scene 1 component illustrating Telling Time.
- **Components to build:**
  - `index.html` structure with 1080x1920 canvas.
  - SVG Analog Clock dial with smooth GSAP hand rotation (9:00, 4:30 `yo-ji han`).
  - Animated exception badges: `yo-ji` (4:00), `shichi-ji` (7:00), `ku-ji` (9:00).
  - Minute rules pills: `ip-pun`, `rop-pun`, `jup-pun`, `han`.
- **Outputs:** `03_Projects/Hyperframes/assignment1-grammar-video/src/scene1-time.html` + css/js.

### Task 2: Implement Hyperframes Scene 2 (Dates: Year, Month, Day, Day of Week)
- **Goal:** Build animated calendar/date card in Hyperframes.
- **Components to build:**
  - Japanese date order hierarchy visualization: Year ➔ Month ➔ Date ➔ Day.
  - Animated monthly calendar flip / pop-up.
  - Highlight stickers for irregular dates: `tsuitachi` (1st), `hatsuka` (20th), `jū yok-ka` (14th).
  - Dialogue prompt card: *Otanjōbi wa itsu desu ka?* (When is your birthday?).
- **Outputs:** `03_Projects/Hyperframes/assignment1-grammar-video/src/scene2-date.html`.

### Task 3: Implement Hyperframes Scene 3 (Timeline Particle `...kara ...made`)
- **Goal:** Build animated timeline flow for `kara ... made`.
- **Components to build:**
  - Vector timeline bar connecting Start Point (`~kara`) to End Point (`~made`).
  - Pulsing location & activity badge: *Ginkō* (Bank) `9:00 kara 15:00 made`.
  - Sentence breakdown formula card with color-coded particles.
- **Outputs:** `03_Projects/Hyperframes/assignment1-grammar-video/src/scene3-timeline.html`.

### Task 4: Composite Sequence Player & Asset Bundler
- **Goal:** Create the master sequence preview player tying all 3 scenes together with animated backgrounds and export assets.
- **Components to build:**
  - Master HTML player transitioning through Scene 1 ➔ Scene 2 ➔ Scene 3.
  - Background themes: Comic sunburst (wine red), Polka dots (warm yellow), Grid (cool indigo).
  - Bundler script to capture/render transparent scenes (or chromakey MP4/PNG sequence via headless browser / ffmpeg).
- **Outputs:** `03_Projects/Hyperframes/assignment1-grammar-video/index.html` + `render_scenes.py`.

### Task 5: CapCut Automation Pipeline Script (`generate_capcut_draft.py`)
- **Goal:** Write automated pipeline interfacing with `VectCutAPI` on `localhost:9001` to construct the entire CapCut Desktop draft.
- **Components to build:**
  - Call `capcut_create_draft` with width=1080, height=1920, fps=30.
  - Add video/image track layers:
    1. Background video layer.
    2. Speaker footage placeholder layer (positioned bottom-left with cutout & stroke styling).
    3. Mascot companion layer (positioned bottom-right).
    4. Hyperframes animated overlay layers (synchronized to Scene 1, 2, 3 timings).
    5. Subtitle track (`.srt` / kinetic text cards).
    6. Audio tracks: BGM (ducked) + Sound effects (pop/ding).
  - Call `capcut_save_draft` to commit the draft into `com.lveditor.draft`.
- **Outputs:** `scripts/generate_capcut_draft.py`.

### Task 6: End-to-End Verification & Draft Inspection
- **Goal:** Execute the generation script and verify draft creation.
- **Verification checks:**
  - Draft folder created in `%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft\`.
  - JSON project manifest (`draft_content.json` / `draft_info.json`) is well-formed.
  - CapCut Desktop loads the draft without errors.
- **Outputs:** Verification report and instructions for user to record camera footage and press export.
