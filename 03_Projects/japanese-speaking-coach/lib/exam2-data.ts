// lib/exam2-data.ts - คลังโจทย์และข้อมูลจำลองการสอบครั้งที่ 2 (เนื้อหาบทที่ 3-4)
// อ้างอิงตามเอกสารประกาศสอบจริง: การสอบครั้งที่ 2 เนื้อหาบทที่ 3-4 กลุ่ม 1.2-1.pdf
// โครงสร้างข้อสอบ 15 คะแนน เวลา 3 นาที:
// ส่วนที่ 1: คำศัพท์ ไทย -> ญี่ปุ่น (5 คำ = 5 คะแนน)
// ส่วนที่ 2: ตอบคำถาม 5 รูปแบบ คำถามละ 2 ข้อ (10 คำถาม = 10 คะแนน)

import { Exam2Question, Exam2Category } from "./types";

export const EXAM_2_CATEGORIES: {
  category: Exam2Category;
  categoryIndex: 1 | 2 | 3 | 4 | 5;
  titleTh: string;
  titleJa: string;
  questionJa: string;
  questionRomaji: string;
  questionTh: string;
  ruleNoteTh: string;
}[] = [
  {
    category: "PLACE",
    categoryIndex: 1,
    titleTh: "1. ถาม-ตอบสถานที่ (แสดงรูป)",
    titleJa: "場所の質問 (Koko wa doko desuka?)",
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (ตอบเต็มประโยค)",
    ruleNoteTh: "ตอบเป็นประโยค: Koko wa [สถานที่] desu.",
  },
  {
    category: "TIME",
    categoryIndex: 2,
    titleTh: "2. พูดเวลาตามที่เห็น",
    titleJa: "現在の時刻 (Ima nan ji desuka?)",
    questionJa: "Ima nan ji desuka?",
    questionRomaji: "Ima nan ji desuka?",
    questionTh: "ตอนนี้กี่โมงแล้ว? (พูดเวลาตามที่เห็น)",
    ruleNoteTh: "พูดเวลาตามที่เห็น: Ima [gozen/gogo] [ชั่วโมง]-ji [นาที]-fun/pun/han desu.",
  },
  {
    category: "PHONE",
    categoryIndex: 3,
    titleTh: "3. พูดเบอร์โทรศัพท์ตามที่เห็น",
    titleJa: "電話番号 (Denwa bangō)",
    questionJa: "Anata no denwa bangō wa nan desuka?",
    questionRomaji: "Anata no denwa bangō wa nan desuka?",
    questionTh: "หมายเลขโทรศัพท์ของคุณคือเบอร์อะไร? (พูดเบอร์ตามที่เห็น)",
    ruleNoteTh: "พูดเฉพาะตัวเลข เชื่อมขีดด้วย no ลงท้ายด้วย desu.",
  },
  {
    category: "PRICE",
    categoryIndex: 4,
    titleTh: "4. พูดราคาตามที่เห็น",
    titleJa: "値段の確認 (Kore wa ikura desuka?)",
    questionJa: "Kore wa ikura desuka?",
    questionRomaji: "Kore wa ikura desuka?",
    questionTh: "สิ่งนี้ราคาเท่าไหร่? (พูดราคาตามที่เห็น)",
    ruleNoteTh: "พูดเฉพาะตัวเลข + en และลงท้ายด้วย desu.",
  },
  {
    category: "OFFICE_HOURS",
    categoryIndex: 5,
    titleTh: "5. พูดเวลาเริ่มและสิ้นสุด",
    titleJa: "勤務時間 (Shigoto wa nanji kara nanji made desuka?)",
    questionJa: "Shigoto wa nanji kara nanji made desuka?",
    questionRomaji: "Shigoto wa nanji kara nanji made desuka?",
    questionTh: "เวลาทำงานเริ่มกี่โมงถึงกี่โมง? (พูดเวลาตามที่เห็น)",
    ruleNoteTh: "พูดเวลาเริ่มและสิ้นสุด ลงท้ายด้วย desu. ([เวลาเริ่ม] kara [เวลาสิ้นสุด] made desu.)",
  },
];

