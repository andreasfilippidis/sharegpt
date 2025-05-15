import React from 'react';
import { Message } from '../types';

interface ConversationBubbleProps {
  message: Message;
}

const ConversationBubble: React.FC<ConversationBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] md:max-w-[70%] p-4 rounded-lg ${
          isUser 
            ? 'bg-blue-100 text-blue-900' 
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="font-semibold mb-1">
          {isUser ? 'User' : 'AI Assistant'}
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div className="text-xs text-gray-500 mt-2 text-right">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ConversationBubble;