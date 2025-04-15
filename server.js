const express = require('express');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let botEnabled = true;

app.use(express.static('public'));
app.use(express.json());

// 🟢 Админ-панель
app.post('/admin/toggle', (req, res) => {
  const { enable } = req.body;
  botEnabled = !!enable;
  res.json({ status: botEnabled ? "GPT включен" : "GPT отключен" });
});

// 🟢 Основной GPT-запрос
app.post('/ask', async (req, res) => {
  if (!botEnabled) {
    return res.json({ answer: "❌ Бот сейчас отключен через админ-панель." });
  }

  try {
    const { prompt } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Сервер запущен: http://localhost:${port}`);
});

