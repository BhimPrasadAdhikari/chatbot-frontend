"use client"

import React, { useState } from 'react';
import { ArrowLeftIcon, PlusIcon, TrashIcon, SearchIcon } from './Icons';
import type { Conversation } from '../../types/chatbot'; // You'll need to define this type

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id:string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(convo => 
    convo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent the conversation from being selected when deleting
    if (window.confirm('Are you sure you want to delete this conversation?')) {
        onDeleteConversation(id);
    }
  };

  return (
    <div className="w-80 bg-gray-800 text-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 hover:text-green-400">
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </a>
      </div>
      
      {/* New Chat & Search */}
      <div className="p-4 space-y-4">
        <button 
          onClick={onNewConversation}
          className="w-full bg-green-600 hover:bg-green-700 rounded-lg p-2 flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-6 h-6" />
          <span>New Chat</span>
        </button>
        <div className="relative">
            <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 rounded-lg p-2 pl-10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
      </div>
      
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        <nav className="flex flex-col p-2 space-y-1">
          {filteredConversations.map((convo) => (
            <div 
              key={convo.id} 
              onClick={() => onSelectConversation(convo.id)}
              className={`group flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer ${
                activeConversationId === convo.id 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="truncate flex-1 pr-2">{convo.title}</span>
              <button 
                onClick={(e) => handleDelete(e, convo.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1"
                aria-label="Delete conversation"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};