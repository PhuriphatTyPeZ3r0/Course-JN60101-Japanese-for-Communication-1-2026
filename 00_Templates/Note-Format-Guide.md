---
tags: [jn, meta, guide]
---

# คู่มือ Format การสรุปโน้ตวิชา Japanese for Communication 1 (JN60101)

โน้ตทุกไฟล์ในวิชานี้ใช้ format เดียวกัน เพื่อให้:
- สแกนข้ามโน้ตของแต่ละบทได้เร็ว (icon หัวข้อเดียวกันหมด อยู่ตำแหน่งเดิมเสมอ)
- backlink ระหว่างโน้ต ↔ MOC ทำงานได้จริง ไม่ขาดตอน
- ใช้ทบทวนก่อนสอบย่อย/สอบปลายภาคได้เร็ว โดยไม่ต้องเปิดสไลด์ต้นฉบับซ้ำ

Template 2 ไฟล์ในโฟลเดอร์นี้ (`Lecture-Note-Template.md`, `MOC-Template.md`) คือของที่ให้ copy ไปกรอกจริง ส่วนไฟล์นี้อธิบายว่า "ทำไม" แต่ละกฎถึงเป็นแบบนี้ พร้อมตัวอย่างจริงจาก `01_Lectures/Chapter1/`

โครงสร้าง format นี้ดัดแปลงมาจากวิชา 1322201 Digital Logic Design (โครงสร้าง/process เดียวกัน) แต่ปรับ template และเนื้อหาให้เข้ากับการเรียนภาษา (คำศัพท์ + ไวยากรณ์ + บทสนทนา แทนที่จะเป็นทฤษฎี + diagram)

## วิธีใช้งานใน Obsidian

1. เปิด **Settings → Core plugins → Templates** ให้เป็นเปิด (เปิดอยู่แล้วใน vault นี้)
2. ตั้ง **Template folder location** = `00_Templates`
3. (แนะนำ) ตั้ง **Date format** = `YYYY-MM-DD` ใน settings ของ Templates plugin เพื่อให้ `{{date}}` ออกมาตรงกับ format ที่ใช้ในโน้ตทุกไฟล์
4. สร้างโน้ตใหม่ → `Ctrl/Cmd+P` → "Insert template" → เลือก `Lecture-Note-Template` หรือ `MOC-Template`
5. ถ้า copy ไป vault อื่น: เอาแค่ 2 ไฟล์ template ไปวางในโฟลเดอร์ template ของ vault นั้น ไม่ต้องพึ่ง config อื่นของ vault นี้

**Placeholder 2 แบบในไฟล์ template:**
- `{{title}}`, `{{date}}` — Obsidian เติมให้อัตโนมัติตอน insert template (`{{title}}` = ชื่อไฟล์ที่ตั้งตอนสร้างโน้ต)
- `<ข้อความในวงเล็บมุม>` — ต้องลบแล้วพิมพ์ทับเอง ก่อน commit **ห้ามเหลือ `<...>` ค้างอยู่ในไฟล์จริง**

## กฎ Frontmatter

| field | โน้ตหัวข้อ | MOC | หมายเหตุ |
| --- | --- | --- | --- |
| `tags` | `[jn, chapter<N>, <topic-tag>]` | `[jn, chapter<N>, moc]` | topic-tag เลือก 1-2 คำที่สื่อเนื้อหา เช่น `self-intro`, `wa-desu` |
| `course` | `JN60101` | `JN60101` | ตายตัว ไม่ต้องเปลี่ยน |
| `chapter` | เลขบท (1-6) | เลขบท (1-6) | ต้องตรงกับเลขใน `tags` — ใช้ **บทที่** ไม่ใช่สัปดาห์ เพราะสอบย่อยและเนื้อหาอ้างอิงกันเป็นบท (สอบย่อย 1 = บทที่ 1-2 เป็นต้น) |
| `date` | `{{date}}` | `{{date}}` | วันที่สร้างโน้ต |
| `course-name`, `instructor`, `source` | ไม่ใช้ | ใช้ | มีเฉพาะใน MOC เท่านั้น — `source` คือชื่อไฟล์สไลด์ที่ใช้สอนบทนั้น |

