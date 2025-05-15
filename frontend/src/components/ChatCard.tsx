import React from 'react';
import { Chat } from '../types';
import ModelBadge from './ModelBadge';
import './ChatCard.css';

interface ChatCardProps {
    chat: Chat;
}

const ChatCard: React.FC<ChatCardProps> = ({ chat }) => {
    // Extract first name initial for avatar
    const getInitial = () => {
        return chat.author?.name ? chat.author.name.charAt(0).toUpperCase() : 'U';
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    // Get sample message preview
    const getMessagePreview = () => {
        if (chat.messages && chat.messages.length > 0) {
            const message = chat.messages[0];
            return message.content.substring(0, 150) + (message.content.length > 150 ? '...' : '');
        }
        return "No messages in this conversation yet.";
    };

    // Get tags
    const getTags = () => {
        return chat.tags || [];
    };

    return (
        <div className="chat-card">
            <div className="chat-card-action">
                <button className="chat-card-menu-button">
                    <svg className="chat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </button>
            </div>

            <div className="chat-card-header">
                <div className="chat-card-title-area">
                    <h2 className="chat-card-title">{chat.title}</h2>
                    <div className="chat-card-subtitle">
                        <div className="chat-card-avatar">{getInitial()}</div>
                        <span>{chat.author?.name || 'Unknown user'}</span>
                    </div>
                </div>
                <ModelBadge model={chat.model_type || 'unknown'} size="sm" />
            </div>

            <div className="chat-card-content">
                <p className="chat-card-description">{chat.description}</p>

                {/* Message preview */}
                <div className="chat-card-preview">
                    {getMessagePreview()}
                </div>

                {/* Tags */}
                {getTags().length > 0 && (
                    <div className="chat-card-tags">
                        {getTags().map((tag, index) => (
                            <span key={index} className="chat-card-tag">{tag}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className="chat-card-footer">
                <div className="chat-card-date">
                    <svg className="chat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(chat.created_at)}
                </div>

                <div className="chat-card-badges">
                    <div className="chat-card-badge">
                        <svg className="chat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        {chat.messages?.length || 0}
                    </div>

                    <div className="chat-card-badge">
                        <svg className="chat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {chat.views}
                    </div>

                    <div className="chat-card-badge">
                        <svg className="chat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {chat.likes}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatCard;