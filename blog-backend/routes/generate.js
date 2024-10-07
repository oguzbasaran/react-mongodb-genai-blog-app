// routes/generate.js
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// OpenAI Konfigürasyonu
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI İçeriği Oluşturma Route'u
router.post('/generate-ai-content', async (req, res) => {
  try {
    const prompt = "Generate a blog post title and content about technology advancements in 2024.";

    const response = await openai.completions.create({
      model: "gpt-4o-mini", // Veya kullanmak istediğiniz başka bir model
      prompt: prompt,
      max_tokens: 500,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const aiText = response.choices[0].text.trim();

    // Metni başlık ve içerik olarak ayırma (Basit bir örnek)
    const lines = aiText.split('\n').filter(line => line.trim() !== '');
    const title = lines[0];
    const content = lines.slice(1).join('\n');

    res.json({ title, content });
  } catch (error) {
    console.error('AI İçeriği Oluşturma Hatası:', error);
    res.status(500).json({ error: 'AI içerik oluşturma sırasında bir hata oluştu.' });
  }
});

export default router;
