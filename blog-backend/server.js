// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Router'ları içe aktarın
import postsRouter from './routes/posts.js';
import generateRouter from './routes/generate.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // React uygulamanızın adresi
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express.json());

// API Rotalarını kullanın
app.use('/api/posts', postsRouter);
app.use('/api/generate', generateRouter);

// Mongoose Debug Modunu Etkinleştir (Opsiyonel)
mongoose.set('debug', true);

// Bağlantı URI'sını Loglama (Şifre Hariç) - Güvenlik için Şifreyi Gizleyin
const uriParts = process.env.MONGODB_URI.split(':');
const uriWithoutPassword = `${uriParts[0]}:${uriParts[1]}:******@${uriParts[3]}`;
console.log('MongoDB Bağlantı URI\'sı:', uriWithoutPassword);

// Mongoose Bağlantısı
mongoose.connect(process.env.MONGODB_URI, {
  tls: true,
  tlsAllowInvalidCertificates: false, // Geliştirme için gerekirse true yapabilirsiniz, ancak üretimde false olmalıdır
  serverSelectionTimeoutMS: 30000, // 30 saniye
  socketTimeoutMS: 45000, // 45 saniye
  family: 4 // IPv4 kullanımı zorunlu kılınır
})
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
    app.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda çalışıyor`);
    });
  })
  .catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
    console.error('Hata Detayı:', err.stack);
  });

// Mongoose Bağlantı Olaylarını Dinleme
const db = mongoose.connection;

db.on('connecting', () => {
  console.log('Mongoose: Bağlantı kurmaya çalışılıyor...');
});

db.on('connected', () => {
  console.log('Mongoose: Bağlantı başarılı');
});

db.on('disconnecting', () => {
  console.log('Mongoose: Bağlantı kesilmeye çalışılıyor...');
});

db.on('disconnected', () => {
  console.log('Mongoose: Bağlantı kesildi');
});

db.on('reconnected', () => {
  console.log('Mongoose: Tekrar bağlantı kuruldu');
});

db.on('error', (error) => {
  console.error('Mongoose: Bağlantı hatası:', error);
});

// Uygulama Kapatıldığında Bağlantıyı Kapatma
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose bağlantısı kapatıldı');
  process.exit(0);
});
