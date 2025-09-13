"use client"

import React from 'react';
import { ChatWindow } from './ChatWindow';
import { InputBar } from './InputBar';
import type { Message } from '../../types/chatbot';

// Define the props the component will accept
interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onSendImage: (file: File) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  isLoading, 
  onSendMessage, 
  onSendImage 
}) => {
  return (
    <div className="flex-1 flex flex-col h-screen bg-white dark:bg-gray-800">
      {/* Pass the props down to the child components */}
      <ChatWindow messages={messages} isLoading={isLoading} />
      <InputBar 
        onSendMessage={onSendMessage} 
        onSendImage={onSendImage} 
        isLoading={isLoading} 
      />
    </div>
  );
};