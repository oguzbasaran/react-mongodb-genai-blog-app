// src/App.js
import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import { getPosts } from './api';
import './App.css'; // CSS dosyanızı içe aktarın (Opsiyonel)
import { ToastContainer, toast } from 'react-toastify'; // react-toastify'i içe aktarın
import 'react-toastify/dist/ReactToastify.css'; // react-toastify CSS'ini içe aktarın

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await getPosts();
            // Verileri createdAt alanına göre azalan sırada sıralayın
            const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(sortedData);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Error fetching posts.');
        }
    };

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]); // Yeni yazıyı listenin başına ekleyin
        toast.success('New post added successfully.');
    };

    const removePost = (id) => {
        setPosts(posts.filter(post => post._id !== id));
        toast.success('Post deleted successfully.');
    };

    return (
        <div className="container">
            <h1>Blog Writing Site</h1>
            <CreatePost onPostCreated={addPost} />
            <hr />
            <PostList posts={posts} onPostDeleted={removePost} />
            <ToastContainer /> {/* Sadece burada bir kez ekleyin */}
        </div>
    );
};

export default App;
