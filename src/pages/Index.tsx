
import React from 'react';
import ConversationInterface from '@/components/ConversationInterface';
import { LanguageProvider } from '@/hooks/useLanguage';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <ConversationInterface />
      </div>
    </LanguageProvider>
  );
};

export default Index;
