// src/components/CreatePost.js
import React, { useState } from 'react';
import { createPost, generateAIContent } from '../api';
import { toast } from 'react-toastify'; // react-toastify'i içe aktarın

const CreatePost = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // AI ile İçerik Oluşturma Fonksiyonu
    const handleGenerateAIContent = async () => {
        setLoading(true);
        setError('');
        try {
            console.log('AI ile içerik oluşturma butonuna basıldı.');
            const aiData = await generateAIContent();
            console.log('AI tarafından oluşturulan veri:', aiData);
            setTitle(aiData.title);
            setContent(aiData.content);
            toast.success('Content has been successfully created with AI.');
        } catch (err) {
            console.error('AI İçeriği Oluşturma Hatası:', err);
            setError('AI ile içerik oluşturulurken bir hata oluştu.');
            toast.error('An error occurred while generating content with AI.');
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Başlık ve içerik boş olamaz');
            return;
        }

        try {
            console.log('Yazı oluşturma işlemi başlatılıyor.');
            const newPost = await createPost({ title, content });
            console.log('Yeni yazı oluşturuldu:', newPost);
            onPostCreated(newPost);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Yazı oluşturulurken hata oluştu:', error);
            alert('Yazı oluşturulurken bir hata oluştu.');
            toast.error('Yazı oluşturulurken bir hata oluştu.');
        }
    };

    return (
        <div className="neumorphic-card">
            <h2>Create New Post</h2>
            <button
                onClick={handleGenerateAIContent}
                disabled={loading}
                className="neumorphic-button"
                style={{ width: '100%', marginBottom: '20px' }}
            >
                {loading ? 'Creating...' : 'Generate Content with AI'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="neumorphic-input"
                        placeholder="Enter title"
                    />
                </div>
                <div>
                    <label>Content:</label><br />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        className="neumorphic-textarea"
                        placeholder="Enter content"
                    ></textarea>
                </div>
                <button type="submit" className="neumorphic-button" style={{ width: '100%' }}>
                    Save Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
