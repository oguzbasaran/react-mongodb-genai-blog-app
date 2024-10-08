// src/components/PostList.js
import React, { useState } from 'react';
import { deletePost } from '../api';
import { toast } from 'react-toastify';

const PostList = ({ posts, onPostDeleted }) => {
    const [deletingId, setDeletingId] = useState(null); // Track which post is being deleted

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            console.log(`Starting deletion. Post ID: ${id}`);
            setDeletingId(id);
            try {
                const response = await deletePost(id);
                console.log(`Deletion successful. Response:`, response);
                onPostDeleted(id);
            } catch (error) {
                console.error('Error deleting post:', error);
                if (error.response) {
                    // Error from backend
                    console.error('Backend error:', error.response.data);
                    toast.error(`Deletion error: ${error.response.data.message}`);
                } else if (error.request) {
                    // Request was made but no response
                    console.error('No response received:', error.request);
                    toast.error('No response from server during deletion.');
                } else {
                    // Other errors
                    console.error('Other error:', error.message);
                    toast.error('An error occurred during deletion.');
                }
            }
            setDeletingId(null);
        }
    };

    return (
        <div>
            <h2>Blog Posts</h2>
            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} className="neumorphic-card">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>Creation Date: {new Date(post.createdAt).toLocaleString()}</small>
                        <br />
                        <button
                            onClick={() => handleDelete(post._id)}
                            disabled={deletingId === post._id}
                            className="neumorphic-button"
                            style={{ marginTop: '20px' }}
                        >
                            {deletingId === post._id ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default PostList;
