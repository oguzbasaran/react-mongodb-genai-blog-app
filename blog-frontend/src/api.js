// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts';
const AI_API_URL = 'http://localhost:5000/api/generate/generate-ai-content';

export const getPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPost = async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
};

export const generateAIContent = async () => {
    const response = await axios.post(AI_API_URL);
    return response.data;
};
