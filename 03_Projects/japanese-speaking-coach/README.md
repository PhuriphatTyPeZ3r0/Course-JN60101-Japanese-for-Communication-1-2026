# 🎌 JN60101 AI Speaking Coach (Next.js Edition)

ระบบ AI ผู้ช่วยซ้อมพูดก่อนสอบย่อยครั้งที่ 1 วิชา **JN60101 Japanese for Communication 1** สถาบันการจัดการปัญญาภิวัฒน์ (PIM)
สร้างด้วย **Next.js 14 (App Router) + React + TypeScript 100% + Tailwind CSS**
จำลองตามเกณฑ์ข้อสอบจริง: **เวลา 3:00 นาที • คะแนนเต็ม 15 คะแนน**

---

## 🌟 ฟีเจอร์หลัก (Features)

1. **โหมดจำลองสอบจริง (Mock Exam - 3 นาที):**
   - จับเวลานับถอยหลัง `03:00` นาทีเสมือนจริง พร้อมระบบแจ้งเตือนเมื่อเหลือเวลา 30 วินาที
   - ลำดับการสอบ 3 ส่วนต่อเนื่อง:
     1. **แนะนำตัวเอง (5 คะแนน):** 5 สเต็ปมาตรฐานตามสคริปต์ (Hajimemashite ➔ Watashi wa [ชื่อ] desu ➔ Panyapiwatto no gakusei desu ➔ Shumi wa [งานอดิเรก] desu ➔ Dōzo yoroshiku onegai itashimasu)
     2. **คำศัพท์ 5 คำ (5 คะแนน):** ระบบสุ่มคำศัพท์ไทย ➔ ผู้เรียนพูดตอบเป็นภาษาญี่ปุ่น
     3. **ตอบคำถามจากรูปภาพ 5 ข้อ (5 คะแนน):** แสดงภาพประกอบ SVG คมชัด + เสียงถามของอาจารย์ ➔ ผู้เรียนตอบเป็นประโยคสมบูรณ์
   - **Scorecard & AI Feedback:** ส่งคำตอบตรวจผ่าน Google Gemini API (`/api/evaluate`) ตัดเกรดและให้ฟีดแบ็กรายข้ออย่างละเอียด

2. **โหมดฝึกซ้อมอิสระ (Section Drill):**
   - ซ้อมแยกทีละส่วนได้ไม่จำกัดเวลา
   - **ส่วนที่ 1:** ซ้อมแนะนำตัวทีละขั้นตอน พร้อมปุ่มฟังเสียงต้นแบบอาจารย์
   - **ส่วนที่ 2:** แฟลชการ์ดคำศัพท์ 35 คำ (กรองตามบทที่ 1 หรือ 2 หรือสุ่มลำดับคำได้) ซ้อมพูดพร้อมตรวจความถูกต้องทันที
   - **ส่วนที่ 3:** ซ้อมตอบคำถามจากภาพ 8 สถานการณ์ พร้อมเฉลยโครงสร้างประโยคสมบูรณ์

3. **เทคโนโลยีที่ใช้ (Tech Stack):**
   - **Framework:** Next.js 14 (App Router), React 18, TypeScript 100% (Strict Mode)
   - **Styling:** Tailwind CSS, Lucide React Icons
   - **Speech:** Web Speech API (STT สำหรับแปลงเสียงพูดภาษาญี่ปุ่น และ TTS สำหรับเสียงอ่านอาจารย์)
   - **AI Evaluation:** Google Gemini API (`gemini-2.5-flash`) พร้อม Fallback Rule-based Evaluator ในตัว

---

## 🚀 วิธีการทดสอบในเครื่อง (Local Development)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment Variables (ไม่บังคับ)
คัดลอกไฟล์ `.env.example` เป็น `.env.local`:
```bash
cp .env.example .env.local
```
ใส่ Gemini API Key จาก [Google AI Studio](https://aistudio.google.com/):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(หากไม่ใส่ ระบบจะใช้ระบบตรวจภายใน Rule-based หรือผู้ใช้สามารถกดปุ่มตั้งค่าในหน้าเว็บเพื่อใส่ Key เองได้)*

### 3. รันเซิร์ฟเวอร์
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

---

## ⛅ วิธีการ Deploy ขึ้น Cloudflare Pages (แนะนำ)

Cloudflare Pages รองรับ Next.js App Router (Edge Runtime) ผ่าน `@cloudflare/next-on-pages`:

### ทางเลือกที่ 1: Deploy ผ่าน GitHub (แนะนำและสะดวกที่สุด)
1. นำโฟลเดอร์โปรเจกต์นี้ Push ขึ้น GitHub
2. ไปที่ [Cloudflare Dashboard](https://dash.cloudflare.com/) ➔ **Workers & Pages** ➔ **Create application**
3. เลือกแท็บ **Pages** ➔ **Connect to Git**
4. เลือก Repository ของคุณ แล้วตั้งค่าดังนี้:
   - **Framework preset:** `Next.js`
   - **Build command:** `npx @cloudflare/next-on-pages`
   - **Build output directory:** `.vercel/output/static`
5. ในส่วน **Environment variables (advanced)** เพิ่ม:
   - `NODE_VERSION` = `20`
   - `GEMINI_API_KEY` = `[ใส่ API Key ของคุณ]`
6. ในส่วน **Settings ➔ Functions ➔ Compatibility flags** ตรวจสอบว่ามี:
   - `nodejs_compat`
7. กด **Save and Deploy** 
   - ระบบ Cloudflare CI (Linux) จะทำการคอมไพล์และเปิดใช้งานเว็บแอปให้ทันที
   - จะได้ URL รูปแบบ `https://japanese-speaking-coach.pages.dev` เพื่อส่งให้เพื่อนร่วมคลาสใช้งานได้ทันที

### ทางเลือกที่ 2: Deploy ผ่าน Wrangler CLI
```bash
# 1. ล็อกอินเข้าสู่ Cloudflare
npx wrangler login

# 2. คอมไพล์และ Deploy
npm run pages:deploy
```
*(หมายเหตุ: หากรันบนเครื่อง Windows แนะนำให้ใช้ผ่าน WSL หรือใช้ทางเลือกที่ 1 ผ่าน GitHub)*
