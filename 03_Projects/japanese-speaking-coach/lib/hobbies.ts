// lib/hobbies.ts - Comprehensive Japanese Hobby Dictionary, Auto-Mapping & Custom Management
import { normalizePhonetic } from "./phonetics";

export interface HobbyItem {
  id: string;
  ja: string;
  romaji: string;
  th: string;
  category: "ENTERTAINMENT" | "SPORTS" | "FOOD_DRINK" | "DIGITAL_GAMES" | "ARTS_CULTURE" | "LIFESTYLE" | "CUSTOM";
  icon: string; // Material Symbols icon name
  isCustom?: boolean;
}

/**
 * 30+ Curated Japanese Hobbies mapped across Japanese (Kana/Kanji), Romaji, and Thai
 */
export const HOBBY_DICTIONARY: HobbyItem[] = [
  // 1. Entertainment & Media
  { id: "manga", ja: "まんが", romaji: "manga", th: "อ่านการ์ตูน / มังงะ", category: "ENTERTAINMENT", icon: "menu_book" },
  { id: "anime", ja: "アニメ", romaji: "anime", th: "ดูอนิเมะ", category: "ENTERTAINMENT", icon: "smart_display" },
  { id: "eiga", ja: "えいが", romaji: "eiga", th: "ดูภาพยนตร์ / ดูหนัง", category: "ENTERTAINMENT", icon: "movie" },
  { id: "ongaku", ja: "おんがく", romaji: "ongaku", th: "ฟังเพลง", category: "ENTERTAINMENT", icon: "headphones" },
  { id: "karaoke", ja: "カラオケ", romaji: "karaoke", th: "ร้องคาราโอเกะ", category: "ENTERTAINMENT", icon: "mic" },
  { id: "dokusho", ja: "どくしょ", romaji: "dokusho", th: "อ่านหนังสือ", category: "ENTERTAINMENT", icon: "auto_stories" },

  // 2. Digital & Gaming
  { id: "game", ja: "ゲーム", romaji: "gēmu", th: "เล่นเกม", category: "DIGITAL_GAMES", icon: "sports_esports" },
  { id: "programming", ja: "プログラミング", romaji: "puroguramingu", th: "เขียนโค้ด / โปรแกรมมิ่ง", category: "DIGITAL_GAMES", icon: "code" },
  { id: "net_surfing", ja: "ネットサーフィン", romaji: "netto sāfin", th: "ท่องเน็ต / โซเชียล", category: "DIGITAL_GAMES", icon: "language" },

  // 3. Sports & Fitness
  { id: "sports", ja: "スポーツ", romaji: "supōtsu", th: "เล่นกีฬา", category: "SPORTS", icon: "sports_soccer" },
  { id: "soccer", ja: "サッカー", romaji: "sakkā", th: "เล่นฟุตบอล", category: "SPORTS", icon: "sports_soccer" },
  { id: "basketball", ja: "バスケットボール", romaji: "basukettobōru", th: "เล่นบาสเกตบอล", category: "SPORTS", icon: "sports_basketball" },
  { id: "badminton", ja: "バドミントン", romaji: "badominton", th: "เล่นแบดมินตัน", category: "SPORTS", icon: "sports_tennis" },
  { id: "suiei", ja: "すいえい", romaji: "suiei", th: "ว่ายน้ำ", category: "SPORTS", icon: "pool" },
  { id: "jogging", ja: "ジョギング", romaji: "jogingu", th: "วิ่งจ๊อกกิ้ง", category: "SPORTS", icon: "directions_run" },
  { id: "cycling", ja: "サイクリング", romaji: "saikuringu", th: "ปั่นจักรยาน", category: "SPORTS", icon: "directions_bike" },
  { id: "skateboarding", ja: "スケートボード", romaji: "sukētobōdo", th: "เล่นสเก็ตบอร์ด", category: "SPORTS", icon: "skateboarding" },
  { id: "yoga", ja: "ヨガ", romaji: "yoga", th: "เล่นโยคะ / ออกกำลังกาย", category: "SPORTS", icon: "self_improvement" },

  // 4. Food & Drinks
  { id: "ryori", ja: "りょうり", romaji: "ryōri", th: "ทำอาหาร", category: "FOOD_DRINK", icon: "restaurant" },
  { id: "cafe_hopping", ja: "カフェめぐり", romaji: "kafe meguri", th: "เที่ยวคาเฟ่ / ดื่มกาแฟ", category: "FOOD_DRINK", icon: "local_cafe" },
  { id: "baking", ja: "おかしづくり", romaji: "okashizukuri", th: "ทำขนม / เบเกอรี่", category: "FOOD_DRINK", icon: "cake" },

  // 5. Arts & Culture
  { id: "drawing", ja: "えをかくこと", romaji: "e o kaku koto", th: "วาดรูป / ศิลปะ", category: "ARTS_CULTURE", icon: "palette" },
  { id: "photography", ja: "しゃしん", romaji: "shashin", th: "ถ่ายภาพ", category: "ARTS_CULTURE", icon: "photo_camera" },
  { id: "guitar", ja: "ギター", romaji: "gitā", th: "เล่นกีตาร์", category: "ARTS_CULTURE", icon: "music_note" },
  { id: "piano", ja: "ピアノ", romaji: "piano", th: "เล่นเปียโน", category: "ARTS_CULTURE", icon: "piano" },
  { id: "dance", ja: "ダンス", romaji: "dansu", th: "เต้น / คัฟเวอร์แดนซ์", category: "ARTS_CULTURE", icon: "nightlife" },
  { id: "plamo", ja: "プラモデル", romaji: "puramoderu", th: "ต่อโมเดล / กันพลา", category: "ARTS_CULTURE", icon: "precision_manufacturing" },

  // 6. Lifestyle & Outdoors
  { id: "ryoko", ja: "りょこう", romaji: "ryokō", th: "ท่องเที่ยว / เดินทาง", category: "LIFESTYLE", icon: "flight" },
  { id: "camping", ja: "キャンプ", romaji: "kyanpu", th: "ตั้งแคมป์ / กางเต็นท์", category: "LIFESTYLE", icon: "camping" },
  { id: "shopping", ja: "ショッピング", romaji: "shoppingu", th: "ช้อปปิ้ง / ซื้อของ", category: "LIFESTYLE", icon: "shopping_bag" },
  { id: "gardening", ja: "えんげい", romaji: "engei", th: "ปลูกต้นไม้ / จัดสวน", category: "LIFESTYLE", icon: "yard" },
  { id: "sleeping", ja: "ねること", romaji: "neru koto", th: "นอนหลับพักผ่อน", category: "LIFESTYLE", icon: "bed" },
];

