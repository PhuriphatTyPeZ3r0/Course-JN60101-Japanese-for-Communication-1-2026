// lib/phonetics.ts - Mathematical Algorithms for Japanese Phonetic & Fuzzy Matching
// Algorithms: Levenshtein Distance, Jaro-Winkler Similarity, Kana-to-Romaji Phonetic Normalization

/**
 * Kana to Romaji mapping table for phonetic normalization
 */
const KANA_MAP: Record<string, string> = {
  // Hiragana
  あ: "a", い: "i", う: "u", え: "e", お: "o",
  か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
  た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
  は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
  や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
  わ: "wa", を: "o", ん: "n",
  が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
  ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
  だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
  ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
  ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
  きゃ: "kya", きゅ: "kyu", きょ: "kyo",
  しゃ: "sha", しゅ: "shu", しょ: "sho",
  ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
  にゃ: "nya", にゅ: "nyu", にょ: "nyo",
  ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo",
  みゃ: "mya", みゅ: "myu", みょ: "myo",
  りゃ: "rya", りゅ: "ryu", りょ: "ryo",
  ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo",
  じゃ: "ja", じゅ: "ju", じょ: "jo",
  びゃ: "bya", びゅ: "byu", びょ: "byo",
  ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",
  っ: "", // Sokuon handled phonetically
  // Katakana
  ア: "a", イ: "i", ウ: "u", エ: "e", オ: "o",
  カ: "ka", キ: "ki", ク: "ku", ケ: "ke", コ: "ko",
  サ: "sa", シ: "shi", ス: "su", セ: "se", ソ: "so",
  タ: "ta", チ: "chi", ツ: "tsu", テ: "te", ト: "to",
  ナ: "na", ニ: "ni", ヌ: "nu", ネ: "ne", ノ: "no",
  ハ: "ha", ヒ: "hi", フ: "fu", ヘ: "he", ホ: "ho",
  マ: "ma", ミ: "mi", ム: "mu", メ: "me", モ: "mo",
  ヤ: "ya", ユ: "yu", ヨ: "yo",
  ラ: "ra", リ: "ri", ル: "ru", レ: "re", ロ: "ro",
  ワ: "wa", ヲ: "o", ン: "n",
  ガ: "ga", ギ: "gi", グ: "gu", ゲ: "ge", ゴ: "go",
  ザ: "za", ジ: "ji", ズ: "zu", ゼ: "ze", ゾ: "zo",
  ダ: "da", ヂ: "ji", ヅ: "zu", デ: "de", ド: "do",
  バ: "ba", ビ: "bi", ブ: "bu", ベ: "be", ボ: "bo",
  パ: "pa", ピ: "pi", プ: "pu", ペ: "pe", ポ: "po",
  ー: "", // Chōonpu
};

/**
 * Converts Japanese text (Hiragana/Katakana/Kanji) to normalized phonetic Romaji
 */
export function normalizePhonetic(input: string): string {
  if (!input) return "";

  let str = input.trim().toLowerCase();

  // Remove punctuation, spaces, and brackets
  str = str.replace(/[。、！？\s\-_.,!?()[\]]/g, "");

  // Normalize particles: は (wa) when used after noun
  str = str.replace(/わたしは/g, "watashiwa");
  str = str.replace(/しゅみは/g, "shumiwa");
  str = str.replace(/これは/g, "korewa");
  str = str.replace(/それは/g, "sorewa");
  str = str.replace(/あれは/g, "arewa");
  str = str.replace(/ここは/g, "kokowa");
  str = str.replace(/そこは/g, "sokowa");
  str = str.replace(/あそこは/g, "asokowa");

  // Multi-char Kana replacement
  const multiKana = ["きゃ", "きゅ", "きょ", "しゃ", "しゅ", "しょ", "ちゃ", "ちゅ", "ちょ", "にゃ", "にゅ", "にょ", "ひゃ", "ひゅ", "ひょ", "みゃ", "みゅ", "みょ", "りゃ", "りゅ", "りょ", "ぎゃ", "ぎゅ", "ぎょ", "じゃ", "じゅ", "じょ", "びゃ", "びゅ", "びょ", "ぴゃ", "ぴゅ", "ぴょ"];
  for (const k of multiKana) {
    if (str.includes(k) && KANA_MAP[k]) {
      str = str.split(k).join(KANA_MAP[k]);
    }
  }

  // Single-char Kana replacement
  let romaji = "";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (KANA_MAP[ch] !== undefined) {
      romaji += KANA_MAP[ch];
    } else {
      romaji += ch;
    }
  }

  // Normalize long vowels and macrons
  romaji = romaji
    .replace(/ō|ou|o-/g, "o")
    .replace(/ū|uu|u-/g, "u")
    .replace(/ā|aa|a-/g, "a")
    .replace(/ē|ee|ei|e-/g, "e")
    .replace(/ī|ii|i-/g, "i");

  // Normalize common phonetic variations
  romaji = romaji
    .replace(/si/g, "shi")
    .replace(/ti/g, "chi")
    .replace(/tu/g, "tsu")
    .replace(/hu/g, "fu")
    .replace(/zi/g, "ji");

  return romaji;
}

