# Design Specification: Generative Anime Situational Illustrations for Exam 3

- **Date:** 2026-11-04
- **Project:** Hanase AI - Japanese Speaking Coach (JN60101)
- **Target URL:** `https://jn60101-speaking-coach.pages.dev`
- **Status:** Proposed & Ready for Approval

---

## 1. Intent & The Why

### Why this matters
Currently, situational exam questions in **Exam 3** use lightweight procedural SVGs (`SvgImage.tsx`). While functional and compact, they look abstract and geometric. 

Language speaking exams require high situational empathy and context immersion. By transforming these questions into **Modern Clean Anime POV (First-Person Perspective)** illustrations (inspired by Kyoto Animation and Makoto Shinkai aesthetics), students will feel as though they are physically standing in front of a Tokyo ramen counter, an Akihabara camera store, or a Japanese classroom. This significantly lowers exam anxiety, aids contextual memory retention, and matches the anime coach persona (Saori Hayami / Kirito).

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Contextual Accuracy:** Each generated image must explicitly correspond to the exact exam question prompt (e.g., Swiss watch + Swiss flag, 2 bowls of steaming ramen, calendar showing 11月4日, birthday cake showing 5月15日).
- **POV Immersion:** All scenes use a First-Person Perspective (POV), making the student feel like the protagonist speaking to an in-world character (cashier, waiter, friend, teacher).
- **Performance & 0ms Responsiveness:** Generated images are optimized into WebP format (< 80KB each) and served statically from `public/images/situations/exam3/` to prevent loading latency during the 180s exam countdown.
- **Resilient Fallback:** The `<SvgImage />` component gracefully falls back to the existing SVG vector art if any image fails to load or during offline operation.

