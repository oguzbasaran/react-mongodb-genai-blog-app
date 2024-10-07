// routes/generate.js
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// OpenAI Konfigürasyonu
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env dosyanızda OPENAI_API_KEY tanımlı olmalı
  // Eğer özel bir API sürümü kullanıyorsanız, burada belirtebilirsiniz
  // apiVersion: '2023-03-15', // Örneğin
});

// AI İçeriği Oluşturma Route'u
router.post('/generate-ai-content', async (req, res) => {
  console.log('AI İçeriği Oluşturma İsteği Alındı.');

  try {
    const prompt = "Generate a blog post title and content about technology advancements in 2024.";
    console.log('Kullanılan prompt:', prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Kullanmak istediğiniz chat modeli
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    console.log('OpenAI API yanıtı alındı:', response);

    if (!response || !response.choices || response.choices.length === 0) {
      console.error('OpenAI API yanıtı beklendiği gibi değil:', response);
      return res.status(500).json({ message: 'OpenAI API yanıtı beklendiği gibi değil.' });
    }

    const aiMessage = response.choices[0].message;
    if (!aiMessage || !aiMessage.content) {
      console.error('AI yanıtında beklenen içerik bulunamadı:', aiMessage);
      return res.status(500).json({ message: 'AI yanıtında beklenen içerik bulunamadı.' });
    }

    const aiText = aiMessage.content.trim();
    console.log('AI tarafından oluşturulan metin:', aiText);

    // Metni başlık ve içerik olarak ayırma (Basit bir örnek)
    const lines = aiText.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) {
      console.error('AI tarafından oluşturulan metin beklenen formatta değil:', aiText);
      return res.status(500).json({ message: 'AI tarafından oluşturulan metin beklenen formatta değil.' });
    }

    const title = lines[0];
    const content = lines.slice(1).join('\n');
    console.log('Başlık:', title);
    console.log('İçerik:', content);

    res.json({ title, content });
  } catch (error) {
    console.error('AI İçeriği Oluşturma Hatası:', error);

    // Daha detaylı hata bilgisi döndürme
    if (error.response) {
      // OpenAI API'den gelen hata
      console.error('OpenAI API hatası:', error.response.data);
      res.status(error.response.status).json({
        message: error.response.data.message || 'OpenAI API hatası.',
        code: error.response.data.code || 'unknown_error',
        type: error.response.data.type || 'unknown',
      });
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      console.error('OpenAI API\'ye istek yapıldı ama yanıt alınamadı:', error.request);
      res.status(500).json({ message: 'OpenAI API\'ye istek yapıldı ama yanıt alınamadı.' });
    } else {
      // Diğer hatalar
      console.error('Diğer hata:', error.message);
      res.status(500).json({ message: 'AI ile içerik oluşturulurken bir hata oluştu.' });
    }
  }
});

export default router;
