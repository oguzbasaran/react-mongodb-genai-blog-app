import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts';

export const getPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPost = async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
};