/**
 * Romaji to Hiragana conversion lookup for auto-mapping
 */
const ROMAJI_TO_HIRAGANA: Record<string, string> = {
  kya: "きゃ", kyu: "きゅ", kyo: "きょ",
  sha: "しゃ", shu: "しゅ", sho: "しょ",
  cha: "ちゃ", chu: "ちゅ", cho: "ちょ",
  nya: "nya", nyu: "にゅ", nyo: "にょ",
  hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ",
  mya: "みゃ", myu: "みゅ", myo: "みょ",
  rya: "りゃ", ryu: "りゅ", ryo: "りょ",
  gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ",
  ja: "じゃ", ju: "じゅ", jo: "じょ",
  bya: "びゃ", byu: "びゅ", byo: "びょ",
  pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ",
  ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ",
  sa: "さ", shi: "し", su: "す", se: "せ", so: "そ",
  ta: "た", chi: "ち", tsu: "つ", te: "て", to: "と",
  na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の",
  ha: "は", hi: "ひ", fu: "ふ", he: "へ", ho: "ほ",
  ma: "ま", mi: "み", mu: "む", me: "め", mo: "mo",
  ya: "や", yu: "ゆ", yo: "よ",
  ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ",
  wa: "わ", wo: "を", n: "ん",
  ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご",
  za: "ざ", ji: "じ", zu: "ず", ze: "ぜ", zo: "ぞ",
  da: "だ", de: "で", do: "ど",
  ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ",
  pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",
  a: "あ", i: "い", u: "う", e: "え", o: "お",
};

