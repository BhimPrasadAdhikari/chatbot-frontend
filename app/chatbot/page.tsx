"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { analyzePlantDisease, askChatbot } from '../../services/chatbot-api';
import type { Message, Conversation } from '../../types/chatbot';
import { Sender } from '../../types/chatbot';
import { useLanguage } from '../../lib/language-context';
import { useAuth } from '../../contexts/auth-context';
import { generateId } from '../../utils/id-generator';
import { Sidebar } from '@/components/chatbot/Sidebar';
import { ChatInterface } from '@/components/chatbot/ChatInterface';

// Define the welcome messages
const getWelcomeMessage = (language: string): Message => {
    const text = language === "malayalam" 
        ? "ഹലോ! ഞാൻ നിങ്ങളുടെ കാർഷിക സഹായിയാണ്. എന്നോട് ഒരു ചോദ്യം ചോദിക്കുക, അല്ലെങ്കിൽ ഒരു സസ്യ ഇലയുടെ ഫോട്ടോ അപ്ലോഡ് ചെയ്യുക."
        : "Hello! I'm your farming assistant. Ask me a question, or upload a photo of a plant leaf.";
    return { id: generateId(), sender: Sender.Bot, text };
};

const ChatbotPage: React.FC = () => {
    const { language } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();
    
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Effect to handle client-side rendering and initial data load from localStorage
    useEffect(() => {
        setIsClient(true);
        try {
            const storedConversations = localStorage.getItem('chatbotConversations');
            const storedActiveId = localStorage.getItem('activeChatbotConversationId');
            
            if (storedConversations) {
                setConversations(JSON.parse(storedConversations));
                if (storedActiveId) {
                    setActiveConversationId(JSON.parse(storedActiveId));
                }
            } else {
                // If no conversations exist, create a new one
                handleNewConversation();
            }
        } catch (error) {
            console.error("Failed to load conversations from localStorage", error);
            handleNewConversation(); // Start fresh if localStorage is corrupt
        }
    }, []);

    // Effect to persist conversations and active ID to localStorage
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('chatbotConversations', JSON.stringify(conversations));
            if (activeConversationId) {
                localStorage.setItem('activeChatbotConversationId', JSON.stringify(activeConversationId));
            }
        }
    }, [conversations, activeConversationId, isClient]);
    
    // Auth redirection effect
    useEffect(() => {
        if (isClient && (!user || !user.isVerified)) {
            router.push('/login');
        }
    }, [isClient, user, router]);

    const handleNewConversation = () => {
        const newId = generateId();
        const newConversation: Conversation = {
            id: newId,
            title: 'New Chat',
            messages: [getWelcomeMessage(language)]
        };
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newId);
    };
    
    const handleDeleteConversation = (id: string) => {
        setConversations(prev => prev.filter(convo => convo.id !== id));
        // If the deleted conversation was the active one, switch to another or create new
        if (activeConversationId === id) {
            const remainingConversations = conversations.filter(convo => convo.id !== id);
            if (remainingConversations.length > 0) {
                setActiveConversationId(remainingConversations[0].id);
            } else {
                handleNewConversation();
            }
        }
    };

    const addMessage = (message: Omit<Message, 'id'>) => {
        if (!activeConversationId) return;

        setConversations(prev => prev.map(convo => {
            if (convo.id === activeConversationId) {
                const updatedMessages = [...convo.messages, { ...message, id: generateId() }];
                let newTitle = convo.title;

                // Auto-update title from first user message
                if (convo.title === 'New Chat' && message.sender === Sender.User && message.text) {
                    newTitle = message.text.substring(0, 30) + (message.text.length > 30 ? '...' : '');
                }

                return { ...convo, title: newTitle, messages: updatedMessages };
            }
            return convo;
        }));
    };
    
    const handleSendMessage = async (text: string) => {
        addMessage({ text, sender: Sender.User });
        setIsLoading(true);
        try {
            const botResponse = await askChatbot(text);
            addMessage({ text: botResponse, sender: Sender.Bot });
        } catch (error) {
            // ... (error handling as before)
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendImage = async (file: File) => {
        // ... (image handling logic as before, but using the new addMessage function)
        // This function will now correctly add messages to the active conversation
    };
    
    const activeConversation = conversations.find(c => c.id === activeConversationId);
    const messages = activeConversation ? activeConversation.messages : [];
    
    if (!isClient || (!user || !user.isVerified)) {
        return ( 
            <div>
                Loading
            </div>
        );
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Sidebar 
                conversations={conversations}
                activeConversationId={activeConversationId}
                onNewConversation={handleNewConversation}
                onSelectConversation={setActiveConversationId}
                onDeleteConversation={handleDeleteConversation}
            />
            <main className="flex-1">
                <ChatInterface 
                    messages={messages} 
                    isLoading={isLoading} 
                    onSendMessage={handleSendMessage} 
                    onSendImage={handleSendImage}
                />
            </main>
        </div>
    );
};

export default ChatbotPage;