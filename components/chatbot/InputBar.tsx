"use client"

import React, { useState, useRef, useEffect } from 'react';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';
import { SendIcon, PaperclipIcon, MicrophoneIcon } from './Icons';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  onSendImage: (file: File) => void;
  isLoading: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ onSendMessage, onSendImage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { transcript, isListening, startListening, stopListening, isSupported } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendImage(file);
    }
    if(fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const handleMicClick = () => {
    if(isListening) {
        stopListening();
    } else {
        startListening();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="relative flex items-center bg-gray-100 rounded-full px-3 py-1">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isListening ? "Listening..." : "Type your message..."}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 pl-2"
          disabled={isLoading}
        />
        <div className="flex items-center space-x-1">
           <button
             onClick={() => fileInputRef.current?.click()}
             className="p-2 text-gray-500 hover:text-green-600 disabled:opacity-50"
             disabled={isLoading}
             aria-label="Attach file"
           >
            <PaperclipIcon className="w-6 h-6" />
           </button>
           <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
           {isSupported && (
               <button
                 onClick={handleMicClick}
                 className={`p-2 disabled:opacity-50 relative ${isListening ? 'text-red-500' : 'text-gray-500 hover:text-green-600'}`}
                 disabled={isLoading}
                 aria-label={isListening ? "Stop listening" : "Start listening"}
               >
                 <MicrophoneIcon className="w-6 h-6" isListening={isListening}/>
               </button>
           )}
           <button
             onClick={handleSend}
             className="p-2 text-white bg-green-600 rounded-full hover:bg-green-700 disabled:bg-green-300 transition-colors"
             disabled={isLoading || !inputValue.trim()}
             aria-label="Send message"
           >
             <SendIcon className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
};