## กฎโครงสร้างโน้ตรายหัวข้อ (`Lecture-Note-Template.md`)

1. **H1** — ชื่อหัวข้อภาษาไทย (ใส่ภาษาอังกฤษกำกับในวงเล็บถ้าเป็นหัวข้อไวยากรณ์ที่ควรจำ)
2. **บรรทัด nav บนสุด** — `<span class="material-symbols-outlined">arrow_back</span> กลับไปที่ [[Chapter<N>-MOC]] | ก่อนหน้า: [[...]]`
   - โน้ตแรกของบท: ตัดส่วน "ก่อนหน้า" ออก เหลือแค่ลิงก์กลับ MOC
3. **<span class="material-symbols-outlined">key</span> Vocabulary** (บังคับ) — list คำศัพท์ภาษาญี่ปุ่น (โรมาจิ + ตัวอักษรญี่ปุ่นถ้ามีในสไลด์) พร้อมคำแปลไทย 1 บรรทัดต่อคำ
4. **<span class="material-symbols-outlined">record_voice_over</span> Grammar Pattern** (บังคับ) — โครงสร้างประโยค/ไวยากรณ์หลัก พร้อม callout `[!example]` อย่างน้อย 1 ตัวอย่างที่มีทั้งประโยคญี่ปุ่นและคำแปล
5. **<span class="material-symbols-outlined">forum</span> Example Dialogue** (มีเงื่อนไข — ดูหัวข้อถัดไป)
6. **<span class="material-symbols-outlined">edit_note</span> Notes** (บังคับ) — callout `[!tip]` เทคนิคช่วยจำหรือจุดที่มักสับสน (อย่างน้อย 1 ข้อ)
7. **บรรทัดปิดท้าย** — `---` แล้วตามด้วย `<span class="material-symbols-outlined">arrow_forward</span> ต่อไป: [[...]]`
   - โน้ตสุดท้ายของบท: เปลี่ยนเป็นลิงก์กลับ MOC แทน

### เมื่อไหร่ต้องมี <span class="material-symbols-outlined">forum</span> Example Dialogue และเมื่อไหร่ไม่ต้องมี

ใส่เฉพาะเมื่อสไลด์ต้นฉบับมีตัวอย่างบทสนทนา A/B จริง ๆ (เช่น การแนะนำตัว, การถามราคา) ถ้าหัวข้อเป็นคำศัพท์/ไวยากรณ์ล้วน ๆ ไม่มีบทสนทนาประกอบในสไลด์ **ให้ลบ section นี้ทิ้งทั้งหมด** แทนที่จะแต่งบทสนทนาขึ้นมาเอง

## กฎโครงสร้าง MOC (`MOC-Template.md`)

1. **H1** — `บทที่ N — <ชื่อหัวข้อบทภาษาอังกฤษ> (MOC)`
2. **บรรทัด nav บนสุด** — ลิงก์บทก่อนหน้า (ไม่มีในบทแรกของวิชา)
3. **<span class="material-symbols-outlined">check_circle</span> เช็คลิสต์ก่อนเข้าเรียน** (บังคับ) — checkbox list สิ่งที่ควรทบทวน/เตรียมก่อนเข้าเรียน แต่ละข้อลิงก์ไปโน้ตที่เกี่ยวข้อง
4. **<span class="material-symbols-outlined">assignment</span> ภาพรวมบทที่ N** (บังคับ) — ย่อหน้าสรุปเนื้อหาทั้งบท ทุกบทมี section นี้เสมอ
5. **<span class="material-symbols-outlined">map</span> แผนที่หัวข้อบทที่ N** (บังคับ) — mermaid `graph TD` แสดงหัวข้อหลัก → หัวข้อย่อย ของบทนั้น
6. **<span class="material-symbols-outlined">collections_bookmark</span> โน้ตรายหัวข้อ** (บังคับ) — ตาราง หัวข้อ / เนื้อหาหลัก / หน้าสไลด์
7. **callout `[!info]` สอบย่อยที่เกี่ยวข้อง** (บังคับ) — ระบุว่าบทนี้อยู่ในสอบย่อยครั้งไหน วันที่เท่าไหร่ อ้างอิง [[../../Deadline-Tracker]]
8. **บรรทัดปิดท้าย** — ลิงก์บทถัดไป (ใส่ทีหลังตอนสร้าง MOC บทถัดไปแล้ว ถ้ายังไม่มีให้ลบบรรทัดนี้ก่อน)

