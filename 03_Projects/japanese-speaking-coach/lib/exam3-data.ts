// lib/exam3-data.ts - คลังโจทย์และข้อมูลจำลองการสอบครั้งที่ 3 (เนื้อหาบทที่ 5-6)
// อ้างอิงตามเอกสารประกาศสอบจริง: การสอบครั้งที่ 3 เนื้อหาบทที่ 5-6 กลุ่ม 1.2-1.pdf
// โครงสร้างข้อสอบ 15 คะแนน เวลา 3 นาที:
// ส่วนที่ 1: คำศัพท์ ไทย -> ญี่ปุ่น (5 คำ = 5 คะแนน สุ่มจากบทที่ 5-6)
// ส่วนที่ 2: ตอบคำถาม 6 รูปแบบ รวม 10 ข้อ (10 คำถาม = 10 คะแนน)
//   - รูปแบบที่ 1: Kore wa doko no [สิ่งของ] desuka? (ตอบชื่อประเทศ + no + คำนาม) = 2 ข้อ
//   - รูปแบบที่ 2: Kore wa nan desuka? (ตอบคำคุณศัพท์สี / ขนาด + คำนาม) = 2 ข้อ
//   - รูปแบบที่ 3: Irasshaimase! (ใช้โครงสร้าง Sono + คำนาม + o + จำนวน + kudasai) = 2 ข้อ
//   - รูปแบบที่ 4: Kore wa nan gatsu nan nichi desuka? (เรียงจาก เดือน > วันที่) = 2 ข้อ
//   - รูปแบบที่ 5: O tanjōbi wa nan gatsu nan nichi desuka? (เตรียมพูดวันเกิดตนเอง พูดไทยก่อน) = 1 ข้อ
//   - รูปแบบที่ 6: Kyō wa nan gatsu nan nichi desuka? (ตอบตามความเป็นจริง) = 1 ข้อ

import { Exam3Question, Exam3Category } from "./types";
export type { Exam3Question, Exam3Category };

export const EXAM_3_CATEGORIES: {
  category: Exam3Category;
  categoryIndex: 1 | 2 | 3 | 4 | 5 | 6;
  titleTh: string;
  titleJa: string;
  questionJa: string;
  questionRomaji: string;
  questionTh: string;
  ruleNoteTh: string;
  maxScore: number;
}[] = [
  {
    category: "ORIGIN",
    categoryIndex: 1,
    titleTh: "1. ประเทศผู้ผลิต (แสดงรูป)",
    titleJa: "生産国の質問 (Kore wa doko no .. desuka?)",
    questionJa: "Kore wa doko no tokei desuka?",
    questionRomaji: "Kore wa doko no tokei desuka?",
    questionTh: "สิ่งนี้คือสิ่งของของที่ไหน/ประเทศใด? (ตอบชื่อประเทศ + no + คำนาม)",
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa [ชื่อประเทศ] no [สิ่งของ] desu. (เช่น Kore wa suisu no tokei desu.)",
    maxScore: 2,
  },
  {
    category: "ADJECTIVE",
    categoryIndex: 2,
    titleTh: "2. คุณศัพท์สี / ขนาด (แสดงรูป)",
    titleJa: "物の特徴 (Kore wa nan desuka?)",
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "สิ่งนี้คืออะไร? (ตอบคำคุณศัพท์สี / ขนาด + คำนาม)",
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa [คุณศัพท์สี/ขนาด] [คำนาม] desu. (เช่น Kore wa chiisai tokei desu. / Kore wa kuroi kasa desu.)",
    maxScore: 2,
  },
  {
    category: "ORDER",
    categoryIndex: 3,
    titleTh: "3. สั่งซื้อสินค้าตามจำนวนในภาพ",
    titleJa: "注文 (Irasshaimase!)",
    questionJa: "いらっしゃいませ！ (Irasshaimase!)",
    questionRomaji: "Irasshaimase!",
    questionTh: "ยินดีต้อนรับครับ/ค่ะ! (พูดสั่งซื้อสินค้าและจำนวนที่เห็นในภาพ)",
    ruleNoteTh: "ใช้โครงสร้าง: Sono + [คำนาม] + o + [จำนวน+ลักษณนาม] + kudasai (เช่น Sono ringo o muttsu kudasai)",
    maxScore: 2,
  },
  {
    category: "DATE_READING",
    categoryIndex: 4,
    titleTh: "4. อ่านวันและเดือนตามที่เห็น",
    titleJa: "日付の読み方 (Kore wa nan gatsu nan nichi desuka?)",
    questionJa: "Kore wa nan gatsu nan nichi desuka?",
    questionRomaji: "Kore wa nan gatsu nan nichi desuka?",
    questionTh: "นี่คือวันที่และเดือนอะไร? (พูดเรียงจาก เดือน > วันที่)",
    ruleNoteTh: "สำคัญ!! ต้องเรียงจาก เดือน > วันที่: [เดือน]-gatsu [วันที่]-nichi desu. (เช่น Kugatsu nijūichinichi desu.)",
    maxScore: 2,
  },
  {
    category: "BIRTHDAY",
    categoryIndex: 5,
    titleTh: "5. พูดวันเกิดของตนเอง",
    titleJa: "誕生日 (O tanjōbi wa nan gatsu nan nichi desuka?)",
    questionJa: "O tanjōbi wa nan gatsu nan nichi desuka?",
    questionRomaji: "O tanjōbi wa nan gatsu nan nichi desuka?",
    questionTh: "วันเกิดของคุณคือวันที่และเดือนอะไร? (พูดภาษาไทยก่อน แล้วพูดภาษาญี่ปุ่น)",
    ruleNoteTh: "พูดภาษาไทยก่อน (เช่น '15 สิงหาคมครับ') แล้วพูดเฉพาะเดือนและวันที่: [เดือน]-gatsu [วันที่]-nichi desu.",
    maxScore: 1,
  },
  {
    category: "TODAY_DATE",
    categoryIndex: 6,
    titleTh: "6. บอกวันที่วันนี้ตามความจริง",
    titleJa: "今日の日付 (Kyō wa nan gatsu nan nichi desuka?)",
    questionJa: "Kyō wa nan gatsu nan nichi desuka?",
    questionRomaji: "Kyō wa nan gatsu nan nichi desuka?",
    questionTh: "วันนี้วันที่เท่าไหร่และเดือนอะไร? (ตอบตามความเป็นจริง)",
    ruleNoteTh: "ตอบตามความเป็นจริง พูดแค่เดือนและวันที่ เช่น วันสอบพุธ 4 พฤศจิกายน -> Jūichigatsu yokka desu.",
    maxScore: 1,
  },
];

