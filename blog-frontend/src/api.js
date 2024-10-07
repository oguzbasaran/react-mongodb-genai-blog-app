// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts';
const AI_API_URL = 'http://localhost:5000/api/generate/generate-ai-content';

// Tüm yazıları al
export const getPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Yeni bir yazı oluştur
export const createPost = async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
};

// AI ile içerik oluştur
export const generateAIContent = async () => {
    const response = await axios.post(AI_API_URL);
    return response.data;
};

// Yazı sil
export const deletePost = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
