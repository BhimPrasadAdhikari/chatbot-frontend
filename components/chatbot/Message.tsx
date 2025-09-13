"use client"

import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import type { Message } from '../../types/chatbot';
import { Sender } from '../../types/chatbot';
import { BotIcon, UserIcon, SystemIcon } from './Icons';

const AnalysisResult: React.FC<{ analysis: Message['analysis'] }> = ({ analysis }) => {
    if (!analysis) return null;

    // Fix: Simplified the sort callback to avoid type inference issues.
    const sortedProbs = Object.entries(analysis.probabilities).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));

    return (
        <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-md text-gray-800 dark:text-gray-200">Disease Analysis Result</h4>
            <p className="mt-1">
                <span className="font-semibold">Prediction:</span>
                <span className="ml-2 font-mono px-2 py-1 bg-green-100 text-green-800 rounded">{analysis.prediction}</span>
            </p>
            <p className="mt-1">
                <span className="font-semibold">Confidence:</span>
                <span className="ml-2 font-mono px-2 py-1 bg-blue-100 text-blue-800 rounded">{analysis.confidence}</span>
            </p>
            <div className="mt-2 space-y-2">
                <h5 className="font-semibold text-sm">Probabilities:</h5>
                {sortedProbs.map(([name, value]) => (
                    <div key={name} className="flex items-center text-xs">
                        <span className="w-20 truncate">{name}</span>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mx-2">
                             <div
                                className="bg-green-600 h-4 rounded-full text-right pr-2 text-white font-medium"
                                style={{ width: value }}>
                             </div>
                        </div>
                        <span className="w-12 text-right font-mono">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === Sender.User;
    const isBot = message.sender === Sender.Bot;

    const bubbleClasses = isUser
        ? 'bg-blue-600 text-white'
        : (isBot ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm');

    // Sanitize and parse markdown for bot messages
    const createMarkup = () => {
        if (!message.text || !isBot) return { __html: '' };
        // Use the imported libraries
        const htmlContent = marked.parse(message.text) as string;
        const sanitizedHtml = DOMPurify.sanitize(htmlContent);
        return { __html: sanitizedHtml };
    };

    return (
        <div className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-md ${bubbleClasses}`}>
            {message.image && <img src={message.image} alt="Uploaded plant" className="rounded-lg mb-2 max-h-64 w-auto" />}
            
            {/* Render plain text for user/system, or markdown for bot */}
            {message.text && !isBot && <p className="text-base break-words whitespace-pre-wrap">{message.text}</p>}
            {message.text && isBot && <div className="prose" dangerouslySetInnerHTML={createMarkup()} />}
            
            {message.analysis && <AnalysisResult analysis={message.analysis} />}
        </div>
    );
};

export const MessageComponent: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === Sender.User;

    const Icon = () => {
        switch (message.sender) {
            case Sender.User: return <UserIcon />;
            case Sender.Bot: return <BotIcon />;
            case Sender.System: return <SystemIcon />;
            default: return null;
        }
    };

    return (
        <div className={`flex items-end gap-3 my-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="flex-shrink-0">
                <Icon />
            </div>
            <MessageBubble message={message} />
        </div>
    );
};