/**
 * Converts Romaji input string to Hiragana
 */
export function romajiToHiragana(romaji: string): string {
  if (!romaji) return "";
  let s = romaji.toLowerCase().trim();
  let result = "";
  let i = 0;

  while (i < s.length) {
    // Sokuon (double consonants like kk, tt, pp, ss)
    if (
      i + 1 < s.length &&
      s[i] === s[i + 1] &&
      !"aiueon".includes(s[i])
    ) {
      result += "っ";
      i++;
      continue;
    }

    // 3-char match
    const sub3 = s.substring(i, i + 3);
    if (ROMAJI_TO_HIRAGANA[sub3]) {
      result += ROMAJI_TO_HIRAGANA[sub3];
      i += 3;
      continue;
    }

    // 2-char match
    const sub2 = s.substring(i, i + 2);
    if (ROMAJI_TO_HIRAGANA[sub2]) {
      result += ROMAJI_TO_HIRAGANA[sub2];
      i += 2;
      continue;
    }

    // 1-char match
    const sub1 = s.substring(i, i + 1);
    if (ROMAJI_TO_HIRAGANA[sub1]) {
      result += ROMAJI_TO_HIRAGANA[sub1];
      i += 1;
      continue;
    }

    result += s[i];
    i++;
  }

  return result;
}

const STORAGE_KEY = "hanase_custom_hobbies";

/**
 * Loads custom hobbies from localStorage
 */
export function loadCustomHobbies(): HobbyItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HobbyItem[];
  } catch (e) {
    console.error("Failed to load custom hobbies:", e);
    return [];
  }
}

/**
 * Saves a new custom hobby to localStorage
 */
export function saveCustomHobby(hobby: Omit<HobbyItem, "isCustom">): HobbyItem[] {
  if (typeof window === "undefined") return [];
  try {
    const current = loadCustomHobbies();
    const newItem: HobbyItem = { ...hobby, isCustom: true };
    const filtered = current.filter((h) => h.id !== newItem.id);
    const updated = [newItem, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save custom hobby:", e);
    return [];
  }
}

/**
 * Deletes a custom hobby from localStorage
 */
export function deleteCustomHobby(id: string): HobbyItem[] {
  if (typeof window === "undefined") return [];
  try {
    const current = loadCustomHobbies();
    const updated = current.filter((h) => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to delete custom hobby:", e);
    return [];
  }
}

/**
 * Resolves any hobby string (ID, Japanese, Romaji, or Thai) to a complete HobbyItem
 */
export function resolveHobby(query: string, customList: HobbyItem[] = []): HobbyItem {
  if (!query) {
    return HOBBY_DICTIONARY[0]; // Default: まんが
  }

  const clean = query.trim().toLowerCase();
  const allHobbies = [...customList, ...HOBBY_DICTIONARY];

  // 1. Direct ID match
  let found = allHobbies.find((h) => h.id.toLowerCase() === clean);
  if (found) return found;

  // 2. Direct Japanese match
  found = allHobbies.find((h) => h.ja === query.trim());
  if (found) return found;

  // 3. Normalized Romaji match
  const normQuery = normalizePhonetic(clean);
  found = allHobbies.find(
    (h) =>
      normalizePhonetic(h.romaji) === normQuery ||
      normalizePhonetic(h.ja) === normQuery
  );
  if (found) return found;

  // 4. Thai substring or exact match
  found = allHobbies.find((h) => h.th.includes(query) || query.includes(h.th));
  if (found) return found;

  // 5. Fallback for ad-hoc custom input
  return {
    id: `custom-${clean}`,
    ja: query.trim(),
    romaji: normalizePhonetic(query) || clean,
    th: query.trim(),
    category: "CUSTOM",
    icon: "sports_esports",
    isCustom: true,
  };
}
