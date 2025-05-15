// frontend/src/types/index.ts
export interface Chat {
  tags: never[];
  author: any;
  likes: number;
  description: String;
  views: number;
  id: number;
  title: string;
  model_type: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

export interface Message {
  timestamp: string | number | Date;
  id: number;
  chat_id: number;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
  updated_at: string;
}