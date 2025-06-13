
import React from 'react';
import ConversationInterface from '@/components/ConversationInterface';
import { AWSConfiguration } from '@/components/AWSIntegration';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* AWS Configuration Notice */}
      <div className="container mx-auto p-4 max-w-4xl">
        <AWSConfiguration />
      </div>
      
      {/* Main Conversation Interface */}
      <ConversationInterface />
    </div>
  );
};

export default Index;
