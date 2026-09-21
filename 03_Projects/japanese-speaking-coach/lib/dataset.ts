// lib/dataset.ts - คลังข้อมูลคำศัพท์, บทสนทนา, คำถามภาพ SVG ครอบคลุมบทที่ 1-6 วิชา JN60101
import {
  SelfIntroCriteria,
  VocabItem,
  ImageQuestion,
  ChapterDialogue,
  DialogueLine,
  ExamType,
} from './types';

// ==========================================
// 1. เกณฑ์การแนะนำตนเอง (บทที่ 1)
// ==========================================
export const SELF_INTRODUCTION_CRITERIA: SelfIntroCriteria = {
  template: [
    { step: 1, ja: "はじめまして", romaji: "Hajimemashite", th: "ยินดีที่ได้รู้จัก", key: "hajimemashite" },
    { step: 2, ja: "わたしは [ชื่อ] です", romaji: "Watashi wa [Name] desu", th: "ฉันคือ [ชื่อ] (ห้ามมี san)", key: "watashi wa" },
    { step: 3, ja: "パンヤピワットの がくせい です", romaji: "Panyapiwatto no gakusei desu", th: "เป็นนักศึกษาของปัญญาภิวัฒน์", key: "panyapiwatto no gakusei desu" },
    { step: 4, ja: "しゅみは [งานอดิเรก] です", romaji: "Shumi wa [manga / dokusho / eiga] desu", th: "งานอดิเรกคือ [การ์ตูน / อ่านหนังสือ / ดูหนัง]", key: "shumi wa" },
    { step: 5, ja: "どうぞ よろしく おねがい いたします", romaji: "Dōzo yoroshiku onegai itashimasu", th: "ขอฝากเนื้อฝากตัวด้วยครับ/ค่ะ", key: "yoroshiku" }
  ],
  sampleHobbies: [
    { ja: "まんが", romaji: "manga", th: "การ์ตูน (มังงะ)" },
    { ja: "どくしょ", romaji: "dokusho", th: "การอ่านหนังสือ" },
    { ja: "えいが", romaji: "eiga", th: "ดูภาพยนตร์" },
    { ja: "おんがく", romaji: "ongaku", th: "ฟังเพลง" },
    { ja: "ゲーム", romaji: "gēmu", th: "เล่นเกม" },
    { ja: "りょうり", romaji: "ryōri", th: "ทำอาหาร" },
    { ja: "スポーツ", romaji: "supōtsu", th: "เล่นกีฬา" }
  ]
};

// ==========================================
// 2. บทสนทนาประจำบท (Chapter Dialogues 1-6)
// สำหรับฝึกซ้อมบทสนทนา และเตรียมงานกลุ่ม Roleplay 15 คะแนน (เกณฑ์: >= 5 ประโยค, >= 5 พยางค์)
// ==========================================
export const CHAPTER_DIALOGUES: ChapterDialogue[] = [
  {
    chapter: 1,
    titleJa: "第1課 自己紹介と挨拶",
    titleTh: "บทที่ 1: การแนะนำตนเองและการทักทาย",
    situationTh: "การแนะนำตนเองอย่างเป็นทางการในโอกาสพบกันครั้งแรกในชั้นเรียนหรือที่ทำงาน",
    lines: [
      { step: 1, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "はじめまして。", romaji: "Hajimemashite.", th: "ยินดีที่ได้รู้จักครับ/ค่ะ", key: "hajimemashite", expectedKeywords: ["hajimemashite", "はじめまして"], moraCount: 6 },
      { step: 2, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "わたしは たなか です。", romaji: "Watashi wa Tanaka desu.", th: "ฉันคือทานากะครับ/ค่ะ (ห้ามมี san)", key: "watashi wa", expectedKeywords: ["watashi wa", "desu", "わたしは"], moraCount: 8 },
      { step: 3, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "パンヤピワットの がくせい です。", romaji: "Panyapiwatto no gakusei desu.", th: "เป็นนักศึกษาของปัญญาภิวัฒน์ครับ/ค่ะ", key: "panyapiwatto", expectedKeywords: ["panyapiwatto", "gakusei desu", "がくせい"], moraCount: 13 },
      { step: 4, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "しゅみは まんが です。", romaji: "Shumi wa manga desu.", th: "งานอดิเรกคือการอ่านมังงะครับ/ค่ะ", key: "shumi", expectedKeywords: ["shumi wa", "desu", "しゅみは"], moraCount: 7 },
      { step: 5, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "どうぞ よろしく おねがい いたします。", romaji: "Dōzo yoroshiku onegai itashimasu.", th: "ขอฝากเนื้อฝากตัวด้วยครับ/ค่ะ", key: "yoroshiku", expectedKeywords: ["douzo yoroshiku", "onegai", "よろしく"], moraCount: 16 }
    ]
  },
  {
    chapter: 2,
    titleJa: "第2課 名刺交換と物の確認",
    titleTh: "บทที่ 2: การแลกนามบัตรและการถามสิ่งของ",
    situationTh: "การแลกนามบัตรกับคู่ค้าและสอบถามสิ่งของในที่ทำงาน",
    lines: [
      { step: 1, speaker: "A", speakerNameJa: "佐藤", speakerNameTh: "ซาโต้", ja: "はじめまして。さとう です。どうぞ よろしく。", romaji: "Hajimemashite. Satō desu. Dōzo yoroshiku.", th: "ยินดีที่ได้รู้จักครับ ผมซาโต้ ขอฝากตัวด้วยครับ", key: "satou", expectedKeywords: ["hajimemashite", "satou", "yoroshiku"], moraCount: 18 },
      { step: 2, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "はじめまして。たなか です。こちらこそ よろしく。", romaji: "Hajimemashite. Tanaka desu. Kochirakoso yoroshiku.", th: "ยินดีที่ได้รู้จักครับ ผมทานากะ ทางนี้ก็ขอฝากเนื้อฝากตัวเช่นกันครับ", key: "tanaka", expectedKeywords: ["hajimemashite", "tanaka", "kochirakoso yoroshiku"], moraCount: 19 },
      { step: 3, speaker: "A", speakerNameJa: "佐藤", speakerNameTh: "ซาโต้", ja: "これは だれの名刺 ですか。", romaji: "Kore wa dare no meishi desuka.", th: "นี่คือนามบัตรของใครหรือครับ?", key: "dare no meishi", expectedKeywords: ["kore wa", "dare no meishi", "desuka"], moraCount: 11 },
      { step: 4, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "これは わたしの名刺 です。", romaji: "Kore wa watashi no meishi desu.", th: "นี่คือนามบัตรของฉันครับ", key: "watashi no meishi", expectedKeywords: ["kore wa", "watashi no meishi", "desu"], moraCount: 11 },
      { step: 5, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "それは にほんごの ほんですか。", romaji: "Sore wa nihongo no hon desuka.", th: "นั่นคือหนังสือภาษาญี่ปุ่นใช่ไหมครับ?", key: "nihongo no hon", expectedKeywords: ["sore wa", "nihongo no hon", "desuka"], moraCount: 12 }
    ]
  },
  {
    chapter: 3,
    titleJa: "第3課 時間と仕事の確認",
    titleTh: "บทที่ 3: การคุยเรื่องเวลาและตารางการทำงาน",
    situationTh: "การสอบถามเวลาปัจจุบัน เวลาเปิดทำการ และเวลาทำงานในออฟฟิศ",
    lines: [
      { step: 1, speaker: "A", speakerNameJa: "同僚", speakerNameTh: "เพื่อนร่วมงาน", ja: "すみません、いま なんじ ですか。", romaji: "Sumimasen, ima nanji desuka.", th: "ขอโทษนะครับ ตอนนี้กี่โมงแล้วครับ?", key: "ima nanji", expectedKeywords: ["sumimasen", "ima nanji", "desuka"], moraCount: 13 },
      { step: 2, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "いま ちょうど さんじ です。", romaji: "Ima chōdo san-ji desu.", th: "ตอนนี้ 3 โมงตรงครับ/ค่ะ", key: "choudo sanji", expectedKeywords: ["ima", "sanji", "desu"], moraCount: 9 },
      { step: 3, speaker: "A", speakerNameJa: "同僚", speakerNameTh: "เพื่อนร่วมงาน", ja: "かいぎは なんじから なんじまで ですか。", romaji: "Kaigi wa nanji kara nanji made desuka.", th: "การประชุมเริ่มกี่โมงถึงกี่โมงครับ?", key: "kaigi nanji kara", expectedKeywords: ["kaigi wa", "nanji kara", "nanji made", "desuka"], moraCount: 17 },
      { step: 4, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "かいぎは くじから じゅういちじまで です。", romaji: "Kaigi wa ku-ji kara jūichi-ji made desu.", th: "การประชุมเริ่ม 9 โมงถึง 11 โมงครับ/ค่ะ", key: "kuji kara", expectedKeywords: ["kaigi wa", "kuji kara", "made desu"], moraCount: 18 },
      { step: 5, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "ひるやすみは じゅうにじから いちじまで です。", romaji: "Hiruyasumi wa jūniji kara ichiji made desu.", th: "พักกลางวันเริ่มเที่ยงถึงบ่ายโมงครับ/ค่ะ", key: "hiruyasumi", expectedKeywords: ["hiruyasumi", "juuniji kara", "ichiji made"], moraCount: 20 }
    ]
  },
  {
    chapter: 4,
    titleJa: "第4課 買い物と値段の交渉",
    titleTh: "บทที่ 4: การซื้อของและสอบถามราคา",
    situationTh: "การเลือกซื้ออุปกรณ์ไอที/ของใช้ในห้างสรรพสินค้าและถามราคา",
    lines: [
      { step: 1, speaker: "A", speakerNameJa: "店員", speakerNameTh: "พนักงานร้าน", ja: "いらっしゃいませ。何をお探しですか。", romaji: "Irasshaimase. Nani o osagashi desuka.", th: "ยินดีต้อนรับครับ กำลังมองหาอะไรอยู่หรือครับ?", key: "irasshaimase", expectedKeywords: ["irasshaimase"], moraCount: 16 },
      { step: 2, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "すみません、その かばんを みせて ください。", romaji: "Sumimasen, sono kaban o misete kudasai.", th: "ขอโทษนะครับ ขอดูประเป๋าใบนั้นหน่อยครับ", key: "misete kudasai", expectedKeywords: ["sumimasen", "sono kaban", "misete kudasai"], moraCount: 17 },
      { step: 3, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "この かばんは いくら ですか。", romaji: "Kono kaban wa ikura desuka.", th: "กระเป๋าใบนี้ราคาเท่าไหร่ครับ?", key: "ikura desuka", expectedKeywords: ["kono kaban wa", "ikura desuka"], moraCount: 12 },
      { step: 4, speaker: "A", speakerNameJa: "店員", speakerNameTh: "พนักงานร้าน", ja: "その かばんは さんぜんえん です。", romaji: "Sono kaban wa san-zen-en desu.", th: "กระเป๋าใบนั้นราคา 3,000 เยนครับ", key: "sanzen-en", expectedKeywords: ["sono kaban wa", "sanzen en desu"], moraCount: 13 },
      { step: 5, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "じゃ、これを ください。", romaji: "Ja, kore o kudasai.", th: "งั้น ขอรับชิ้นนี้ครับ (ตกลงซื้อ)", key: "ja kore o kudasai", expectedKeywords: ["ja", "kore o kudasai"], moraCount: 8 }
    ]
  },
  {
    chapter: 5,
    titleJa: "第5課 買い物と個数・色の指定",
    titleTh: "บทที่ 5: การซื้อของระบุลักษณนาม สี และขนาด",
    situationTh: "การซื้อเสื้อผ้า ผลไม้ และเครื่องดื่ม ระบุสี ขนาด และจำนวนลักษณนาม",
    lines: [
      { step: 1, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "すみません、あの あおい Tシャツを みせて ください。", romaji: "Sumimasen, ano aoi T-shatsu o misete kudasai.", th: "ขอโทษนะครับ ขอดูเสื้อยืดสีฟ้าตัวนั้นหน่อยครับ", key: "aoi t-shatsu", expectedKeywords: ["sumimasen", "aoi", "t-shatsu", "misete kudasai"], moraCount: 21 },
      { step: 2, speaker: "A", speakerNameJa: "店員", speakerNameTh: "พนักงานร้าน", ja: "はい、どうぞ。なんまい いかがですか。", romaji: "Hai, dōzo. Nan-mai ikaga desuka.", th: "นี่ครับ จะรับกี่ตัวดีครับ?", key: "nanmai", expectedKeywords: ["hai douzo", "nanmai"], moraCount: 14 },
      { step: 3, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "この あおい Tシャツを にまい ください。", romaji: "Kono aoi T-shatsu o ni-mai kudasai.", th: "ขอเสื้อยืดสีฟ้านี้ 2 ตัวครับ", key: "nimai kudasai", expectedKeywords: ["kono aoi", "t-shatsu", "nimai kudasai"], moraCount: 17 },
      { step: 4, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "それから、りんごを ふたつ ください。", romaji: "Sorekara, ringo o futatsu kudasai.", th: "แล้วก็ ขอแอปเปิ้ล 2 ผลด้วยครับ", key: "ringo futatsu", expectedKeywords: ["sorekara", "ringo", "futatsu kudasai"], moraCount: 14 },
      { step: 5, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "ビールを さんぼん ください。", romaji: "Bīru o san-bon kudasai.", th: "ขอเบียร์ 3 ขวดครับ", key: "biiru sanbon", expectedKeywords: ["biiru", "sanbon kudasai"], moraCount: 10 }
    ]
  },
  {
    chapter: 6,
    titleJa: "第6課 予定の確認と移動・出張",
    titleTh: "บทที่ 6: การยืนยันตารางงาน การเดินทาง และการไปปฏิบัติงาน",
    situationTh: "การนัดหมายตารางงานและแจ้งกำหนดการเดินทางไปต่างสถานที่",
    lines: [
      { step: 1, speaker: "A", speakerNameJa: "部長", speakerNameTh: "หัวหน้า", ja: "もしもし、あした どこへ いきますか。", romaji: "Moshi moshi, ashita doko e ikimasuka.", th: "ฮัลโหล พรุ่งนี้จะไปที่ไหนหรือครับ?", key: "ashita doko", expectedKeywords: ["moshi moshi", "ashita", "doko", "ikimasuka"], moraCount: 14 },
      { step: 2, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "あしたは ぎんこうへ いきます。", romaji: "Ashita wa ginkō e ikimasu.", th: "พรุ่งนี้จะไปธนาคารครับ/ค่ะ", key: "ginkou ikimasu", expectedKeywords: ["ashita wa", "ginkou", "ikimasu"], moraCount: 12 },
      { step: 3, speaker: "A", speakerNameJa: "部長", speakerNameTh: "หัวหน้า", ja: "だれと いきますか。ひとりで いきますか。", romaji: "Dare to ikimasuka. Hitori de ikimasuka.", th: "ไปกับใครครับ? ไปคนเดียวหรือเปล่า?", key: "dare to hitoride", expectedKeywords: ["dare to", "ikimasuka", "hitori de"], moraCount: 18 },
      { step: 4, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "いいえ、ともだちと バスで いきます。", romaji: "Iie, tomodachi to basu de ikimasu.", th: "เปล่าครับ ไปกับเพื่อนโดยรถบัสครับ", key: "tomodachi to basu", expectedKeywords: ["iie", "tomodachi to", "basu de ikimasu"], moraCount: 15 },
      { step: 5, speaker: "B", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "きんようびに とうきょうへ しゅっちょうします。", romaji: "Kin-yōbi ni Tōkyō e shutchō shimasu.", th: "วันศุกร์จะไปทำงานนอกสถานที่ (출장) ที่โตเกียวครับ/ค่ะ", key: "kinyoubi tokyo", expectedKeywords: ["kinyoubi ni", "toukyou", "shutchou"], moraCount: 18 }
    ]
  }
];

