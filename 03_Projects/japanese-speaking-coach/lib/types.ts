// lib/types.ts - Type definitions for JN60101 Speaking Coach (v2.0)

export type AnimeVoiceId = "web_speech";

export interface AnimeVoiceOption {
  id: AnimeVoiceId;
  nameJa: string;
  nameTh: string;
  character: string;
  speakerId: number;
  description: string;
}

export const ANIME_VOICE_OPTIONS: AnimeVoiceOption[] = [
  { id: "web_speech", nameJa: "標準音声", nameTh: "เสียงมาตรฐานระบบ", character: "Web Speech API", speakerId: 0, description: "เสียงสังเคราะห์ประจำเครื่อง เสถียร 100% เร็วทันใจ 0ms (ไม่ต้องเชื่อมต่อเน็ต)" },
];

export type SeiyuuVoiceId = "web_speech";

export interface SeiyuuProfile {
  id: SeiyuuVoiceId;
  gender: "system" | "female" | "male";
  characterNameJa: string;
  characterNameTh: string;
  characterRomaji: string;
  seiyuuNameJa: string;
  seiyuuNameTh: string;
  animeTitle: string;
  avatarIcon: string;
  badgeBg: string;
  badgeText: string;
  greetingJa: string;
  greetingTh: string;
  praiseJa: string;
  praiseTh: string;
  pitch: number;
  rate: number;
  voicevoxSpeakerId?: number;
  fishAudioReferenceId?: string;
}

export const SEIYUU_ROSTER: SeiyuuProfile[] = [
  {
    id: "web_speech",
    gender: "system",
    characterNameJa: "標準音声",
    characterNameTh: "เสียงมาตรฐานระบบอุปกรณ์",
    characterRomaji: "Default System Voice",
    seiyuuNameJa: "システム音声",
    seiyuuNameTh: "Device Web Speech",
    animeTitle: "Web Speech API (0ms Offline)",
    avatarIcon: "smart_toy",
    badgeBg: "bg-emerald-100 border-emerald-900 text-emerald-900",
    badgeText: "標準音声 (Default System Voice)",
    greetingJa: "試験を開始します。準備はよろしいですか？",
    greetingTh: "เริ่มการทดสอบ พร้อมแล้วใช่ไหมครับ/ค่ะ?",
    praiseJa: "大変よくできました。お疲れ様でした。",
    praiseTh: "ทำได้ดีมากครับ/ค่ะ ขอบคุณสำหรับความตั้งใจ",
    pitch: 1.0,
    rate: 0.9,
  },
];

export interface UserConfig {
  studentNameJa: string;
  selectedHobby: string;
  showRomaji: boolean;
  showThaiHints: boolean;
  speechRate: number;
  enableSfx: boolean;
  seiyuuVoice: SeiyuuVoiceId;
  voiceProvider?: "web_speech";
  fishAudioApiKey?: string;
  animeVoice?: AnimeVoiceId;
  email?: string;
  geminiApiKey?: string;
}

export const DEFAULT_USER_CONFIG: UserConfig = {
  studentNameJa: "たなか", // Japanese default name for practice
  selectedHobby: "まんが", // Japanese default hobby (manga)
  showRomaji: true,
  showThaiHints: true,
  speechRate: 0.9,
  enableSfx: true,
  seiyuuVoice: "web_speech", // Only Default System Voice
  voiceProvider: "web_speech",
};

export type ExamType = "EXAM_1" | "EXAM_2" | "EXAM_3" | "FINAL";

export interface ExamMeta {
  id: ExamType;
  titleJa: string;
  titleTh: string;
  subtitleTh: string;
  chapters: number[];
  part1TitleJa: string;
  part1TitleTh: string;
  part1InstructionsTh: string;
  timeLimitSeconds: number;
  totalScore: number;
}

