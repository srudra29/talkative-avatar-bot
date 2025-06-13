import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import MessageBubble from './MessageBubble';
import VoiceControls from './VoiceControls';
import AccessibilityControls from './AccessibilityControls';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'voice';
}

const ConversationInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, currentLanguage } = useLanguage();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Apply theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.style.fontSize = fontSize === 'large' ? '18px' : fontSize === 'small' ? '14px' : '16px';
  }, [darkMode, highContrast, fontSize]);

  // Initialize with a welcome message in the selected language
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: t('welcome_message'),
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);
    
    // Speak welcome message if speech is enabled
    if (speechEnabled) {
      speakText(welcomeMessage.text);
    }
  }, [currentLanguage.code, speechEnabled, t]);

  const speakText = async (text: string) => {
    if (!speechEnabled) return;
    
    try {
      // Use Web Speech API for text-to-speech with language support
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.lang = currentLanguage.speechCode;
      
      // Try to use a voice that matches the current language
      const voices = speechSynthesis.getVoices();
      const languageVoice = voices.find(voice => 
        voice.lang.startsWith(currentLanguage.speechCode.split('-')[0])
      );
      if (languageVoice) {
        utterance.voice = languageVoice;
      }
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };

  const processMessage = async (text: string): Promise<string> => {
    // Frontend-only mock processing
    setIsProcessing(true);
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock sales representative responses based on input
      const responses = {
        greeting: "Thank you for your interest! I'm excited to help you find the perfect solution for your needs. What specific challenges are you looking to address?",
        pricing: "I'd be happy to discuss our pricing options. We offer flexible packages designed to provide excellent value. Can you tell me more about your budget range and specific requirements?",
        features: "Our platform offers cutting-edge features including AI-powered analytics, real-time collaboration tools, and enterprise-grade security. Which aspects are most important to your business?",
        demo: "I'd love to show you our product in action! We can schedule a personalized demo where I'll walk you through features tailored to your specific use case. When would be convenient for you?",
        support: "Our support team is available 24/7 with an average response time of under 2 hours. We also provide dedicated account managers for enterprise clients. What level of support are you looking for?",
        default: "That's a great question! Let me provide you with detailed information. Based on what you've shared, I believe our solution could significantly benefit your organization. Would you like me to explain how we can address your specific needs?"
      };
      
      const lowerText = text.toLowerCase();
      let response = responses.default;
      
      if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
        response = responses.greeting;
      } else if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('budget')) {
        response = responses.pricing;
      } else if (lowerText.includes('feature') || lowerText.includes('capability') || lowerText.includes('function')) {
        response = responses.features;
      } else if (lowerText.includes('demo') || lowerText.includes('show') || lowerText.includes('see')) {
        response = responses.demo;
      } else if (lowerText.includes('support') || lowerText.includes('help') || lowerText.includes('service')) {
        response = responses.support;
      }
      
      return response;
    } catch (error) {
      console.error('Message processing error:', error);
      return "I apologize, but I'm experiencing some technical difficulties. Let me try to help you in another way. Could you please rephrase your question?";
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async (text: string, type: 'text' | 'voice' = 'text') => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Process message
    const responseText = await processMessage(text);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, botMessage]);
    
    // Speak bot response if speech is enabled
    if (speechEnabled) {
      speakText(responseText);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    handleSendMessage(transcript, 'voice');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    } ${highContrast ? 'high-contrast' : ''}`}>
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Header with controls */}
        <div className="flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('ai_sales_rep')}
            </h1>
            <div className="flex items-center space-x-2">
              {speechEnabled ? <Volume2 className="w-5 h-5 text-green-500" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
              {isListening && <Mic className="w-5 h-5 text-red-500 animate-pulse" />}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <AccessibilityControls
              highContrast={highContrast}
              setHighContrast={setHighContrast}
              fontSize={fontSize}
              setFontSize={setFontSize}
              speechEnabled={speechEnabled}
              setSpeechEnabled={setSpeechEnabled}
            />
            
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4" />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                aria-label="Toggle dark mode"
              />
              <Moon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Messages container */}
        <Card className="h-96 overflow-y-auto mb-4 p-4 bg-white dark:bg-gray-800">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                darkMode={darkMode}
                highContrast={highContrast}
              />
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Input area */}
        <div className="flex space-x-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('type_message')}
            className="flex-1 resize-none"
            rows={2}
            aria-label="Message input"
          />
          
          <div className="flex flex-col space-y-2">
            <Button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isProcessing}
              className="px-6"
            >
              {t('send')}
            </Button>
            
            <VoiceControls
              isListening={isListening}
              setIsListening={setIsListening}
              onVoiceInput={handleVoiceInput}
              speechEnabled={speechEnabled}
            />
          </div>
        </div>

        {/* Status indicators */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          {isProcessing && t('processing')}
          {isListening && t('listening')}
          {!speechEnabled && t('voice_disabled')}
        </div>
      </div>
    </div>
  );
};

export default ConversationInterface;