### Non-Goals
- Real-time on-the-fly client image generation (too slow, uses unnecessary GPU tokens during live 3-minute exam countdowns).
- Generating full 3D models or video clips (unnecessary bloat for a static speaking prompt).
- Replacing Exam 1 / Exam 2 flashcards in this initial phase (scoped strictly to Exam 3's 6 core categories first).

### Anti-Goals
- **No Generic AI Slop:** Images must not contain messy AI gibberish text or distorted hands. Any Japanese text appearing in the scene (such as on calendars, shop banners, or cakes) must be clean, legible Kanji/Kana (e.g., `11月4日`, `5月15日`, `スイス`).
- **No Visual Clutter:** The subject of the prompt (the watch, the food, the date) must be the unmistakable focal point, avoiding cluttered backgrounds that confuse the student about what question is being asked.

---

## 3. Visual & Artistic Style Guide

- **Art Style:** Modern Clean Anime (สไตล์อนิเมะร่วมสมัย แสงเงาอบอุ่น นุ่มนวล คมชัด สไตล์ KyoAni / Makoto Shinkai).
- **Aspect Ratio & Composition:** 
  - Aspect Ratio: `1:1` (Square, 512×512 rendered at responsive mobile height `max-h-[160px]` to preserve zero-scroll layout).
  - Perspective: First-person eye-level (POV) overlooking a table, counter, street view, or calendar.
  - Border & Frame: Rendered inside the existing Neo-Brutalism Manga Card (`border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a]`).

---

## 4. Exam 3 Situational Asset Roster (Detailed Image Prompts)

### Category 1: Origin (ประเทศผู้ผลิต - Kore wa doko no [สิ่งของ] desuka?)
1. **`e3_q1_suisu_tokei.webp` (นาฬิกาสวิตเซอร์แลนด์)**
   - *Prompt Idea:* First-person POV looking at a clean boutique store counter in Ginza. A polite anime shop clerk with gloves presents a luxury Swiss wristwatch in an open case. A small, elegant Swiss flag emblem is visible on the display card. Warm lighting, anime aesthetic.
2. **`e3_q1_nihon_kamera.webp` (กล้องถ่ายรูปญี่ปุ่น)**
   - *Prompt Idea:* First-person POV inside an Akihabara electronics shop. An anime clerk shows a modern black DSLR camera on the wooden counter with a clear "Made in Japan" sign and small Japanese flag motif.
3. **`e3_q1_doitsu_kuruma.webp` (รถยนต์เยอรมัน)**
   - *Prompt Idea:* First-person POV in a bright, modern Tokyo automotive showroom looking at a sleek German sports sedan, dealer holding out car keys politely.
4. **`e3_q1_furansu_wain.webp` (ไวน์ฝรั่งเศส)**
   - *Prompt Idea:* First-person POV at a cozy Tokyo bistro table, an anime sommelier presenting a bottle of vintage French red wine with an authentic French label.

### Category 2: Adjectives (บรรยายสิ่งของ/สถานที่ - Kono [สิ่งของ] wa dō desuka?)
5. **`e3_q2_oishii_resutoran.webp` (ร้านอาหารอร่อยและมีชีวิตชีวา)**
   - *Prompt Idea:* First-person POV standing outside a bustling traditional Japanese ramen shop with warm glowing noren curtains, delicious steam rising, lively atmosphere.
6. **`e3_q2_shizuka_machi.webp` (เมืองเงียบสงบ)**
   - *Prompt Idea:* First-person POV walking down a serene, peaceful Japanese residential neighborhood street on a sunny afternoon with cherry blossom petals and quiet traditional houses.
7. **`e3_q2_isogashii_shigoto.webp` (งานยุ่งมาก)**
   - *Prompt Idea:* First-person POV of a modern Japanese office desk with stacked neatly organized document folders, laptop, and a warm coffee mug, conveying busy productivity.
8. **`e3_q2_ookii_daigaku.webp` (มหาวิทยาลัยใหญ่)**
   - *Prompt Idea:* First-person POV standing before the grand entrance gate of a spacious, modern Japanese university campus with green trees, academic buildings, and blue sky.

### Category 3: Order (สั่งอาหารและเครื่องดื่ม - [สิ่งของ] o [จำนวน] kudasai)**
9. **`e3_q3_ramen_futatsu.webp` (ราเม็ง 2 ชาม)**
   - *Prompt Idea:* First-person POV sitting at an authentic wooden ramen counter, two appetizing steaming bowls of tonkotsu ramen with chashu, ajitsuke tamago, and nori served right in front of the viewer.
10. **`e3_q3_ocha_hitotsu.webp` (ชาเขียว 1 แก้ว)**
    - *Prompt Idea:* First-person POV at a peaceful traditional Japanese teahouse table, a single ceramic cup of vibrant hot green matcha tea with steam gently rising.
11. **`e3_q3_biiru_hitotsu.webp` (เบียร์ 1 แก้ว)**
    - *Prompt Idea:* First-person POV at an izakaya table, a frosty mug of golden draft beer with fresh foam being served.
12. **`e3_q3_juusu_futatsu.webp` (น้ำผลไม้ 2 แก้ว)**
    - *Prompt Idea:* First-person POV at a sunny cafe terrace table with two tall, refreshing glasses of chilled orange juice with straws.

### Category 4: Date Reading (อ่านปฏิทินวันที่ - Kore wa nan gatsu nan nichi desuka?)
13. **`e3_q4_sep_21.webp` (21 กันยายน - 9月21日)**
    - *Prompt Idea:* First-person POV looking at an anime desk calendar on a tidy student study desk, the date "9月21日" (September 21) circled in red pen.
14. **`e3_q4_oct_10.webp` (10 ตุลาคม - 10月10日)**
    - *Prompt Idea:* First-person POV looking at a wall calendar in a bright Japanese room, clearly marking "10月10日" (October 10) in red.

### Category 5: Birthday (วันเกิดของคุณ - O tanjōbi wa nan gatsu nan nichi desuka?)
15. **`e3_q5_birthday_15may.webp` (วันเกิด 15 พฤษภาคม - 5月15日)**
    - *Prompt Idea:* First-person POV sitting at a celebration table, a delicious strawberry shortcake with lit candles and a chocolate plaque clearly inscribed "5月15日 お誕生日おめでとう" (Happy Birthday May 15) with party confetti in the warm background.

### Category 6: Exam Date (วันสอบรอบที่ 3 - Kyō wa nan gatsu nan nichi desuka?)
16. **`e3_q6_exam_4nov.webp` (วันสอบ 4 พฤศจิกายน - 11月4日)**
    - *Prompt Idea:* First-person POV at a Japanese university classroom desk (PIM style), looking at a calendar and blackboard clearly marking today's date "11月4日 (水) 試験日" (Nov 4 Exam Day) with exam materials neatly set.

---

## 5. Technical Architecture & Asset Pipeline

```
03_Projects/japanese-speaking-coach/
├── public/
│   └── images/
│       └── situations/
│           └── exam3/
│               ├── e3_q1_suisu_tokei.webp
│               ├── e3_q1_nihon_kamera.webp
│               ├── ...
│               ├── e3_q5_birthday_15may.webp
│               └── e3_q6_exam_4nov.webp
├── components/
│   └── SvgImage.tsx  <-- Updated to load WebP first with SVG fallback
└── lib/
    └── exam3-data.ts <-- Added imageWebpPath field to Exam3Question interface
```

### Component Integration (`SvgImage.tsx` enhancement)
```tsx
interface SvgImageProps {
  svgString?: string;
  imagePath?: string;
  alt: string;
  className?: string;
}
```
1. If `imagePath` is provided and file exists: Render `<img src={imagePath} alt={alt} loading="eager" />` with `onError` fallback to `svgString`.
2. Zero layout shift: Fixed aspect ratio matching current `max-h-[160px]` container.

---

## 6. What's Left for the Builder
- Image generation batch run using the project's subagent image generator tool.
- Converting/compressing generated images to WebP (< 80KB each).
- Updating `lib/exam3-data.ts` to attach `imagePath` to each of the 16 questions in `EXAM_3_QUESTIONS_POOL`.
- Verification of mobile responsive layout and offline fallback.
