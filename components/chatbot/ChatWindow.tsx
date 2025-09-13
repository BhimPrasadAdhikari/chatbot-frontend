"use client"

import React, { useRef, useEffect } from 'react';
import type { Message } from '../../types/chatbot';
import { MessageComponent } from './Message';
import { BotIcon } from './Icons';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-start gap-3 my-4 flex-row">
        <div className="flex-shrink-0"><BotIcon /></div>
        <div className="max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <div className="flex items-center justify-center space-x-1 h-5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    </div>
);

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-green-50/50">
        {messages.map((msg) => (
            <MessageComponent key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};
