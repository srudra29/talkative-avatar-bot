import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

interface VoiceControlsProps {
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  onVoiceInput: (transcript: string) => void;
  speechEnabled: boolean;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  setIsListening,
  onVoiceInput,
  speechEnabled
}) => {
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = currentLanguage.speechCode;

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript) {
          onVoiceInput(finalTranscript);
          setTranscript('');
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        let errorMessage = 'Speech recognition error occurred';
        switch (event.error) {
          case 'network':
            errorMessage = 'Network error - please check your connection';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied - please allow microphone permissions';
            break;
          case 'no-speech':
            errorMessage = 'No speech detected - please try again';
            break;
        }
        
        toast({
          title: 'Voice Recognition Error',
          description: errorMessage,
          variant: 'destructive',
        });
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
      toast({
        title: 'Not Supported',
        description: 'Speech recognition is not supported in your browser',
        variant: 'destructive',
      });
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onVoiceInput, setIsListening, toast, currentLanguage.speechCode]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: 'Not Available',
        description: 'Speech recognition is not available in your browser',
        variant: 'destructive',
      });
      return;
    }

    if (!speechEnabled) {
      toast({
        title: 'Voice Disabled',
        description: 'Please enable voice features in accessibility controls',
        variant: 'destructive',
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        toast({
          title: 'Recognition Failed',
          description: 'Failed to start voice recognition. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <Button
        onClick={toggleListening}
        variant={isListening ? 'destructive' : 'outline'}
        size="sm"
        className="w-full"
        disabled={!speechEnabled}
        aria-label={isListening ? t('stop') : 'Start voice input'}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4 mr-1" />
            {t('stop')}
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 mr-1" />
            {t('voice')}
          </>
        )}
      </Button>
      
      {transcript && (
        <div className="text-xs text-gray-600 dark:text-gray-400 max-w-xs truncate">
          "{transcript}"
        </div>
      )}
    </div>
  );
};

export default VoiceControls;
