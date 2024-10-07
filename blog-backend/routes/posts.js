// routes/posts.js
import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// GET tüm yazıları al
router.get('/', async (req, res) => {
    try {
        // Hem createdAt hem de _id alanına göre sıralama
        const posts = await Post.find().sort({ createdAt: -1, _id: -1 }); // Yeni yazılar önce gelsin
        res.json(posts);
    } catch (err) {
        console.error('GET /api/posts Hatası:', err);
        res.status(500).json({ message: err.message });
    }
});

// POST yeni bir yazı oluştur
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error('POST /api/posts Hatası:', err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE bir yazıyı sil
router.delete('/:id', async (req, res) => {
    const postId = req.params.id;
    console.log(`Silme isteği alındı. Yazı ID: ${postId}`);

    try {
        // ID'nin geçerli bir MongoDB ObjectId olup olmadığını kontrol et
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
            console.error(`Geçersiz yazı ID'si: ${postId}`);
            return res.status(400).json({ message: 'Geçersiz yazı ID\'si.' });
        }

        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            console.error(`Yazı bulunamadı. ID: ${postId}`);
            return res.status(404).json({ message: 'Yazı bulunamadı.' });
        }

        console.log(`Yazı başarıyla silindi. ID: ${postId}`);
        res.json({ message: 'Yazı başarıyla silindi.' });
    } catch (err) {
        console.error(`Yazı silinirken hata oluştu. ID: ${postId}`, err);
        res.status(500).json({ message: 'Yazı silinirken bir hata oluştu.' });
    }
});

export default router;
