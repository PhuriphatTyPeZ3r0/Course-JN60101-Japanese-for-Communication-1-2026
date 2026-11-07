# Anime Situational Illustrations Regeneration Plan (23 Missing Items)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Regenerate all 23 situational exam images with authentic Kyoto Animation / Makoto Shinkai clean modern anime illustrations (matching the visual aesthetic of the initial 13 images), optimizing them to < 80KB WebP (512×512), verifying 100% question coverage, and deploying to Cloudflare Pages.

**Architecture:** Automated batch generation script using high-fidelity generative anime models (Flux Anime / KyoAni aesthetic), post-processing and resizing with `sharp` to 512×512 WebP with effort 6 (< 80KB), deployed to `public/images/situations/exam3/`, and integrated with `<SvgImage />` fallback.

**Tech Stack:** Next.js 14, Node.js, `sharp`, Flux Anime / Generative AI Engine, Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-11-04-generative-anime-situations-design.md`

## Global Constraints

- **Consistent Anime Style:** Every generated image must strictly use Kyoto Animation / Makoto Shinkai modern clean anime aesthetic (first-person POV, cinematic lighting, soft cell shading, hand/counter/scenery foreground, warm Japanese atmosphere). NO procedural/flat vector icons.
- **Aspect Ratio & Resolution:** 512×512 square format, WebP format, target size < 80KB per file.
- **Responsive Zero-Scroll Layout:** Maintains `max-h-[160px]` height constraint on mobile viewports (390×844) without pushing the audio recording button below the fold.
- **Fail-Safe Fallback:** If any image fails to load over network, `<SvgImage />` smoothly falls back to inline vector SVG without UI breakage.
- **Zero Hallucination in Context:** The objects, quantities, and flags in the image must strictly match the Japanese exam syllabus (e.g. exactly 6 apples for `muttsu`, 10 beer bottles for `jippon`, 2 T-shirts for `nimai`, correct Japanese national flags and dates).
- **Rules Compliance:** Strictly no Unicode emojis in UI/code; Material Symbols Outlined (`<Icon name="..." />`).

## Review Focus

1. **Aesthetic Consistency:** Verify that the 23 newly generated images blend indistinguishably with the 13 previously generated images in terms of line art, lighting, depth, and anime color palettes.
2. **Accurate Object Representation:**
   - Origin: National flag emblem or country landmark clearly visible with the item (Japanese car, Italian wine, German camera, US computer, Thai T-shirt).
   - Adjectives: Correct color and size representation (chiisai tokei, okii kasa, kuroi kasa, aoi enpitsu, akai kaban, shiroi T-shirt, kiiroi hon).
   - Orders: Exact quantities (6 apples, 2 T-shirts, 10 beers, 3 mikans, 1 wine).
   - Dates: Crisp Japanese calendar with bold kanji and numerals (2月6日, 1月1日, 4月14日, 5月5日, 10月20日, 11月4日).
3. **File Optimization:** Ensure each image is converted to WebP with `quality: 85-90`, resulting in < 80KB for rapid mobile loading.
4. **TypeScript & Static Build:** `npm run build` generates 5/5 static pages with 0 linting or type errors.
5. **Production Verification:** Deployed assets return HTTP 200 on `https://jn60101-speaking-coach.pages.dev`.

---

## Tasks Breakdown

### Task 1: Setup Anime Generation Pipeline & Prompts Definition

**Files:**
- Create: `03_Projects/japanese-speaking-coach/scripts/regenerate_anime_images.js`

- [ ] **Step 1:** Construct detailed Kyoto Animation / Makoto Shinkai prompt templates for all 23 items with First-Person POV, realistic depth of field, warm cinematic lighting, and explicit negative prompts (no flat vector, no clip art, no lowres).
- [ ] **Step 2:** Integrate fetch loop with automatic retry and rate-limiting to avoid network hiccups.
- [ ] **Step 3:** Chain with `sharp` to crop, resize to 512×512, and encode as WebP (`quality: 85`).
- [ ] **Step 4:** Test run with 1 image (`e3_q1_nihon_kuruma.webp`) and inspect visual quality.

---

### Task 2: Batch Generate Group 1 — Origin (5 Items) & Adjectives (7 Items)

**Files:**
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q1_nihon_kuruma.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q1_itaria_wain.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q1_doitsu_kamera.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q1_amerika_konpyuta.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q1_tai_tshatsu.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_chiisai_tokei.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_okii_kasa.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_kuroi_kasa.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_aoi_enpitsu.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_akai_kaban.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_shiroi_tshatsu.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q2_kiiroi_hon.webp`

- [ ] **Step 1:** Run batch generation for 5 Category 1 Origin illustrations.
- [ ] **Step 2:** Run batch generation for 7 Category 2 Adjectives illustrations.
- [ ] **Step 3:** Verify that all 12 images are generated as valid WebP files < 80KB.
- [ ] **Step 4:** Inspect each image to ensure the anime style, colors, and objects accurately match requirements.

---

### Task 3: Batch Generate Group 2 — Orders (5 Items) & Dates (6 Items)

**Files:**
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q3_ringo_6.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q3_tshatsu_2.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q3_biiru_10.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q3_mikan_3.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q3_wain_1.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q4_feb_6.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q4_jan_1.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q4_apr_14.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q4_may_5.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q4_oct_20.webp`
- Output: `03_Projects/japanese-speaking-coach/public/images/situations/exam3/e3_q6_today.webp`

- [ ] **Step 1:** Run batch generation for 5 Category 3 Order illustrations (ensure exact count: 6 apples, 2 shirts, 10 beers, 3 mikans, 1 wine).
- [ ] **Step 2:** Run batch generation for 5 Category 4 Date Reading illustrations + 1 Category 6 Today Date illustration (ensure clear Japanese calendar formatting).
- [ ] **Step 3:** Verify that all 11 images are generated as valid WebP files < 80KB.

---

### Task 4: Complete Verification, Build & Deployment

**Files:**
- Test: `03_Projects/japanese-speaking-coach/scripts/verify_all_images_exist.js`
- Build Output: `03_Projects/japanese-speaking-coach/out`

- [ ] **Step 1:** Run verification script to guarantee all 36 questions in `EXAM_3_QUESTIONS_POOL` point to existing, valid WebP files on disk.
- [ ] **Step 2:** Run `npm run build` to verify clean static export and 0 TypeScript errors.
- [ ] **Step 3:** Deploy to Cloudflare Pages via Wrangler with IPv4 DNS ordering.
- [ ] **Step 4:** Perform live HTTP GET verification against `https://jn60101-speaking-coach.pages.dev` to confirm 200 OK for sample images across all categories.
