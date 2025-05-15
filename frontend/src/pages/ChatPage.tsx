import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ChatPage.css';
import { Chat } from '../types';

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const url = `${baseUrl}/api/chats/${id}`;

        const response = await axios.get(url);
        setChat(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching chat:', err);
        setError('Failed to load the chat. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [id]);

  useEffect(() => {
    // Scroll to bottom when chat is loaded or updated
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading conversation...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="error-container">
          <div className="error-icon">!</div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <Link to="/chats" className="back-button">
            Back to Conversations
          </Link>
        </div>
    );
  }

  return (
      <div className="chat-page">
        <div className="chat-header">
          <Link to="/chats" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back</span>
          </Link>
          <div className="chat-info">
            <h1>{chat?.title || 'Conversation'}</h1>
            <p className="chat-date">{chat?.created_at ? `Started on ${new Date(chat.created_at).toLocaleDateString()}` : ''}</p>
          </div>
          <div className="chat-actions">
            <button className="icon-button" aria-label="Share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37064L8.08259 9.73762C7.54303 9.2724 6.8089 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.8089 15 7.54303 14.7276 8.08259 14.2624L15.0227 18.6294C15.0077 18.7508 15 18.8745 15 19C15 20.6569 16.3431 22 18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C17.1911 16 16.457 16.2724 15.9174 16.7376L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 7.26238C16.457 7.7276 17.1911 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="icon-button" aria-label="More options">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="chat-container" ref={chatContainerRef}>
          {chat?.messages && chat.messages.length > 0 ? (
              chat.messages.map((message, index) => (
                  <div
                      key={message.id || index}
                      className={`message-wrapper ${message.role === 'user' ? 'user-message-wrapper' : 'assistant-message-wrapper'}`}
                  >
                    <div className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                      <div className="message-content">{message.content}</div>
                      <div className="message-timestamp">
                        {formatDate(message.created_at)}
                      </div>
                    </div>
                  </div>
              ))
          ) : (
              <div className="empty-chat">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>No messages in this conversation yet.</p>
              </div>
          )}
        </div>

        <div className="chat-input-area">
        <textarea
            placeholder="Type your message..."
            className="chat-input"
            rows={1}
        />
          <button className="send-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
  );
};

export default ChatPage;