"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatWindow } from '../../components/chatbot/ChatWindow';
import { InputBar } from '../../components/chatbot/InputBar';
import { analyzePlantDisease, askChatbot } from '../../services/chatbot-api';
import type { Message } from '../../types/chatbot';
import { Sender } from '../../types/chatbot';
import { useLanguage } from '../../lib/language-context';
import { useAuth } from '../../contexts/auth-context';
import { generateId } from '../../utils/id-generator';

const ChatbotPage: React.FC = () => {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Redirect to login if user is not authenticated
    useEffect(() => {
        if (isClient && (!user || !user.isVerified)) {
            router.push('/login');
        }
    }, [isClient, user, router]);

    useEffect(() => {
        // Only set welcome message on client side to avoid hydration mismatch
        if (isClient && messages.length === 0) {
            const welcomeMessage = language === "malayalam" 
                ? "ഹലോ! ഞാൻ നിങ്ങളുടെ കാർഷിക സഹായിയാണ്. എന്നോട് ഒരു ചോദ്യം ചോദിക്കുക, അല്ലെങ്കിൽ റസ്റ്റ്, പൗഡറി, അല്ലെങ്കിൽ ആരോഗ്യകരമായ രോഗങ്ങൾ പരിശോധിക്കാൻ ഒരു സസ്യ ഇലയുടെ ഫോട്ടോ അപ്ലോഡ് ചെയ്യുക."
                : "Hello! I'm your farming assistant. Ask me a question, or upload a photo of a plant leaf to check for diseases like Rust, Powdery, or Healthy.";
            
            setMessages([
                {
                    id: generateId(),
                    sender: Sender.Bot,
                    text: welcomeMessage,
                }
            ]);
        }
    }, [language, messages.length, isClient]);

    const addMessage = (message: Omit<Message, 'id'>) => {
        setMessages(prev => [...prev, { ...message, id: generateId() }]);
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

    const handleSendImage = async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const imageUrl = e.target?.result as string;
            const analyzingMessage = language === "malayalam" 
                ? "നിങ്ങളുടെ സസ്യ ചിത്രം വിശകലനം ചെയ്യുന്നു..."
                : "Analyzing your plant image...";
            addMessage({ text: analyzingMessage, sender: Sender.User, image: imageUrl });
            setIsLoading(true);

            try {
                const analysis = await analyzePlantDisease(file);
                const analysisMessage = language === "malayalam" 
                    ? "നിങ്ങളുടെ സസ്യ ചിത്രത്തിന്റെ വിശകലനം ഇതാ."
                    : "Here is the analysis of your plant image.";
                addMessage({
                    text: analysisMessage,
                    sender: Sender.System,
                    analysis: analysis
                });
                
                // Follow-up question
                const followUpQuestion = language === "malayalam"
                    ? `${analysis.prediction} രോഗത്തിനുള്ള പ്രതിരോധവും ചികിത്സാ നിർദ്ദേശങ്ങളും എന്താണ്? ഇത് ആരോഗ്യകരമാണെങ്കിൽ, അത് അങ്ങനെ നിലനിർത്താൻ ചില പൊതുവായ നുറുങ്ങുകൾ എന്താണ്?`
                    : `What are the prevention and treatment suggestions for ${analysis.prediction} disease? If it's healthy, what are some general tips to keep it that way?`;
                const botResponse = await askChatbot(followUpQuestion);
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

    const pageTitle = language === "malayalam" ? "കൃഷിസാഥി ചാറ്റ്ബോട്ട്" : "Krishi-Sathi Chatbot";
    const pageSubtitle = language === "malayalam" ? "നിങ്ങളുടെ AI-ചാലിത കാർഷിക സഹായി" : "Your AI-powered agricultural assistant";

    // Show loading state until client is ready to prevent hydration mismatch
    if (!isClient) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading chatbot...</p>
                </div>
            </div>
        );
    }

    // Show loading state if user is not authenticated
    if (!user || !user.isVerified) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden font-sans">
                <header className="bg-green-700 text-white p-4 text-center shadow-md">
                    <h1 className="text-2xl font-bold tracking-wide">{pageTitle}</h1>
                    <p className="text-sm text-green-200">{pageSubtitle}</p>
                </header>
                <ChatWindow messages={messages} isLoading={isLoading} />
                <InputBar onSendMessage={handleSendMessage} onSendImage={handleSendImage} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default ChatbotPage;
