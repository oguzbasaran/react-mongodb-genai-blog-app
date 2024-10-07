// routes/posts.js
import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // New posts first
        res.json(posts);
    } catch (err) {
        console.error('GET /api/posts Error:', err);
        res.status(500).json({ message: err.message });
    }
});

// POST create a new post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error('POST /api/posts Error:', err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
    const postId = req.params.id;
    console.log(`Delete request received. Post ID: ${postId}`);

    try {
        // Check if the ID is a valid MongoDB ObjectId
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
            console.error(`Invalid Post ID: ${postId}`);
            return res.status(400).json({ message: 'Invalid Post ID.' });
        }

        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            console.error(`Post not found. ID: ${postId}`);
            return res.status(404).json({ message: 'Post not found.' });
        }

        console.log(`Post successfully deleted. ID: ${postId}`);
        res.json({ message: 'Post successfully deleted.' });
    } catch (err) {
        console.error(`Error deleting post. ID: ${postId}`, err);
        res.status(500).json({ message: 'An error occurred while deleting the post.' });
    }
});

export default router;
