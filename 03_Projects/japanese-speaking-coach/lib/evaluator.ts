import { EvaluationPayload, EvaluationResult, EXAM_DEFINITIONS, ExamType, Exam2CategoryScore } from "./types";
import { calculateConfidence } from "./phonetics";
import { resolveHobby } from "./hobbies";

export function getSystemPrompt(examType: ExamType = "EXAM_1"): string {
  const meta = EXAM_DEFINITIONS[examType] || EXAM_DEFINITIONS.EXAM_1;

  let part1Rubric = "";
  if (examType === "EXAM_1") {
    part1Rubric = `
1. ส่วนที่ 1: การแนะนำตัวเอง (Jiko Shōkai) - 5 คะแนน
   - ต้องมี 5 องค์ประกอบตามลำดับ:
     1. Hajimemashite (はじめまして)
     2. Watashi wa [ชื่อ] desu (ต้องไม่มี -san ต่อท้ายชื่อตัวเองเด็ดขาด หากมี -san ให้หัก 0.5 คะแนน)
     3. Panyapiwatto no gakusei desu (パンヤピワットの がくせい です)
     4. Shumi wa [งานอดิเรก] desu (しゅみは ... です)
     5. Dōzo yoroshiku onegai itashimasu (どうぞ よろしく おねがい いたします)
   - เกณฑ์: หากพูดครบ 5 ประโยคถูกต้องได้ 5 คะแนนเต็ม หากขาดหรือผิด ให้หักจุดละ 1 คะแนน`;
  } else if (examType === "EXAM_2") {
    return `
คุณคืออาจารย์ผู้สอนและกรรมการตรวจข้อสอบวิชาภาษาญี่ปุ่น 1 (JN60101) ของสถาบันการจัดการปัญญาภิวัฒน์ (PIM)
คุณกำลังตรวจข้อสอบ "การสอบครั้งที่ 2 เนื้อหาบทที่ 3-4 (第2回小テスト)" คะแนนเต็ม 15 คะแนน (เวลาสอบจริง 3 นาที)

โครงสร้างข้อสอบครั้งที่ 2 ตามเกณฑ์ PIM:
1. ส่วนที่ 1: แปลคำศัพท์ 5 คำ (5 คะแนน, คำละ 1 คะแนน)
   - แปลคำศัพท์ไทย -> ญี่ปุ่น สุ่มจากบทที่ 3 และ 4
   - ยืดหยุ่นเรื่องตัวสะกด Romaji/Hiragana ที่ออกเสียงตรงกัน เช่น kaigishitsu/kaigi-shitsu, depato/depāto, supa/sūpā

2. ส่วนที่ 2: ตอบคำถาม 10 ข้อ (10 คะแนน, คำละ 1 คะแนน) ครอบคลุม 5 รูปแบบ รูปแบบละ 2 ข้อ:
   - รูปแบบที่ 1 (2 ข้อ): Koko wa doko desuka? (แสดงรูปสถานที่)
     * เกณฑ์: บังคับตอบเต็มประโยค "Koko wa [สถานที่] desu." (เช่น Koko wa kaigi-shitsu desu., Koko wa shokudō desu., Koko wa otearai desu.)
     * หากตอบเฉพาะชื่อสถานที่โดยไม่มี Koko wa หรือ desu ให้ 0.5 คะแนน
   - รูปแบบที่ 2 (2 ข้อ): Ima nan ji desuka? (พูดเวลาตามที่เห็น)
     * เกณฑ์: "Ima [gozen/gogo] [ชั่วโมง]-ji [นาที]-fun/pun/han desu." (เช่น 16.30 น. -> Ima gogo yo-ji han desu., 09.45 น. -> Ima gozen ku-ji yonjū gofun desu.)
     * ตรวจการบอกช่วงเวลา gozen/gogo, ชั่วโมงพิเศษ (yo-ji, ku-ji, shichi-ji) และนาที
   - รูปแบบที่ 3 (2 ข้อ): Anata no denwa bangō wa nan desuka? (พูดเบอร์โทรศัพท์ตามที่เห็น)
     * เกณฑ์: "(พูดเฉพาะตัวเลข ลงท้ายด้วย desu.)" เชื่อมเครื่องหมายขีด (-) ด้วย "no"
     * เช่น 090-7423-9105 -> Zero kyū zero no nana yon ni san no kyū ichi zero go desu.
   - รูปแบบที่ 4 (2 ข้อ): Kore wa ikura desuka? (พูดราคาตามที่เห็น)
     * เกณฑ์: "(พูดเฉพาะตัวเลข + en และลงท้ายด้วย desu.)"
     * เช่น 3,625 ¥ -> Sanzen roppyaku nijū go en desu., 18,000 ¥ -> Ichi man hassen en desu.
     * ตรวจการเปลี่ยนเสียงหลักร้อย/พัน/หมื่น (san-byaku, rop-pyaku, hap-pyaku, san-zen, has-sen, ichi-man)
   - รูปแบบที่ 5 (2 ข้อ): Shigoto wa nanji kara nanji made desuka? (พูดเวลาตามที่เห็น)
     * เกณฑ์: "(พูดเวลาเริ่มและสิ้นสุด ลงท้ายด้วย desu.)"
     * เช่น 9.00 - 17.00 น. -> Gozen ku-ji kara gogo go-ji made desu.
     * ตรวจโครงสร้าง ..kara ..made desu.

กรุณาส่งคืนผลลัพธ์เป็น JSON Object รูปแบบนี้เท่านั้น (ห้ามใส่ markdown wrap หรือ codeblock ใดๆ นอกเหนือจาก JSON):
{
  "examType": "EXAM_2",
  "totalScore": 15,
  "part1Score": 5,
  "part2Score": 10,
  "part3Score": 0,
  "status": "PASS" หรือ "NEEDS_IMPROVEMENT" (>= 9 ผ่าน),
  "part1Title": "ส่วนที่ 1: แปลคำศัพท์บทที่ 3-4 (5 คะแนน)",
  "part1Feedback": "วิเคราะห์คำศัพท์ 5 คำ คำไหนถูก คำไหนผิด พร้อมคำแนะนำ",
  "part2Feedback": "วิเคราะห์ภาพรวมการตอบคำถาม 10 ข้อใน 5 รูปแบบอย่างละเอียด",
  "part3Feedback": "",
  "exam2CategoryScores": [
    { "category": "PLACE", "categoryIndex": 1, "titleTh": "1. ถาม-ตอบสถานที่ (Koko wa doko desuka?)", "score": 2, "maxScore": 2, "feedback": "วิเคราะห์ผล 2 ข้อ" },
    { "category": "TIME", "categoryIndex": 2, "titleTh": "2. บอกเวลา (Ima nan ji desuka?)", "score": 2, "maxScore": 2, "feedback": "วิเคราะห์ผล 2 ข้อ" },
    { "category": "PHONE", "categoryIndex": 3, "titleTh": "3. เบอร์โทรศัพท์ (Denwa bangō)", "score": 2, "maxScore": 2, "feedback": "วิเคราะห์ผล 2 ข้อ" },
    { "category": "PRICE", "categoryIndex": 4, "titleTh": "4. ราคา (Kore wa ikura desuka?)", "score": 2, "maxScore": 2, "feedback": "วิเคราะห์ผล 2 ข้อ" },
    { "category": "OFFICE_HOURS", "categoryIndex": 5, "titleTh": "5. เวลาทำงาน (..kara ..made desu)", "score": 2, "maxScore": 2, "feedback": "วิเคราะห์ผล 2 ข้อ" }
  ],
  "overallSummary": "สรุปภาพรวมและคำแนะนำในการสอบจริงสำหรับนักศึกษา PIM เป็นภาษาไทยที่สุภาพ เป็นกันเอง และให้กำลังใจ"
}
`;
  } else if (examType === "EXAM_3") {
    part1Rubric = `
1. ส่วนที่ 1: บทสนทนาซื้อของระบุสี/ลักษณนาม และตารางงาน (บทที่ 5-6) - 5 คะแนน
   - ต้องมี 5 องค์ประกอบตามลำดับ:
     1. ขอดูเสื้อสีฟ้า: Kono aoi T-shatsu o misete kudasai.
     2. ซื้อผลไม้ระบุลักษณนาม: Ringo o futatsu kudasai. (ตรวจลักษณนาม futatsu)
     3. บอกแผนไปธนาคารพรุ่งนี้: Ashita ginkō e/ni ikimasu.
     4. บอกการไปเที่ยวสัปดาห์ก่อน: Senshū tomodachi to Kyōto e/ni ikimashita. (ตรวจรูปอดีต ikimashita และคำช่วย to)
     5. บอกวันกลับบ้าน: Kin-yōbi ni uchi e/ni kaerimasu.
   - เกณฑ์: ประโยคละ 1 คะแนน ตรวจลักษณนาม คำช่วย e/ni/to และการผันกริยารูปอดีต`;
  } else {
    part1Rubric = `
1. ส่วนที่ 1: การสื่อสารบทสนทนาและการนำเสนอแบบบูรณาการ (บทที่ 1-6) - 5 คะแนน
   - ต้องมี 5 องค์ประกอบตามลำดับ:
     1. ทักทายและบอกชื่อ: Hajimemashite, watashi wa [ชื่อ] desu (ห้ามมี san)
     2. สังกัดสถาบัน: Panyapiwatto no gakusei desu
     3. กิจวัตรและเวลา: Mainichi ku-ji kara go-ji made benkyō shimasu (เรียน 9 โมงถึง 5 โมง)
     4. แผนการเดินทาง: Raishū tomodachi to Nihon e/ni ikimasu (สัปดาห์หน้าจะไปญี่ปุ่นกับเพื่อน)
     5. ฝากเนื้อฝากตัว: Dōzo yoroshiku onegai itashimasu
   - เกณฑ์: ประโยคละ 1 คะแนน ตรวจความสมบูรณ์และไวยากรณ์`;
  }

  return `
คุณคืออาจารย์ผู้สอนและกรรมการตรวจข้อสอบวิชาภาษาญี่ปุ่น 1 (JN60101) ของสถาบันการจัดการปัญญาภิวัฒน์ (PIM)
คุณกำลังตรวจข้อสอบ "${meta.titleTh} (${meta.titleJa})" คะแนนเต็ม ${meta.totalScore} คะแนน (เวลาสอบจริง ${meta.timeLimitSeconds / 60} นาที)

เกณฑ์การตรวจอย่างละเอียด:
${part1Rubric}

2. ส่วนที่ 2: คำศัพท์ไทย -> ญี่ปุ่น (5 คำ = 5 คะแนน, คำละ 1 คะแนน)
   - ตรวจความถูกต้องของคำศัพท์ตามขอบเขตเนื้อหา ${meta.subtitleTh}
   - ยืดหยุ่นเรื่องตัวสะกด Romaji/Hiragana ที่ออกเสียงเหมือนกัน เช่น ginkoin/ginkō-in, pasokon/konpyūtā, toire/otearai

3. ส่วนที่ 3: ตอบคำถามจากรูปภาพและสถานการณ์ (5 คำถาม = 5 คะแนน, ข้อละ 1 คะแนน)
   - ข้อสอบบังคับให้ "ตอบเป็นประโยคสมบูรณ์" (Full sentence)
   - ตรวจคำช่วย wa, no, kara, made, e, ni, to, o และคำลงท้าย desu / masu ให้ถูกต้อง
   - หากตอบเป็นคำเดี่ยวๆ ไม่เต็มประโยค ให้ 0.5 คะแนน

กรุณาส่งคืนผลลัพธ์เป็น JSON Object รูปแบบนี้เท่านั้น (ห้ามใส่ markdown wrap หรือ codeblock ใดๆ นอกเหนือจาก JSON):
{
  "examType": "${meta.id}",
  "totalScore": 15,
  "part1Score": 5,
  "part2Score": 5,
  "part3Score": 5,
  "status": "PASS" หรือ "NEEDS_IMPROVEMENT" (>= 9 ผ่าน),
  "part1Title": "${meta.part1TitleTh}",
  "part1Feedback": "วิเคราะห์การพูดส่วนที่ 1 สรุปจุดดีและจุดที่ควรปรับปรุงอย่างละเอียด",
  "part2Feedback": "วิเคราะห์คำศัพท์ 5 คำ คำไหนถูก คำไหนผิด พร้อมวิธีออกเสียงที่ถูกต้อง",
  "part3Feedback": "วิเคราะห์การตอบคำถามภาพ 5 ข้อ ตรวจการพูดเต็มประโยคและไวยากรณ์",
  "overallSummary": "สรุปภาพรวมและคำแนะนำในการสอบจริงสำหรับนักศึกษา PIM เป็นภาษาไทยที่สุภาพ เป็นกันเอง และให้กำลังใจ"
}
`;
}

