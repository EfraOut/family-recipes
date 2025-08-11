import axios from 'axios';

const baseURL = "https://family-recipes-l6xk.onrender.com/api" || 'http://localhost:5000/api';
export const api = axios.create({baseURL});