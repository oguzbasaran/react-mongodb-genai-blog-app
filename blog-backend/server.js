// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const postsRouter = require('./routes/posts');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postsRouter);

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB bağlantısı başarılı');
    app.listen(PORT, () => {
        console.log(`Sunucu ${PORT} portunda çalışıyor`);
    });
})
.catch(err => {
    console.error('MongoDB bağlantı hatası:', err.message);
});
