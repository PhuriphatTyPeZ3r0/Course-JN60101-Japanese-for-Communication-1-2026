# 🎨 Icon & Visual Asset Standards

**Description:** กฎข้อบังคับเรื่องการใช้ Icon และ Visual Assets ในโปรเจกต์ ห้ามใช้ Emoji โดยเด็ดขาด และต้องใช้ Google Font Icons (Material Symbols) เสมอ

## 🚫 1. Emoji Strict Prohibition (ห้ามใช้ Emoji เด็ดขาด)
- **ห้าม** ใช้ Unicode Emoji (เช่น ⏱️, ⭐, 🎮, 📱, 🎯, 📌, 💡, ⌨️, 📂, 🃏, 📋, 👦, 👩 ฯลฯ) ใน UI, Label, Button, Badge, Modal, Dataset, หรือส่วนใดๆ ของ Source Code ทั้งสิ้น
- ทุกจุดที่ต้องการสัญลักษณ์ ภาพประกอบ หรือตัวบ่งชี้สถานะ ต้องใช้ Google Font Icons (Material Symbols Outlined) แทนเท่านั้น

## 💎 2. Google Font Icons Standard (การใช้งาน Material Symbols)
- ใช้ Google Material Symbols Outlined ผ่านคอมโพเนนต์ `<Icon name="..." className="..." filled={...} />`
- Naming Convention สำหรับ Icon ให้ใช้ชื่อทางการของ Material Symbols (snake_case เช่น `timer`, `grade`, `sports_esports`, `folder`, `smart_toy`, `face`, `lightbulb`, `keyboard`, `style`, `list_alt`)
- การกำหนดขนาดและสี: กำหนดผ่าน Tailwind CSS classes ใน `className` (เช่น `text-base text-primary`, `text-xl text-amber-500`) ห้ามแทรก Emoji เข้าไปในสตริงข้อความ

## 📐 3. Icon Mapping Reference
- เวลา/นาฬิกา: `timer` หรือ `schedule` (แทน ⏱️, 🕒)
- คะแนน/ดาว/ความสำเร็จ: `grade` หรือ `star` หรือ `military_tech` (แทน ⭐, 🏆)
- หมวดหมู่/โฟลเดอร์: `folder` หรือ `category` (แทน 📂)
- โค้ช/อวาตาร์: `smart_toy` (AI), `face` (Kenji), `face_3` (Sakura) (แทน 📱, 👦, 👩)
- ด่าน/เกม/การทดสอบ: `sports_esports` หรือ `quiz` (แทน 🎮)
- คีย์ลัด/แป้นพิมพ์: `keyboard` (แทน ⌨️)
- พยางค์/เป้าหมาย: `crisis_alert` หรือ `adjust` (แทน 🎯)
- ปักหมุด/สถานการณ์: `push_pin` หรือ `location_on` (แทน 📌)
- คำแนะนำ/ทริป: `lightbulb` หรือ `tips_and_updates` (แทน 💡)
- แฟลชการ์ด: `style` หรือ `view_carousel` (แทน 🃏)
- รายการทั้งหมด: `list_alt` หรือ `table_rows` (แทน 📋)
