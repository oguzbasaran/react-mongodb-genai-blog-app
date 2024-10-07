// src/components/PostList.js
import React, { useState } from 'react';
import { deletePost } from '../api';
import { toast } from 'react-toastify'; // react-toastify'i içe aktarın

const PostList = ({ posts, onPostDeleted }) => {
    const [deletingId, setDeletingId] = useState(null); // Silme işlemi sırasında hangi yazının silindiğini takip etmek için

    const handleDelete = async (id) => {
        if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
            console.log(`Silme işlemi başlatılıyor. Yazı ID: ${id}`);
            setDeletingId(id);
            try {
                const response = await deletePost(id);
                console.log(`Silme işlemi başarılı. Yanıt:`, response);
                onPostDeleted(id);
                toast.success('Yazı başarıyla silindi.');
            } catch (error) {
                console.error('Yazı silinirken hata oluştu:', error);
                if (error.response) {
                    // Backend'den gelen hata
                    console.error('Backend hatası:', error.response.data);
                    toast.error(`Silme hatası: ${error.response.data.message}`);
                } else if (error.request) {
                    // İstek yapıldı ama yanıt alınamadı
                    console.error('İstek yapıldı ama yanıt alınamadı:', error.request);
                    toast.error('Silme işlemi sırasında sunucudan yanıt alınamadı.');
                } else {
                    // Diğer hatalar
                    console.error('Diğer hata:', error.message);
                    toast.error('Silme işlemi sırasında bir hata oluştu.');
                }
            }
            setDeletingId(null);
        }
    };

    return (
        <div>
            <h2>Blog Yazıları</h2>
            {posts.length === 0 ? (
                <p>Henüz hiç yazı yok.</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>Oluşturulma Tarihi: {new Date(post.createdAt).toLocaleString()}</small>
                        <br />
                        <button
                            onClick={() => handleDelete(post._id)}
                            disabled={deletingId === post._id}
                            style={{
                                marginTop: '10px',
                                padding: '5px 10px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            {deletingId === post._id ? 'Siliniyor...' : 'Sil'}
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default PostList;
