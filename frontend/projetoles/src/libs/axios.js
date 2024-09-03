import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.baseUrl || "http://localhost:3001",
  headers: {
    'Content-Type': 'application/json'
  }
}); 