## ชุด Icon หัวข้อ (ตายตัว ห้ามเปลี่ยน)

| Icon (Material Symbols) | รหัส HTML | ใช้กับ | ความหมาย |
| --- | --- | --- | --- |
| arrow_back / arrow_forward | `<span class="material-symbols-outlined">arrow_back</span>` / `<span class="material-symbols-outlined">arrow_forward</span>` | ทุกโน้ต | นำทางไปก่อนหน้า/ถัดไป |
| key | `<span class="material-symbols-outlined">key</span>` | โน้ตหัวข้อ | Vocabulary |
| record_voice_over | `<span class="material-symbols-outlined">record_voice_over</span>` | โน้ตหัวข้อ | Grammar Pattern |
| forum | `<span class="material-symbols-outlined">forum</span>` | โน้ตหัวข้อ | Example Dialogue |
| edit_note | `<span class="material-symbols-outlined">edit_note</span>` | โน้ตหัวข้อ | Notes |
| check_circle | `<span class="material-symbols-outlined">check_circle</span>` | MOC | เช็คลิสต์ก่อนเข้าเรียน |
| assignment | `<span class="material-symbols-outlined">assignment</span>` | MOC | ภาพรวมบท |
| map | `<span class="material-symbols-outlined">map</span>` | MOC | แผนที่หัวข้อ (mermaid) |
| collections_bookmark | `<span class="material-symbols-outlined">collections_bookmark</span>` | MOC | ตารางโน้ตรายหัวข้อ |

## Callout ที่ใช้ได้

| Callout | ใช้เมื่อ |
| --- | --- |
| `[!tip]` | เคล็ดลับ/เทคนิคช่วยจำ, จุดที่มักสับสน |
| `[!example]` | ตัวอย่างประโยคที่ยกมาจากสไลด์โดยตรง |
| `[!important]` | ข้อควรระวัง หรือความแตกต่างสำคัญที่มักทำผิด (เช่น การผันรูปกริยา) |
| `[!info]` | ประกาศ/ข้อมูลกำหนดสอบย่อย (ใช้เฉพาะใน MOC) |

## Checklist ก่อน commit

- [ ] ไม่มี `<...>` ค้างอยู่ในไฟล์
- [ ] `chapter` ใน frontmatter ตรงกับ `tags`
- [ ] ลิงก์ `[[...]]` ทั้งหมดชี้ไปโน้ตที่มีอยู่จริง (ไม่ใช่ placeholder)
- [ ] ถ้าไม่มี Example Dialogue section ต้องเป็นเพราะสไลด์ไม่มีบทสนทนาจริง ๆ ไม่ใช่ขี้เกียจแต่ง
- [ ] เพิ่มแถวของโน้ตนี้ใน MOC (ตาราง <span class="material-symbols-outlined">collections_bookmark</span> + แผนที่ <span class="material-symbols-outlined">map</span>) ของบทนั้นแล้ว
- [ ] คำศัพท์/ไวยากรณ์ทุกจุดอ้างอิงจากสไลด์จริง ไม่ใช่แต่งขึ้นเอง