export async function callGemini(payload: EvaluationPayload, apiKey: string): Promise<EvaluationResult> {
  const examType = payload.examType || "EXAM_1";
  const systemPrompt = getSystemPrompt(examType);
  const models = ["gemini-flash-lite-latest", "gemini-3.5-flash-lite", "gemini-flash-latest", "gemini-3.6-flash"];
  let lastError: Error | null = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt },
              { text: `ข้อมูลการสอบของนักศึกษา (${examType}):\n${JSON.stringify(payload, null, 2)}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Model ${model} returned ${response.status}: ${errText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error(`Model ${model} returned empty candidate text`);
      }

      const parsed: EvaluationResult = JSON.parse(text);
      parsed.examType = examType;
      parsed.evaluationMode = "AI";
      parsed.warning = undefined;
      return parsed;
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`Attempt with ${model} failed, trying next model...`, lastError.message);
    }
  }

  throw lastError || new Error("All Gemini models failed");
}

export function ruleBasedEvaluation(payload: EvaluationPayload): EvaluationResult {
  const examType = payload.examType || "EXAM_1";
  const meta = EXAM_DEFINITIONS[examType] || EXAM_DEFINITIONS.EXAM_1;

  if (examType === "EXAM_2") {
    // 1. Part 1: Vocab evaluation (5 words = 5 points)
    const vocabAnswers = payload.exam2VocabAnswers || payload.part2Answers || [];
    let vocabScore = 0;
    const vocabWrongList: string[] = [];

    vocabAnswers.forEach((item) => {
      const user = (item.userAnswer || "").trim();
      const targets = [
        item.expectedJa,
        item.expectedRomaji,
        ...(item.altRomaji || []),
        ...(item.altJa ? [item.altJa] : []),
      ];
      const match = calculateConfidence(user, targets);
      if (match.isMatch || match.scorePercent >= 70) {
        vocabScore += 1;
      } else {
        vocabWrongList.push(`${item.th} (เฉลย: ${item.expectedRomaji})`);
      }
    });

    // 2. Part 2: 10 Q&A Answers across 5 categories
    const qAnswers = payload.exam2Answers || [];
    let qTotalScore = 0;

    const categoriesMeta = [
      { category: "PLACE" as const, categoryIndex: 1 as const, titleTh: "1. สถานที่ (Koko wa doko desuka?)" },
      { category: "TIME" as const, categoryIndex: 2 as const, titleTh: "2. เวลา (Ima nan ji desuka?)" },
      { category: "PHONE" as const, categoryIndex: 3 as const, titleTh: "3. เบอร์โทรศัพท์ (Denwa bangō)" },
      { category: "PRICE" as const, categoryIndex: 4 as const, titleTh: "4. ราคา (Kore wa ikura desuka?)" },
      { category: "OFFICE_HOURS" as const, categoryIndex: 5 as const, titleTh: "5. เวลาทำงาน (..kara ..made desu)" },
    ];

    const categoryScores: Exam2CategoryScore[] = categoriesMeta.map((cm) => {
      const catQuestions = qAnswers.filter((a) => a.category === cm.category);
      let catScore = 0;
      const notes: string[] = [];

      catQuestions.forEach((q, idx) => {
        const user = (q.userAnswer || "").trim();
        const targets = [q.expectedJa, q.expectedRomaji, ...(q.keywords || [])];
        const match = calculateConfidence(user, targets);

        if (cm.category === "PLACE") {
          const hasKokoWa = calculateConfidence(user, ["koko wa", "ここ は"]).scorePercent >= 60;
          if (match.isMatch || match.scorePercent >= 70) {
            catScore += 1;
          } else if (match.scorePercent >= 45 || (user.length > 3 && !hasKokoWa)) {
            catScore += 0.5;
            notes.push(`ข้อ ${idx + 1}: ตอบถูกสถานที่แต่ไม่เต็มประโยค (ควรตอบ Koko wa ... desu)`);
          } else {
            notes.push(`ข้อ ${idx + 1}: ตอบไม่ถูกต้อง (เฉลย: ${q.expectedRomaji})`);
          }
        } else if (cm.category === "TIME") {
          if (match.isMatch || match.scorePercent >= 70) {
            catScore += 1;
          } else if (match.scorePercent >= 45) {
            catScore += 0.5;
            notes.push(`ข้อ ${idx + 1}: เวลาคลาดเคลื่อนเล็กน้อย (เฉลย: ${q.expectedRomaji})`);
          } else {
            notes.push(`ข้อ ${idx + 1}: ตอบเวลาไม่ถูกต้อง (เฉลย: ${q.expectedRomaji})`);
          }
        } else if (cm.category === "PHONE") {
          if (match.isMatch || match.scorePercent >= 70) {
            catScore += 1;
          } else if (match.scorePercent >= 45) {
            catScore += 0.5;
            notes.push(`ข้อ ${idx + 1}: หมายเลขบางตัวคลาดเคลื่อน (เฉลย: ${q.expectedRomaji})`);
          } else {
            notes.push(`ข้อ ${idx + 1}: อ่านเบอร์โทรศัพท์ไม่ถูกต้อง (เฉลย: ${q.expectedRomaji})`);
          }
        } else if (cm.category === "PRICE") {
          if (match.isMatch || match.scorePercent >= 70) {
            catScore += 1;
          } else if (match.scorePercent >= 45) {
            catScore += 0.5;
            notes.push(`ข้อ ${idx + 1}: การอ่านตัวเลขราคาคลาดเคลื่อน (เฉลย: ${q.expectedRomaji})`);
          } else {
            notes.push(`ข้อ ${idx + 1}: ตอบราคาไม่ถูกต้อง (เฉลย: ${q.expectedRomaji})`);
          }
        } else if (cm.category === "OFFICE_HOURS") {
          if (match.isMatch || match.scorePercent >= 70) {
            catScore += 1;
          } else if (match.scorePercent >= 45) {
            catScore += 0.5;
            notes.push(`ข้อ ${idx + 1}: โครงสร้าง kara/made ไม่สมบูรณ์ (เฉลย: ${q.expectedRomaji})`);
          } else {
            notes.push(`ข้อ ${idx + 1}: ตอบช่วงเวลาทำงานไม่ถูกต้อง (เฉลย: ${q.expectedRomaji})`);
          }
        }
      });

      if (catQuestions.length === 0 && (payload.part3Answers || []).length > 0) {
        catScore = 1;
      }

      qTotalScore += catScore;
      const feedback =
        notes.length === 0
          ? `ตอบถูกต้องครบถ้วน (${catScore}/2 คะแนน)`
          : `ได้ ${catScore}/2 คะแนน (${notes.join("; ")})`;

      return {
        category: cm.category,
        categoryIndex: cm.categoryIndex,
        titleTh: cm.titleTh,
        score: catScore,
        maxScore: 2,
        feedback,
      };
    });

    const total = vocabScore + qTotalScore;
    const isPass = total >= 9;

    return {
      examType: "EXAM_2",
      evaluationMode: "RULE_BASED",
      warning: "ประเมินผลด้วยระบบตรวจมาตรฐาน PIM (Standard Rule-based Engine)",
      totalScore: total,
      part1Score: vocabScore,
      part2Score: qTotalScore,
      part3Score: 0,
      status: isPass ? "PASS" : "NEEDS_IMPROVEMENT",
      part1Title: "ส่วนที่ 1: แปลคำศัพท์บทที่ 3-4 (5 คะแนน)",
      part1Feedback: `ตอบถูก ${vocabScore}/5 คำ${vocabWrongList.length ? ` (คำที่ควรฝึกเพิ่ม: ${vocabWrongList.join(", ")})` : " ยอดเยี่ยมมาก จำคำศัพท์ได้แม่นยำ!"}`,
      part2Feedback: `ได้ ${qTotalScore}/10 คะแนน จากการตอบคำถาม 5 หมวด (สถานที่, เวลา, เบอร์โทร, ราคา, เวลาทำงาน)`,
      part3Feedback: "",
      exam2CategoryScores: categoryScores,
      overallSummary: `ได้คะแนนรวม ${total}/15 คะแนน สำหรับการสอบครั้งที่ 2 (${isPass ? "ผ่านเกณฑ์มาตรฐาน PIM (>= 9 คะแนน) เรียบร้อยแล้ว!" : "ยังไม่ผ่านเกณฑ์ (เกณฑ์ผ่าน 9 คะแนน) แนะนำให้ฝึกซ้อมซ้ำอีกรอบครับ!"})`,
    };
  }

  let p1Score = 5;
  const p1Answers = payload.part1Answers || [];
  const p1Text = p1Answers.join(" ").toLowerCase();
  const p1Notes: string[] = [];

  if (examType === "EXAM_1") {
    const mHajime = calculateConfidence(p1Text, ["hajimemashite", "はじめまして"]);
    if (!mHajime.isMatch && mHajime.scorePercent < 65) {
      p1Score -= 1;
      p1Notes.push("ขาดคำทักทาย Hajimemashite");
    }

    if (p1Text.includes("san desu") || p1Text.includes("さん です")) {
      p1Score -= 0.5;
      p1Notes.push("เผลอใส่ -san ต่อท้ายชื่อตัวเอง");
    }

    const mPim = calculateConfidence(p1Text, ["panyapiwatto no gakusei desu", "パンヤピワットの がくせい です", "gakusei desu"]);
    if (!mPim.isMatch && mPim.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดประโยคบอกสังกัด Panyapiwatto no gakusei desu");
    }

    const userHobby = payload.userConfig?.selectedHobby;
    const resolvedHobby = resolveHobby(userHobby || "manga");
    const mShumi = calculateConfidence(p1Text, [
      "shumi wa",
      "しゅみは",
      `shumi wa ${resolvedHobby.romaji}`,
      `しゅみは ${resolvedHobby.ja}`,
      resolvedHobby.romaji,
      resolvedHobby.ja,
    ]);
    if (!mShumi.isMatch && mShumi.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดประโยคบอกงานอดิเรก Shumi wa ... desu");
    } else if (
      p1Text.toLowerCase().includes(resolvedHobby.romaji.toLowerCase()) ||
      p1Text.includes(resolvedHobby.ja)
    ) {
      p1Notes.push(`ระบุงานอดิเรก (${resolvedHobby.th}: ${resolvedHobby.romaji}) ชัดเจน`);
    }

    const mYoroshiku = calculateConfidence(p1Text, ["douzo yoroshiku", "どうぞ よろしく", "yoroshiku onegai itashimasu"]);
    if (!mYoroshiku.isMatch && mYoroshiku.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดคำลงท้าย Douzo yoroshiku");
    }
  } else if (examType === "EXAM_3") {
    // Exam 3 checks: aoi t-shatsu / misete, futatsu kudasai, ashita ginkou, senshuu tomodachi kyouto, kinyoubi uchi
    const mShow = calculateConfidence(p1Text, ["aoi", "misete kudasai", "みせてください"]);
    if (!mShow.isMatch && mShow.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดการขอดูเสื้อสีฟ้า (Aoi T-shatsu o misete kudasai)");
    }

    const mCounter = calculateConfidence(p1Text, ["futatsu kudasai", "ふたつ", "ringo"]);
    if (!mCounter.isMatch && mCounter.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดการสั่งของระบุลักษณนาม (Ringo o futatsu kudasai)");
    }

    const mBank = calculateConfidence(p1Text, ["ginkou", "ginko", "ikimasu", "いきます"]);
    if (!mBank.isMatch && mBank.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดการบอกไปธนาคาร (Ashita ginkō e ikimasu)");
    }

    const mPast = calculateConfidence(p1Text, ["ikimashita", "きました", "kyouto", "kyoto", "tomodachi"]);
    if (!mPast.isMatch && mPast.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดการเล่าการไปเที่ยวในอดีต (Senshū tomodachi to Kyōto e ikimashita)");
    }

    const mHome = calculateConfidence(p1Text, ["uchi", "kaerimasu", "かえります", "kinyoubi"]);
    if (!mHome.isMatch && mHome.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดการบอกกำหนดการกลับบ้าน (Kin-yōbi ni uchi e kaerimasu)");
    }
  } else {
    // FINAL
    const mHajime = calculateConfidence(p1Text, ["hajimemashite", "はじめまして"]);
    if (!mHajime.isMatch && mHajime.scorePercent < 65) {
      p1Score -= 1;
      p1Notes.push("ขาดคำทักทาย Hajimemashite");
    }

    const mPim = calculateConfidence(p1Text, ["panyapiwatto", "gakusei desu", "がくせい"]);
    if (!mPim.isMatch && mPim.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดการบอกสังกัดสถาบัน");
    }

    const mDaily = calculateConfidence(p1Text, ["benkyou", "kara", "made", "べんきょう"]);
    if (!mDaily.isMatch && mDaily.scorePercent < 55) {
      p1Score -= 1;
      p1Notes.push("ขาดการบอกกิจวัตรเวลาเรียน");
    }

    const mTrip = calculateConfidence(p1Text, ["nihon", "ikimasu", "tomodachi"]);
    if (!mTrip.isMatch && mTrip.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดการบอกแผนการเดินทางกับเพื่อน");
    }

    const mEnd = calculateConfidence(p1Text, ["douzo yoroshiku", "よろしく"]);
    if (!mEnd.isMatch && mEnd.scorePercent < 60) {
      p1Score -= 1;
      p1Notes.push("ขาดคำลงท้าย Douzo yoroshiku");
    }
  }
  p1Score = Math.max(0, p1Score);

  // Part 2 Check with Levenshtein & Jaro-Winkler Tolerance (>= 70% match)
  let p2Score = 0;
  const p2Items = payload.part2Answers || [];
  p2Items.forEach((item) => {
    const user = (item.userAnswer || "").trim();
    const targets = [
      item.expectedJa,
      item.expectedRomaji,
      ...(item.altRomaji || []),
      ...(item.altJa ? [item.altJa] : []),
    ];
    const match = calculateConfidence(user, targets);
    if (match.isMatch || match.scorePercent >= 70) {
      p2Score += 1;
    }
  });

  // Part 3 Check with Keyword & Sentence Levenshtein Tolerance
  let p3Score = 0;
  const p3Items = payload.part3Answers || [];
  p3Items.forEach((item) => {
    const user = (item.userAnswer || "").trim();
    const targets = [
      item.expectedJa,
      item.expectedRomaji,
      ...(item.keywords || []),
    ];
    const match = calculateConfidence(user, targets);
    if (match.isMatch || match.scorePercent >= 70) {
      p3Score += 1;
    } else if (match.scorePercent >= 45 || user.length > 3) {
      p3Score += 0.5;
    }
  });

  const total = p1Score + p2Score + p3Score;
  return {
    examType: examType,
    evaluationMode: "RULE_BASED",
    warning: "ประเมินผลด้วยระบบตรวจมาตรฐาน PIM (Standard Rule-based Engine)",
    totalScore: total,
    part1Score: p1Score,
    part2Score: p2Score,
    part3Score: p3Score,
    status: total >= 9 ? "PASS" : "NEEDS_IMPROVEMENT",
    part1Title: meta.part1TitleTh,
    part1Feedback: p1Notes.length ? p1Notes.join(", ") : `การพูด${meta.part1TitleTh}ถูกต้อง ครบถ้วนตามลำดับ ยอดเยี่ยมมาก!`,
    part2Feedback: `ตอบถูก ${p2Score} จาก 5 คำ (วิเคราะห์ด้วย Phonetic Confidence และคำศัพท์บทที่ ${meta.chapters.join(", ")})`,
    part3Feedback: `ได้ ${p3Score} จาก 5 คะแนน ตอบได้ใจความสมบูรณ์และถูกต้องตามสถานการณ์`,
    overallSummary: `ได้คะแนนรวม ${total}/15 คะแนน สำหรับ${meta.titleTh} (${total >= 9 ? "ผ่านเกณฑ์เบื้องต้น" : "ควรฝึกซ้อมเพิ่มเติมอีกนิด"}) ซ้อมอีกรอบเพื่อความมั่นใจครับ!`
  };
}