export const EXAM_3_QUESTIONS_POOL: Exam3Question[] = [
  // =========================================================================
  // หมวดที่ 1: ประเทศผู้ผลิต (Kore wa doko no [สิ่งของ] desuka?)
  // =========================================================================
  {
    id: "e3_q1_suisu_tokei",
    category: "ORIGIN",
    categoryIndex: 1,
    categoryTitleTh: "1. ประเทศผู้ผลิต (แสดงรูป)",
    categoryTitleJa: "生産国の確認",
    questionJa: "Kore wa doko no tokei desuka?",
    questionRomaji: "Kore wa doko no tokei desuka?",
    questionTh: "สิ่งนี้คือนาฬิกาของประเทศใด? (สวิตเซอร์แลนด์)",
    displayLabel: "สินค้า + สัญชาติ",
    displayValue: "นาฬิกาสวิตเซอร์แลนด์ (スイスの時計)",
    displaySubtext: "ภาพนาฬิกาข้อมือ + ธงชาติสวิตเซอร์แลนด์ (ตรงตามสไลด์ข้อสอบ)",
    expectedAnswerJa: "Kore wa suisu no tokei desu.",
    expectedAnswerRomaji: "Kore wa suisu no tokei desu.",
    keywords: [
      "kore wa suisu no tokei desu",
      "suisu no tokei desu",
      "suisu no tokei",
      "suisu",
      "スイスのとけい",
      "スイスの時計",
      "すいすのとけいです",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa suisu no tokei desu. (ตอบชื่อประเทศ + no + คำนาม)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Swiss Flag -->
      <g transform="translate(25, 30)">
        <rect width="60" height="45" rx="4" fill="#DC2626" stroke="#0F172A" stroke-width="2"/>
        <rect x="24" y="9" width="12" height="27" fill="#FFFFFF"/>
        <rect x="16.5" y="16.5" width="27" height="12" fill="#FFFFFF"/>
      </g>
      <!-- Plus sign -->
      <text x="100" y="58" font-family="sans-serif" font-size="24" font-weight="900" fill="#0F172A" text-anchor="middle">+</text>
      <!-- Watch on right -->
      <g transform="translate(115, 20)">
        <rect x="22" y="5" width="20" height="80" rx="4" fill="#334155"/>
        <circle cx="32" cy="45" r="24" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
        <circle cx="32" cy="45" r="20" fill="#F1F5F9"/>
        <line x1="32" y1="45" x2="32" y2="33" stroke="#0F172A" stroke-width="2" stroke-linecap="round"/>
        <line x1="32" y1="45" x2="42" y2="45" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <!-- Label -->
      <rect x="20" y="145" width="160" height="32" rx="8" fill="#DC2626" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="166" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">スイス + 時計 (Suisu + Tokei)</text>
    </svg>`,
  },
  {
    id: "e3_q1_nihon_kuruma",
    category: "ORIGIN",
    categoryIndex: 1,
    categoryTitleTh: "1. ประเทศผู้ผลิต (แสดงรูป)",
    categoryTitleJa: "生産国の確認",
    questionJa: "Kore wa doko no jidōsha desuka?",
    questionRomaji: "Kore wa doko no jidōsha desuka?",
    questionTh: "สิ่งนี้คือรถยนต์ของประเทศใด? (ญี่ปุ่น)",
    displayLabel: "สินค้า + สัญชาติ",
    displayValue: "รถยนต์ญี่ปุ่น (日本の自動車)",
    displaySubtext: "ภาพรถยนต์ + ธงชาติญี่ปุ่น",
    expectedAnswerJa: "Kore wa nihon no jidōsha desu.",
    expectedAnswerRomaji: "Kore wa nihon no jidōsha desu.",
    keywords: [
      "kore wa nihon no jidousha desu",
      "kore wa nihon no jidosha desu",
      "kore wa nihon no kuruma desu",
      "nihon no jidousha desu",
      "nihon no kuruma desu",
      "nihon no jidousha",
      "nihon no kuruma",
      "にほんのじどうしゃ",
      "にほんのくるま",
      "日本の自動車",
      "日本の車",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa nihon no jidōsha desu. (หรือ kuruma)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Japan Flag -->
      <g transform="translate(25, 30)">
        <rect width="60" height="45" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>
        <circle cx="30" cy="22.5" r="12" fill="#DC2626"/>
      </g>
      <!-- Plus sign -->
      <text x="100" y="58" font-family="sans-serif" font-size="24" font-weight="900" fill="#0F172A" text-anchor="middle">+</text>
      <!-- Car Icon -->
      <g transform="translate(115, 25)">
        <path d="M5 40 L15 25 L45 25 L55 40 L60 45 L60 55 L5 55 Z" fill="#3B82F6" stroke="#0F172A" stroke-width="2"/>
        <circle cx="18" cy="55" r="8" fill="#1E293B" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="47" cy="55" r="8" fill="#1E293B" stroke="#FFFFFF" stroke-width="2"/>
      </g>
      <!-- Label -->
      <rect x="20" y="145" width="160" height="32" rx="8" fill="#2563EB" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="166" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">日本 + 自動車 (Nihon + Jidōsha)</text>
    </svg>`,
  },
  {
    id: "e3_q1_itaria_wain",
    category: "ORIGIN",
    categoryIndex: 1,
    categoryTitleTh: "1. ประเทศผู้ผลิต (แสดงรูป)",
    categoryTitleJa: "生産国の確認",
    questionJa: "Kore wa doko no wain desuka?",
    questionRomaji: "Kore wa doko no wain desuka?",
    questionTh: "สิ่งนี้คือไวน์ของประเทศใด? (อิตาลี)",
    displayLabel: "สินค้า + สัญชาติ",
    displayValue: "ไวน์อิตาลี (イタリアのワイン)",
    displaySubtext: "ภาพขวดไวน์ + ธงชาติอิตาลี",
    expectedAnswerJa: "Kore wa itaria no wain desu.",
    expectedAnswerRomaji: "Kore wa itaria no wain desu.",
    keywords: [
      "kore wa itaria no wain desu",
      "itaria no wain desu",
      "itaria no wain",
      "イタリアのワイン",
      "いたりあのわいん",
      "いたりあのわいんです",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa itaria no wain desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Italy Flag -->
      <g transform="translate(25, 30)">
        <rect width="60" height="45" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>
        <rect x="0" y="0" width="20" height="45" rx="4" fill="#16A34A"/>
        <rect x="40" y="0" width="20" height="45" rx="4" fill="#DC2626"/>
      </g>
      <text x="100" y="58" font-family="sans-serif" font-size="24" font-weight="900" fill="#0F172A" text-anchor="middle">+</text>
      <!-- Wine Bottle -->
      <g transform="translate(130, 15)">
        <rect x="12" y="10" width="8" height="20" fill="#78350F"/>
        <path d="M10 30 Q5 45 5 80 L27 80 Q27 45 22 30 Z" fill="#831843" stroke="#0F172A" stroke-width="2"/>
      </g>
      <rect x="20" y="145" width="160" height="32" rx="8" fill="#831843" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="166" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">イタリア + ワイン (Itaria + Wain)</text>
    </svg>`,
  },
  {
    id: "e3_q1_doitsu_kamera",
    category: "ORIGIN",
    categoryIndex: 1,
    categoryTitleTh: "1. ประเทศผู้ผลิต (แสดงรูป)",
    categoryTitleJa: "生産国の確認",
    questionJa: "Kore wa doko no kamera desuka?",
    questionRomaji: "Kore wa doko no kamera desuka?",
    questionTh: "สิ่งนี้คือกล้องถ่ายรูปของประเทศใด? (เยอรมนี)",
    displayLabel: "สินค้า + สัญชาติ",
    displayValue: "กล้องถ่ายรูปเยอรมนี (ドイツのカメラ)",
    displaySubtext: "ภาพกล้องถ่ายรูป + ธงชาติเยอรมนี",
    expectedAnswerJa: "Kore wa doitsu no kamera desu.",
    expectedAnswerRomaji: "Kore wa doitsu no kamera desu.",
    keywords: [
      "kore wa doitsu no kamera desu",
      "doitsu no kamera desu",
      "doitsu no kamera",
      "ドイツのカメラ",
      "どいつのかめら",
      "どいつのかめらです",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa doitsu no kamera desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Germany Flag -->
      <g transform="translate(25, 30)">
        <rect width="60" height="45" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>
        <rect x="0" y="0" width="60" height="15" rx="2" fill="#0F172A"/>
        <rect x="0" y="15" width="60" height="15" fill="#DC2626"/>
        <rect x="0" y="30" width="60" height="15" rx="2" fill="#FBBF24"/>
      </g>
      <text x="100" y="58" font-family="sans-serif" font-size="24" font-weight="900" fill="#0F172A" text-anchor="middle">+</text>
      <!-- Camera -->
      <g transform="translate(120, 25)">
        <rect x="5" y="15" width="50" height="35" rx="6" fill="#334155" stroke="#0F172A" stroke-width="2"/>
        <circle cx="30" cy="32" r="12" fill="#64748B" stroke="#0F172A" stroke-width="2"/>
        <circle cx="30" cy="32" r="6" fill="#0EA5E9"/>
      </g>
      <rect x="20" y="145" width="160" height="32" rx="8" fill="#334155" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="166" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">ドイツ + カメラ (Doitsu + Kamera)</text>
    </svg>`,
  },
  {
    id: "e3_q1_amerika_konpyuta",
    category: "ORIGIN",
    categoryIndex: 1,
    categoryTitleTh: "1. ประเทศผู้ผลิต (แสดงรูป)",
    categoryTitleJa: "生産国の確認",
    questionJa: "Kore wa doko no konpyūtā desuka?",
    questionRomaji: "Kore wa doko no konpyūtā desuka?",
    questionTh: "สิ่งนี้คือคอมพิวเตอร์ของประเทศใด? (อเมริกา)",
    displayLabel: "สินค้า + สัญชาติ",
    displayValue: "คอมพิวเตอร์อเมริกา (アメリカのコンピューター)",
    displaySubtext: "ภาพคอมพิวเตอร์โน้ตบุ๊ก + ธงชาติสหรัฐฯ",
    expectedAnswerJa: "Kore wa amerika no konpyūtā desu.",
    expectedAnswerRomaji: "Kore wa amerika no konpyūtā desu.",
    keywords: [
      "kore wa amerika no konpyuta desu",
      "kore wa amerika no konpyuutaa desu",
      "kore wa amerika no pasokon desu",
      "amerika no konpyuta desu",
      "amerika no pasokon desu",
      "amerika no konpyuta",
      "アメリカのコンピューター",
      "あめりかのこんぴゅーたー",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa amerika no konpyūtā desu. (หรือ pasokon)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- USA Flag simplistic -->
      <g transform="translate(25, 30)">
        <rect width="60" height="45" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>
        <line x1="0" y1="9" x2="60" y2="9" stroke="#DC2626" stroke-width="4"/>
        <line x1="0" y1="21" x2="60" y2="21" stroke="#DC2626" stroke-width="4"/>
        <line x1="0" y1="33" x2="60" y2="33" stroke="#DC2626" stroke-width="4"/>
        <rect x="0" y="0" width="28" height="25" fill="#1D4ED8"/>
      </g>
      <text x="100" y="58" font-family="sans-serif" font-size="24" font-weight="900" fill="#0F172A" text-anchor="middle">+</text>
      <!-- Laptop -->
      <g transform="translate(120, 25)">
        <rect x="8" y="10" width="44" height="30" rx="4" fill="#475569" stroke="#0F172A" stroke-width="2"/>
        <rect x="12" y="14" width="36" height="22" fill="#0284C7"/>
        <polygon points="3,44 57,44 53,49 7,49" fill="#94A3B8" stroke="#0F172A" stroke-width="1.5"/>
      </g>
      <rect x="20" y="145" width="160" height="32" rx="8" fill="#1D4ED8" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="166" font-family="sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">アメリカ + PC (Amerika + Konpyūtā)</text>
    </svg>`,
  },
  {
    id: "e3_q1_tai_tshatsu",
    category: "ORIGIN",
    categoryIndex: 1,
    categoryTitleTh: "1. ประเทศผู้ผลิต (แสดงรูป)",
    categoryTitleJa: "生産国の確認",
    questionJa: "Kore wa doko no T-shatsu desuka?",
    questionRomaji: "Kore wa doko no T-shatsu desuka?",
    questionTh: "สิ่งนี้คือเสื้อยืดของประเทศใด? (ไทย)",
    displayLabel: "สินค้า + สัญชาติ",
    displayValue: "เสื้อยืดไทย (タイのTシャツ)",
    displaySubtext: "ภาพเสื้อยืด + ธงชาติไทย",
    expectedAnswerJa: "Kore wa tai no T-shatsu desu.",
    expectedAnswerRomaji: "Kore wa tai no T-shatsu desu.",
    keywords: [
      "kore wa tai no tshatsu desu",
      "kore wa tai no tiishatsu desu",
      "tai no tshatsu desu",
      "tai no tshatsu",
      "タイのTシャツ",
      "たいのてぃーしゃつ",
      "たいのてぃーしゃつです",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa tai no T-shatsu desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Thai Flag -->
      <g transform="translate(25, 30)">
        <rect width="60" height="45" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>
        <rect x="0" y="0" width="60" height="8" rx="2" fill="#DC2626"/>
        <rect x="0" y="37" width="60" height="8" rx="2" fill="#DC2626"/>
        <rect x="0" y="15" width="60" height="15" fill="#1E3A8A"/>
      </g>
      <text x="100" y="58" font-family="sans-serif" font-size="24" font-weight="900" fill="#0F172A" text-anchor="middle">+</text>
      <!-- T-Shirt -->
      <g transform="translate(125, 20)">
        <path d="M15 15 L25 5 L35 15 L45 5 L55 15 L48 25 L45 22 L45 55 L15 55 L15 22 L12 25 Z" fill="#0284C7" stroke="#0F172A" stroke-width="2"/>
      </g>
      <rect x="20" y="145" width="160" height="32" rx="8" fill="#1E3A8A" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="166" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">タイ + Tシャツ (Tai + T-shatsu)</text>
    </svg>`,
  },

  // =========================================================================
  // หมวดที่ 2: คุณศัพท์สี / ขนาด (Kore wa nan desuka?)
  // =========================================================================
  {
    id: "e3_q2_chiisai_tokei",
    category: "ADJECTIVE",
    categoryIndex: 2,
    categoryTitleTh: "2. คุณศัพท์สี / ขนาด (แสดงรูป)",
    categoryTitleJa: "物の特徴",
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "สิ่งนี้คืออะไร? (นาฬิกาเรือนเล็ก)",
    displayLabel: "ขนาด + สิ่งของ",
    displayValue: "นาฬิกาเรือนเล็ก (小さな時計)",
    displaySubtext: "ภาพนาฬิกาเรือนขนาดกะทัดรัด/เล็ก (ตรงตามสไลด์หน้า 6)",
    expectedAnswerJa: "Kore wa chiisai tokei desu.",
    expectedAnswerRomaji: "Kore wa chiisai tokei desu.",
    keywords: [
      "kore wa chiisai tokei desu",
      "chiisai tokei desu",
      "chiisai tokei",
      "ちいさいとけいです",
      "ちいさいとけい",
      "小さい時計",
      "小さい時計です",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa chiisai tokei desu. (คุณศัพท์ + คำนาม + desu)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Tiny Watch -->
      <g transform="translate(85, 45)">
        <rect x="10" y="0" width="10" height="50" rx="2" fill="#475569"/>
        <circle cx="15" cy="25" r="14" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>
        <line x1="15" y1="25" x2="15" y2="17" stroke="#0F172A" stroke-width="1.5"/>
        <line x1="15" y1="25" x2="20" y2="25" stroke="#DC2626" stroke-width="1"/>
      </g>
      <!-- Dimension badge -->
      <rect x="40" y="125" width="120" height="26" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
      <text x="100" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="#64748B" text-anchor="middle">🔍 ขนาดเล็ก (Chiisai)</text>
      <rect x="20" y="158" width="160" height="30" rx="8" fill="#0EA5E9" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="178" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">小さい時計 (Chiisai tokei)</text>
    </svg>`,
  },
  {
    id: "e3_q2_okii_kasa",
    category: "ADJECTIVE",
    categoryIndex: 2,
    categoryTitleTh: "2. คุณศัพท์สี / ขนาด (แสดงรูป)",
    categoryTitleJa: "物の特徴",
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "สิ่งนี้คืออะไร? (ร่มคันใหญ่)",
    displayLabel: "ขนาด + สิ่งของ",
    displayValue: "ร่มคันใหญ่ (大きな傘)",
    displaySubtext: "ภาพร่มกางคันใหญ่ (ตรงตามสไลด์หน้า 7)",
    expectedAnswerJa: "Kore wa ōkii kasa desu.",
    expectedAnswerRomaji: "Kore wa ōkii kasa desu.",
    keywords: [
      "kore wa okii kasa desu",
      "kore wa ookii kasa desu",
      "okii kasa desu",
      "ookii kasa desu",
      "okii kasa",
      "ookii kasa",
      "おおきいかさです",
      "おおきいかさ",
      "大きい傘",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa ōkii kasa desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Giant Umbrella -->
      <g transform="translate(30, 20)">
        <path d="M10 70 Q70 5 130 70 Z" fill="#0284C7" stroke="#0F172A" stroke-width="3"/>
        <line x1="70" y1="70" x2="70" y2="115" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
        <path d="M70 115 Q70 125 62 125 Q54 125 54 117" stroke="#78350F" stroke-width="4" fill="none" stroke-linecap="round"/>
      </g>
      <rect x="40" y="125" width="120" height="26" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
      <text x="100" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="#64748B" text-anchor="middle">☂️ ขนาดใหญ่ (Ōkii)</text>
      <rect x="20" y="158" width="160" height="30" rx="8" fill="#0284C7" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="178" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">大きい傘 (Ōkii kasa)</text>
    </svg>`,
  },
  {
    id: "e3_q2_kuroi_kasa",
    category: "ADJECTIVE",
    categoryIndex: 2,
    categoryTitleTh: "2. คุณศัพท์สี / ขนาด (แสดงรูป)",
    categoryTitleJa: "物の特徴",
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "สิ่งนี้คืออะไร? (ร่มสีดำ)",
    displayLabel: "สี + สิ่งของ",
    displayValue: "ร่มสีดำ (黒い傘)",
    displaySubtext: "ภาพร่มกางสีดำสนิท (ตรงตามสไลด์หน้า 7)",
    expectedAnswerJa: "Kore wa kuroi kasa desu.",
    expectedAnswerRomaji: "Kore wa kuroi kasa desu.",
    keywords: [
      "kore wa kuroi kasa desu",
      "kuroi kasa desu",
      "kuroi kasa",
      "くろいかさです",
      "くろいかさ",
      "黒い傘",
      "黒い傘です",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa kuroi kasa desu. (หรือตอบตามขนาด: Kore wa ōkii kasa desu.)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Black Umbrella -->
      <g transform="translate(30, 20)">
        <path d="M10 70 Q70 5 130 70 Z" fill="#0F172A" stroke="#000000" stroke-width="3"/>
        <line x1="70" y1="70" x2="70" y2="115" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
        <path d="M70 115 Q70 125 62 125 Q54 125 54 117" stroke="#78350F" stroke-width="4" fill="none" stroke-linecap="round"/>
      </g>
      <rect x="40" y="125" width="120" height="26" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
      <text x="100" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="#64748B" text-anchor="middle">⬛ สีดำ (Kuroi)</text>
      <rect x="20" y="158" width="160" height="30" rx="8" fill="#0F172A" stroke="#000000" stroke-width="2"/>
      <text x="100" y="178" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">黒い傘 (Kuroi kasa)</text>
    </svg>`,
  },
  {
    id: "e3_q2_aoi_enpitsu",
    category: "ADJECTIVE",
    categoryIndex: 2,
    categoryTitleTh: "2. คุณศัพท์สี / ขนาด (แสดงรูป)",
    categoryTitleJa: "物の特徴",
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "สิ่งนี้คืออะไร? (ดินสอสีฟ้า / สีน้ำเงิน)",
    displayLabel: "สี + สิ่งของ",
    displayValue: "ดินสอสีฟ้า (青い鉛筆)",
    displaySubtext: "ภาพแท่งดินสอสีฟ้าสดใส (ตรงตามสไลด์หน้า 8)",
    expectedAnswerJa: "Kore wa aoi enpitsu desu.",
    expectedAnswerRomaji: "Kore wa aoi enpitsu desu.",
    keywords: [
      "kore wa aoi enpitsu desu",
      "aoi enpitsu desu",
      "aoi enpitsu",
      "あおいえんぴつです",
      "あおいえんぴつ",
      "青い鉛筆",
      "青い鉛筆です",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa aoi enpitsu desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Blue Pencil angled -->
      <g transform="translate(60, 20) rotate(35)">
        <polygon points="10,120 15,135 20,120" fill="#FDE68A" stroke="#0F172A" stroke-width="1.5"/>
        <polygon points="13,130 15,135 17,130" fill="#0F172A"/>
        <rect x="10" y="15" width="10" height="105" fill="#0284C7" stroke="#0F172A" stroke-width="1.5"/>
        <rect x="10" y="5" width="10" height="10" fill="#94A3B8" stroke="#0F172A" stroke-width="1.5"/>
        <rect x="10" y="0" width="10" height="5" rx="2" fill="#F43F5E"/>
      </g>
      <rect x="40" y="125" width="120" height="26" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
      <text x="100" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="#0284C7" text-anchor="middle">🟦 สีฟ้า (Aoi)</text>
      <rect x="20" y="158" width="160" height="30" rx="8" fill="#0284C7" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="178" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">青い鉛筆 (Aoi enpitsu)</text>
    </svg>`,
  },
  {
    id: "e3_q2_akai_kaban",
    category: "ADJECTIVE",
    categoryIndex: 2,
    categoryTitleTh: "2. คุณศัพท์สี / ขนาด (แสดงรูป)",
    categoryTitleJa: "物の特徴",
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "สิ่งนี้คืออะไร? (กระเป๋าสีแดง)",
    displayLabel: "สี + สิ่งของ",
    displayValue: "กระเป๋าสีแดง (赤い鞄)",
    displaySubtext: "ภาพกระเป๋าถือสีแดง",
    expectedAnswerJa: "Kore wa akai kaban desu.",
    expectedAnswerRomaji: "Kore wa akai kaban desu.",
    keywords: [
      "kore wa akai kaban desu",
      "akai kaban desu",
      "akai kaban",
      "あかいかばんです",
      "あかいかばん",
      "赤い鞄",
      "赤いかばん",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa akai kaban desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Red Bag -->
      <g transform="translate(60, 30)">
        <path d="M25 35 Q40 10 55 35" stroke="#78350F" stroke-width="4" fill="none"/>
        <rect x="10" y="35" width="60" height="50" rx="10" fill="#DC2626" stroke="#0F172A" stroke-width="2.5"/>
        <rect x="35" y="45" width="10" height="8" rx="2" fill="#FBBF24"/>
      </g>
      <rect x="40" y="125" width="120" height="26" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
      <text x="100" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="#DC2626" text-anchor="middle">🟥 สีแดง (Akai)</text>
      <rect x="20" y="158" width="160" height="30" rx="8" fill="#DC2626" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="178" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">赤い鞄 (Akai kaban)</text>
    </svg>`,
  },
  {
    id: "e3_q2_shiroi_tshatsu",
    category: "ADJECTIVE",
    categoryIndex: 2,
    categoryTitleTh: "2. คุณศัพท์สี / ขนาด (แสดงรูป)",
    categoryTitleJa: "物の特徴",
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "สิ่งนี้คืออะไร? (เสื้อยืดสีขาว)",
    displayLabel: "สี + สิ่งของ",
    displayValue: "เสื้อยืดสีขาว (白いTシャツ)",
    displaySubtext: "ภาพเสื้อยืดสีขาวสะอาด",
    expectedAnswerJa: "Kore wa shiroi T-shatsu desu.",
    expectedAnswerRomaji: "Kore wa shiroi T-shatsu desu.",
    keywords: [
      "kore wa shiroi tshatsu desu",
      "kore wa shiroi tiishatsu desu",
      "shiroi tshatsu desu",
      "shiroi tshatsu",
      "しろいてぃーしゃつです",
      "しろいてぃーしゃつ",
      "白いTシャツ",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa shiroi T-shatsu desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F1F5F9"/>
      <!-- White T-Shirt -->
      <g transform="translate(65, 30)">
        <path d="M20 20 L35 8 L50 20 L65 8 L80 20 L72 32 L68 28 L68 75 L20 75 L20 28 L16 32 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>
      </g>
      <rect x="40" y="125" width="120" height="26" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
      <text x="100" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="#475569" text-anchor="middle">⬜ สีขาว (Shiroi)</text>
      <rect x="20" y="158" width="160" height="30" rx="8" fill="#475569" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="178" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">白いTシャツ (Shiroi T-shatsu)</text>
    </svg>`,
  },
  {
    id: "e3_q2_kiiroi_hon",
    category: "ADJECTIVE",
    categoryIndex: 2,
    categoryTitleTh: "2. คุณศัพท์สี / ขนาด (แสดงรูป)",
    categoryTitleJa: "物の特徴",
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "สิ่งนี้คืออะไร? (หนังสือเล่มสีเหลือง)",
    displayLabel: "สี + สิ่งของ",
    displayValue: "หนังสือสีเหลือง (黄色い本)",
    displaySubtext: "ภาพปกหนังสือสีเหลือง",
    expectedAnswerJa: "Kore wa kiiroi hon desu.",
    expectedAnswerRomaji: "Kore wa kiiroi hon desu.",
    keywords: [
      "kore wa kiiroi hon desu",
      "kiiroi hon desu",
      "kiiroi hon",
      "きいろいほんです",
      "きいろいほん",
      "黄色い本",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Kore wa kiiroi hon desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Yellow Book -->
      <g transform="translate(65, 30)">
        <rect x="10" y="10" width="55" height="70" rx="4" fill="#EAB308" stroke="#0F172A" stroke-width="2.5"/>
        <line x1="20" y1="10" x2="20" y2="80" stroke="#CA8A04" stroke-width="3"/>
        <rect x="26" y="25" width="30" height="15" rx="2" fill="#FEF08A"/>
      </g>
      <rect x="40" y="125" width="120" height="26" rx="6" fill="#FEF08A" stroke="#EAB308" stroke-width="1"/>
      <text x="100" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="#854D0E" text-anchor="middle">🟨 สีเหลือง (Kiiroi)</text>
      <rect x="20" y="158" width="160" height="30" rx="8" fill="#EAB308" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="178" font-family="sans-serif" font-size="12" font-weight="900" fill="#0F172A" text-anchor="middle">黄色い本 (Kiiroi hon)</text>
    </svg>`,
  },

  // =========================================================================
  // หมวดที่ 3: สั่งซื้อสินค้าตามจำนวนในภาพ (Sono .. o .. kudasai)
  // =========================================================================
  {
    id: "e3_q3_ringo_6",
    category: "ORDER",
    categoryIndex: 3,
    categoryTitleTh: "3. สั่งซื้อสินค้าตามจำนวนในภาพ",
    categoryTitleJa: "注文 (いらっしゃいませ)",
    questionJa: "いらっしゃいませ！ (Irasshaimase!)",
    questionRomaji: "Irasshaimase!",
    questionTh: "ยินดีต้อนรับครับ/ค่ะ! รับอะไรดีครับ? (แอปเปิ้ล 6 ผล)",
    displayLabel: "สินค้า + จำนวน",
    displayValue: "แอปเปิ้ล 6 ผล (りんご 6個)",
    displaySubtext: "ภาพแอปเปิ้ลสีแดง 6 ผล (ตรงตามสไลด์หน้า 10)",
    expectedAnswerJa: "Sono ringo o muttsu kudasai.",
    expectedAnswerRomaji: "Sono ringo o muttsu kudasai.",
    keywords: [
      "sono ringo o muttsu kudasai",
      "sono ringo wo muttsu kudasai",
      "ringo o muttsu kudasai",
      "ringo wo muttsu kudasai",
      "ringo muttsu kudasai",
      "muttsu kudasai",
      "そのりんごをむっつください",
      "りんごをむっつください",
      "そのリンゴを6つください",
    ],
    ruleNoteTh: "ใช้โครงสร้าง: Sono ringo o muttsu kudasai. (Sono + คำนาม + o + จำนวน tsu + kudasai)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Badge count: 6 -->
      <circle cx="170" cy="30" r="18" fill="#DC2626"/>
      <text x="170" y="37" font-family="sans-serif" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle">6</text>
      <!-- 6 Apples: 3 top, 3 bottom -->
      <g transform="translate(30, 40)">
        <!-- Top 3 -->
        <circle cx="25" cy="25" r="16" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
        <path d="M25 10 Q28 5 32 6" stroke="#15803D" stroke-width="2" fill="none"/>
        <circle cx="70" cy="25" r="16" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
        <path d="M70 10 Q73 5 77 6" stroke="#15803D" stroke-width="2" fill="none"/>
        <circle cx="115" cy="25" r="16" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
        <path d="M115 10 Q118 5 122 6" stroke="#15803D" stroke-width="2" fill="none"/>
        <!-- Bottom 3 -->
        <circle cx="25" cy="65" r="16" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
        <path d="M25 50 Q28 45 32 46" stroke="#15803D" stroke-width="2" fill="none"/>
        <circle cx="70" cy="65" r="16" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
        <path d="M70 50 Q73 45 77 46" stroke="#15803D" stroke-width="2" fill="none"/>
        <circle cx="115" cy="65" r="16" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
        <path d="M115 50 Q118 45 122 46" stroke="#15803D" stroke-width="2" fill="none"/>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#DC2626" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">りんご 6個 (Muttsu)</text>
    </svg>`,
  },
  {
    id: "e3_q3_tshatsu_2",
    category: "ORDER",
    categoryIndex: 3,
    categoryTitleTh: "3. สั่งซื้อสินค้าตามจำนวนในภาพ",
    categoryTitleJa: "注文 (いらっしゃいませ)",
    questionJa: "いらっしゃいませ！ (Irasshaimase!)",
    questionRomaji: "Irasshaimase!",
    questionTh: "ยินดีต้อนรับครับ/ค่ะ! รับอะไรดีครับ? (เสื้อยืด 2 ตัว)",
    displayLabel: "สินค้า + จำนวน",
    displayValue: "เสื้อยืด 2 ตัว (Tシャツ 2枚)",
    displaySubtext: "ภาพเสื้อยืดสีน้ำเงิน 2 ตัว (ตรงตามสไลด์หน้า 11)",
    expectedAnswerJa: "Sono T-shatsu o ni-mai kudasai.",
    expectedAnswerRomaji: "Sono T-shatsu o ni-mai kudasai.",
    keywords: [
      "sono tshatsu o nimai kudasai",
      "sono tshatsu wo nimai kudasai",
      "sono tiishatsu o nimai kudasai",
      "tshatsu o nimai kudasai",
      "tshatsu nimai kudasai",
      "nimai kudasai",
      "そのtしゃつをにまいください",
      "そのTシャツを2枚ください",
    ],
    ruleNoteTh: "ใช้โครงสร้าง: Sono T-shatsu o ni-mai kudasai. (ลักษณนามเสื้อผ้า/ของแบน: -mai)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <circle cx="170" cy="30" r="18" fill="#1D4ED8"/>
      <text x="170" y="37" font-family="sans-serif" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle">2</text>
      <!-- 2 T-Shirts -->
      <g transform="translate(35, 45)">
        <!-- Shirt 1 -->
        <g transform="translate(0, 0)">
          <path d="M12 12 L20 4 L28 12 L36 4 L44 12 L38 20 L35 18 L35 50 L12 50 L12 18 L9 20 Z" fill="#1D4ED8" stroke="#0F172A" stroke-width="2"/>
        </g>
        <!-- Shirt 2 -->
        <g transform="translate(70, 0)">
          <path d="M12 12 L20 4 L28 12 L36 4 L44 12 L38 20 L35 18 L35 50 L12 50 L12 18 L9 20 Z" fill="#1D4ED8" stroke="#0F172A" stroke-width="2"/>
        </g>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#1D4ED8" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">Tシャツ 2枚 (Ni-mai)</text>
    </svg>`,
  },
  {
    id: "e3_q3_biiru_10",
    category: "ORDER",
    categoryIndex: 3,
    categoryTitleTh: "3. สั่งซื้อสินค้าตามจำนวนในภาพ",
    categoryTitleJa: "注文 (いらっしゃいませ)",
    questionJa: "いらっしゃいませ！ (Irasshaimase!)",
    questionRomaji: "Irasshaimase!",
    questionTh: "ยินดีต้อนรับครับ/ค่ะ! รับอะไรดีครับ? (เบียร์ 10 ขวด)",
    displayLabel: "สินค้า + จำนวน",
    displayValue: "เบียร์ 10 ขวด (ビール 10本)",
    displaySubtext: "ภาพเบียร์ 10 ขวด (ตรงตามสไลด์หน้า 12)",
    expectedAnswerJa: "Sono bīru o juppon kudasai.",
    expectedAnswerRomaji: "Sono bīru o juppon kudasai.",
    keywords: [
      "sono biiru o juppon kudasai",
      "sono biiru wo juppon kudasai",
      "sono biiru o jippon kudasai",
      "biiru o juppon kudasai",
      "biiru juppon kudasai",
      "juppon kudasai",
      "jippon kudasai",
      "そのビールをじゅっぽんください",
      "そのビールを10本ください",
    ],
    ruleNoteTh: "ใช้โครงสร้าง: Sono bīru o juppon kudasai. (ลักษณนามทรงกระบอก: -hon/bon/pon)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <circle cx="170" cy="30" r="18" fill="#D97706"/>
      <text x="170" y="37" font-family="sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">10</text>
      <!-- Row of bottles -->
      <g transform="translate(25, 45)">
        <rect x="0" y="10" width="130" height="75" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
        <text x="65" y="45" font-family="sans-serif" font-size="28" font-weight="900" fill="#92400E" text-anchor="middle">🍺 x 10</text>
        <text x="65" y="70" font-family="sans-serif" font-size="12" font-weight="900" fill="#B45309" text-anchor="middle">BEER (10本)</text>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#D97706" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">ビール 10本 (Juppon)</text>
    </svg>`,
  },
  {
    id: "e3_q3_mikan_3",
    category: "ORDER",
    categoryIndex: 3,
    categoryTitleTh: "3. สั่งซื้อสินค้าตามจำนวนในภาพ",
    categoryTitleJa: "注文 (いらっしゃいませ)",
    questionJa: "いらっしゃいませ！ (Irasshaimase!)",
    questionRomaji: "Irasshaimase!",
    questionTh: "ยินดีต้อนรับครับ/ค่ะ! รับอะไรดีครับ? (ส้ม 3 ผล)",
    displayLabel: "สินค้า + จำนวน",
    displayValue: "ส้ม 3 ผล (みかん 3個)",
    displaySubtext: "ภาพส้มสีส้ม 3 ผล",
    expectedAnswerJa: "Sono mikan o mittsu kudasai.",
    expectedAnswerRomaji: "Sono mikan o mittsu kudasai.",
    keywords: [
      "sono mikan o mittsu kudasai",
      "sono mikan wo mittsu kudasai",
      "mikan o mittsu kudasai",
      "mikan mittsu kudasai",
      "mittsu kudasai",
      "そのみかんをみっつください",
      "みかんを3つください",
    ],
    ruleNoteTh: "ใช้โครงสร้าง: Sono mikan o mittsu kudasai. (ลักษณนามของกลม: mittsu)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <circle cx="170" cy="30" r="18" fill="#EA580C"/>
      <text x="170" y="37" font-family="sans-serif" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle">3</text>
      <!-- 3 Oranges -->
      <g transform="translate(30, 50)">
        <circle cx="30" cy="40" r="20" fill="#F97316" stroke="#EA580C" stroke-width="2"/>
        <circle cx="30" cy="22" r="3" fill="#15803D"/>
        <circle cx="70" cy="40" r="20" fill="#F97316" stroke="#EA580C" stroke-width="2"/>
        <circle cx="70" cy="22" r="3" fill="#15803D"/>
        <circle cx="110" cy="40" r="20" fill="#F97316" stroke="#EA580C" stroke-width="2"/>
        <circle cx="110" cy="22" r="3" fill="#15803D"/>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#EA580C" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">みかん 3個 (Mittsu)</text>
    </svg>`,
  },
  {
    id: "e3_q3_wain_1",
    category: "ORDER",
    categoryIndex: 3,
    categoryTitleTh: "3. สั่งซื้อสินค้าตามจำนวนในภาพ",
    categoryTitleJa: "注文 (いらっしゃいませ)",
    questionJa: "いらっしゃいませ！ (Irasshaimase!)",
    questionRomaji: "Irasshaimase!",
    questionTh: "ยินดีต้อนรับครับ/ค่ะ! รับอะไรดีครับ? (ไวน์ 1 ขวด)",
    displayLabel: "สินค้า + จำนวน",
    displayValue: "ไวน์ 1 ขวด (ワイン 1本)",
    displaySubtext: "ภาพขวดไวน์ 1 ขวด",
    expectedAnswerJa: "Sono wain o ippon kudasai.",
    expectedAnswerRomaji: "Sono wain o ippon kudasai.",
    keywords: [
      "sono wain o ippon kudasai",
      "sono wain wo ippon kudasai",
      "wain o ippon kudasai",
      "wain ippon kudasai",
      "ippon kudasai",
      "そのわいんをいっぽんください",
      "そのワインを1本ください",
    ],
    ruleNoteTh: "ใช้โครงสร้าง: Sono wain o ippon kudasai. (1 ขวด: ippon)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <circle cx="170" cy="30" r="18" fill="#831843"/>
      <text x="170" y="37" font-family="sans-serif" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle">1</text>
      <!-- 1 Bottle of wine -->
      <g transform="translate(85, 30)">
        <rect x="11" y="5" width="8" height="20" fill="#78350F"/>
        <path d="M9 25 Q4 40 4 85 L26 85 Q26 40 21 25 Z" fill="#831843" stroke="#0F172A" stroke-width="2"/>
        <rect x="6" y="45" width="18" height="22" fill="#FDE68A"/>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#831843" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">ワイン 1本 (Ippon)</text>
    </svg>`,
  },

  // =========================================================================
  // หมวดที่ 4: อ่านวันและเดือนตามที่เห็น (Kore wa nan gatsu nan nichi desuka?)
  // สำคัญ!! ต้องเรียงจาก เดือน > วันที่
  // =========================================================================
  {
    id: "e3_q4_sep_21",
    category: "DATE_READING",
    categoryIndex: 4,
    categoryTitleTh: "4. อ่านวันและเดือนตามที่เห็น",
    categoryTitleJa: "日付の読み方",
    questionJa: "Kore wa nan gatsu nan nichi desuka?",
    questionRomaji: "Kore wa nan gatsu nan nichi desuka?",
    questionTh: "นี่คือวันที่และเดือนอะไร? (21 กันยายน)",
    displayLabel: "วันที่และเดือน",
    displayValue: "21 กันยายน (9月21日)",
    displaySubtext: "ข้อความวันที่: 21 กันยายน (ตรงตามสไลด์หน้า 13)",
    expectedAnswerJa: "Kugatsu nijūichinichi desu.",
    expectedAnswerRomaji: "Kugatsu nijūichinichi desu.",
    keywords: [
      "kugatsu nijuuichinichi desu",
      "kugatsu nijuichinichi desu",
      "kugatsu nijuuichinichi",
      "kugatsu nijuichinichi",
      "9がつ21にち",
      "くがつ にじゅういちにち",
      "九月二十一日",
      "9月21日",
    ],
    ruleNoteTh: "สำคัญ!! เรียงจาก เดือน > วันที่: Kugatsu nijūichinichi desu. (กันยายน = Kugatsu)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Calendar Page -->
      <g transform="translate(30, 25)">
        <rect width="140" height="110" rx="12" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
        <rect width="140" height="32" rx="12" fill="#DC2626"/>
        <rect y="22" width="140" height="10" fill="#DC2626"/>
        <text x="70" y="22" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">กันยายน (9月)</text>
        <text x="70" y="85" font-family="sans-serif" font-size="44" font-weight="900" fill="#0F172A" text-anchor="middle">21</text>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#DC2626" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">Kugatsu nijūichi-nichi</text>
    </svg>`,
  },
  {
    id: "e3_q4_feb_6",
    category: "DATE_READING",
    categoryIndex: 4,
    categoryTitleTh: "4. อ่านวันและเดือนตามที่เห็น",
    categoryTitleJa: "日付の読み方",
    questionJa: "Kore wa nan gatsu nan nichi desuka?",
    questionRomaji: "Kore wa nan gatsu nan nichi desuka?",
    questionTh: "นี่คือวันที่และเดือนอะไร? (6 กุมภาพันธ์)",
    displayLabel: "วันที่และเดือน",
    displayValue: "6 กุมภาพันธ์ (2月6日)",
    displaySubtext: "ข้อความวันที่: 6 กุมภาพันธ์ (ตรงตามสไลด์หน้า 13)",
    expectedAnswerJa: "Nigatsu muika desu.",
    expectedAnswerRomaji: "Nigatsu muika desu.",
    keywords: [
      "nigatsu muika desu",
      "nigatsu muika",
      "2がつ6にち",
      "2がつむいか",
      "にがつ むいか",
      "にがつむいかです",
      "二月六日",
      "2月6日",
    ],
    ruleNoteTh: "สำคัญ!! เรียงจาก เดือน > วันที่: Nigatsu muika desu. (วันที่ 6 = Muika ออกเสียงพิเศษ)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Calendar Page -->
      <g transform="translate(30, 25)">
        <rect width="140" height="110" rx="12" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
        <rect width="140" height="32" rx="12" fill="#2563EB"/>
        <rect y="22" width="140" height="10" fill="#2563EB"/>
        <text x="70" y="22" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">กุมภาพันธ์ (2月)</text>
        <text x="70" y="85" font-family="sans-serif" font-size="44" font-weight="900" fill="#0F172A" text-anchor="middle">6</text>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#2563EB" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">Nigatsu muika desu</text>
    </svg>`,
  },
  {
    id: "e3_q4_jan_1",
    category: "DATE_READING",
    categoryIndex: 4,
    categoryTitleTh: "4. อ่านวันและเดือนตามที่เห็น",
    categoryTitleJa: "日付の読み方",
    questionJa: "Kore wa nan gatsu nan nichi desuka?",
    questionRomaji: "Kore wa nan gatsu nan nichi desuka?",
    questionTh: "นี่คือวันที่และเดือนอะไร? (1 มกราคม)",
    displayLabel: "วันที่และเดือน",
    displayValue: "1 มกราคม (1月1日)",
    displaySubtext: "วันปีใหม่: 1 มกราคม",
    expectedAnswerJa: "Ichigatsu tsuitachi desu.",
    expectedAnswerRomaji: "Ichigatsu tsuitachi desu.",
    keywords: [
      "ichigatsu tsuitachi desu",
      "ichigatsu tsuitachi",
      "いちがつ ついたち",
      "いちがつ ついたちです",
      "1月1日",
    ],
    ruleNoteTh: "สำคัญ!! เรียงจาก เดือน > วันที่: Ichigatsu tsuitachi desu. (วันที่ 1 = Tsuitachi)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <g transform="translate(30, 25)">
        <rect width="140" height="110" rx="12" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
        <rect width="140" height="32" rx="12" fill="#DC2626"/>
        <rect y="22" width="140" height="10" fill="#DC2626"/>
        <text x="70" y="22" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">มกราคม (1月)</text>
        <text x="70" y="85" font-family="sans-serif" font-size="44" font-weight="900" fill="#0F172A" text-anchor="middle">1</text>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#DC2626" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">Ichigatsu tsuitachi</text>
    </svg>`,
  },
  {
    id: "e3_q4_apr_14",
    category: "DATE_READING",
    categoryIndex: 4,
    categoryTitleTh: "4. อ่านวันและเดือนตามที่เห็น",
    categoryTitleJa: "日付の読み方",
    questionJa: "Kore wa nan gatsu nan nichi desuka?",
    questionRomaji: "Kore wa nan gatsu nan nichi desuka?",
    questionTh: "นี่คือวันที่และเดือนอะไร? (14 เมษายน)",
    displayLabel: "วันที่และเดือน",
    displayValue: "14 เมษายน (4月14日)",
    displaySubtext: "วันสงกรานต์: 14 เมษายน",
    expectedAnswerJa: "Shigatsu jūyokka desu.",
    expectedAnswerRomaji: "Shigatsu jūyokka desu.",
    keywords: [
      "shigatsu juuyokka desu",
      "shigatsu juyokka desu",
      "shigatsu juuyokka",
      "shigatsu juyokka",
      "しがつ じゅうよっか",
      "しがつ じゅうよっかです",
      "4月14日",
    ],
    ruleNoteTh: "สำคัญ!! เมษายน = Shigatsu (ห้าม yon-gatsu), วันที่ 14 = Jūyokka (ห้าม jūyon-nichi)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <g transform="translate(30, 25)">
        <rect width="140" height="110" rx="12" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
        <rect width="140" height="32" rx="12" fill="#059669"/>
        <rect y="22" width="140" height="10" fill="#059669"/>
        <text x="70" y="22" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">เมษายน (4月)</text>
        <text x="70" y="85" font-family="sans-serif" font-size="44" font-weight="900" fill="#0F172A" text-anchor="middle">14</text>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#059669" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">Shigatsu jūyokka</text>
    </svg>`,
  },
  {
    id: "e3_q4_may_5",
    category: "DATE_READING",
    categoryIndex: 4,
    categoryTitleTh: "4. อ่านวันและเดือนตามที่เห็น",
    categoryTitleJa: "日付の読み方",
    questionJa: "Kore wa nan gatsu nan nichi desuka?",
    questionRomaji: "Kore wa nan gatsu nan nichi desuka?",
    questionTh: "นี่คือวันที่และเดือนอะไร? (5 พฤษภาคม)",
    displayLabel: "วันที่และเดือน",
    displayValue: "5 พฤษภาคม (5月5日)",
    displaySubtext: "วันเด็กญี่ปุ่น: 5 พฤษภาคม",
    expectedAnswerJa: "Gogatsu itsuka desu.",
    expectedAnswerRomaji: "Gogatsu itsuka desu.",
    keywords: [
      "gogatsu itsuka desu",
      "gogatsu itsuka",
      "ごがつ いつか",
      "ごがつ いつかです",
      "5月5日",
    ],
    ruleNoteTh: "สำคัญ!! เรียงจาก เดือน > วันที่: Gogatsu itsuka desu. (วันที่ 5 = Itsuka)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <g transform="translate(30, 25)">
        <rect width="140" height="110" rx="12" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
        <rect width="140" height="32" rx="12" fill="#7C3AED"/>
        <rect y="22" width="140" height="10" fill="#7C3AED"/>
        <text x="70" y="22" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">พฤษภาคม (5月)</text>
        <text x="70" y="85" font-family="sans-serif" font-size="44" font-weight="900" fill="#0F172A" text-anchor="middle">5</text>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#7C3AED" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">Gogatsu itsuka desu</text>
    </svg>`,
  },
  {
    id: "e3_q4_oct_20",
    category: "DATE_READING",
    categoryIndex: 4,
    categoryTitleTh: "4. อ่านวันและเดือนตามที่เห็น",
    categoryTitleJa: "日付の読み方",
    questionJa: "Kore wa nan gatsu nan nichi desuka?",
    questionRomaji: "Kore wa nan gatsu nan nichi desuka?",
    questionTh: "นี่คือวันที่และเดือนอะไร? (20 ตุลาคม)",
    displayLabel: "วันที่และเดือน",
    displayValue: "20 ตุลาคม (10月20日)",
    displaySubtext: "วันที่: 20 ตุลาคม",
    expectedAnswerJa: "Jūgatsu hatsuka desu.",
    expectedAnswerRomaji: "Jūgatsu hatsuka desu.",
    keywords: [
      "juugatsu hatsuka desu",
      "jugatsu hatsuka desu",
      "juugatsu hatsuka",
      "jugatsu hatsuka",
      "じゅうがつ はつか",
      "じゅうがつ はつかです",
      "10月20日",
    ],
    ruleNoteTh: "สำคัญ!! วันที่ 20 = Hatsuka (คำพิเศษ ห้ามอ่าน nijū-nichi)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <g transform="translate(30, 25)">
        <rect width="140" height="110" rx="12" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
        <rect width="140" height="32" rx="12" fill="#EA580C"/>
        <rect y="22" width="140" height="10" fill="#EA580C"/>
        <text x="70" y="22" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">ตุลาคม (10月)</text>
        <text x="70" y="85" font-family="sans-serif" font-size="44" font-weight="900" fill="#0F172A" text-anchor="middle">20</text>
      </g>
      <rect x="20" y="152" width="160" height="32" rx="8" fill="#EA580C" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="173" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">Jūgatsu hatsuka desu</text>
    </svg>`,
  },

  // =========================================================================
  // =========================================================================
  // หมวดที่ 5: พูดวันเกิดของตนเอง (O tanjōbi wa nan gatsu nan nichi desuka?)
  // =========================================================================
  {
    id: "e3_q5_birthday",
    category: "BIRTHDAY",
    categoryIndex: 5,
    categoryTitleTh: "5. พูดวันเกิดของตนเอง",
    categoryTitleJa: "誕生日",
    questionJa: "O tanjōbi wa nan gatsu nan nichi desuka?",
    questionRomaji: "O tanjōbi wa nan gatsu nan nichi desuka?",
    questionTh: "วันเกิดของคุณคือวันที่และเดือนอะไร? (พูดภาษาไทยก่อน แล้วตามด้วยเดือนและวันที่)",
    displayLabel: "วันเกิดของคุณ",
    displayValue: "15 พฤษภาคม (5月15日)",
    displaySubtext: "พูดไทยก่อน: '15 พฤษภาคมครับ' -> Gogatsu jūgonichi desu. (5がつ 15にち です)",
    expectedAnswerJa: "Gogatsu jūgonichi desu.",
    expectedAnswerRomaji: "Gogatsu jūgonichi desu.",
    keywords: [
      "gogatsu",
      "juugonichi",
      "jugonichi",
      "gogatsu juugonichi desu",
      "gogatsu jugonichi desu",
      "gogatsu juugonichi",
      "gogatsu jugonichi",
      "5月15日",
      "5がつ15にち",
      "5がつ 15にち",
      "ごがつ じゅうごにち",
      "ごがつじゅうごにち",
      "ごがつじゅうごにちです",
      "gatsu",
      "nichi",
      "desu",
      "がつ",
      "にち",
      "です",
    ],
    ruleNoteTh: "วันเกิดของคุณคือ 15 พฤษภาคม: พูดภาษาไทยก่อน ('15 พฤษภาคมครับ') แล้วพูดเฉพาะเดือนและวันที่: Gogatsu jūgonichi desu. (5月15日です)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#FDF2F8"/>
      <!-- Birthday Cake with 15 May banner -->
      <g transform="translate(45, 20)">
        <rect x="25" y="55" width="60" height="35" rx="6" fill="#F472B6" stroke="#0F172A" stroke-width="2.5"/>
        <rect x="35" y="35" width="40" height="20" rx="4" fill="#FBCFE8" stroke="#0F172A" stroke-width="2"/>
        <!-- Candles -->
        <rect x="42" y="20" width="4" height="15" fill="#38BDF8"/>
        <circle cx="44" cy="16" r="3" fill="#F59E0B"/>
        <rect x="53" y="18" width="4" height="17" fill="#F43F5E"/>
        <circle cx="55" cy="14" r="3" fill="#F59E0B"/>
        <rect x="64" y="20" width="4" height="15" fill="#10B981"/>
        <circle cx="66" cy="16" r="3" fill="#F59E0B"/>
        <!-- Date on Cake -->
        <text x="55" y="78" font-family="sans-serif" font-size="14" font-weight="900" fill="#0F172A" text-anchor="middle">5月15日</text>
      </g>
      <rect x="15" y="140" width="170" height="42" rx="8" fill="#DB2777" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="157" font-family="sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">15 พฤษภาคม (15 May)</text>
      <text x="100" y="174" font-family="sans-serif" font-size="11" font-weight="900" fill="#FDF2F8" text-anchor="middle">Gogatsu jūgonichi desu</text>
    </svg>`,
  },

  // =========================================================================
  // หมวดที่ 6: บอกวันที่วันนี้ตามความจริง (Kyō wa nan gatsu nan nichi desuka?)
  // =========================================================================
  {
    id: "e3_q6_today",
    category: "TODAY_DATE",
    categoryIndex: 6,
    categoryTitleTh: "6. บอกวันที่วันนี้ตามความจริง",
    categoryTitleJa: "今日の日付",
    questionJa: "Kyō wa nan gatsu nan nichi desuka?",
    questionRomaji: "Kyō wa nan gatsu nan nichi desuka?",
    questionTh: "วันนี้วันที่เท่าไหร่และเดือนอะไร? (วันสอบรอบที่ 3: 4 พฤศจิกายน)",
    displayLabel: "วันสอบรอบที่ 3",
    displayValue: "4 พฤศจิกายน (11月4日)",
    displaySubtext: "วันสอบรอบที่ 3: 4 พฤศจิกายน -> Jūichigatsu yokka desu. (11がつ 4にち です)",
    expectedAnswerJa: "Jūichigatsu yokka desu.",
    expectedAnswerRomaji: "Jūichigatsu yokka desu.",
    keywords: [
      "juuichigatsu yokka desu",
      "juichigatsu yokka desu",
      "juuichigatsu yokka",
      "juichigatsu yokka",
      "11月4日",
      "11がつ4にち",
      "11がつ 4にち",
      "じゅういちがつ よっか",
      "じゅういちがつよっか",
      "じゅういちがつよっかです",
      "gatsu",
      "nichi",
      "yokka",
      "desu",
    ],
    ruleNoteTh: "วันสอบรอบที่ 3 คือวันพุธที่ 4 พฤศจิกายน: พูดเฉพาะเดือนและวันที่ -> Jūichigatsu yokka desu. (11月4日ครับ/ค่ะ)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F0FDF4"/>
      <!-- Calendar marked 4 NOV -->
      <g transform="translate(30, 20)">
        <rect width="140" height="115" rx="12" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
        <rect width="140" height="32" rx="12" fill="#16A34A"/>
        <rect y="22" width="140" height="10" fill="#16A34A"/>
        <text x="70" y="22" font-family="sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">試験日 (Exam 3) 11月</text>
        <text x="70" y="85" font-family="sans-serif" font-size="44" font-weight="900" fill="#16A34A" text-anchor="middle">4</text>
        <text x="70" y="105" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0F172A" text-anchor="middle">4 พฤศจิกายน (4 Nov)</text>
      </g>
      <rect x="20" y="148" width="160" height="36" rx="8" fill="#16A34A" stroke="#0F172A" stroke-width="2"/>
      <text x="100" y="164" font-family="sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">Jūichigatsu yokka desu</text>
      <text x="100" y="177" font-family="sans-serif" font-size="9" font-weight="700" fill="#DCFCE7" text-anchor="middle">(11がつ 4にち です)</text>
    </svg>`,
  },
];

/**
 * ฟังก์ชันสุ่มข้อสอบสำหรับการสอบครั้งที่ 3
 * สัดส่วนตามเอกสารสอบจริง 10 ข้อ:
 * - หมวด 1 (ORIGIN): 2 ข้อ
 * - หมวด 2 (ADJECTIVE): 2 ข้อ
 * - หมวด 3 (ORDER): 2 ข้อ
 * - หมวด 4 (DATE_READING): 2 ข้อ
 * - หมวด 5 (BIRTHDAY): 1 ข้อ
 * - หมวด 6 (TODAY_DATE): 1 ข้อ
 * รวม 10 ข้อ 10 คะแนน
 */
export function generateExam3Questions(): Exam3Question[] {
  const selected: Exam3Question[] = [];

  // หมวด 1: ORIGIN (2 ข้อ)
  const originPool = EXAM_3_QUESTIONS_POOL.filter((q) => q.category === "ORIGIN");
  const shuffledOrigin = [...originPool].sort(() => 0.5 - Math.random());
  selected.push(...shuffledOrigin.slice(0, 2));

  // หมวด 2: ADJECTIVE (2 ข้อ)
  const adjPool = EXAM_3_QUESTIONS_POOL.filter((q) => q.category === "ADJECTIVE");
  const shuffledAdj = [...adjPool].sort(() => 0.5 - Math.random());
  selected.push(...shuffledAdj.slice(0, 2));

  // หมวด 3: ORDER (2 ข้อ)
  const orderPool = EXAM_3_QUESTIONS_POOL.filter((q) => q.category === "ORDER");
  const shuffledOrder = [...orderPool].sort(() => 0.5 - Math.random());
  selected.push(...shuffledOrder.slice(0, 2));

  // หมวด 4: DATE_READING (2 ข้อ)
  const datePool = EXAM_3_QUESTIONS_POOL.filter((q) => q.category === "DATE_READING");
  const shuffledDate = [...datePool].sort(() => 0.5 - Math.random());
  selected.push(...shuffledDate.slice(0, 2));

  // หมวด 5: BIRTHDAY (1 ข้อ)
  const bdayPool = EXAM_3_QUESTIONS_POOL.filter((q) => q.category === "BIRTHDAY");
  if (bdayPool.length > 0) {
    selected.push(bdayPool[0]);
  }

  // หมวด 6: TODAY_DATE (1 ข้อ)
  const todayPool = EXAM_3_QUESTIONS_POOL.filter((q) => q.category === "TODAY_DATE");
  if (todayPool.length > 0) {
    selected.push(todayPool[0]);
  }

  return selected;
}
