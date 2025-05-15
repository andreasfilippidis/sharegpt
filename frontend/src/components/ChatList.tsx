import React from 'react';
import { Link } from 'react-router-dom';
import ChatCard from './ChatCard';
import { Chat } from '../types';

interface ChatListProps {
  chats: Chat[];
}

const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  if (chats.length === 0) {
    return <div className="text-center p-10">No chats available yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chats.map((chat) => (
        <Link key={chat.id} to={`/chat/${chat.id}`}>
          <ChatCard chat={chat} />
        </Link>
      ))}
    </div>
  );
};

export default ChatList;