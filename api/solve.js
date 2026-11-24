export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Используй POST-запрос." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Сервер ещё не настроен: добавь GEMINI_API_KEY в переменные окружения Vercel." });
  }

  try {
    const body = req.body || {};
    const subject = String(body.subject || "Другой предмет").slice(0, 80);
    const question = String(body.question || "").slice(0, 12000);
    const extra = String(body.extra || "").slice(0, 2000);
    const image = body.image;

    if (!question && !image) {
      return res.status(400).json({ error: "Добавь фото или текст задания." });
    }
    if (image && (typeof image.data !== "string" || !/^image\/(jpeg|png|webp)$/.test(image.mimeType || "") || image.data.length > 5_000_000)) {
      return res.status(400).json({ error: "Изображение слишком большое или имеет неподдерживаемый формат. Попробуй JPG, PNG или WebP." });
    }

    const parts = [{
      text: [
        "Ты Lunary Solve, внимательный школьный помощник.",
        "Предмет: " + subject + ".",
        "Реши задание с изображения и/или текста. Если условие на фото нечёткое или данных недостаточно, прямо укажи, что именно не удалось прочитать, не выдумывай условие.",
        "Дай сначала краткий ответ, затем понятное пошаговое объяснение на русском языке. Для языковых предметов объясни правило и покажи исправленный вариант; для гуманитарных предметов отделяй факты от интерпретаций; для естественных наук показывай формулы, единицы и ход решения.",
        "Уровень объяснения: школьный, простой и точный. Не подменяй неизвестные данные догадками.",
        question ? "Текст задания / распознанный текст:\n" + question : "",
        extra ? "Пожелание ученика: " + extra : ""
      ].filter(Boolean).join("\n\n")
    }];
    if (image) {
      parts.push({ inlineData: { mimeType: image.mimeType, data: image.data } });
    }

    const upstream = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: { temperature: 0.25, maxOutputTokens: 1800 }
      })
    });

    const payload = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const message = payload?.error?.message || "Поставщик ИИ отклонил запрос.";
      const status = upstream.status === 429 ? 429 : upstream.status === 400 ? 400 : 502;
      return res.status(status).json({ error: status === 429 ? "Лимит запросов Gemini исчерпан. Попробуй позже." : message.slice(0, 350) });
    }

    const answer = (payload.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("\n").trim();
    if (!answer) return res.status(502).json({ error: "ИИ не смог сформировать ответ. Попробуй другое фото или текст." });
    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(500).json({ error: "Внутренняя ошибка сервера. Попробуй позже." });
  }
}
