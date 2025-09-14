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
            
            const loadedConversations = storedConversations ? JSON.parse(storedConversations) : [];
            
            if (loadedConversations.length > 0) {
                setConversations(loadedConversations);
                if (storedActiveId) {
                    setActiveConversationId(JSON.parse(storedActiveId));
                } else {
                    setActiveConversationId(loadedConversations[0].id);
                }
            } else {
                // If no conversations exist, create a new one
                handleNewConversation();
            }
        } catch (error) {
            console.error("Failed to load conversations from localStorage", error);
            handleNewConversation(); // Start fresh if localStorage is corrupt
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const remainingConversations = conversations.filter(convo => convo.id !== id);
        setConversations(remainingConversations);
        
        if (activeConversationId === id) {
            if (remainingConversations.length > 0) {
                setActiveConversationId(remainingConversations[0].id);
            } else {
                handleNewConversation();
            }
        }
    };

    const addMessage = (message: Omit<Message, 'id'>) => {
        if (!activeConversationId) return;

        setConversations(prev => {
            const newConversations = prev.map(convo => {
                if (convo.id === activeConversationId) {
                    const updatedMessages = [...convo.messages, { ...message, id: generateId() }];
                    let newTitle = convo.title;

                    if (convo.title === 'New Chat' && message.sender === Sender.User && message.text) {
                        newTitle = message.text.substring(0, 30) + (message.text.length > 30 ? '...' : '');
                    } else if (convo.title === 'New Chat' && message.sender === Sender.User && message.image) {
                        newTitle = "Image Analysis";
                    }

                    return { ...convo, title: newTitle, messages: updatedMessages };
                }
                return convo;
            });
            return newConversations;
        });
    };
    
    const handleSendMessage = async (text: string) => {
        addMessage({ text, sender: Sender.User });
        setIsLoading(true);
        try {
            const botResponse = await askChatbot(text);
            addMessage({ text: botResponse, sender: Sender.Bot });
        } catch (error) {
            console.error(error);
            const errorMessage = language === "malayalam" 
                ? "ക്ഷമിക്കണം, എനിക്ക് ഒരു പിശക് നേരിട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക."
                : "Sorry, I encountered an error. Please try again.";
            addMessage({ text: errorMessage, sender: Sender.System });
        } finally {
            setIsLoading(false);
        }
    };

    // --- CORRECTED IMPLEMENTATION ---
    const handleSendImage = async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const imageUrl = e.target?.result as string;
            const analyzingMessage = language === "malayalam" 
                ? "നിങ്ങളുടെ സസ്യ ചിത്രം വിശകലനം ചെയ്യുന്നു..."
                : "Analyzing your plant image...";
            
            // Add the user's image message to the active conversation
            addMessage({ text: analyzingMessage, sender: Sender.User, image: imageUrl });
            setIsLoading(true);

            try {
                const analysis = await analyzePlantDisease(file);
                const analysisResultMessage = language === "malayalam" 
                    ? "നിങ്ങളുടെ സസ്യ ചിത്രത്തിന്റെ വിശകലനം ഇതാ."
                    : "Here is the analysis of your plant image.";
                
                // Add the system's analysis result message
                addMessage({
                    text: analysisResultMessage,
                    sender: Sender.System,
                    analysis: analysis
                });
                
                // Automatically ask a follow-up question
                const followUpQuestion = language === "malayalam"
                    ? `${analysis.prediction} രോഗത്തിനുള്ള പ്രതിരോധവും ചികിത്സാ നിർദ്ദേശങ്ങളും എന്താണ്? ഇത് ആരോഗ്യകരമാണെങ്കിൽ, അത് അങ്ങനെ നിലനിർത്താൻ ചില പൊതുവായ നുറുങ്ങുകൾ എന്താണ്?`
                    : `What are the prevention and treatment suggestions for ${analysis.prediction} disease? If it's healthy, what are some general tips to keep it that way?`;
                const botResponse = await askChatbot(followUpQuestion);

                // Add the bot's follow-up response
                addMessage({ text: botResponse, sender: Sender.Bot });

            } catch (error) {
                console.error(error);
                const errorMessage = language === "malayalam" 
                    ? "ക്ഷമിക്കണം, എനിക്ക് ചിത്രം വിശകലനം ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി ഒരു സസ്യ ഇലയുടെ വ്യക്തമായ ഫോട്ടോ ഉപയോഗിച്ച് വീണ്ടും ശ്രമിക്കുക."
                    : "Sorry, I couldn't analyze the image. Please try again with a clear photo of a plant leaf.";
                addMessage({ text: errorMessage, sender: Sender.System });
            } finally {
                setIsLoading(false);
            }
        };
        reader.readAsDataURL(file);
    };
    
    const activeConversation = conversations.find(c => c.id === activeConversationId);
    const messages = activeConversation ? activeConversation.messages : [];
    
    if (!isClient || (!user || !user.isVerified)) {
        return ( 
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
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