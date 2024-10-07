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
            toast.success('AI ile içerik başarıyla oluşturuldu.');
        } catch (err) {
            console.error('AI İçeriği Oluşturma Hatası:', err);
            setError('AI ile içerik oluşturulurken bir hata oluştu.');
            toast.error('AI ile içerik oluşturulurken bir hata oluştu.');
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
            toast.success('Yazı başarıyla oluşturuldu.');
        } catch (error) {
            console.error('Yazı oluşturulurken hata oluştu:', error);
            alert('Yazı oluşturulurken bir hata oluştu.');
            toast.error('Yazı oluşturulurken bir hata oluştu.');
        }
    };

    return (
        <div>
            <h2>Yeni Yazı Oluştur</h2>
            <button
                onClick={handleGenerateAIContent}
                disabled={loading}
                style={{ padding: '10px 20px', marginBottom: '10px' }}
            >
                {loading ? 'Yükleniyor...' : 'AI ile İçeriği Oluştur'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Başlık:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>İçerik:</label><br />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    ></textarea>
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>Yazıyı Kaydet</button>
            </form>
        </div>
    );
};

export default CreatePost;
