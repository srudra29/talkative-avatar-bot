import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  speechCode: string;
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-US' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN' }
];

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(supportedLanguages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language.code);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const language = supportedLanguages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  const translations: Record<string, Record<string, string>> = {
    en: {
      'ai_sales_rep': 'AI Sales Representative',
      'welcome_message': "Hello! I'm your AI sales representative. I'm here to help you with any questions about our products and services. You can type your message or use voice input. How can I assist you today?",
      'type_message': 'Type your message here... (Press Enter to send)',
      'send': 'Send',
      'voice': 'Voice',
      'stop': 'Stop',
      'listening': 'Listening... Speak now',
      'processing': 'Processing your request...',
      'voice_disabled': 'Voice output disabled',
      'high_contrast': 'High Contrast',
      'font_size': 'Font Size',
      'small': 'Small',
      'medium': 'Medium',
      'large': 'Large',
      'speech_output': 'Speech Output',
      'language': 'Language',
      'accessibility': 'Accessibility'
    },
    hi: {
      'ai_sales_rep': 'एआई बिक्री प्रतिनिधि',
      'welcome_message': 'नमस्ते! मैं आपका एआई बिक्री प्रतिनिधि हूं। मैं आपके उत्पादों और सेवाओं के बारे में किसी भी प्रश्न में आपकी सहायता करने के लिए यहां हूं। आप अपना संदेश टाइप कर सकते हैं या वॉयस इनपुट का उपयोग कर सकते हैं। आज मैं आपकी कैसे सहायता कर सकता हूं?',
      'type_message': 'यहाँ अपना संदेश टाइप करें... (भेजने के लिए Enter दबाएं)',
      'send': 'भेजें',
      'voice': 'आवाज़',
      'stop': 'रोकें',
      'listening': 'सुन रहा हूं... अब बोलें',
      'processing': 'आपके अनुरोध को संसाधित कर रहा हूं...',
      'voice_disabled': 'ध्वनि आउटपुट अक्षम',
      'high_contrast': 'उच्च कंट्रास्ट',
      'font_size': 'फ़ॉन्ट साइज़',
      'small': 'छोटा',
      'medium': 'मध्यम',
      'large': 'बड़ा',
      'speech_output': 'स्पीच आउटपुट',
      'language': 'भाषा',
      'accessibility': 'सुगम्यता'
    }
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations['en'][key] || key;
  };

  const value = {
    currentLanguage,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