export const EXAM_2_QUESTIONS_POOL: Exam2Question[] = [
  // =========================================================================
  // หมวดที่ 1: สถานที่ (Koko wa doko desuka?)
  // =========================================================================
  {
    id: "e2_q1_kaigishitsu",
    category: "PLACE",
    categoryIndex: 1,
    categoryTitleTh: "1. ถาม-ตอบสถานที่ (แสดงรูป)",
    categoryTitleJa: "場所の確認",
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (ห้องประชุม)",
    displayLabel: "สถานที่",
    displayValue: "ห้องประชุม (会議室)",
    displaySubtext: "ภาพห้องประชุมพร้อมโต๊ะและเก้าอี้ประชุม",
    expectedAnswerJa: "Koko wa kaigi-shitsu desu.",
    expectedAnswerRomaji: "Koko wa kaigi-shitsu desu.",
    keywords: [
      "koko wa kaigi-shitsu desu",
      "koko wa kaigishitsu desu",
      "kaigi-shitsu desu",
      "kaigishitsu desu",
      "kaigishitsu",
      "kaigi-shitsu",
      "かいぎしつ",
      "会議室",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Koko wa kaigi-shitsu desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <rect x="25" y="30" width="150" height="70" rx="6" fill="#E2E8F0" stroke="#0F172A" stroke-width="3"/>
      <rect x="40" y="45" width="40" height="30" fill="#CBD5E1" stroke="#0F172A" stroke-width="2"/>
      <rect x="120" y="45" width="40" height="30" fill="#CBD5E1" stroke="#0F172A" stroke-width="2"/>
      <polygon points="40,110 160,110 175,155 25,155" fill="#94A3B8" stroke="#0F172A" stroke-width="3"/>
      <rect x="50" y="95" width="20" height="15" rx="3" fill="#334155"/>
      <rect x="90" y="95" width="20" height="15" rx="3" fill="#334155"/>
      <rect x="130" y="95" width="20" height="15" rx="3" fill="#334155"/>
      <rect x="45" y="155" width="22" height="18" rx="3" fill="#1E293B"/>
      <rect x="89" y="155" width="22" height="18" rx="3" fill="#1E293B"/>
      <rect x="133" y="155" width="22" height="18" rx="3" fill="#1E293B"/>
      <text x="100" y="190" font-family="sans-serif" font-size="12" font-weight="900" fill="#0F172A" text-anchor="middle">会議室 (Kaigi-shitsu)</text>
    </svg>`,
  },
  {
    id: "e2_q1_shokudo",
    category: "PLACE",
    categoryIndex: 1,
    categoryTitleTh: "1. ถาม-ตอบสถานที่ (แสดงรูป)",
    categoryTitleJa: "場所の確認",
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (โรงอาหาร / ห้องอาหาร)",
    displayLabel: "สถานที่",
    displayValue: "โรงอาหาร (食堂)",
    displaySubtext: "ภาพโต๊ะอาหาร ช้อนส้อม และถาดอาหาร",
    expectedAnswerJa: "Koko wa shokudō desu.",
    expectedAnswerRomaji: "Koko wa shokudō desu.",
    keywords: [
      "koko wa shokudo desu",
      "koko wa shokudou desu",
      "shokudo desu",
      "shokudou desu",
      "shokudo",
      "shokudou",
      "しょくどう",
      "食堂",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Koko wa shokudō desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#FFFBEB"/>
      <circle cx="100" cy="80" r="48" fill="#FDE68A" stroke="#B45309" stroke-width="3"/>
      <path d="M78 60 L78 100 M72 60 L72 75 M84 60 L84 75" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="122" cy="70" rx="8" ry="12" fill="#92400E"/>
      <line x1="122" y1="82" x2="122" y2="100" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
      <rect x="35" y="135" width="130" height="25" rx="6" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
      <text x="100" y="152" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">CAFETERIA</text>
      <text x="100" y="188" font-family="sans-serif" font-size="12" font-weight="900" fill="#B45309" text-anchor="middle">食堂 (Shokudō)</text>
    </svg>`,
  },
  {
    id: "e2_q1_otearai",
    category: "PLACE",
    categoryIndex: 1,
    categoryTitleTh: "1. ถาม-ตอบสถานที่ (แสดงรูป)",
    categoryTitleJa: "場所の確認",
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (ห้องน้ำ)",
    displayLabel: "สถานที่",
    displayValue: "ห้องน้ำ (お手洗い / トイレ)",
    displaySubtext: "ภาพสัญลักษณ์ห้องน้ำชาย-หญิง",
    expectedAnswerJa: "Koko wa otearai desu.",
    expectedAnswerRomaji: "Koko wa otearai desu.",
    keywords: [
      "koko wa otearai desu",
      "koko wa toire desu",
      "otearai desu",
      "toire desu",
      "otearai",
      "toire",
      "おてあらい",
      "トイレ",
      "お手洗い",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Koko wa otearai desu. (หรือ toire desu)",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F0FDF4"/>
      <rect x="30" y="30" width="140" height="110" rx="12" fill="#FFFFFF" stroke="#059669" stroke-width="3"/>
      <!-- Man icon -->
      <circle cx="75" cy="60" r="10" fill="#0284C7"/>
      <path d="M63 76 L87 76 L82 110 L68 110 Z" fill="#0284C7"/>
      <!-- Woman icon -->
      <circle cx="125" cy="60" r="10" fill="#E11D48"/>
      <polygon points="125,75 110,110 140,110" fill="#E11D48"/>
      <text x="100" y="132" font-family="sans-serif" font-size="11" font-weight="900" fill="#047857" text-anchor="middle">RESTROOM</text>
      <text x="100" y="180" font-family="sans-serif" font-size="12" font-weight="900" fill="#047857" text-anchor="middle">お手洗い (Otearai)</text>
    </svg>`,
  },
  {
    id: "e2_q1_depato",
    category: "PLACE",
    categoryIndex: 1,
    categoryTitleTh: "1. ถาม-ตอบสถานที่ (แสดงรูป)",
    categoryTitleJa: "場所の確認",
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (ห้างสรรพสินค้า)",
    displayLabel: "สถานที่",
    displayValue: "ห้างสรรพสินค้า (デパート)",
    displaySubtext: "ภาพอาคารห้างสรรพสินค้าหลายชั้น",
    expectedAnswerJa: "Koko wa depāto desu.",
    expectedAnswerRomaji: "Koko wa depāto desu.",
    keywords: [
      "koko wa depato desu",
      "koko wa depaato desu",
      "depato desu",
      "depaato desu",
      "depato",
      "depāto",
      "デパート",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Koko wa depāto desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#FDF4FF"/>
      <rect x="45" y="30" width="110" height="120" rx="6" fill="#F472B6" stroke="#9D174D" stroke-width="3"/>
      <rect x="60" y="45" width="20" height="20" rx="3" fill="#FFFFFF"/>
      <rect x="90" y="45" width="20" height="20" rx="3" fill="#FFFFFF"/>
      <rect x="120" y="45" width="20" height="20" rx="3" fill="#FFFFFF"/>
      <rect x="60" y="75" width="20" height="20" rx="3" fill="#FFFFFF"/>
      <rect x="90" y="75" width="20" height="20" rx="3" fill="#FFFFFF"/>
      <rect x="120" y="75" width="20" height="20" rx="3" fill="#FFFFFF"/>
      <rect x="85" y="115" width="30" height="35" rx="3" fill="#831843"/>
      <text x="100" y="185" font-family="sans-serif" font-size="12" font-weight="900" fill="#9D174D" text-anchor="middle">デパート (Depāto)</text>
    </svg>`,
  },
  {
    id: "e2_q1_supa",
    category: "PLACE",
    categoryIndex: 1,
    categoryTitleTh: "1. ถาม-ตอบสถานที่ (แสดงรูป)",
    categoryTitleJa: "場所の確認",
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (ซูเปอร์มาร์เก็ต)",
    displayLabel: "สถานที่",
    displayValue: "ซูเปอร์มาร์เก็ต (スーパー)",
    displaySubtext: "ภาพรถเข็นซื้อของและป้าย SUPERMARKET",
    expectedAnswerJa: "Koko wa sūpā desu.",
    expectedAnswerRomaji: "Koko wa sūpā desu.",
    keywords: [
      "koko wa supa desu",
      "koko wa suupaa desu",
      "supa desu",
      "suupaa desu",
      "supa",
      "sūpā",
      "スーパー",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Koko wa sūpā desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F0FDF4"/>
      <rect x="30" y="30" width="140" height="50" rx="8" fill="#16A34A" stroke="#14532D" stroke-width="3"/>
      <text x="100" y="62" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">SUPERMARKET</text>
      <!-- Shopping Cart -->
      <path d="M60 100 L75 100 L95 130 L135 130 L145 105 L72 105" stroke="#15803D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="100" cy="142" r="6" fill="#15803D"/>
      <circle cx="130" cy="142" r="6" fill="#15803D"/>
      <text x="100" y="185" font-family="sans-serif" font-size="12" font-weight="900" fill="#15803D" text-anchor="middle">スーパー (Sūpā)</text>
    </svg>`,
  },
  {
    id: "e2_q1_resutoran",
    category: "PLACE",
    categoryIndex: 1,
    categoryTitleTh: "1. ถาม-ตอบสถานที่ (แสดงรูป)",
    categoryTitleJa: "場所の確認",
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (ร้านอาหาร)",
    displayLabel: "สถานที่",
    displayValue: "ร้านอาหาร (レストラン)",
    displaySubtext: "ภาพป้ายร้านอาหาร จาน ช้อนส้อม และแก้วไวน์",
    expectedAnswerJa: "Koko wa resutoran desu.",
    expectedAnswerRomaji: "Koko wa resutoran desu.",
    keywords: [
      "koko wa resutoran desu",
      "resutoran desu",
      "resutoran",
      "レストラン",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Koko wa resutoran desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#FEF2F2"/>
      <rect x="25" y="30" width="150" height="40" rx="8" fill="#DC2626" stroke="#991B1B" stroke-width="3"/>
      <text x="100" y="56" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">RESTAURANT</text>
      <circle cx="100" cy="115" r="35" fill="#FFFFFF" stroke="#DC2626" stroke-width="3"/>
      <path d="M50 95 L50 135 M45 95 L45 110 M55 95 L55 110" stroke="#991B1B" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="150" cy="105" rx="7" ry="11" fill="#991B1B"/>
      <line x1="150" y1="116" x2="150" y2="135" stroke="#991B1B" stroke-width="3" stroke-linecap="round"/>
      <text x="100" y="185" font-family="sans-serif" font-size="12" font-weight="900" fill="#991B1B" text-anchor="middle">レストラン (Resutoran)</text>
    </svg>`,
  },
  {
    id: "e2_q1_yubinkyoku",
    category: "PLACE",
    categoryIndex: 1,
    categoryTitleTh: "1. ถาม-ตอบสถานที่ (แสดงรูป)",
    categoryTitleJa: "場所の確認",
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (ที่ทำการไปรษณีย์)",
    displayLabel: "สถานที่",
    displayValue: "ที่ทำการไปรษณีย์ (郵便局)",
    displaySubtext: "ภาพสัญลักษณ์ไปรษณีย์ญี่ปุ่น (〒) และตู้ไปรษณีย์สีแดง",
    expectedAnswerJa: "Koko wa yūbinkyoku desu.",
    expectedAnswerRomaji: "Koko wa yūbinkyoku desu.",
    keywords: [
      "koko wa yubinkyoku desu",
      "koko wa yuubinkyoku desu",
      "yubinkyoku desu",
      "yuubinkyoku desu",
      "yubinkyoku",
      "yuubinkyoku",
      "ゆうびんきょく",
      "郵便局",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Koko wa yūbinkyoku desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#EFF6FF"/>
      <rect x="40" y="30" width="120" height="120" rx="10" fill="#EF4444" stroke="#991B1B" stroke-width="3"/>
      <!-- Japanese Postal Mark 〒 -->
      <path d="M70 65 L130 65 M100 65 L100 120 M75 85 L125 85" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
      <text x="100" y="140" font-family="sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">POST OFFICE</text>
      <text x="100" y="185" font-family="sans-serif" font-size="12" font-weight="900" fill="#1E3A8A" text-anchor="middle">郵便局 (Yūbinkyoku)</text>
    </svg>`,
  },
  {
    id: "e2_q1_uketsuke",
    category: "PLACE",
    categoryIndex: 1,
    categoryTitleTh: "1. ถาม-ตอบสถานที่ (แสดงรูป)",
    categoryTitleJa: "場所の確認",
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (แผนกต้อนรับ / ประชาสัมพันธ์)",
    displayLabel: "สถานที่",
    displayValue: "แผนกต้อนรับ (受付)",
    displaySubtext: "ภาพเคาน์เตอร์ต้อนรับด้านหน้า",
    expectedAnswerJa: "Koko wa uketsuke desu.",
    expectedAnswerRomaji: "Koko wa uketsuke desu.",
    keywords: [
      "koko wa uketsuke desu",
      "uketsuke desu",
      "uketsuke",
      "うけつけ",
      "受付",
    ],
    ruleNoteTh: "ตอบเต็มประโยค: Koko wa uketsuke desu.",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F0FDF4"/>
      <ellipse cx="100" cy="140" rx="75" ry="25" fill="#10B981" stroke="#047857" stroke-width="2"/>
      <rect x="25" y="125" width="150" height="35" rx="8" fill="#059669" stroke="#047857" stroke-width="3"/>
      <circle cx="100" cy="70" r="22" fill="#047857"/>
      <text x="100" y="78" font-family="sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF" text-anchor="middle">i</text>
      <text x="100" y="148" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">RECEPTION</text>
      <text x="100" y="185" font-family="sans-serif" font-size="12" font-weight="900" fill="#047857" text-anchor="middle">受付 (Uketsuke)</text>
    </svg>`,
  },

  // =========================================================================
  // หมวดที่ 2: เวลา (Ima nan ji desuka?)
  // =========================================================================
  {
    id: "e2_q2_1630",
    category: "TIME",
    categoryIndex: 2,
    categoryTitleTh: "2. พูดเวลาตามที่เห็น",
    categoryTitleJa: "現在の時刻",
    questionJa: "Ima nan ji desuka?",
    questionRomaji: "Ima nan ji desuka?",
    questionTh: "ตอนนี้กี่โมงแล้ว? (ดูเวลาจากตัวเลข: 16.30 น.)",
    displayLabel: "เวลาที่เห็น",
    displayValue: "16.30 น.",
    displaySubtext: "4 โมงครึ่ง ตอนบ่าย/เย็น (gogo yo-ji han)",
    expectedAnswerJa: "Ima gogo yo-ji han desu.",
    expectedAnswerRomaji: "Ima gogo yo-ji han desu.",
    keywords: [
      "ima gogo yo-ji han desu",
      "ima gogo yoji han desu",
      "gogo yo-ji han desu",
      "gogo yoji han desu",
      "gogo yo-ji sanjuppun desu",
      "gogo yoji sanjuppun desu",
      "いま ごご よじ はんです",
      "午後4時半",
    ],
    ruleNoteTh: "ระบุ gogo (บ่าย/เย็น) และ yo-ji (4 โมง ห้ามพูด yon-ji): Ima gogo yo-ji han desu.",
  },
  {
    id: "e2_q2_0945",
    category: "TIME",
    categoryIndex: 2,
    categoryTitleTh: "2. พูดเวลาตามที่เห็น",
    categoryTitleJa: "現在の時刻",
    questionJa: "Ima nan ji desuka?",
    questionRomaji: "Ima nan ji desuka?",
    questionTh: "ตอนนี้กี่โมงแล้ว? (ดูเวลาจากตัวเลข: 09.45 น.)",
    displayLabel: "เวลาที่เห็น",
    displayValue: "09.45 น.",
    displaySubtext: "9 โมง 45 นาที ช่วงเช้า (gozen ku-ji yonjū gofun)",
    expectedAnswerJa: "Ima gozen ku-ji yonjū gofun desu.",
    expectedAnswerRomaji: "Ima gozen ku-ji yonjū gofun desu.",
    keywords: [
      "ima gozen ku-ji yonju gofun desu",
      "ima gozen kuji yonju gofun desu",
      "gozen ku-ji yonju gofun desu",
      "gozen kuji yonju gofun desu",
      "gozen ku-ji yonjuu gofun desu",
      "gozen kuji yonjuu gofun desu",
      "いま ごぜん くじ よんじゅう ごふんです",
      "午前9時45分",
    ],
    ruleNoteTh: "ระบุ gozen (เช้า) และ ku-ji (9 โมง ห้ามพูด kyu-ji): Ima gozen ku-ji yonjū gofun desu.",
  },
  {
    id: "e2_q2_1030",
    category: "TIME",
    categoryIndex: 2,
    categoryTitleTh: "2. พูดเวลาตามที่เห็น",
    categoryTitleJa: "現在の時刻",
    questionJa: "Ima nan ji desuka?",
    questionRomaji: "Ima nan ji desuka?",
    questionTh: "ตอนนี้กี่โมงแล้ว? (ดูเวลาจากตัวเลข: 10.30 น.)",
    displayLabel: "เวลาที่เห็น",
    displayValue: "10.30 น.",
    displaySubtext: "10 โมงครึ่ง ช่วงเช้า (gozen jū-ji han)",
    expectedAnswerJa: "Ima gozen jū-ji han desu.",
    expectedAnswerRomaji: "Ima gozen jū-ji han desu.",
    keywords: [
      "ima gozen ju-ji han desu",
      "ima gozen juji han desu",
      "gozen ju-ji han desu",
      "gozen juji han desu",
      "gozen juu-ji han desu",
      "gozen juji sanjuppun desu",
      "いま ごぜん じゅうじ はんです",
    ],
    ruleNoteTh: "ระบุ gozen (เช้า) และ han (ครึ่ง): Ima gozen jū-ji han desu.",
  },
  {
    id: "e2_q2_1415",
    category: "TIME",
    categoryIndex: 2,
    categoryTitleTh: "2. พูดเวลาตามที่เห็น",
    categoryTitleJa: "現在の時刻",
    questionJa: "Ima nan ji desuka?",
    questionRomaji: "Ima nan ji desuka?",
    questionTh: "ตอนนี้กี่โมงแล้ว? (ดูเวลาจากตัวเลข: 14.15 น.)",
    displayLabel: "เวลาที่เห็น",
    displayValue: "14.15 น.",
    displaySubtext: "บ่าย 2 โมง 15 นาที (gogo ni-ji jū gofun)",
    expectedAnswerJa: "Ima gogo ni-ji jū gofun desu.",
    expectedAnswerRomaji: "Ima gogo ni-ji jū gofun desu.",
    keywords: [
      "ima gogo ni-ji ju gofun desu",
      "ima gogo niji ju gofun desu",
      "gogo ni-ji ju gofun desu",
      "gogo niji ju gofun desu",
      "gogo ni-ji juu gofun desu",
      "いま ごご にじ じゅうごふんです",
    ],
    ruleNoteTh: "ระบุ gogo (บ่าย) และ 15 นาที (jū gofun): Ima gogo ni-ji jū gofun desu.",
  },
  {
    id: "e2_q2_0820",
    category: "TIME",
    categoryIndex: 2,
    categoryTitleTh: "2. พูดเวลาตามที่เห็น",
    categoryTitleJa: "現在の時刻",
    questionJa: "Ima nan ji desuka?",
    questionRomaji: "Ima nan ji desuka?",
    questionTh: "ตอนนี้กี่โมงแล้ว? (ดูเวลาจากตัวเลข: 08.20 น.)",
    displayLabel: "เวลาที่เห็น",
    displayValue: "08.20 น.",
    displaySubtext: "8 โมง 20 นาที ช่วงเช้า (gozen hachi-ji nijuppun)",
    expectedAnswerJa: "Ima gozen hachi-ji nijuppun desu.",
    expectedAnswerRomaji: "Ima gozen hachi-ji nijuppun desu.",
    keywords: [
      "ima gozen hachi-ji nijuppun desu",
      "ima gozen hachiji nijuppun desu",
      "gozen hachi-ji nijuppun desu",
      "gozen hachiji nijuppun desu",
      "gozen hachiji nijuppun",
      "いま ごぜん はちじ にじゅっぷんです",
    ],
    ruleNoteTh: "ระบุ gozen (เช้า) และ 20 นาที (nijuppun): Ima gozen hachi-ji nijuppun desu.",
  },
  {
    id: "e2_q2_1950",
    category: "TIME",
    categoryIndex: 2,
    categoryTitleTh: "2. พูดเวลาตามที่เห็น",
    categoryTitleJa: "現在の時刻",
    questionJa: "Ima nan ji desuka?",
    questionRomaji: "Ima nan ji desuka?",
    questionTh: "ตอนนี้กี่โมงแล้ว? (ดูเวลาจากตัวเลข: 19.50 น.)",
    displayLabel: "เวลาที่เห็น",
    displayValue: "19.50 น.",
    displaySubtext: "1 ทุ่ม 50 นาที (gogo shichi-ji gojuppun)",
    expectedAnswerJa: "Ima gogo shichi-ji gojuppun desu.",
    expectedAnswerRomaji: "Ima gogo shichi-ji gojuppun desu.",
    keywords: [
      "ima gogo shichi-ji gojuppun desu",
      "ima gogo shichiji gojuppun desu",
      "gogo shichi-ji gojuppun desu",
      "gogo shichiji gojuppun desu",
      "いま ごご しちじ ごじゅっぷんです",
    ],
    ruleNoteTh: "ระบุ gogo (ค่ำ) และ 7 โมง (shichi-ji) 50 นาที (gojuppun): Ima gogo shichi-ji gojuppun desu.",
  },
  {
    id: "e2_q2_1100",
    category: "TIME",
    categoryIndex: 2,
    categoryTitleTh: "2. พูดเวลาตามที่เห็น",
    categoryTitleJa: "現在の時刻",
    questionJa: "Ima nan ji desuka?",
    questionRomaji: "Ima nan ji desuka?",
    questionTh: "ตอนนี้กี่โมงแล้ว? (ดูเวลาจากตัวเลข: 11.00 น.)",
    displayLabel: "เวลาที่เห็น",
    displayValue: "11.00 น.",
    displaySubtext: "11 โมงตรง ช่วงเช้า (gozen jūichi-ji)",
    expectedAnswerJa: "Ima gozen jūichi-ji desu.",
    expectedAnswerRomaji: "Ima gozen jūichi-ji desu.",
    keywords: [
      "ima gozen juichi-ji desu",
      "ima gozen juichiji desu",
      "gozen juichi-ji desu",
      "gozen juichiji desu",
      "gozen juuichi-ji desu",
      "ima gozen juichiji chodo desu",
      "いま ごぜん じゅういちじです",
    ],
    ruleNoteTh: "ระบุ gozen (เช้า) และ 11 โมง (jūichi-ji): Ima gozen jūichi-ji desu.",
  },
  {
    id: "e2_q2_1545",
    category: "TIME",
    categoryIndex: 2,
    categoryTitleTh: "2. พูดเวลาตามที่เห็น",
    categoryTitleJa: "現在の時刻",
    questionJa: "Ima nan ji desuka?",
    questionRomaji: "Ima nan ji desuka?",
    questionTh: "ตอนนี้กี่โมงแล้ว? (ดูเวลาจากตัวเลข: 15.45 น.)",
    displayLabel: "เวลาที่เห็น",
    displayValue: "15.45 น.",
    displaySubtext: "บ่าย 3 โมง 45 นาที (gogo san-ji yonjū gofun)",
    expectedAnswerJa: "Ima gogo san-ji yonjū gofun desu.",
    expectedAnswerRomaji: "Ima gogo san-ji yonjū gofun desu.",
    keywords: [
      "ima gogo san-ji yonju gofun desu",
      "ima gogo sanji yonju gofun desu",
      "gogo san-ji yonju gofun desu",
      "gogo sanji yonju gofun desu",
      "gogo san-ji yonjuu gofun desu",
      "いま ごご さんじ よんじゅうごふんです",
    ],
    ruleNoteTh: "ระบุ gogo (บ่าย) และ 45 นาที (yonjū gofun): Ima gogo san-ji yonjū gofun desu.",
  },

  // =========================================================================
  // หมวดที่ 3: เบอร์โทรศัพท์ (Anata no denwa bangō wa nan desuka?)
  // =========================================================================
  {
    id: "e2_q3_090_7423_9105",
    category: "PHONE",
    categoryIndex: 3,
    categoryTitleTh: "3. พูดเบอร์โทรศัพท์ตามที่เห็น",
    categoryTitleJa: "電話番号の確認",
    questionJa: "Anata no denwa bangō wa nan desuka?",
    questionRomaji: "Anata no denwa bangō wa nan desuka?",
    questionTh: "หมายเลขโทรศัพท์คือเบอร์อะไร? (090-7423-9105)",
    displayLabel: "เบอร์โทรศัพท์",
    displayValue: "090-7423-9105",
    displaySubtext: "อ่านทีละตัวเลข คั่นเครื่องหมายขีดด้วย no และลงท้ายด้วย desu.",
    expectedAnswerJa: "Zero kyū zero no nana yon ni san no kyū ichi zero go desu.",
    expectedAnswerRomaji: "Zero kyū zero no nana yon ni san no kyū ichi zero go desu.",
    keywords: [
      "zero kyu zero no nana yon ni san no kyu ichi zero go desu",
      "zero kyuu zero no nana yon ni san no kyuu ichi zero go desu",
      "zero kyu zero no nana yon ni san no kyu ichi zero go",
      "ゼロ きゅう ゼロ の なな よん に さん の きゅう いち ゼロ ご です",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข เชื่อมขีดด้วย no และลงท้ายด้วย desu.",
  },
  {
    id: "e2_q3_090_3768_2069",
    category: "PHONE",
    categoryIndex: 3,
    categoryTitleTh: "3. พูดเบอร์โทรศัพท์ตามที่เห็น",
    categoryTitleJa: "電話番号の確認",
    questionJa: "Anata no denwa bangō wa nan desuka?",
    questionRomaji: "Anata no denwa bangō wa nan desuka?",
    questionTh: "หมายเลขโทรศัพท์คือเบอร์อะไร? (090-3768-2069)",
    displayLabel: "เบอร์โทรศัพท์",
    displayValue: "090-3768-2069",
    displaySubtext: "อ่านทีละตัวเลข คั่นเครื่องหมายขีดด้วย no และลงท้ายด้วย desu.",
    expectedAnswerJa: "Zero kyū zero no san nana roku hachi no ni zero roku kyū desu.",
    expectedAnswerRomaji: "Zero kyū zero no san nana roku hachi no ni zero roku kyū desu.",
    keywords: [
      "zero kyu zero no san nana roku hachi no ni zero roku kyu desu",
      "zero kyuu zero no san nana roku hachi no ni zero roku kyuu desu",
      "zero kyu zero no san nana roku hachi no ni zero roku kyu",
      "ゼロ きゅう ゼロ の さん なな ろく はち の に ゼロ ろく きゅう です",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข เชื่อมขีดด้วย no และลงท้ายด้วย desu.",
  },
  {
    id: "e2_q3_081_543_9820",
    category: "PHONE",
    categoryIndex: 3,
    categoryTitleTh: "3. พูดเบอร์โทรศัพท์ตามที่เห็น",
    categoryTitleJa: "電話番号の確認",
    questionJa: "Anata no denwa bangō wa nan desuka?",
    questionRomaji: "Anata no denwa bangō wa nan desuka?",
    questionTh: "หมายเลขโทรศัพท์คือเบอร์อะไร? (081-543-9820)",
    displayLabel: "เบอร์โทรศัพท์",
    displayValue: "081-543-9820",
    displaySubtext: "อ่านทีละตัวเลข คั่นเครื่องหมายขีดด้วย no และลงท้ายด้วย desu.",
    expectedAnswerJa: "Zero hachi ichi no go yon san no kyū hachi ni zero desu.",
    expectedAnswerRomaji: "Zero hachi ichi no go yon san no kyū hachi ni zero desu.",
    keywords: [
      "zero hachi ichi no go yon san no kyu hachi ni zero desu",
      "zero hachi ichi no go yon san no kyuu hachi ni zero desu",
      "zero hachi ichi no go yon san no kyu hachi ni zero",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข เชื่อมขีดด้วย no และลงท้ายด้วย desu.",
  },
  {
    id: "e2_q3_089_624_1735",
    category: "PHONE",
    categoryIndex: 3,
    categoryTitleTh: "3. พูดเบอร์โทรศัพท์ตามที่เห็น",
    categoryTitleJa: "電話番号の確認",
    questionJa: "Anata no denwa bangō wa nan desuka?",
    questionRomaji: "Anata no denwa bangō wa nan desuka?",
    questionTh: "หมายเลขโทรศัพท์คือเบอร์อะไร? (089-624-1735)",
    displayLabel: "เบอร์โทรศัพท์",
    displayValue: "089-624-1735",
    displaySubtext: "อ่านทีละตัวเลข คั่นเครื่องหมายขีดด้วย no และลงท้ายด้วย desu.",
    expectedAnswerJa: "Zero hachi kyū no roku ni yon no ichi nana san go desu.",
    expectedAnswerRomaji: "Zero hachi kyū no roku ni yon no ichi nana san go desu.",
    keywords: [
      "zero hachi kyu no roku ni yon no ichi nana san go desu",
      "zero hachi kyuu no roku ni yon no ichi nana san go desu",
      "zero hachi kyu no roku ni yon no ichi nana san go",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข เชื่อมขีดด้วย no และลงท้ายด้วย desu.",
  },
  {
    id: "e2_q3_092_418_7053",
    category: "PHONE",
    categoryIndex: 3,
    categoryTitleTh: "3. พูดเบอร์โทรศัพท์ตามที่เห็น",
    categoryTitleJa: "電話番号の確認",
    questionJa: "Anata no denwa bangō wa nan desuka?",
    questionRomaji: "Anata no denwa bangō wa nan desuka?",
    questionTh: "หมายเลขโทรศัพท์คือเบอร์อะไร? (092-418-7053)",
    displayLabel: "เบอร์โทรศัพท์",
    displayValue: "092-418-7053",
    displaySubtext: "อ่านทีละตัวเลข คั่นเครื่องหมายขีดด้วย no และลงท้ายด้วย desu.",
    expectedAnswerJa: "Zero kyū ni no yon ichi hachi no nana zero go san desu.",
    expectedAnswerRomaji: "Zero kyū ni no yon ichi hachi no nana zero go san desu.",
    keywords: [
      "zero kyu ni no yon ichi hachi no nana zero go san desu",
      "zero kyuu ni no yon ichi hachi no nana zero go san desu",
      "zero kyu ni no yon ichi hachi no nana zero go san",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข เชื่อมขีดด้วย no และลงท้ายด้วย desu.",
  },
  {
    id: "e2_q3_061_839_2470",
    category: "PHONE",
    categoryIndex: 3,
    categoryTitleTh: "3. พูดเบอร์โทรศัพท์ตามที่เห็น",
    categoryTitleJa: "電話番号の確認",
    questionJa: "Anata no denwa bangō wa nan desuka?",
    questionRomaji: "Anata no denwa bangō wa nan desuka?",
    questionTh: "หมายเลขโทรศัพท์คือเบอร์อะไร? (061-839-2470)",
    displayLabel: "เบอร์โทรศัพท์",
    displayValue: "061-839-2470",
    displaySubtext: "อ่านทีละตัวเลข คั่นเครื่องหมายขีดด้วย no และลงท้ายด้วย desu.",
    expectedAnswerJa: "Zero roku ichi no hachi san kyū no ni yon nana zero desu.",
    expectedAnswerRomaji: "Zero roku ichi no hachi san kyū no ni yon nana zero desu.",
    keywords: [
      "zero roku ichi no hachi san kyu no ni yon nana zero desu",
      "zero roku ichi no hachi san kyuu no ni yon nana zero desu",
      "zero roku ichi no hachi san kyu no ni yon nana zero",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข เชื่อมขีดด้วย no และลงท้ายด้วย desu.",
  },

  // =========================================================================
  // หมวดที่ 4: ราคา (Kore wa ikura desuka?)
  // =========================================================================
  {
    id: "e2_q4_3625",
    category: "PRICE",
    categoryIndex: 4,
    categoryTitleTh: "4. พูดราคาตามที่เห็น",
    categoryTitleJa: "値段の確認",
    questionJa: "Kore wa ikura desuka?",
    questionRomaji: "Kore wa ikura desuka?",
    questionTh: "สิ่งนี้ราคาเท่าไหร่? (3,625 ¥)",
    displayLabel: "ป้ายราคา",
    displayValue: "3,625 ¥",
    displaySubtext: "sanzen (3,000) + roppyaku (600) + nijū go (25) + en desu.",
    expectedAnswerJa: "Sanzen – Roppyaku - nijū go en desu.",
    expectedAnswerRomaji: "Sanzen – Roppyaku - nijū go en desu.",
    keywords: [
      "sanzen roppyaku niju go en desu",
      "sanzen rop-pyaku nijuu go en desu",
      "sanzen roppyaku niju go en",
      "sanzen rop-pyaku",
      "さんぜん ろっぴゃく にじゅう ご えんです",
      "3625円です",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข + en และลงท้ายด้วย desu.",
  },
  {
    id: "e2_q4_18000",
    category: "PRICE",
    categoryIndex: 4,
    categoryTitleTh: "4. พูดราคาตามที่เห็น",
    categoryTitleJa: "値段の確認",
    questionJa: "Kore wa ikura desuka?",
    questionRomaji: "Kore wa ikura desuka?",
    questionTh: "สิ่งนี้ราคาเท่าไหร่? (18,000 ¥)",
    displayLabel: "ป้ายราคา",
    displayValue: "18,000 ¥",
    displaySubtext: "ichi man (10,000) + hassen (8,000) + en desu.",
    expectedAnswerJa: "Ichi man – hassen en desu.",
    expectedAnswerRomaji: "Ichi man – hassen en desu.",
    keywords: [
      "ichi man hassen en desu",
      "ichiman hassen en desu",
      "ichi-man has-sen en desu",
      "ichi man hassen en",
      "いちまん はっせん えんです",
      "18000円です",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข + en และลงท้ายด้วย desu.",
  },
  {
    id: "e2_q4_2500",
    category: "PRICE",
    categoryIndex: 4,
    categoryTitleTh: "4. พูดราคาตามที่เห็น",
    categoryTitleJa: "値段の確認",
    questionJa: "Kore wa ikura desuka?",
    questionRomaji: "Kore wa ikura desuka?",
    questionTh: "สิ่งนี้ราคาเท่าไหร่? (2,500 ¥)",
    displayLabel: "ป้ายราคา",
    displayValue: "2,500 ¥",
    displaySubtext: "ni-sen (2,000) + go-hyaku (500) + en desu.",
    expectedAnswerJa: "Ni-sen go-hyaku en desu.",
    expectedAnswerRomaji: "Ni-sen go-hyaku en desu.",
    keywords: [
      "nisen gohyaku en desu",
      "ni-sen go-hyaku en desu",
      "nisen gohyaku en",
      "にせん ごひゃく えんです",
      "2500円です",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข + en และลงท้ายด้วย desu.",
  },
  {
    id: "e2_q4_4800",
    category: "PRICE",
    categoryIndex: 4,
    categoryTitleTh: "4. พูดราคาตามที่เห็น",
    categoryTitleJa: "値段の確認",
    questionJa: "Kore wa ikura desuka?",
    questionRomaji: "Kore wa ikura desuka?",
    questionTh: "สิ่งนี้ราคาเท่าไหร่? (4,800 ¥)",
    displayLabel: "ป้ายราคา",
    displayValue: "4,800 ¥",
    displaySubtext: "yon-sen (4,000) + hap-pyaku (800) + en desu.",
    expectedAnswerJa: "Yon-sen hap-pyaku en desu.",
    expectedAnswerRomaji: "Yon-sen hap-pyaku en desu.",
    keywords: [
      "yonsen happyaku en desu",
      "yon-sen hap-pyaku en desu",
      "yonsen happyaku en",
      "よんせん はっぴゃく えんです",
      "4800円です",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข + en และลงท้ายด้วย desu. (800 อ่านว่า hap-pyaku)",
  },
  {
    id: "e2_q4_6300",
    category: "PRICE",
    categoryIndex: 4,
    categoryTitleTh: "4. พูดราคาตามที่เห็น",
    categoryTitleJa: "値段の確認",
    questionJa: "Kore wa ikura desuka?",
    questionRomaji: "Kore wa ikura desuka?",
    questionTh: "สิ่งนี้ราคาเท่าไหร่? (6,300 ¥)",
    displayLabel: "ป้ายราคา",
    displayValue: "6,300 ¥",
    displaySubtext: "roku-sen (6,000) + san-byaku (300) + en desu.",
    expectedAnswerJa: "Roku-sen san-byaku en desu.",
    expectedAnswerRomaji: "Roku-sen san-byaku en desu.",
    keywords: [
      "rokusen sanbyaku en desu",
      "roku-sen san-byaku en desu",
      "rokusen sanbyaku en",
      "ろくせん さんびゃく えんです",
      "6300円です",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข + en และลงท้ายด้วย desu. (300 อ่านว่า san-byaku)",
  },
  {
    id: "e2_q4_8500",
    category: "PRICE",
    categoryIndex: 4,
    categoryTitleTh: "4. พูดราคาตามที่เห็น",
    categoryTitleJa: "値段の確認",
    questionJa: "Kore wa ikura desuka?",
    questionRomaji: "Kore wa ikura desuka?",
    questionTh: "สิ่งนี้ราคาเท่าไหร่? (8,500 ¥)",
    displayLabel: "ป้ายราคา",
    displayValue: "8,500 ¥",
    displaySubtext: "has-sen (8,000) + go-hyaku (500) + en desu.",
    expectedAnswerJa: "Has-sen go-hyaku en desu.",
    expectedAnswerRomaji: "Has-sen go-hyaku en desu.",
    keywords: [
      "hassen gohyaku en desu",
      "has-sen go-hyaku en desu",
      "hassen gohyaku en",
      "はっせん ごひゃく えんです",
      "8500円です",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข + en และลงท้ายด้วย desu. (8,000 อ่านว่า has-sen)",
  },
  {
    id: "e2_q4_25000",
    category: "PRICE",
    categoryIndex: 4,
    categoryTitleTh: "4. พูดราคาตามที่เห็น",
    categoryTitleJa: "値段の確認",
    questionJa: "Kore wa ikura desuka?",
    questionRomaji: "Kore wa ikura desuka?",
    questionTh: "สิ่งนี้ราคาเท่าไหร่? (25,000 ¥)",
    displayLabel: "ป้ายราคา",
    displayValue: "25,000 ¥",
    displaySubtext: "ni-man (20,000) + go-sen (5,000) + en desu.",
    expectedAnswerJa: "Ni-man go-sen en desu.",
    expectedAnswerRomaji: "Ni-man go-sen en desu.",
    keywords: [
      "niman gosen en desu",
      "ni-man go-sen en desu",
      "niman gosen en",
      "にまん ごせん えんです",
      "25000円です",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข + en และลงท้ายด้วย desu. (หลักหมื่นใช้ man: ni-man go-sen)",
  },
  {
    id: "e2_q4_38000",
    category: "PRICE",
    categoryIndex: 4,
    categoryTitleTh: "4. พูดราคาตามที่เห็น",
    categoryTitleJa: "値段の確認",
    questionJa: "Kore wa ikura desuka?",
    questionRomaji: "Kore wa ikura desuka?",
    questionTh: "สิ่งนี้ราคาเท่าไหร่? (38,000 ¥)",
    displayLabel: "ป้ายราคา",
    displayValue: "38,000 ¥",
    displaySubtext: "san-man (30,000) + has-sen (8,000) + en desu.",
    expectedAnswerJa: "San-man has-sen en desu.",
    expectedAnswerRomaji: "San-man has-sen en desu.",
    keywords: [
      "sanman hassen en desu",
      "san-man has-sen en desu",
      "sanman hassen en",
      "さんまん はっせん えんです",
      "38000円です",
    ],
    ruleNoteTh: "พูดเฉพาะตัวเลข + en และลงท้ายด้วย desu. (san-man has-sen)",
  },

  // =========================================================================
  // หมวดที่ 5: ช่วงเวลาทำงาน (Shigoto wa nanji kara nanji made desuka?)
  // =========================================================================
  {
    id: "e2_q5_0900_1700",
    category: "OFFICE_HOURS",
    categoryIndex: 5,
    categoryTitleTh: "5. พูดเวลาเริ่มและสิ้นสุด",
    categoryTitleJa: "勤務時間",
    questionJa: "Shigoto wa nanji kara nanji made desuka?",
    questionRomaji: "Shigoto wa nanji kara nanji made desuka?",
    questionTh: "เวลาทำงานเริ่มกี่โมงถึงกี่โมง? (9.00 – 17.00 น.)",
    displayLabel: "เวลาทำงาน",
    displayValue: "9.00 – 17.00 น.",
    displaySubtext: "9 โมงเช้า ถึง 5 โมงเย็น (Gozen ku-ji kara gogo go-ji made)",
    expectedAnswerJa: "Gozen ku-ji kara gogo go-ji made desu.",
    expectedAnswerRomaji: "Gozen ku-ji kara gogo go-ji made desu.",
    keywords: [
      "gozen ku-ji kara gogo go-ji made desu",
      "gozen kuji kara gogo goji made desu",
      "ku-ji kara go-ji made desu",
      "kuji kara goji made desu",
      "ごぜん くじから ごご ごじまでです",
      "9時から5時までです",
    ],
    ruleNoteTh: "พูดเวลาเริ่มและสิ้นสุด ลงท้ายด้วย desu.: Gozen ku-ji kara gogo go-ji made desu.",
  },
  {
    id: "e2_q5_1000_1500",
    category: "OFFICE_HOURS",
    categoryIndex: 5,
    categoryTitleTh: "5. พูดเวลาเริ่มและสิ้นสุด",
    categoryTitleJa: "勤務時間",
    questionJa: "Shigoto wa nanji kara nanji made desuka?",
    questionRomaji: "Shigoto wa nanji kara nanji made desuka?",
    questionTh: "เวลาทำงานเริ่มกี่โมงถึงกี่โมง? (10.00 – 15.00 น.)",
    displayLabel: "เวลาทำงาน",
    displayValue: "10.00 – 15.00 น.",
    displaySubtext: "10 โมงเช้า ถึง บ่าย 3 โมง (Gozen jū-ji kara gogo san-ji made)",
    expectedAnswerJa: "Gozen jū-ji kara gogo san-ji made desu.",
    expectedAnswerRomaji: "Gozen jū-ji kara gogo san-ji made desu.",
    keywords: [
      "gozen ju-ji kara gogo san-ji made desu",
      "gozen juji kara gogo sanji made desu",
      "gozen juu-ji kara gogo san-ji made desu",
      "ju-ji kara san-ji made desu",
      "ごぜん じゅうじから ごご さんじまでです",
      "10時から3時までです",
    ],
    ruleNoteTh: "พูดเวลาเริ่มและสิ้นสุด ลงท้ายด้วย desu.: Gozen jū-ji kara gogo san-ji made desu.",
  },
  {
    id: "e2_q5_0830_1630",
    category: "OFFICE_HOURS",
    categoryIndex: 5,
    categoryTitleTh: "5. พูดเวลาเริ่มและสิ้นสุด",
    categoryTitleJa: "勤務時間",
    questionJa: "Shigoto wa nanji kara nanji made desuka?",
    questionRomaji: "Shigoto wa nanji kara nanji made desuka?",
    questionTh: "เวลาทำงานเริ่มกี่โมงถึงกี่โมง? (8.30 – 16.30 น.)",
    displayLabel: "เวลาทำงาน",
    displayValue: "8.30 – 16.30 น.",
    displaySubtext: "8 โมงครึ่งเช้า ถึง 4 โมงครึ่งเย็น (Gozen hachi-ji han kara gogo yo-ji han made)",
    expectedAnswerJa: "Gozen hachi-ji han kara gogo yo-ji han made desu.",
    expectedAnswerRomaji: "Gozen hachi-ji han kara gogo yo-ji han made desu.",
    keywords: [
      "gozen hachi-ji han kara gogo yo-ji han made desu",
      "gozen hachiji han kara gogo yoji han made desu",
      "hachi-ji han kara yo-ji han made desu",
      "ごぜん はちじはんから ごご よじはんまでです",
    ],
    ruleNoteTh: "พูดเวลาเริ่มและสิ้นสุด ลงท้ายด้วย desu. (8 โมงครึ่ง ถึง 4 โมงครึ่ง)",
  },
  {
    id: "e2_q5_0900_1800",
    category: "OFFICE_HOURS",
    categoryIndex: 5,
    categoryTitleTh: "5. พูดเวลาเริ่มและสิ้นสุด",
    categoryTitleJa: "勤務時間",
    questionJa: "Shigoto wa nanji kara nanji made desuka?",
    questionRomaji: "Shigoto wa nanji kara nanji made desuka?",
    questionTh: "เวลาทำงานเริ่มกี่โมงถึงกี่โมง? (9.00 – 18.00 น.)",
    displayLabel: "เวลาทำงาน",
    displayValue: "9.00 – 18.00 น.",
    displaySubtext: "9 โมงเช้า ถึง 6 โมงเย็น (Gozen ku-ji kara gogo roku-ji made)",
    expectedAnswerJa: "Gozen ku-ji kara gogo roku-ji made desu.",
    expectedAnswerRomaji: "Gozen ku-ji kara gogo roku-ji made desu.",
    keywords: [
      "gozen ku-ji kara gogo roku-ji made desu",
      "gozen kuji kara gogo rokuji made desu",
      "ku-ji kara roku-ji made desu",
      "ごぜん くじから ごご ろくじまでです",
    ],
    ruleNoteTh: "พูดเวลาเริ่มและสิ้นสุด ลงท้ายด้วย desu.: Gozen ku-ji kara gogo roku-ji made desu.",
  },
  {
    id: "e2_q5_0800_1700",
    category: "OFFICE_HOURS",
    categoryIndex: 5,
    categoryTitleTh: "5. พูดเวลาเริ่มและสิ้นสุด",
    categoryTitleJa: "勤務時間",
    questionJa: "Shigoto wa nanji kara nanji made desuka?",
    questionRomaji: "Shigoto wa nanji kara nanji made desuka?",
    questionTh: "เวลาทำงานเริ่มกี่โมงถึงกี่โมง? (8.00 – 17.00 น.)",
    displayLabel: "เวลาทำงาน",
    displayValue: "8.00 – 17.00 น.",
    displaySubtext: "8 โมงเช้า ถึง 5 โมงเย็น (Gozen hachi-ji kara gogo go-ji made)",
    expectedAnswerJa: "Gozen hachi-ji kara gogo go-ji made desu.",
    expectedAnswerRomaji: "Gozen hachi-ji kara gogo go-ji made desu.",
    keywords: [
      "gozen hachi-ji kara gogo go-ji made desu",
      "gozen hachiji kara gogo goji made desu",
      "hachi-ji kara go-ji made desu",
      "ごぜん はちじから ごご ごじまでです",
    ],
    ruleNoteTh: "พูดเวลาเริ่มและสิ้นสุด ลงท้ายด้วย desu.: Gozen hachi-ji kara gogo go-ji made desu.",
  },
  {
    id: "e2_q5_1000_1800",
    category: "OFFICE_HOURS",
    categoryIndex: 5,
    categoryTitleTh: "5. พูดเวลาเริ่มและสิ้นสุด",
    categoryTitleJa: "勤務時間",
    questionJa: "Shigoto wa nanji kara nanji made desuka?",
    questionRomaji: "Shigoto wa nanji kara nanji made desuka?",
    questionTh: "เวลาทำงานเริ่มกี่โมงถึงกี่โมง? (10.00 – 18.00 น.)",
    displayLabel: "เวลาทำงาน",
    displayValue: "10.00 – 18.00 น.",
    displaySubtext: "10 โมงเช้า ถึง 6 โมงเย็น (Gozen jū-ji kara gogo roku-ji made)",
    expectedAnswerJa: "Gozen jū-ji kara gogo roku-ji made desu.",
    expectedAnswerRomaji: "Gozen jū-ji kara gogo roku-ji made desu.",
    keywords: [
      "gozen ju-ji kara gogo roku-ji made desu",
      "gozen juji kara gogo rokuji made desu",
      "gozen juu-ji kara gogo roku-ji made desu",
      "ju-ji kara roku-ji made desu",
      "ごぜん じゅうじから ごご ろくじまでです",
    ],
    ruleNoteTh: "พูดเวลาเริ่มและสิ้นสุด ลงท้ายด้วย desu.: Gozen jū-ji kara gogo roku-ji made desu.",
  },
];

/**
 * ฟังก์ชันสุ่มข้อสอบสำหรับการสอบครั้งที่ 2
 * สุ่ม 2 ข้อจากแต่ละหมวด (5 หมวด x 2 ข้อ = 10 ข้อ)
 */
export function generateExam2Questions(): Exam2Question[] {
  const categories: Exam2Category[] = ["PLACE", "TIME", "PHONE", "PRICE", "OFFICE_HOURS"];
  const selected: Exam2Question[] = [];

  categories.forEach((cat) => {
    const pool = EXAM_2_QUESTIONS_POOL.filter((q) => q.category === cat);
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    selected.push(...shuffled.slice(0, 2));
  });

  return selected;
}
