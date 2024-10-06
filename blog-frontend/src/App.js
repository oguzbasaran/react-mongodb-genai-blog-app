// src/App.js
import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import { getPosts } from './api';

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (error) {
            console.error('Yazılar alınırken hata oluştu:', error);
        }
    };

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Blog Yazma Sitesi</h1>
            <CreatePost onPostCreated={addPost} />
            <hr />
            <PostList posts={posts} />
        </div>
    );
};

export default App;