// ==========================================
// 3. บทสนทนาและโจทย์ Part 1 สำหรับชุดข้อสอบแต่ละชุด (EXAM 1, 2, 3, FINAL)
// ==========================================
export const EXAM_PART1_SCRIPTS: Record<ExamType, DialogueLine[]> = {
  EXAM_1: [
    { step: 1, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "はじめまして", romaji: "Hajimemashite", th: "ยินดีที่ได้รู้จัก", key: "hajimemashite", expectedKeywords: ["hajimemashite", "はじめまして"], moraCount: 6 },
    { step: 2, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "わたしは [名前] です", romaji: "Watashi wa [Name] desu", th: "ฉันคือ [ชื่อ] (ห้ามมี san)", key: "watashi wa", expectedKeywords: ["watashi wa", "desu", "わたしは"], moraCount: 8 },
    { step: 3, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "パンヤピワットの がくせい です", romaji: "Panyapiwatto no gakusei desu", th: "เป็นนักศึกษาของปัญญาภิวัฒน์", key: "panyapiwatto no gakusei desu", expectedKeywords: ["panyapiwatto", "gakusei desu"], moraCount: 13 },
    { step: 4, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "しゅみは [趣味] です", romaji: "Shumi wa [Hobby] desu", th: "งานอดิเรกคือ [การ์ตูน / อ่านหนังสือ / ดูหนัง]", key: "shumi wa", expectedKeywords: ["shumi wa", "desu"], moraCount: 7 },
    { step: 5, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "どうぞ よろしく おねがい いたします", romaji: "Dōzo yoroshiku onegai itashimasu", th: "ขอฝากเนื้อฝากตัวด้วยครับ/ค่ะ", key: "yoroshiku", expectedKeywords: ["douzo yoroshiku", "onegai itashimasu"], moraCount: 16 }
  ],
  EXAM_2: [
    { step: 1, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "すみません、いま なんじ ですか。", romaji: "Sumimasen, ima nanji desuka.", th: "ขอโทษนะครับ ตอนนี้กี่โมงแล้วครับ?", key: "sumimasen ima nanji", expectedKeywords: ["sumimasen", "ima nanji", "desuka"], moraCount: 13 },
    { step: 2, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "いま ちょうど さんじ です。", romaji: "Ima chōdo san-ji desu.", th: "ตอนนี้ 3 โมงตรงครับ/ค่ะ", key: "choudo sanji", expectedKeywords: ["ima", "sanji", "desu"], moraCount: 9 },
    { step: 3, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "しごとは くじから ごじまで です。", romaji: "Shigoto wa ku-ji kara go-ji made desu.", th: "งานเริ่ม 9 โมงถึง 5 โมงเย็นครับ/ค่ะ", key: "shigoto kuji kara", expectedKeywords: ["shigoto wa", "kuji kara", "goji made"], moraCount: 16 },
    { step: 4, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "その かばんは いくら ですか。", romaji: "Sono kaban wa ikura desuka.", th: "กระเป๋าใบนั้นราคาเท่าไหร่ครับ?", key: "sono kaban ikura", expectedKeywords: ["sono kaban", "ikura desuka"], moraCount: 12 },
    { step: 5, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "じゃ、これを ください。", romaji: "Ja, kore o kudasai.", th: "งั้น ขอรับชิ้นนี้ครับ (ตกลงซื้อ)", key: "ja kore o kudasai", expectedKeywords: ["ja", "kore o kudasai"], moraCount: 8 }
  ],
  EXAM_3: [
    { step: 1, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "この あおい Tシャツを みせて ください。", romaji: "Kono aoi T-shatsu o misete kudasai.", th: "ขอดูเสื้อยืดสีฟ้านี้หน่อยครับ", key: "aoi t-shatsu misete", expectedKeywords: ["kono aoi", "t-shatsu", "misete kudasai"], moraCount: 18 },
    { step: 2, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "りんごを ふたつ ください。", romaji: "Ringo o futatsu kudasai.", th: "ขอแอปเปิ้ล 2 ผลครับ", key: "ringo futatsu", expectedKeywords: ["ringo", "futatsu kudasai"], moraCount: 10 },
    { step: 3, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "あした ぎんこうへ いきます。", romaji: "Ashita ginkō e ikimasu.", th: "พรุ่งนี้จะไปธนาคารครับ/ค่ะ", key: "ashita ginkou", expectedKeywords: ["ashita", "ginkou", "ikimasu"], moraCount: 10 },
    { step: 4, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "せんしゅう ともだちと きょうとへ いきました。", romaji: "Senshū tomodachi to Kyōto e ikimashita.", th: "สัปดาห์ที่แล้วไปเกียวโตกับเพื่อนมาครับ/ค่ะ", key: "senshuu tomodachi", expectedKeywords: ["senshuu", "tomodachi to", "kyouto", "ikimashita"], moraCount: 19 },
    { step: 5, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "きんようびに うちへ かえります。", romaji: "Kin-yōbi ni uchi e kaerimasu.", th: "วันศุกร์จะกลับบ้านครับ/ค่ะ", key: "kinyoubi uchi", expectedKeywords: ["kinyoubi ni", "uchi", "kaerimasu"], moraCount: 13 }
  ],
  FINAL: [
    { step: 1, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "はじめまして、わたしは [名前] です。", romaji: "Hajimemashite, watashi wa [Name] desu.", th: "ยินดีที่ได้รู้จักครับ ฉันคือ [ชื่อ] (ห้ามมี san)", key: "hajimemashite watashi wa", expectedKeywords: ["hajimemashite", "watashi wa", "desu"], moraCount: 14 },
    { step: 2, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "パンヤピワットの がくせい です。", romaji: "Panyapiwatto no gakusei desu.", th: "เป็นนักศึกษาของปัญญาภิวัฒน์ครับ/ค่ะ", key: "panyapiwatto gakusei", expectedKeywords: ["panyapiwatto", "gakusei desu"], moraCount: 13 },
    { step: 3, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "まいにち くじから ごじまで べんきょうします。", romaji: "Mainichi ku-ji kara go-ji made benkyō shimasu.", th: "เรียนหนังสือทุกวันตั้งแต่ 9 โมงถึง 5 โมงเย็นครับ/ค่ะ", key: "mainichi kuji kara", expectedKeywords: ["mainichi", "kuji kara", "goji made", "benkyou shimasu"], moraCount: 21 },
    { step: 4, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "らいしゅう ともだちと にほんへ いきます。", romaji: "Raishū tomodachi to Nihon e ikimasu.", th: "สัปดาห์หน้าจะไปประเทศญี่ปุ่นกับเพื่อนครับ/ค่ะ", key: "raishuu tomodachi nihon", expectedKeywords: ["raishuu", "tomodachi to", "nihon", "ikimasu"], moraCount: 18 },
    { step: 5, speaker: "Student", speakerNameJa: "学生", speakerNameTh: "นักศึกษา", ja: "どうぞ よろしく おねがい いたします。", romaji: "Dōzo yoroshiku onegai itashimasu.", th: "ขอฝากเนื้อฝากตัวด้วยครับ/ค่ะ", key: "douzo yoroshiku", expectedKeywords: ["douzo yoroshiku", "onegai itashimasu"], moraCount: 16 }
  ]
};

