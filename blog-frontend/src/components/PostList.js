// src/components/PostList.js
import React from 'react';

const PostList = ({ posts }) => {
    return (
        <div>
            <h2>Blog Yazıları</h2>
            {posts.map(post => (
                <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <small>Oluşturulma Tarihi: {new Date(post.createdAt).toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
};

export default PostList;
