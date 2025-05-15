import React, { useEffect, useState } from 'react';
import ChatList from '../components/ChatList';
import DarkModeToggle from '../components/DarkModeToggle';
import { Chat } from '../types';
import { fetchChats } from '../services/api';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
      } catch (err) {
        setError('Failed to load chats. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, []);

  if (loading) return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
  );

  if (error) return (
      <div className="error-container">
        <div className="error-message">
          <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      </div>
  );

  return (
      <div className="home-container">
        <header className="home-header">
          <div className="header-container">
            <div>
              <h1 className="site-title">ShareGPT</h1>
              <p className="site-description">Share and discover AI conversations</p>
            </div>
            <div className="header-actions">
              <DarkModeToggle />
              <button className="create-button">Create New Chat</button>
            </div>
          </div>
        </header>

        <main className="main-content fade-in">
          <div className="intro-panel">
            <h2 className="intro-title">Discover AI Conversations</h2>
            <p className="intro-text">
              Browse and explore interesting conversations with ChatGPT, Claude, DeepSeek and other AI models.
              Learn from others' prompts and see how different models respond to the same questions.
            </p>
          </div>

          <ChatList chats={chats} />
        </main>
      </div>
  );
};

export default HomePage;