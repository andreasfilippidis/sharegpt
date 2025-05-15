import axios from 'axios';
import { Chat } from '../types';

const API_URL = 'http://localhost:8000/api';

export const fetchChats = async (): Promise<Chat[]> => {
  const response = await axios.get(`${API_URL}/chats`);
  return response.data;
};

export const fetchChatById = async (id: string): Promise<Chat> => {
  const response = await axios.get(`${API_URL}/chats/${id}`);
  return response.data;
};