export const EXAM_DEFINITIONS: Record<ExamType, ExamMeta> = {
  EXAM_1: {
    id: "EXAM_1",
    titleJa: "第1回小テスト (第1〜2課)",
    titleTh: "สอบย่อยครั้งที่ 1 (บทที่ 1-2)",
    subtitleTh: "การแนะนำตนเอง, ข้อมูลบุคคล, สิ่งของเครื่องใช้ในสำนักงาน",
    chapters: [1, 2],
    part1TitleJa: "自己紹介 (Jiko Shōkai)",
    part1TitleTh: "การแนะนำตนเอง (5 คะแนน)",
    part1InstructionsTh: "พูดแนะนำตนเองตามลำดับ 5 ประโยค (ทักทาย -> ชื่อ -> สถาบัน -> งานอดิเรก -> ฝากเนื้อฝากตัว)",
    timeLimitSeconds: 180,
    totalScore: 15,
  },
  EXAM_2: {
    id: "EXAM_2",
    titleJa: "第2回小テスト (第3〜4課)",
    titleTh: "สอบย่อยครั้งที่ 2 (บทที่ 3-4)",
    subtitleTh: "การคุยเรื่องเวลา, สถานที่ในบริษัท, การซื้อของและราคา",
    chapters: [3, 4],
    part1TitleJa: "時間と買い物 (Jikan to Kaimono)",
    part1TitleTh: "บทสนทนาเรื่องเวลาและการซื้อของ (5 คะแนน)",
    part1InstructionsTh: "พูดบทสนทนาถามเวลาทำงานและซื้อของในร้านค้า 5 ประโยคตามลำดับ",
    timeLimitSeconds: 180,
    totalScore: 15,
  },
  EXAM_3: {
    id: "EXAM_3",
    titleJa: "第3回小テスト (第5〜6課)",
    titleTh: "สอบย่อยครั้งที่ 3 (บทที่ 5-6)",
    subtitleTh: "การซื้อของระบุสี/จำนวน, วันที่/เดือน/ปี, การยืนยันตารางงาน",
    chapters: [5, 6],
    part1TitleJa: "買い物と予定確認 (Kaimono to Yotei)",
    part1TitleTh: "บทสนทนาซื้อของและยืนยันตารางงาน (5 คะแนน)",
    part1InstructionsTh: "พูดบทสนทนาซื้อของระบุลักษณนาม/สี และยืนยันตารางงานการเดินทาง 5 ประโยคตามลำดับ",
    timeLimitSeconds: 180,
    totalScore: 15,
  },
  FINAL: {
    id: "FINAL",
    titleJa: "総合実技試験 (第1〜6課)",
    titleTh: "สอบประมวลความรู้รวบยอด (บทที่ 1-6)",
    subtitleTh: "ครอบคลุมเนื้อหาทั้ง 6 บทสำหรับการสื่อสารในการทำงาน",
    chapters: [1, 2, 3, 4, 5, 6],
    part1TitleJa: "総合会話プレゼンテーション",
    part1TitleTh: "การสื่อสารบทสนทนาและการนำเสนอ (5 คะแนน)",
    part1InstructionsTh: "พูดบทสนทนาหรือแนะนำตนเองพร้อมข้อมูลงานและตารางเวลา 5 ประโยคตามลำดับ",
    timeLimitSeconds: 180,
    totalScore: 15,
  },
};

export interface DialogueLine {
  step: number;
  speaker: "A" | "B" | "Examiner" | "Student";
  speakerNameJa: string;
  speakerNameTh: string;
  ja: string;
  romaji: string;
  th: string;
  key: string;
  expectedKeywords: string[];
  moraCount?: number;
}

export interface ChapterDialogue {
  chapter: number;
  titleJa: string;
  titleTh: string;
  situationTh: string;
  lines: DialogueLine[];
}

export interface SelfIntroStep {
  step: number;
  ja: string;
  romaji: string;
  th: string;
  key: string;
}

export interface SampleHobby {
  ja: string;
  romaji: string;
  th: string;
}

export interface SelfIntroCriteria {
  template: SelfIntroStep[];
  sampleHobbies: SampleHobby[];
}

export type VocabCategory =
  | "อาชีพ"
  | "สัญชาติ"
  | "สถานที่"
  | "สิ่งของ"
  | "เครื่องใช้ไฟฟ้า"
  | "เครื่องเขียน"
  | "เวลา"
  | "ตัวเลข/ราคา"
  | "เสื้อผ้า/ของใช้"
  | "อาหาร/เครื่องดื่ม"
  | "สีและขนาด"
  | "ลักษณนาม"
  | "วันที่และเดือน"
  | "วันในสัปดาห์"
  | "การเดินทางและกริยา"
  | "คำศัพท์ทั่วไป";

export interface VocabItem {
  id: string;
  th: string;
  ja: string;
  romaji: string;
  altJa?: string;
  altRomaji?: string[];
  chapter: number;
  category: VocabCategory | string;
}

export interface ImageQuestion {
  id: string;
  chapter: number;
  questionJa: string;
  questionRomaji: string;
  questionTh: string;
  expectedAnswerJa: string;
  expectedAnswerRomaji: string;
  keywords: string[];
  imageType: "svg" | "url";
  imageSvg?: string;
  imageUrl?: string;
  title: string;
  note: string;
  fit?: "cover" | "contain" | "fill";
  position?: string;
}

export interface Part2AnswerItem {
  id: string;
  th: string;
  expectedJa: string;
  expectedRomaji: string;
  altJa?: string;
  altRomaji?: string[];
  userAnswer: string;
}

export interface Part3AnswerItem {
  id: string;
  questionJa: string;
  questionRomaji: string;
  expectedJa: string;
  expectedRomaji: string;
  keywords: string[];
  userAnswer: string;
}

export interface EvaluationPayload {
  examType?: ExamType;
  part1Answers: string[];
  part2Answers: Part2AnswerItem[];
  part3Answers: Part3AnswerItem[];
  userConfig?: Partial<UserConfig>;
  turnstileToken?: string;
  clientApiKey?: string;
  userId?: string;
}

export interface EvaluationResult {
  examType?: ExamType;
  totalScore: number;
  part1Score: number;
  part2Score: number;
  part3Score: number;
  status: "PASS" | "NEEDS_IMPROVEMENT";
  part1Title?: string;
  part1Feedback: string;
  part2Feedback: string;
  part3Feedback: string;
  overallSummary: string;
  warning?: string;
  evaluationMode?: "AI" | "RULE_BASED";
}