// ==========================================
// 4. คลังคำศัพท์บทที่ 1-6 (ไทย -> ญี่ปุ่น)
// ครอบคลุมคำศัพท์ทั้งหมดในสไลด์เรียน 8 ไฟล์ รวม ~180 คำ
// ==========================================
export const VOCABULARY_LIST: VocabItem[] = [
  // --- บทที่ 1: อาชีพ & สัญชาติ & ข้อมูลบุคคล ---
  { id: "v1", th: "นักเรียน / นักศึกษา", ja: "がくせい", romaji: "gakusei", chapter: 1, category: "อาชีพ" },
  { id: "v2", th: "อาจารย์ / ครู", ja: "せんせい", romaji: "sensei", chapter: 1, category: "อาชีพ" },
  { id: "v3", th: "พนักงานบริษัท", ja: "かいしゃいん", romaji: "kaishain", chapter: 1, category: "อาชีพ" },
  { id: "v4", th: "พนักงานธนาคาร", ja: "ぎんこういん", romaji: "ginkō-in", altRomaji: ["ginkoin", "ginkou-in"], chapter: 1, category: "อาชีพ" },
  { id: "v5", th: "แพทย์ / หมอ", ja: "いしゃ", romaji: "isha", chapter: 1, category: "อาชีพ" },
  { id: "v6", th: "นักวิจัย", ja: "けんきゅうしゃ", romaji: "kenkyūsha", altRomaji: ["kenkyusha", "kenkyuusha"], chapter: 1, category: "อาชีพ" },
  { id: "v7", th: "วิศวกร", ja: "エンジニア", romaji: "enjinia", chapter: 1, category: "อาชีพ" },
  { id: "v8", th: "คนญี่ปุ่น", ja: "にほんじん", romaji: "Nihon-jin", altRomaji: ["nihonjin"], chapter: 1, category: "สัญชาติ" },
  { id: "v9", th: "คนไทย", ja: "タイじん", romaji: "Tai-jin", altRomaji: ["taijin"], chapter: 1, category: "สัญชาติ" },
  { id: "v10", th: "คนอเมริกัน", ja: "アメリカじん", romaji: "Amerika-jin", altRomaji: ["amerikajin"], chapter: 1, category: "สัญชาติ" },
  { id: "v11", th: "มหาวิทยาลัย", ja: "だいがく", romaji: "daigaku", chapter: 1, category: "สถานที่" },
  { id: "v12", th: "โรงพยาบาล", ja: "びょういん", romaji: "byōin", altRomaji: ["byouin"], chapter: 1, category: "สถานที่" },

  // --- บทที่ 2: สิ่งของส่วนตัว & ในสำนักงาน ---
  { id: "v13", th: "หนังสือ", ja: "ほん", romaji: "hon", chapter: 2, category: "สิ่งของ" },
  { id: "v14", th: "พจนานุกรม", ja: "じしょ", romaji: "jisho", chapter: 2, category: "สิ่งของ" },
  { id: "v15", th: "นิตยสาร", ja: "ざっし", romaji: "zasshi", chapter: 2, category: "สิ่งของ" },
  { id: "v16", th: "หนังสือพิมพ์", ja: "しんぶん", romaji: "shinbun", chapter: 2, category: "สิ่งของ" },
  { id: "v17", th: "สมุดบันทึก / ไดอารี่", ja: "てちょう", romaji: "techō", altRomaji: ["techo", "techou"], chapter: 2, category: "สิ่งของ" },
  { id: "v18", th: "กุญแจ", ja: "かぎ", romaji: "kagi", chapter: 2, category: "สิ่งของ" },
  { id: "v19", th: "นาฬิกา", ja: "とけい", romaji: "tokei", chapter: 2, category: "สิ่งของ" },
  { id: "v20", th: "ร่ม", ja: "かさ", romaji: "kasa", chapter: 2, category: "สิ่งของ" },
  { id: "v21", th: "นามบัตร", ja: "めいし", romaji: "meishi", chapter: 2, category: "สิ่งของ" },
  { id: "v22", th: "กระเป๋า", ja: "かばん", romaji: "kaban", chapter: 2, category: "สิ่งของ" },
  { id: "v23", th: "โต๊ะ", ja: "つくえ", romaji: "tsukue", chapter: 2, category: "สิ่งของ" },
  { id: "v24", th: "เก้าอี้", ja: "いす", romaji: "isu", chapter: 2, category: "สิ่งของ" },
  { id: "v25", th: "รถยนต์", ja: "じどうしゃ", romaji: "jidōsha", altJa: "くるま", altRomaji: ["kuruma", "jidousha"], chapter: 2, category: "สิ่งของ" },
  { id: "v26", th: "โทรทัศน์", ja: "テレビ", romaji: "terebi", chapter: 2, category: "เครื่องใช้ไฟฟ้า" },
  { id: "v27", th: "วิทยุ", ja: "ラジオ", romaji: "rajio", chapter: 2, category: "เครื่องใช้ไฟฟ้า" },
  { id: "v28", th: "กล้องถ่ายรูป", ja: "カメラ", romaji: "kamera", chapter: 2, category: "เครื่องใช้ไฟฟ้า" },
  { id: "v29", th: "คอมพิวเตอร์", ja: "コンピューター", romaji: "konpyūtā", altRomaji: ["konpyuta", "pasokon"], chapter: 2, category: "เครื่องใช้ไฟฟ้า" },
  { id: "v30", th: "แผนกต้อนรับ / ประชาสัมพันธ์", ja: "うけつけ", romaji: "uketsuke", chapter: 2, category: "สถานที่" },
  { id: "v31", th: "สำนักงาน / ห้องทำงาน", ja: "じむしょ", romaji: "jimusho", chapter: 2, category: "สถานที่" },
  { id: "v32", th: "ห้องเรียน", ja: "きょうしつ", romaji: "kyōshitsu", altRomaji: ["kyoushitsu"], chapter: 2, category: "สถานที่" },
  { id: "v33", th: "ปากกาลูกลื่น", ja: "ボールペン", romaji: "bōrupen", altRomaji: ["borupen"], chapter: 2, category: "เครื่องเขียน" },
  { id: "v34", th: "ดินสอกด", ja: "シャープペンシル", romaji: "shāpupenshiru", altRomaji: ["shapupenshiru"], chapter: 2, category: "เครื่องเขียน" },
  { id: "v35", th: "สมุดโน้ต", ja: "ノート", romaji: "nōto", altRomaji: ["noto"], chapter: 2, category: "เครื่องเขียน" },

  // --- บทที่ 3: สถานที่ & เวลา & ตัวเลขบอกเวลา ---
  { id: "v36", th: "ห้องประชุม", ja: "かいぎしつ", romaji: "kaigishitsu", chapter: 3, category: "สถานที่" },
  { id: "v37", th: "โรงอาหาร / ห้องอาหาร", ja: "しょくどう", romaji: "shokudō", altRomaji: ["shokudo", "shokudou"], chapter: 3, category: "สถานที่" },
  { id: "v38", th: "ห้องน้ำ", ja: "おてあらい", romaji: "otearai", altJa: "トイレ", altRomaji: ["toire"], chapter: 3, category: "สถานที่" },
  { id: "v39", th: "ห้างสรรพสินค้า", ja: "デパート", romaji: "depāto", altRomaji: ["depato"], chapter: 3, category: "สถานที่" },
  { id: "v40", th: "ซูเปอร์มาร์เก็ต", ja: "スーパー", romaji: "sūpā", altRomaji: ["supa"], chapter: 3, category: "สถานที่" },
  { id: "v41", th: "ร้านอาหาร", ja: "レストラン", romaji: "resutoran", chapter: 3, category: "สถานที่" },
  { id: "v42", th: "ที่ทำการไปรษณีย์", ja: "ゆうびんきょく", romaji: "yūbinkyoku", altRomaji: ["yubinkyoku", "yuubinkyoku"], chapter: 3, category: "สถานที่" },
  { id: "v43", th: "สระว่ายน้ำ", ja: "プール", romaji: "pūru", altRomaji: ["puru"], chapter: 3, category: "สถานที่" },
  { id: "v44", th: "ฟิตเนส / ยิม", ja: "ジム", romaji: "jimu", chapter: 3, category: "สถานที่" },
  { id: "v45", th: "เคาน์เตอร์ด้านหน้า (โรงแรม)", ja: "フロント", romaji: "furonto", chapter: 3, category: "สถานที่" },
  { id: "v46", th: "งาน / งานที่ทำ", ja: "しごと", romaji: "shigoto", chapter: 3, category: "คำศัพท์ทั่วไป" },
  { id: "v47", th: "การประชุม", ja: "かいぎ", romaji: "kaigi", chapter: 3, category: "คำศัพท์ทั่วไป" },
  { id: "v48", th: "เวลาพักกลางวัน", ja: "ひるやすみ", romaji: "hiruyasumi", chapter: 3, category: "เวลา" },
  { id: "v49", th: "งานเลี้ยง / ปาร์ตี้", ja: "パーティー", romaji: "pātī", altRomaji: ["pati"], chapter: 3, category: "คำศัพท์ทั่วไป" },
  { id: "v50", th: "ภาพยนตร์ / หนัง", ja: "えいが", romaji: "eiga", chapter: 3, category: "คำศัพท์ทั่วไป" },
  { id: "v51", th: "ตอนนี้ / ขณะนี้", ja: "いま", romaji: "ima", chapter: 3, category: "เวลา" },
  { id: "v52", th: "กี่โมง?", ja: "なんじ", romaji: "nanji", chapter: 3, category: "เวลา" },
  { id: "v53", th: "นาฬิกา / ..โมง", ja: "じ", romaji: "-ji", altRomaji: ["ji"], chapter: 3, category: "เวลา" },
  { id: "v54", th: "นาที", ja: "ふん / ぷん", romaji: "-fun / -pun", altRomaji: ["fun", "pun"], chapter: 3, category: "เวลา" },
  { id: "v55", th: "ตอนเช้า (a.m.)", ja: "ごぜん", romaji: "gozen", chapter: 3, category: "เวลา" },
  { id: "v56", th: "ตอนบ่าย/ค่ำ (p.m.)", ja: "ごご", romaji: "gogo", chapter: 3, category: "เวลา" },
  { id: "v57", th: "ตั้งแต่… / จาก…", ja: "から", romaji: "kara", chapter: 3, category: "เวลา" },
  { id: "v58", th: "ถึง…", ja: "まで", romaji: "made", chapter: 3, category: "เวลา" },
  { id: "v59", th: "ตรง (เช่น 4 โมงตรง)", ja: "ちょうど", romaji: "chōdo", altRomaji: ["chodo", "choudo"], chapter: 3, category: "เวลา" },
  { id: "v60", th: "ประมาณ (เช่น ประมาณบ่ายโมง)", ja: "だいたい", romaji: "daitai", chapter: 3, category: "เวลา" },
  { id: "v61", th: "กำลังจะ.. / ใกล้จะ..", ja: "もうすぐ", romaji: "mō sugu", altRomaji: ["mo sugu", "mousugu"], chapter: 3, category: "เวลา" },
  { id: "v62", th: "กว่า (เช่น บ่ายสองกว่า)", ja: "すぎ", romaji: "sugi", chapter: 3, category: "เวลา" },
  { id: "v63", th: "ไม่เป็นไร (ตอบรับขอบคุณ)", ja: "どういたしまして", romaji: "dōitashimashite", altRomaji: ["doitashimashite"], chapter: 3, category: "คำศัพท์ทั่วไป" },

  // --- บทที่ 4: การซื้อของ 1 & ตัวเลข & ราคา ---
  { id: "v64", th: "ร้าน / ร้านค้า", ja: "みせ", romaji: "mise", chapter: 4, category: "สถานที่" },
  { id: "v65", th: "คน", ja: "ひと", romaji: "hito", chapter: 4, category: "คำศัพท์ทั่วไป" },
  { id: "v66", th: "เยน (หน่วยเงินญี่ปุ่น)", ja: "えん", romaji: "en", chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v67", th: "กล้องดิจิทัล", ja: "デジカメ", romaji: "dejikame", chapter: 4, category: "เครื่องใช้ไฟฟ้า" },
  { id: "v68", th: "กล้องวิดีโอ", ja: "ビデオカメラ", romaji: "bideo kamera", chapter: 4, category: "เครื่องใช้ไฟฟ้า" },
  { id: "v69", th: "เครื่องเล่นซีดี", ja: "CDプレーヤー", romaji: "CD purēyā", altRomaji: ["cd pureya"], chapter: 4, category: "เครื่องใช้ไฟฟ้า" },
  { id: "v70", th: "จดหมาย", ja: "てがみ", romaji: "tegami", chapter: 4, category: "สิ่งของ" },
  { id: "v71", th: "แสตมป์", ja: "きって", romaji: "kitte", chapter: 4, category: "สิ่งของ" },
  { id: "v72", th: "ซองจดหมาย", ja: "ふうとう", romaji: "fūtō", altRomaji: ["futo", "fuutou"], chapter: 4, category: "สิ่งของ" },
  { id: "v73", th: "ราคาเท่าไหร่?", ja: "いくら", romaji: "ikura", chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v74", th: "ขอดู.. หน่อย", ja: "みせてください", romaji: "misete kudasai", chapter: 4, category: "คำศัพท์ทั่วไป" },
  { id: "v75", th: "ขอ.. / เอา.. (สั่งของ)", ja: "ください", romaji: "kudasai", chapter: 4, category: "คำศัพท์ทั่วไป" },
  { id: "v76", th: "ยินดีต้อนรับ", ja: "いらっしゃいませ", romaji: "irasshaimase", chapter: 4, category: "คำศัพท์ทั่วไป" },
  { id: "v77", th: "งั้น / ถ้าอย่างนั้น", ja: "じゃ", romaji: "ja", altRomaji: ["dewa"], chapter: 4, category: "คำศัพท์ทั่วไป" },
  { id: "v78", th: "หนึ่งร้อย (100)", ja: "ひゃく", romaji: "hyaku", chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v79", th: "สามร้อย (300)", ja: "さんびゃく", romaji: "san-byaku", altRomaji: ["sanbyaku"], chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v80", th: "หกร้อย (600)", ja: "ろっぴゃく", romaji: "rop-pyaku", altRomaji: ["roppyaku"], chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v81", th: "แปดร้อย (800)", ja: "はっぴゃく", romaji: "hap-pyaku", altRomaji: ["happyaku"], chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v82", th: "หนึ่งพัน (1,000)", ja: "せん", romaji: "sen", chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v83", th: "สามพัน (3,000)", ja: "さんぜん", romaji: "san-zen", altRomaji: ["sanzen"], chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v84", th: "แปดพัน (8,000)", ja: "はっせん", romaji: "has-sen", altRomaji: ["hassen"], chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v85", th: "หนึ่งหมื่น (10,000)", ja: "いちまん", romaji: "ichi-man", altRomaji: ["ichiman"], chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v86", th: "หนึ่งแสน (100,000)", ja: "じゅうまん", romaji: "jū-man", altRomaji: ["juman", "juuman"], chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v87", th: "หนึ่งล้าน (1,000,000)", ja: "ひゃくまん", romaji: "hyaku-man", altRomaji: ["hyakuman"], chapter: 4, category: "ตัวเลข/ราคา" },
  { id: "v88", th: "ด้วยเหมือนกัน (คำช่วย)", ja: "も", romaji: "mo", chapter: 4, category: "คำศัพท์ทั่วไป" },

  // --- บทที่ 5: การซื้อของ 2 & ลักษณนาม & สี & ขนาด ---
  { id: "v89", th: "เสื้อยืด", ja: "Tシャツ", romaji: "T-shatsu", altRomaji: ["tshatsu", "tiishatsu"], chapter: 5, category: "เสื้อผ้า/ของใช้" },
  { id: "v90", th: "ไปรษณียบัตร", ja: "はがき", romaji: "hagaki", chapter: 5, category: "สิ่งของ" },
  { id: "v91", th: "เบียร์", ja: "ビール", romaji: "bīru", altRomaji: ["biiru", "biru"], chapter: 5, category: "อาหาร/เครื่องดื่ม" },
  { id: "v92", th: "ไวน์", ja: "ワイン", romaji: "wain", chapter: 5, category: "อาหาร/เครื่องดื่ม" },
  { id: "v93", th: "ถ้วยกาแฟ", ja: "コーヒーカップ", romaji: "kōhī kappu", altRomaji: ["kohi kappu", "koohii kappu"], chapter: 5, category: "สิ่งของ" },
  { id: "v94", th: "ผ้าขนหนู", ja: "タオル", romaji: "taoru", chapter: 5, category: "เสื้อผ้า/ของใช้" },
  { id: "v95", th: "แอปเปิ้ล", ja: "りんご", romaji: "ringo", chapter: 5, category: "อาหาร/เครื่องดื่ม" },
  { id: "v96", th: "ส้ม", ja: "みかん", romaji: "mikan", chapter: 5, category: "อาหาร/เครื่องดื่ม" },
  { id: "v97", th: "กิโลกรัม", ja: "キロ", romaji: "kiro", chapter: 5, category: "ลักษณนาม" },
  { id: "v98", th: "ประเทศสวิตเซอร์แลนด์", ja: "スイス", romaji: "Suisu", chapter: 5, category: "สถานที่" },
  { id: "v99", th: "ประเทศอินเดีย", ja: "インド", romaji: "Indo", chapter: 5, category: "สถานที่" },
  { id: "v100", th: "ประเทศอังกฤษ", ja: "イギリス", romaji: "Igirisu", chapter: 5, category: "สถานที่" },
  { id: "v101", th: "ประเทศเยอรมนี", ja: "ドイツ", romaji: "Doitsu", chapter: 5, category: "สถานที่" },
  { id: "v102", th: "ประเทศรัสเซีย", ja: "ロシア", romaji: "Roshia", chapter: 5, category: "สถานที่" },
  { id: "v103", th: "ประเทศอิตาลี", ja: "イタリア", romaji: "Itaria", chapter: 5, category: "สถานที่" },
  { id: "v104", th: "ประเทศเกาหลีใต้", ja: "かんこく", romaji: "Kankoku", chapter: 5, category: "สถานที่" },
  { id: "v105", th: "สีน้ำเงิน / สีฟ้า", ja: "あおい", romaji: "aoi", chapter: 5, category: "สีและขนาด" },
  { id: "v106", th: "สีแดง", ja: "あかい", romaji: "akai", chapter: 5, category: "สีและขนาด" },
  { id: "v107", th: "สีดำ", ja: "くろい", romaji: "kuroi", chapter: 5, category: "สีและขนาด" },
  { id: "v108", th: "สีขาว", ja: "しろい", romaji: "shiroi", chapter: 5, category: "สีและขนาด" },
  { id: "v109", th: "สีเหลือง", ja: "きいろい", romaji: "kiiroi", chapter: 5, category: "สีและขนาด" },
  { id: "v110", th: "ใหญ่", ja: "おおきい", romaji: "ōkii", altRomaji: ["okii", "ookii"], chapter: 5, category: "สีและขนาด" },
  { id: "v111", th: "เล็ก", ja: "ちいさい", romaji: "chiisai", chapter: 5, category: "สีและขนาด" },
  { id: "v112", th: "1 ชิ้น / 1 อัน (ลักษณนามทั่วไป)", ja: "ひとつ", romaji: "hitotsu", chapter: 5, category: "ลักษณนาม" },
  { id: "v113", th: "2 ชิ้น / 2 อัน", ja: "ふたつ", romaji: "futatsu", chapter: 5, category: "ลักษณนาม" },
  { id: "v114", th: "3 ชิ้น / 3 อัน", ja: "みっつ", romaji: "mittsu", chapter: 5, category: "ลักษณนาม" },
  { id: "v115", th: "4 ชิ้น / 4 อัน", ja: "よっつ", romaji: "yottsu", chapter: 5, category: "ลักษณนาม" },
  { id: "v116", th: "5 ชิ้น / 5 อัน", ja: "いつつ", romaji: "itsutsu", chapter: 5, category: "ลักษณนาม" },
  { id: "v117", th: "กี่ชิ้น? / เท่าไหร่?", ja: "いくつ", romaji: "ikutsu", chapter: 5, category: "ลักษณนาม" },
  { id: "v118", th: "แผ่น / ตัว (ลักษณนามของแบน)", ja: "まい", romaji: "-mai", altRomaji: ["mai"], chapter: 5, category: "ลักษณนาม" },
  { id: "v119", th: "ขวด / ด้าม / แท่ง (ลักษณนามของยาว)", ja: "ほん / ぼん / ぽん", romaji: "-hon / -bon / -pon", altRomaji: ["hon", "bon", "pon"], chapter: 5, category: "ลักษณนาม" },

  // --- บทที่ 6: ตารางงาน & วันที่ & เดือน & การเดินทาง & กริยา ---
  { id: "v120", th: "ฮัลโหล (รับโทรศัพท์)", ja: "もしもし", romaji: "moshi moshi", chapter: 6, category: "คำศัพท์ทั่วไป" },
  { id: "v121", th: "วันนี้", ja: "きょう", romaji: "kyō", altRomaji: ["kyo", "kyou"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v122", th: "พรุ่งนี้", ja: "あした", romaji: "ashita", chapter: 6, category: "วันที่และเดือน" },
  { id: "v123", th: "เมื่อวานนี้", ja: "きのう", romaji: "kinō", altRomaji: ["kino", "kinou"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v124", th: "สัปดาห์ที่แล้ว", ja: "せんしゅう", romaji: "senshū", altRomaji: ["senshu", "senshuu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v125", th: "ปีที่แล้ว", ja: "きょねん", romaji: "kyonen", chapter: 6, category: "วันที่และเดือน" },
  { id: "v126", th: "คนเดียว / ลำพัง", ja: "ひとりで", romaji: "hitori de", chapter: 6, category: "คำศัพท์ทั่วไป" },
  { id: "v127", th: "ไป (กริยา)", ja: "いきます", romaji: "ikimasu", chapter: 6, category: "การเดินทางและกริยา" },
  { id: "v128", th: "มา (กริยา)", ja: "きます", romaji: "kimasu", chapter: 6, category: "การเดินทางและกริยา" },
  { id: "v129", th: "กลับ (กริยา)", ja: "かえります", romaji: "kaerimasu", chapter: 6, category: "การเดินทางและกริยา" },
  { id: "v130", th: "ได้ไปแล้ว (รูปอดีต)", ja: "いきました", romaji: "ikimashita", chapter: 6, category: "การเดินทางและกริยา" },
  { id: "v131", th: "ไม่ไป (รูปปฏิเสธ)", ja: "いきません", romaji: "ikimasen", chapter: 6, category: "การเดินทางและกริยา" },
  { id: "v132", th: "สนามบิน", ja: "くうこう", romaji: "kūkō", altRomaji: ["kuko", "kuukou"], chapter: 6, category: "สถานที่" },
  { id: "v133", th: "สถานีรถไฟ", ja: "えき", romaji: "eki", chapter: 6, category: "สถานที่" },
  { id: "v134", th: "สำนักงานสาขา", ja: "ししゃ", romaji: "shisha", chapter: 6, category: "สถานที่" },
  { id: "v135", th: "สวนสาธารณะ", ja: "こうえん", romaji: "kōen", altRomaji: ["koen", "kouen"], chapter: 6, category: "สถานที่" },
  { id: "v136", th: "บ้าน", ja: "うち", romaji: "uchi", altJa: "いえ", altRomaji: ["ie"], chapter: 6, category: "สถานที่" },
  { id: "v137", th: "กรุงโตเกียว", ja: "とうきょう", romaji: "Tōkyō", altRomaji: ["Tokyo", "Toukyou"], chapter: 6, category: "สถานที่" },
  { id: "v138", th: "เมืองเกียวโต", ja: "きょうと", romaji: "Kyōto", altRomaji: ["Kyoto", "Kyouto"], chapter: 6, category: "สถานที่" },
  { id: "v139", th: "เมืองโอซาก้า", ja: "おおさか", romaji: "Ōsaka", altRomaji: ["Osaka", "Oosaka"], chapter: 6, category: "สถานที่" },
  { id: "v140", th: "วันเกิด", ja: "おたんじょうび", romaji: "otanjōbi", altRomaji: ["otanjobi", "otanjoubi"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v141", th: "เมื่อไหร่?", ja: "いつ", romaji: "itsu", chapter: 6, category: "เวลา" },
  { id: "v142", th: "ไปทำงานนอกสถานที่ (출장)", ja: "しゅっちょう", romaji: "shutchō", altRomaji: ["shutcho", "shutchou"], chapter: 6, category: "คำศัพท์ทั่วไป" },
  { id: "v143", th: "รถบัส / รถประจำทาง", ja: "バス", romaji: "basu", chapter: 6, category: "สิ่งของ" },
  { id: "v144", th: "คนขับรถ", ja: "うんてんしゅ", romaji: "untenshu", chapter: 6, category: "อาชีพ" },
  { id: "v145", th: "เพื่อน", ja: "ともだち", romaji: "tomodachi", chapter: 6, category: "คำศัพท์ทั่วไป" },
  { id: "v146", th: "ขอประทานโทษ / ขอตัวก่อน (สำนวนวางสาย/เข้าห้อง)", ja: "しつれいします", romaji: "shitsureishimasu", chapter: 6, category: "คำศัพท์ทั่วไป" },

  // วันในสัปดาห์ (Weekdays)
  { id: "v147", th: "วันจันทร์", ja: "げつようび", romaji: "getsu-yōbi", altRomaji: ["getsuyobi", "getsuyoubi"], chapter: 6, category: "วันในสัปดาห์" },
  { id: "v148", th: "วันอังคาร", ja: "かようび", romaji: "ka-yōbi", altRomaji: ["kayobi", "kayoubi"], chapter: 6, category: "วันในสัปดาห์" },
  { id: "v149", th: "วันพุธ", ja: "すいようび", romaji: "sui-yōbi", altRomaji: ["suiyobi", "suiyoubi"], chapter: 6, category: "วันในสัปดาห์" },
  { id: "v150", th: "วันพฤหัสบดี", ja: "もくようび", romaji: "moku-yōbi", altRomaji: ["mokuyobi", "mokuyoubi"], chapter: 6, category: "วันในสัปดาห์" },
  { id: "v151", th: "วันศุกร์", ja: "きんようび", romaji: "kin-yōbi", altRomaji: ["kinyobi", "kinyoubi"], chapter: 6, category: "วันในสัปดาห์" },
  { id: "v152", th: "วันเสาร์", ja: "どようび", romaji: "do-yōbi", altRomaji: ["doyobi", "doyoubi"], chapter: 6, category: "วันในสัปดาห์" },
  { id: "v153", th: "วันอาทิตย์", ja: "にちようび", romaji: "nichi-yōbi", altRomaji: ["nichiyobi", "nichiyoubi"], chapter: 6, category: "วันในสัปดาห์" },
  { id: "v154", th: "วันอะไร? (ในสัปดาห์)", ja: "なんようび", romaji: "nan-yōbi", altRomaji: ["nanyobi", "nanyoubi"], chapter: 6, category: "วันในสัปดาห์" },

  // วันที่ (Days of the Month 1-10 & Key Days)
  { id: "v155", th: "วันที่ 1", ja: "ついたち", romaji: "tsuitachi", chapter: 6, category: "วันที่และเดือน" },
  { id: "v156", th: "วันที่ 2", ja: "ふつか", romaji: "futsuka", chapter: 6, category: "วันที่และเดือน" },
  { id: "v157", th: "วันที่ 3", ja: "みっか", romaji: "mikka", chapter: 6, category: "วันที่และเดือน" },
  { id: "v158", th: "วันที่ 4", ja: "よっか", romaji: "yokka", chapter: 6, category: "วันที่และเดือน" },
  { id: "v159", th: "วันที่ 5", ja: "いつか", romaji: "itsuka", chapter: 6, category: "วันที่และเดือน" },
  { id: "v160", th: "วันที่ 6", ja: "むいか", romaji: "muika", chapter: 6, category: "วันที่และเดือน" },
  { id: "v161", th: "วันที่ 7", ja: "なのか", romaji: "nanoka", chapter: 6, category: "วันที่และเดือน" },
  { id: "v162", th: "วันที่ 8", ja: "ようか", romaji: "yōka", altRomaji: ["yoka", "youka"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v163", th: "วันที่ 9", ja: "ここのか", romaji: "kokonoka", chapter: 6, category: "วันที่และเดือน" },
  { id: "v164", th: "วันที่ 10", ja: "とおか", romaji: "tōka", altRomaji: ["toka", "tooka"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v165", th: "วันที่ 14", ja: "じゅうよっか", romaji: "jūyokka", altRomaji: ["juyokka", "juuyokka"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v166", th: "วันที่ 20", ja: "はつか", romaji: "hatsuka", chapter: 6, category: "วันที่และเดือน" },
  { id: "v167", th: "วันที่ 24", ja: "にじゅうよっか", romaji: "nijūyokka", altRomaji: ["nijuyokka", "nijuuyokka"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v168", th: "วันที่เท่าไหร่?", ja: "なんにち", romaji: "nan-nichi", altRomaji: ["nannichi"], chapter: 6, category: "วันที่และเดือน" },

  // เดือน (Months)
  { id: "v169", th: "เดือนมกราคม", ja: "いちがつ", romaji: "ichi-gatsu", altRomaji: ["ichigatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v170", th: "เดือนกุมภาพันธ์", ja: "にがつ", romaji: "ni-gatsu", altRomaji: ["nigatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v171", th: "เดือนมีนาคม", ja: "さんがつ", romaji: "san-gatsu", altRomaji: ["sangatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v172", th: "เดือนเมษายน", ja: "しがつ", romaji: "shi-gatsu", altRomaji: ["shigatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v173", th: "เดือนพฤษภาคม", ja: "ごがつ", romaji: "go-gatsu", altRomaji: ["gogatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v174", th: "เดือนมิถุนายน", ja: "ろくがつ", romaji: "roku-gatsu", altRomaji: ["rokugatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v175", th: "เดือนกรกฎาคม", ja: "しちがつ", romaji: "shichi-gatsu", altRomaji: ["shichigatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v176", th: "เดือนสิงหาคม", ja: "はちがつ", romaji: "hachi-gatsu", altRomaji: ["hachigatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v177", th: "เดือนกันยายน", ja: "くがつ", romaji: "ku-gatsu", altRomaji: ["kugatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v178", th: "เดือนตุลาคม", ja: "じゅうがつ", romaji: "jū-gatsu", altRomaji: ["jugatsu", "juugatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v179", th: "เดือนพฤศจิกายน", ja: "じゅういちがつ", romaji: "jūichi-gatsu", altRomaji: ["juichigatsu", "juuichigatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v180", th: "เดือนธันวาคม", ja: "じゅうにがつ", romaji: "jūni-gatsu", altRomaji: ["junigatsu", "juunigatsu"], chapter: 6, category: "วันที่และเดือน" },
  { id: "v181", th: "เดือนอะไร?", ja: "なんがつ", romaji: "nan-gatsu", altRomaji: ["nangatsu"], chapter: 6, category: "วันที่และเดือน" }
];

// ==========================================
// 5. ชุดคำถามตอบจากรูปภาพ SVG (Part 3) บทที่ 1-6
// ออกแบบเวกเตอร์ Neo-Brutalism Manga 100% Offline
// ==========================================
export const IMAGE_QUESTIONS: ImageQuestion[] = [
  // --- บทที่ 1 & 2 ---
  {
    id: "q1",
    chapter: 2,
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "นี่คืออะไร?",
    expectedAnswerJa: "Kore wa isu desu.",
    expectedAnswerRomaji: "Kore wa isu desu.",
    keywords: ["isu", "kore wa isu desu", "いす", "椅子"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <rect x="70" y="30" width="60" height="75" rx="8" fill="#1E293B"/>
      <rect x="55" y="105" width="90" height="20" rx="6" fill="#334155"/>
      <rect x="95" y="125" width="10" height="35" fill="#64748B"/>
      <ellipse cx="100" cy="160" rx="45" ry="10" fill="#475569"/>
      <circle cx="60" cy="168" r="6" fill="#0F172A"/>
      <circle cx="100" cy="172" r="6" fill="#0F172A"/>
      <circle cx="140" cy="168" r="6" fill="#0F172A"/>
      <text x="100" y="192" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0F172A" text-anchor="middle">เก้าอี้ (Isu)</text>
    </svg>`,
    title: "เก้าอี้ (Isu)",
    note: "ตามตัวอย่างข้อสอบข้อ 1 ในสไลด์"
  },
  {
    id: "q2",
    chapter: 1,
    questionJa: "Anohito wa doko kara kimashitaka?",
    questionRomaji: "Anohito wa doko kara kimashitaka?",
    questionTh: "คนนั้นมาจากที่ไหน? (ต้องพูดเต็มประโยค)",
    expectedAnswerJa: "Anohito wa Nihon kara kimashita.",
    expectedAnswerRomaji: "Anohito wa Nihon kara kimashita.",
    keywords: ["anohito wa nihon kara kimashita", "nihon kara kimashita", "にほんから きました", "日本から来ました"],
    imageType: "url",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Wikipe-tan_kimono.png",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#FEF2F2"/>
      <circle cx="100" cy="65" r="32" fill="#DC2626"/>
      <path d="M75 110 C75 90, 125 90, 125 110 L135 180 L65 180 Z" fill="#BE123C"/>
      <rect x="72" y="130" width="56" height="18" fill="#FBBF24" rx="2"/>
      <path d="M125 125 L150 110 A20 20 0 0 1 155 135 Z" fill="#F43F5E"/>
      <text x="100" y="195" font-family="sans-serif" font-size="12" font-weight="bold" fill="#991B1B" text-anchor="middle">JAPAN (日本)</text>
    </svg>`,
    title: "ประเทศญี่ปุ่น (Nihon)",
    note: "ตามตัวอย่างข้อสอบข้อ 2 ในสไลด์ (ต้องตอบเต็มประโยค: Anohito wa Nihon kara kimashita.)"
  },
  {
    id: "q3",
    chapter: 1,
    questionJa: "Anohito wa dare desuka?",
    questionRomaji: "Anohito wa dare desuka?",
    questionTh: "คนนั้นคือใคร?",
    expectedAnswerJa: "Anohito wa ginkō-in desu.",
    expectedAnswerRomaji: "Anohito wa ginkō-in desu.",
    keywords: ["anohito wa ginkoin desu", "ginkoin desu", "ginko-in", "ぎんこういんです", "銀行員です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#EFF6FF"/>
      <rect x="35" y="30" width="130" height="70" rx="4" fill="#3B82F6"/>
      <polygon points="100,10 25,32 175,32" fill="#1D4ED8"/>
      <text x="100" y="65" font-family="sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">BANK 銀行</text>
      <circle cx="80" cy="115" r="14" fill="#FDBA74"/>
      <path d="M65 135 C65 125 95 125 95 135 L98 185 L62 185 Z" fill="#4338CA"/>
      <circle cx="120" cy="115" r="14" fill="#FDBA74"/>
      <path d="M105 135 C105 125 135 125 135 135 L138 185 L102 185 Z" fill="#6D28D9"/>
    </svg>`,
    title: "พนักงานธนาคาร (Ginkō-in)",
    note: "ตามตัวอย่างข้อสอบข้อ 3 ในสไลด์"
  },
  {
    id: "q4",
    chapter: 2,
    questionJa: "Kore wa nan no zasshi desuka?",
    questionRomaji: "Kore wa nan no zasshi desuka?",
    questionTh: "นี่คือนิตยสารเกี่ยวกับอะไร?",
    expectedAnswerJa: "Kore wa nihongo no zasshi desu.",
    expectedAnswerRomaji: "Kore wa nihongo no zasshi desu.",
    keywords: ["kore wa nihongo no zasshi desu", "nihongo no zasshi desu", "nihongo no zasshi", "にほんごの ざっしです", "日本語の雑誌です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#FDF4FF"/>
      <rect x="45" y="25" width="110" height="150" rx="6" fill="#EC4899" stroke="#BE185D" stroke-width="3"/>
      <rect x="52" y="35" width="96" height="35" rx="3" fill="#FFFFFF"/>
      <text x="100" y="58" font-family="sans-serif" font-size="16" font-weight="900" fill="#BE185D" text-anchor="middle">日本語</text>
      <rect x="55" y="80" width="90" height="60" rx="4" fill="#FCE7F3"/>
      <text x="100" y="115" font-family="sans-serif" font-size="12" font-weight="bold" fill="#831843" text-anchor="middle">JAPANESE</text>
      <text x="100" y="160" font-family="sans-serif" font-size="10" fill="#FFFFFF" text-anchor="middle">MAGAZINE 雑誌</text>
    </svg>`,
    title: "นิตยสารภาษาญี่ปุ่น (Nihongo no zasshi)",
    note: "ตามตัวอย่างข้อสอบข้อ 4 ในสไลด์"
  },
  {
    id: "q5",
    chapter: 2,
    questionJa: "Kochira wa nan desuka?",
    questionRomaji: "Kochira wa nan desuka?",
    questionTh: "ที่นี่/ตรงนี้คืออะไร? (เคาน์เตอร์ประชาสัมพันธ์)",
    expectedAnswerJa: "Kochira wa uketsuke desu.",
    expectedAnswerRomaji: "Kochira wa uketsuke desu.",
    keywords: ["kochira wa uketsuke desu", "uketsuke desu", "uketsuke", "うけつけです", "受付です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F0FDF4"/>
      <ellipse cx="100" cy="140" rx="75" ry="30" fill="#10B981"/>
      <rect x="25" y="125" width="150" height="40" rx="10" fill="#059669"/>
      <circle cx="100" cy="70" r="22" fill="#047857"/>
      <text x="100" y="78" font-family="sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF" text-anchor="middle">i</text>
      <text x="100" y="152" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ECFDF5" text-anchor="middle">RECEPTION / 受付</text>
    </svg>`,
    title: "เคาน์เตอร์ประชาสัมพันธ์ (Uketsuke)",
    note: "ตามตัวอย่างข้อสอบข้อ 5 ในสไลด์"
  },
  {
    id: "q6",
    chapter: 2,
    questionJa: "Kore wa dare no kasa desuka?",
    questionRomaji: "Kore wa dare no kasa desuka?",
    questionTh: "นี่คือร่มของใคร? (สมมติว่าเป็นร่มของคุณ)",
    expectedAnswerJa: "Watashi no kasa desu.",
    expectedAnswerRomaji: "Watashi no kasa desu.",
    keywords: ["watashi no kasa desu", "watashi no kasa", "わたしの かさです", "私の傘です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#EFF6FF"/>
      <path d="M40 100 Q100 30 160 100 Z" fill="#3B82F6"/>
      <line x1="100" y1="35" x2="100" y2="150" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
      <path d="M100 150 C100 165 80 165 80 155" fill="none" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
      <text x="100" y="185" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1E40AF" text-anchor="middle">傘 (Kasa)</text>
    </svg>`,
    title: "ร่ม (Kasa)",
    note: "ฝึกไวยากรณ์ dare no... และ watashi no..."
  },
  {
    id: "q7",
    chapter: 2,
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "นี่คืออะไร? (นาฬิกา)",
    expectedAnswerJa: "Kore wa tokei desu.",
    expectedAnswerRomaji: "Kore wa tokei desu.",
    keywords: ["kore wa tokei desu", "tokei desu", "tokei", "とけいです", "時計です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#FFFBEB"/>
      <rect x="80" y="20" width="40" height="160" rx="6" fill="#D97706"/>
      <circle cx="100" cy="100" r="45" fill="#FFFFFF" stroke="#B45309" stroke-width="6"/>
      <line x1="100" y1="100" x2="100" y2="75" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="120" y2="100" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="4" fill="#B45309"/>
      <text x="100" y="195" font-family="sans-serif" font-size="12" font-weight="bold" fill="#92400E" text-anchor="middle">時計 (Tokei)</text>
    </svg>`,
    title: "นาฬิกา (Tokei)",
    note: "ฝึกคำศัพท์สิ่งของบทที่ 2"
  },
  {
    id: "q8",
    chapter: 2,
    questionJa: "Kore wa nan no hon desuka?",
    questionRomaji: "Kore wa nan no hon desuka?",
    questionTh: "นี่คือหนังสือเกี่ยวกับอะไร? (หนังสือรถยนต์)",
    expectedAnswerJa: "Kore wa kuruma no hon desu.",
    expectedAnswerRomaji: "Kore wa kuruma no hon desu.",
    keywords: ["kore wa kuruma no hon desu", "kuruma no hon desu", "jidousha no hon desu", "くるまの ほんです", "車の本です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <rect x="45" y="25" width="110" height="150" rx="6" fill="#2563EB" stroke="#1D4ED8" stroke-width="3"/>
      <rect x="60" y="85" width="80" height="35" rx="8" fill="#FBBF24"/>
      <circle cx="75" cy="120" r="8" fill="#1E293B"/>
      <circle cx="125" cy="120" r="8" fill="#1E293B"/>
      <text x="100" y="60" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">自動車の本</text>
      <text x="100" y="155" font-family="sans-serif" font-size="11" fill="#DBEAFE" text-anchor="middle">CAR BOOK</text>
    </svg>`,
    title: "หนังสือรถยนต์ (Kuruma no hon)",
    note: "ฝึกโครงสร้าง [Noun] no [Noun]"
  },

  // --- บทที่ 3: เวลา & สถานที่ ---
  {
    id: "q_ch3_1",
    chapter: 3,
    questionJa: "Ima nanji desuka?",
    questionRomaji: "Ima nanji desuka?",
    questionTh: "ตอนนี้กี่โมงแล้ว? (ดูจากหน้าปัดนาฬิกา: 3 โมงตรง)",
    expectedAnswerJa: "Ima san-ji desu.",
    expectedAnswerRomaji: "Ima san-ji desu.",
    keywords: ["ima sanji desu", "sanji desu", "choudo sanji", "いま さんじです", "3時です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F0F9FF"/>
      <circle cx="100" cy="100" r="75" fill="#FFFFFF" stroke="#0284C7" stroke-width="8"/>
      <!-- Hour Marks -->
      <circle cx="100" cy="38" r="4" fill="#0369A1"/>
      <circle cx="162" cy="100" r="4" fill="#0369A1"/>
      <circle cx="100" cy="162" r="4" fill="#0369A1"/>
      <circle cx="38" cy="100" r="4" fill="#0369A1"/>
      <!-- Hands: 3:00 -->
      <line x1="100" y1="100" x2="100" y2="48" stroke="#0F172A" stroke-width="5" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="140" y2="100" stroke="#DC2626" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="6" fill="#0F172A"/>
      <text x="100" y="190" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0369A1" text-anchor="middle">3:00 (San-ji)</text>
    </svg>`,
    title: "เวลา 3 โมงตรง (San-ji)",
    note: "ฝึกการบอกเวลาด้วย ..ji"
  },
  {
    id: "q_ch3_2",
    chapter: 3,
    questionJa: "Shigoto wa nanji kara nanji made desuka?",
    questionRomaji: "Shigoto wa nanji kara nanji made desuka?",
    questionTh: "เวลาทำงานเริ่มกี่โมงถึงกี่โมง? (ดูจากป้าย: 9:00 - 17:00)",
    expectedAnswerJa: "Ku-ji kara go-ji made desu.",
    expectedAnswerRomaji: "Ku-ji kara go-ji made desu.",
    keywords: ["kuji kara goji made desu", "kuji kara goji made", "9-ji kara 5-ji made", "くじから ごじまでです", "9時から5時まで"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <rect x="25" y="35" width="150" height="120" rx="8" fill="#1E293B" stroke="#0F172A" stroke-width="4"/>
      <text x="100" y="70" font-family="sans-serif" font-size="16" font-weight="900" fill="#38BDF8" text-anchor="middle">OFFICE HOURS</text>
      <text x="100" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#F1F5F9" text-anchor="middle">営業時間 / 仕事</text>
      <rect x="40" y="108" width="120" height="32" rx="4" fill="#0F172A"/>
      <text x="100" y="130" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FDE047" text-anchor="middle">09:00 - 17:00</text>
      <text x="100" y="182" font-family="sans-serif" font-size="11" font-weight="bold" fill="#64748B" text-anchor="middle">Ku-ji kara Go-ji made</text>
    </svg>`,
    title: "เวลาทำงาน 9:00 - 17:00",
    note: "ฝึกไวยากรณ์ ..kara ..made desu"
  },
  {
    id: "q_ch3_3",
    chapter: 3,
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (โรงอาหาร / ห้องอาหาร)",
    expectedAnswerJa: "Koko wa shokudō desu.",
    expectedAnswerRomaji: "Koko wa shokudō desu.",
    keywords: ["koko wa shokudo desu", "shokudou desu", "shokudo", "しょくどうです", "食堂です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#FFFBEB"/>
      <circle cx="100" cy="85" r="50" fill="#F59E0B"/>
      <!-- Fork & Spoon -->
      <path d="M80 60 L80 110 M73 60 L73 80 M87 60 L87 80" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="120" cy="72" rx="10" ry="14" fill="#FFFFFF"/>
      <line x1="120" y1="86" x2="120" y2="110" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
      <rect x="35" y="145" width="130" height="30" rx="6" fill="#B45309"/>
      <text x="100" y="166" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">食堂 (Shokudō)</text>
    </svg>`,
    title: "โรงอาหาร (Shokudō)",
    note: "ฝึกคำศัพท์สถานที่ในบทที่ 3"
  },

  // --- บทที่ 4: การซื้อของ 1 & ราคา & ตัวเลข ---
  {
    id: "q_ch4_1",
    chapter: 4,
    questionJa: "Kono kaban wa ikura desuka?",
    questionRomaji: "Kono kaban wa ikura desuka?",
    questionTh: "กระเป๋าใบนี้ราคาเท่าไหร่? (ดูจากป้าย: 3,000 เยน)",
    expectedAnswerJa: "Kaban wa san-zen-en desu.",
    expectedAnswerRomaji: "Kaban wa san-zen-en desu.",
    keywords: ["sanzen en desu", "san-zen-en", "sanzenen", "さんぜんえんです", "3000円です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Bag Body -->
      <rect x="50" y="70" width="100" height="80" rx="10" fill="#854D0E" stroke="#582E0C" stroke-width="3"/>
      <!-- Bag Handle -->
      <path d="M75 70 C75 40 125 40 125 70" fill="none" stroke="#582E0C" stroke-width="5" stroke-linecap="round"/>
      <!-- Price Tag -->
      <polygon points="120,95 165,95 180,120 135,120" fill="#EF4444"/>
      <circle cx="130" cy="107" r="3" fill="#FFFFFF"/>
      <text x="150" y="113" font-family="sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">¥3,000</text>
      <text x="100" y="185" font-family="sans-serif" font-size="12" font-weight="bold" fill="#78350F" text-anchor="middle">3,000円 (San-zen-en)</text>
    </svg>`,
    title: "กระเป๋า 3,000 เยน (San-zen-en)",
    note: "ฝึกการอ่านตัวเลขหลักพัน san-zen และถามราคา"
  },
  {
    id: "q_ch4_2",
    chapter: 4,
    questionJa: "Kore wa nan desuka?",
    questionRomaji: "Kore wa nan desuka?",
    questionTh: "นี่คืออะไร? (คอมพิวเตอร์ / โน้ตบุ๊ก)",
    expectedAnswerJa: "Kore wa pasokon desu.",
    expectedAnswerRomaji: "Kore wa pasokon desu.",
    keywords: ["pasokon desu", "konpyuta desu", "konpyuutaa", "パソコンです", "コンピューターです"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F1F5F9"/>
      <!-- Laptop Screen -->
      <rect x="45" y="40" width="110" height="75" rx="6" fill="#334155" stroke="#1E293B" stroke-width="3"/>
      <rect x="52" y="47" width="96" height="61" fill="#0EA5E9"/>
      <polygon points="90,70 115,80 90,90" fill="#FFFFFF"/>
      <!-- Laptop Base -->
      <path d="M30 120 L170 120 L155 138 L45 138 Z" fill="#64748B" stroke="#1E293B" stroke-width="2"/>
      <rect x="85" y="125" width="30" height="8" rx="2" fill="#94A3B8"/>
      <text x="100" y="175" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0F172A" text-anchor="middle">パソコン (Pasokon)</text>
    </svg>`,
    title: "คอมพิวเตอร์ / โน้ตบุ๊ก (Pasokon)",
    note: "ฝึกคำศัพท์สินค้าไอทีบทที่ 4"
  },

  // --- บทที่ 5: การซื้อของ 2 & ลักษณนาม & สี ---
  {
    id: "q_ch5_1",
    chapter: 5,
    questionJa: "Dono T-shatsu desuka?",
    questionRomaji: "Dono T-shatsu desuka?",
    questionTh: "เสื้อยืดตัวไหน? (เสื้อยืดสีฟ้า)",
    expectedAnswerJa: "Kono aoi T-shatsu desu.",
    expectedAnswerRomaji: "Kono aoi T-shatsu desu.",
    keywords: ["aoi t-shatsu desu", "aoi tshatsu", "kono aoi", "あおい Tシャツです", "青いTシャツです"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F0F9FF"/>
      <!-- Blue T-shirt -->
      <path d="M70 45 L40 70 L55 90 L70 80 L70 150 L130 150 L130 80 L145 90 L160 70 L130 45 C120 58 80 58 70 45 Z" fill="#0284C7" stroke="#0369A1" stroke-width="3"/>
      <text x="100" y="115" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">BLUE</text>
      <text x="100" y="185" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">青い Tシャツ (Aoi T-shatsu)</text>
    </svg>`,
    title: "เสื้อยืดสีฟ้า (Aoi T-shatsu)",
    note: "ฝึกการใช้คำคุณศัพท์บอกสี aoi ขยายคำนาม"
  },
  {
    id: "q_ch5_2",
    chapter: 5,
    questionJa: "Ringo o ikutsu kudasai?",
    questionRomaji: "Ringo o ikutsu kudasai?",
    questionTh: "ขอแอปเปิ้ลจำนวนเท่าไหร่? (ดูจากรูป: แอปเปิ้ล 2 ผล)",
    expectedAnswerJa: "Ringo o futatsu kudasai.",
    expectedAnswerRomaji: "Ringo o futatsu kudasai.",
    keywords: ["ringo o futatsu kudasai", "futatsu kudasai", "futatsu", "ふたつ ください", "2つください"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#FEF2F2"/>
      <!-- Apple 1 -->
      <circle cx="68" cy="100" r="32" fill="#DC2626"/>
      <path d="M68 68 C68 55 78 50 82 48" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="80" cy="55" rx="8" ry="4" fill="#22C55E"/>
      <!-- Apple 2 -->
      <circle cx="132" cy="100" r="32" fill="#DC2626"/>
      <path d="M132 68 C132 55 142 50 146 48" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="144" cy="55" rx="8" ry="4" fill="#22C55E"/>
      <text x="100" y="175" font-family="sans-serif" font-size="14" font-weight="bold" fill="#991B1B" text-anchor="middle">りんご 2つ (Futatsu)</text>
    </svg>`,
    title: "แอปเปิ้ล 2 ผล (Futatsu)",
    note: "ฝึกลักษณนามนับของทั่วไป hitotsu, futatsu"
  },
  {
    id: "q_ch5_3",
    chapter: 5,
    questionJa: "Kore wa doko no tokei desuka?",
    questionRomaji: "Kore wa doko no tokei desuka?",
    questionTh: "นี่คือนาฬิกาของประเทศไหน? (สวิตเซอร์แลนด์)",
    expectedAnswerJa: "Kore wa Suisu no tokei desu.",
    expectedAnswerRomaji: "Kore wa Suisu no tokei desu.",
    keywords: ["suisu no tokei desu", "suisu no tokei", "suisu", "スイスの とけいです", "スイスの時計です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#FFFBEB"/>
      <!-- Watch -->
      <rect x="85" y="25" width="30" height="150" rx="4" fill="#1E293B"/>
      <circle cx="100" cy="100" r="42" fill="#DC2626" stroke="#FFFFFF" stroke-width="4"/>
      <!-- Swiss Cross -->
      <rect x="94" y="80" width="12" height="40" fill="#FFFFFF" rx="2"/>
      <rect x="80" y="94" width="40" height="12" fill="#FFFFFF" rx="2"/>
      <text x="100" y="192" font-family="sans-serif" font-size="12" font-weight="bold" fill="#991B1B" text-anchor="middle">SWISS (スイスの時計)</text>
    </svg>`,
    title: "นาฬิกาสวิส (Suisu no tokei)",
    note: "ฝึกการบอกประเทศแหล่งผลิตด้วย [ประเทศ] no [สิ่งของ]"
  },

  // --- บทที่ 6: ตารางงาน & วันที่ & การเดินทาง ---
  {
    id: "q_ch6_1",
    chapter: 6,
    questionJa: "Kyō wa nan-yōbi desuka?",
    questionRomaji: "Kyō wa nan-yōbi desuka?",
    questionTh: "วันนี้วันอะไร? (ดูจากปฏิทิน: วันจันทร์)",
    expectedAnswerJa: "Kyō wa getsu-yōbi desu.",
    expectedAnswerRomaji: "Kyō wa getsu-yōbi desu.",
    keywords: ["getsuyoubi desu", "getsuyobi desu", "getsu-yobi", "げつようびです", "月曜日です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F8FAFC"/>
      <!-- Calendar Header -->
      <rect x="35" y="30" width="130" height="130" rx="10" fill="#FFFFFF" stroke="#0F172A" stroke-width="4"/>
      <rect x="35" y="30" width="130" height="45" rx="8" fill="#F59E0B"/>
      <!-- Spiral Rings -->
      <circle cx="65" cy="30" r="5" fill="#0F172A"/>
      <circle cx="100" cy="30" r="5" fill="#0F172A"/>
      <circle cx="135" cy="30" r="5" fill="#0F172A"/>
      <text x="100" y="60" font-family="sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">MONDAY</text>
      <text x="100" y="115" font-family="sans-serif" font-size="28" font-weight="900" fill="#0F172A" text-anchor="middle">月</text>
      <text x="100" y="145" font-family="sans-serif" font-size="12" font-weight="bold" fill="#D97706" text-anchor="middle">げつようび</text>
      <text x="100" y="185" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0F172A" text-anchor="middle">Getsu-yōbi</text>
    </svg>`,
    title: "วันจันทร์ (Getsu-yōbi)",
    note: "ฝึกวันในสัปดาห์ ..yōbi"
  },
  {
    id: "q_ch6_2",
    chapter: 6,
    questionJa: "Ashita doko e ikimasuka?",
    questionRomaji: "Ashita doko e ikimasuka?",
    questionTh: "พรุ่งนี้จะไปที่ไหน? (สนามบิน)",
    expectedAnswerJa: "Ashita kūkō e ikimasu.",
    expectedAnswerRomaji: "Ashita kūkō e ikimasu.",
    keywords: ["ashita kuukou e ikimasu", "kuukou e ikimasu", "kuko e ikimasu", "くうこうへ いきます", "空港へ行きます"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#EFF6FF"/>
      <!-- Control Tower -->
      <rect x="40" y="60" width="25" height="90" fill="#3B82F6"/>
      <polygon points="35,60 52,40 70,60" fill="#1D4ED8"/>
      <!-- Airplane -->
      <path d="M90 90 L140 75 L165 80 L155 90 L170 100 L150 102 L130 115 L120 115 L125 100 L95 95 Z" fill="#0284C7"/>
      <line x1="80" y1="150" x2="180" y2="150" stroke="#64748B" stroke-width="4" stroke-dasharray="8 6"/>
      <text x="100" y="182" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1E40AF" text-anchor="middle">空港 / AIRPORT (Kūkō)</text>
    </svg>`,
    title: "สนามบิน (Kūkō)",
    note: "ฝึกกริยา [สถานที่] e/ni ikimasu"
  },
  {
    id: "q_ch6_3",
    chapter: 6,
    questionJa: "Koko wa doko desuka?",
    questionRomaji: "Koko wa doko desuka?",
    questionTh: "ที่นี่คือที่ไหน? (สถานีรถไฟ)",
    expectedAnswerJa: "Koko wa eki desu.",
    expectedAnswerRomaji: "Koko wa eki desu.",
    keywords: ["koko wa eki desu", "eki desu", "eki", "えきです", "駅です"],
    imageType: "svg",
    imageSvg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="#F0FDF4"/>
      <!-- Train / Station front -->
      <rect x="45" y="45" width="110" height="90" rx="8" fill="#10B981" stroke="#047857" stroke-width="3"/>
      <!-- Train Windshield -->
      <rect x="55" y="55" width="90" height="35" rx="4" fill="#E0F2FE"/>
      <!-- Headlights -->
      <circle cx="70" cy="110" r="8" fill="#FEF08A"/>
      <circle cx="130" cy="110" r="8" fill="#FEF08A"/>
      <!-- Station Sign -->
      <rect x="65" y="20" width="70" height="20" rx="4" fill="#047857"/>
      <text x="100" y="34" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">駅 STATION</text>
      <text x="100" y="175" font-family="sans-serif" font-size="13" font-weight="bold" fill="#065F46" text-anchor="middle">駅 (Eki)</text>
    </svg>`,
    title: "สถานีรถไฟ (Eki)",
    note: "ฝึกคำศัพท์สถานที่ในการเดินทาง"
  }
];
