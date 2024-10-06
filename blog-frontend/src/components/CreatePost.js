// src/components/CreatePost.js
import React, { useState } from 'react';
import { createPost } from '../api';

const CreatePost = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Başlık ve içerik boş olamaz');
            return;
        }

        try {
            const newPost = await createPost({ title, content });
            onPostCreated(newPost);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Yazı oluşturulurken hata oluştu:', error);
        }
    };

    return (
        <div>
            <h2>Yeni Yazı Oluştur</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Başlık:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div>
                    <label>İçerik:</label><br />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="5"
                        style={{ width: '100%', padding: '8px' }}
                    ></textarea>
                </div>
                <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Yazıyı Ekle</button>
            </form>
        </div>
    );
};

export default CreatePost;
