# Generative Anime Situational Illustrations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Exam 3 situational exam prompts from procedural SVGs to Modern Clean Anime First-Person POV illustrations (< 80KB WebP) with seamless SVG fallback and responsive zero-scroll mobile layout.

**Architecture:** Static optimized WebP assets in `public/images/situations/exam3/`, linked via `imagePath` in `Exam3Question`, rendered by `<SvgImage />` with `onError` SVG fallback.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Cloudflare Pages, WebP optimization.

**Spec:** `docs/superpowers/specs/2026-11-04-generative-anime-situations-design.md`

## Global Constraints

- Modern Clean Anime POV (First-Person Perspective, KyoAni / Makoto Shinkai style).
- Zero layout shift: maintain `max-h-[160px]` height constraint on mobile screens (390×844).
- Offline & fail-safe: automatic fallback to vector SVG if image fails to load.
- File format: WebP, optimized to < 80KB per image.
- Strictly no emojis in code/UI; use Material Symbols Outlined `<Icon name="..." />`.

## Review Focus

1. **Slow Network / Offline Handling:** Image fails to load -> `<SvgImage />` must immediately fall back to the existing inline SVG without breaking the layout or showing broken image icons.
2. **Mobile Viewport Constraint (390×844):** The rendered image must not exceed 160px in height to prevent pushing the voice recording button below the screen fold.
3. **Japanese Text Legibility:** Any text in images (e.g. `11月4日`, `5月15日`) must be sharp and legible, not distorted or unreadable.
4. **Correct Context Matching:** Each question must load its exact corresponding image (e.g. 2 ramen bowls for `e3_q3_ramen_futatsu`, not 1 bowl).
5. **Fast Build & Static Export:** Next.js build must successfully bundle the public static assets with 0 compilation errors.

---

### Task 1: Enhance `SvgImage.tsx` & Type Contract

**Files:**
- Modify: `03_Projects/japanese-speaking-coach/components/SvgImage.tsx`
- Modify: `03_Projects/japanese-speaking-coach/lib/exam3-data.ts:25-50`

- [ ] **Step 1:** Extend `Exam3Question` interface in `lib/exam3-data.ts` to include optional `imagePath?: string`.
- [ ] **Step 2:** Update `components/SvgImage.tsx` to accept optional `imagePath?: string` prop.
- [ ] **Step 3:** Implement image rendering logic in `SvgImage.tsx`:
  - If `imagePath` is provided and hasn't errored: render `<img src={imagePath} alt={alt} onError={() => setImgError(true)} className="w-full h-full object-cover rounded-xl border border-slate-900 shadow-[1px_1px_0px_#0f172a]" />`.
  - If `imgError` is true or `imagePath` is undefined: render SVG fallback with `dangerouslySetInnerHTML`.
- [ ] **Step 4:** Run TypeScript typecheck to verify interface compatibility.
- [ ] **Step 5:** Commit changes to git.

---

### Task 2: Create Situational Anime Assets (Categories 1 & 2)

**Files:**
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q1_suisu_tokei.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q1_nihon_kamera.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q1_doitsu_kuruma.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q1_furansu_wain.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_oishii_resutoran.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_shizuka_machi.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_isogashii_shigoto.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_ookii_daigaku.webp`

- [ ] **Step 1:** Ensure directory `public/images/situations/exam3/` exists.
- [ ] **Step 2:** Generate/render Category 1 (Origin) illustrations in anime style:
  - Swiss watch presented at boutique counter.
  - Japanese camera at Akihabara tech shop.
  - German sports car in modern showroom.
  - French wine bottle at Tokyo bistro.
- [ ] **Step 3:** Generate/render Category 2 (Adjectives) illustrations in anime style:
  - Delicious ramen restaurant with steaming aroma and warm lanterns.
  - Peaceful suburban Japanese street with cherry blossoms.
  - Busy office desk with neat files and coffee.
  - Grand entrance gate of a Japanese university.
- [ ] **Step 4:** Optimize and verify each image file size is under 80KB WebP.
- [ ] **Step 5:** Commit changes to git.

---

### Task 3: Create Situational Anime Assets (Categories 3, 4, 5, 6)

**Files:**
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q3_ramen_futatsu.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q3_ocha_hitotsu.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q3_biiru_hitotsu.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q3_juusu_futatsu.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q4_sep_21.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q4_oct_10.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q5_birthday_15may.webp`
- Create: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q6_exam_4nov.webp`

- [ ] **Step 1:** Generate/render Category 3 (Order) illustrations:
  - 2 steaming ramen bowls at counter.
  - 1 ceramic cup of hot green tea.
  - 1 frosty mug of draft beer.
  - 2 glasses of chilled juice.
- [ ] **Step 2:** Generate/render Category 4 (Date Reading) illustrations:
  - Desk calendar marking 9月21日.
  - Wall calendar marking 10月10日.
- [ ] **Step 3:** Generate/render Category 5 (Birthday) illustration:
  - Strawberry birthday cake with chocolate plaque `5月15日 お誕生日おめでとう`.
- [ ] **Step 4:** Generate/render Category 6 (Exam Date) illustration:
  - Classroom desk with blackboard/calendar marked `11月4日 (水) 試験日`.
- [ ] **Step 5:** Optimize and verify all files are < 80KB WebP.
- [ ] **Step 6:** Commit changes to git.

---

### Task 4: Link Assets in `EXAM_3_QUESTIONS_POOL` & Update UI

**Files:**
- Modify: `03_Projects/japanese-speaking-coach/lib/exam3-data.ts`
- Modify: `03_Projects/japanese-speaking-coach/components/MockExam.tsx`
- Modify: `03_Projects/japanese-speaking-coach/components/SectionDrill.tsx`

- [ ] **Step 1:** Update `EXAM_3_QUESTIONS_POOL` in `lib/exam3-data.ts` to assign `imagePath: "/images/situations/exam3/..."` to all 16 questions.
- [ ] **Step 2:** In `components/MockExam.tsx`, pass `imagePath={currentImgItem.imagePath}` to `<SvgImage />`.
- [ ] **Step 3:** In `components/SectionDrill.tsx`, pass `imagePath={currentExam3DrillQ.imagePath}` to `<SvgImage />`.
- [ ] **Step 4:** Verify fallback behavior when imagePath is missing or invalid.
- [ ] **Step 5:** Commit changes to git.

---

### Task 5: Build Verification, Layout Audit, and Deployment

**Files:**
- Test & Deploy: `03_Projects/japanese-speaking-coach`

- [ ] **Step 1:** Run `npm run build` to confirm 0 compilation, linting, or type errors.
- [ ] **Step 2:** Verify mobile viewport (390×844) zero-scroll layout to ensure the 160px image frame does not push the mic button out of view.
- [ ] **Step 3:** Deploy to Cloudflare Pages via `npm run pages:deploy`.
- [ ] **Step 4:** Verify live site at `https://jn60101-speaking-coach.pages.dev`.
- [ ] **Step 5:** Final git commit & push.
