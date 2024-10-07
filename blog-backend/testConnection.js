// testConnection.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

// Mongoose Debug Modunu Etkinleştir
mongoose.set('debug', true);

mongoose.connect(uri, {
  tls: true,
  tlsAllowInvalidCertificates: false,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4
})
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
  });
