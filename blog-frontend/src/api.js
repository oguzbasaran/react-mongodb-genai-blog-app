import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts';
const AI_API_URL = 'http://localhost:5000/api/generate/generate-ai-content';

// Get all posts
export const getPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Create a new post
export const createPost = async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
};

// Generate content with AI
export const generateAIContent = async () => {
    const response = await axios.post(AI_API_URL);
    return response.data;
};

// Delete a post
export const deletePost = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
