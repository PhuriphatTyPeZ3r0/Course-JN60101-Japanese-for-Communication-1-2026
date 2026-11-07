# Implementation Plan: Situational Anime Illustrations for Chapters 1-6 & Exam 2

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform all situational practice images across Chapters 1–6 (19 questions) and Exam 2 (36 questions) into authentic Kyoto Animation / Makoto Shinkai style First-Person POV anime illustrations (< 70KB WebP), linking them to `lib/dataset.ts` and `lib/exam2-data.ts`, with zero-latency responsive display and robust SVG fallback.

**Architecture:** High-res generation via Google Gemini 3.1 Flash Image (Imagen 3) using automated browser pipeline, local compression with `sharp` to 512×512 WebP (< 70KB), and integration into `<SvgImage />` with `onError` fallback.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, `sharp`, Google Gemini 3.1 Flash Image (Imagen 3), Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-11-04-generative-anime-situations-design.md`

## Global Constraints

- **Consistent Studio Style:** 100% Kyoto Animation / Makoto Shinkai cinematic anime aesthetic (soft cell shading, warm sunlight, realistic depth of field, first-person perspective looking at the scene/object).
- **Clean Situational Artwork:** Pure scene without answer-spoiling text overlays (except necessary in-universe props like clock faces, price tags, business cards, office door signs).
- **Format & Size:** 512×512 square WebP, target size < 70KB per file.
- **Fail-Safe Fallback:** Instant fallback to vector SVG if network fails.
- **Zero Emojis in Code/UI:** Material Symbols Outlined (`<Icon name="..." />`).

## Scope Breakdown

### Part A: ภาพสถานการณ์ 6 บท (19 ภาพ - `public/images/situations/ch1_6/`)
- **Chapter 1 (2 items):** `q2` คนญี่ปุ่นในชุดกิโมโน, `q3` พนักงานธนาคารญี่ปุ่น
- **Chapter 2 (6 items):** `q1` เก้าอี้ไม้, `q4` นิตยสารญี่ปุ่น, `q5` แผนกต้อนรับ, `q6` ร่มญี่ปุ่น, `q7` นาฬิกาข้อมือ, `q8` หนังสือรถยนต์
- **Chapter 3 (3 items):** `q_ch3_1` นาฬิกา 3:00 น., `q_ch3_2` เวลาทำงาน 9:00-17:00 น., `q_ch3_3` โรงอาหารญี่ปุ่น
- **Chapter 4 (2 items):** `q_ch4_1` กระเป๋าติดป้ายราคา 3,000 เยน, `q_ch4_2` โน้ตบุ๊กคอมพิวเตอร์
- **Chapter 5 (3 items):** `q_ch5_1` เสื้อยืดสีฟ้า, `q_ch5_2` แอปเปิ้ล 2 ผล, `q_ch5_3` นาฬิกาสวิตเซอร์แลนด์
- **Chapter 6 (3 items):** `q_ch6_1` ปฏิทินวันจันทร์ (Monday), `q_ch6_2` สนามบินฮาเนดะ, `q_ch6_3` สถานีรถไฟโตเกียว

### Part B: โจทย์สอบ 2 (Exam 2 - 36 ภาพ - `public/images/situations/exam2/`)
- **หมวดที่ 1: สถานที่ (8 items):** ห้องประชุม, โรงอาหาร, ห้องน้ำ, ห้างสรรพสินค้า, ซูเปอร์มาร์เก็ต, ร้านอาหาร, ที่ทำการไปรษณีย์, แผนกต้อนรับ
- **หมวดที่ 2: เวลา (8 items):** นาฬิกาอนิเมะแสดงเวลา 16:30, 09:45, 10:30, 14:15, 08:20, 19:50, 11:00, 15:45
- **หมวดที่ 3: เบอร์โทรศัพท์ (6 items):** นามบัตร/หน้าจอสมาร์ตโฟนแสดงเบอร์ 090-7423-9105, 090-3768-2069, 081-543-9820, 089-624-1735, 092-418-7053, 061-839-2470
- **หมวดที่ 4: ราคาเงินเยน (8 items):** สินค้าติดป้ายราคา 3,625¥, 18,000¥, 2,500¥, 4,800¥, 6,300¥, 8,500¥, 25,000¥, 38,000¥
- **หมวดที่ 5: เวลาทำการ (6 items):** ป้ายเวลาเปิด-ปิดร้าน/ออฟฟิศ 9:00-17:00, 10:00-15:00, 8:30-16:30, 9:00-18:00, 8:00-17:00, 10:00-18:00

---

## Tasks Breakdown

### Task 1: Type & Architecture Contract Updates
- Extend `ImageQuestion` in `lib/dataset.ts` and `types.ts` to support optional `imagePath?: string`.
- Extend `Exam2Question` in `lib/exam2-data.ts` to support optional `imagePath?: string`.
- Update `components/SvgImage.tsx` to ensure `imagePath` takes precedence for both sections with smooth error handling.

### Task 2: Generate ภาพสถานการณ์ 6 บท (19 ภาพ)
- Batch generate 19 First-Person POV Kyoto Animation illustrations via browser automation in Google AI Studio.
- Convert raw JPG downloads to 512×512 WebP (< 70KB) in `public/images/situations/ch1_6/`.
- Replace legacy Wikimedia URLs in `lib/dataset.ts` with local optimized `/images/situations/ch1_6/<id>.webp`.

### Task 3: Generate โจทย์สอบรอบที่ 2 (Exam 2: 36 ภาพ)
- **Batch 1 (หมวดสถานที่ 8 ภาพ):** สร้างภาพสถานที่สไตล์ KyoAni ในโตเกียว.
- **Batch 2 (หมวดเวลา 8 ภาพ):** สร้างภาพนาฬิกาอนิเมะในห้องเรียน/คาเฟ่ที่แสดงเข็มและตัวเลขตรงตามโจทย์.
- **Batch 3 (หมวดเบอร์โทร 6 ภาพ):** สร้างภาพนามบัตรญี่ปุ่น/สมาร์ตโฟนอนิเมะแสดงเบอร์โทรศัพท์.
- **Batch 4 (หมวดราคาสินค้า 8 ภาพ):** สร้างภาพสินค้าในร้านค้าโตเกียวพร้อมป้ายราคาเยนคมชัด.
- **Batch 5 (หมวดเวลาทำการ 6 ภาพ):** สร้างภาพป้ายเวลาทำการหน้าร้าน/ออฟฟิศญี่ปุ่น.
- Convert all 36 images to 512×512 WebP in `public/images/situations/exam2/`.
- Link `imagePath` in `EXAM_2_QUESTIONS_POOL` in `lib/exam2-data.ts`.

### Task 4: Verification, Build & Deployment
- Write and run verification script `scripts/verify_all_situations_and_exam2.js` to ensure 100% of files exist on disk with valid headers.
- Run `npm run build` (0 errors).
- Deploy to Cloudflare Pages via Wrangler.
- Perform live smoke test on `https://jn60101-speaking-coach.pages.dev`.
