
import React from 'react';
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'voice';
}

interface MessageBubbleProps {
  message: Message;
  darkMode: boolean;
  highContrast: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, darkMode, highContrast }) => {
  const isUser = message.sender === 'user';
  const isVoice = message.type === 'voice';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? (highContrast ? 'bg-black text-white' : 'bg-blue-500 text-white')
            : (highContrast ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700')
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message content */}
        <div className={`relative rounded-lg p-3 shadow-sm ${
          isUser
            ? (highContrast 
                ? 'bg-black text-white border-2 border-white' 
                : 'bg-blue-500 text-white')
            : (highContrast
                ? 'bg-white text-black border-2 border-black'
                : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'))
        }`}>
          {/* Voice indicator */}
          {isVoice && (
            <div className="flex items-center mb-1">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
              <span className="text-xs opacity-75">Voice message</span>
            </div>
          )}
          
          {/* Message text */}
          <p className="text-sm leading-relaxed">{message.text}</p>
          
          {/* Timestamp */}
          <div className={`text-xs mt-1 ${
            isUser 
              ? 'text-blue-100' 
              : (highContrast ? 'text-gray-600' : 'text-gray-500')
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