/**
 * 1. Levenshtein Distance Algorithm (Dynamic Programming)
 * Measures edit operations (insertions, deletions, substitutions)
 */
export function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const d: number[][] = [];

  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,      // Deletion
        d[i][j - 1] + 1,      // Insertion
        d[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return d[m][n];
}

/**
 * Levenshtein Similarity Ratio in [0, 1]
 */
export function levenshteinRatio(s1: string, s2: string): number {
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshteinDistance(s1, s2);
  return Math.max(0, 1 - dist / maxLen);
}

/**
 * 2. Jaro-Winkler Similarity Algorithm
 * Gives higher weight to prefixes, ideal for Japanese vocabulary roots
 */
export function jaroWinklerSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1.0;
  if (!s1.length || !s2.length) return 0.0;

  const matchDistance = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
  const s1Matches = new Array(s1.length).fill(false);
  const s2Matches = new Array(s2.length).fill(false);

  let matches = 0;
  let transpositions = 0;

  for (let i = 0; i < s1.length; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, s2.length);

    for (let j = start; j < end; j++) {
      if (s2Matches[j] || s1[i] !== s2[j]) continue;
      s1Matches[i] = true;
      s2Matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0.0;

  let k = 0;
  for (let i = 0; i < s1.length; i++) {
    if (!s1Matches[i]) continue;
    while (!s2Matches[k]) k++;
    if (s1[i] !== s2[k]) transpositions++;
    k++;
  }

  const jaro =
    (matches / s1.length + matches / s2.length + (matches - transpositions / 2) / matches) / 3.0;

  // Winkler prefix boost (up to 4 chars)
  let prefix = 0;
  for (let i = 0; i < Math.min(4, Math.min(s1.length, s2.length)); i++) {
    if (s1[i] === s2[i]) prefix++;
    else break;
  }

  return jaro + prefix * 0.1 * (1.0 - jaro);
}

export interface MatchResult {
  scorePercent: number;
  isMatch: boolean;
  bestTarget: string;
  rating: "EXCELLENT" | "GOOD" | "NEEDS_WORK";
}

/**
 * Calculates mathematical confidence score (0-100%) against target expected answers
 * using maximum of Levenshtein Ratio and Jaro-Winkler with phonetic normalization.
 */
export function calculateConfidence(
  userSpeech: string,
  expectedAnswers: string[]
): MatchResult {
  if (!userSpeech || !userSpeech.trim() || !expectedAnswers.length) {
    return { scorePercent: 0, isMatch: false, bestTarget: "", rating: "NEEDS_WORK" };
  }

  const normUser = normalizePhonetic(userSpeech);
  let bestScore = 0;
  let bestTarget = expectedAnswers[0];

  for (const expected of expectedAnswers) {
    const normExpected = normalizePhonetic(expected);

    // Exact match after normalization
    if (normUser === normExpected || normUser.includes(normExpected) || normExpected.includes(normUser)) {
      return { scorePercent: 100, isMatch: true, bestTarget: expected, rating: "EXCELLENT" };
    }

    const lev = levenshteinRatio(normUser, normExpected);
    const jw = jaroWinklerSimilarity(normUser, normExpected);
    const combined = Math.max(lev, jw);

    if (combined > bestScore) {
      bestScore = combined;
      bestTarget = expected;
    }
  }

  const scorePercent = Math.round(bestScore * 100);
  const isMatch = scorePercent >= 75;

  let rating: "EXCELLENT" | "GOOD" | "NEEDS_WORK" = "NEEDS_WORK";
  if (scorePercent >= 85) rating = "EXCELLENT";
  else if (scorePercent >= 70) rating = "GOOD";

  return {
    scorePercent,
    isMatch,
    bestTarget,
    rating,
  };
}
