
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  speechCode: string;
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-US' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechCode: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', speechCode: 'gu-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', speechCode: 'ml-IN' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', speechCode: 'pa-IN' }
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
    },
    bn: {
      'ai_sales_rep': 'এআই বিক্রয় প্রতিনিধি',
      'welcome_message': 'হ্যালো! আমি আপনার এআই বিক্রয় প্রতিনিধি। আমি আমাদের পণ্য এবং সেবা সম্পর্কে যেকোনো প্রশ্নে আপনাকে সাহায্য করতে এখানে আছি। আপনি আপনার বার্তা টাইপ করতে পারেন বা ভয়েস ইনপুট ব্যবহার করতে পারেন। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
      'type_message': 'এখানে আপনার বার্তা টাইপ করুন... (পাঠাতে Enter চাপুন)',
      'send': 'পাঠান',
      'voice': 'ভয়েস',
      'stop': 'থামান',
      'listening': 'শুনছি... এখন বলুন',
      'processing': 'আপনার অনুরোধ প্রক্রিয়া করা হচ্ছে...',
      'voice_disabled': 'ভয়েস আউটপুট নিষ্ক্রিয়',
      'high_contrast': 'উচ্চ বৈসাদৃশ্য',
      'font_size': 'ফন্ট সাইজ',
      'small': 'ছোট',
      'medium': 'মাঝারি',
      'large': 'বড়',
      'speech_output': 'স্পিচ আউটপুট',
      'language': 'ভাষা',
      'accessibility': 'অ্যাক্সেসিবিলিটি'
    },
    te: {
      'ai_sales_rep': 'AI అమ్మకాల ప్రతినిధి',
      'welcome_message': 'హలో! నేను మీ AI అమ్మకాల ప్రతినిధిని. మా ఉత్పాదనలు మరియు సేవలకు సంబంధించిన ఏవైనా ప్రశ్నలతో మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. మీరు మీ సందేశాన్ని టైప్ చేయవచ్చు లేదా వాయిస్ ఇన్‌పుట్ ఉపయోగించవచ్చు. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?',
      'type_message': 'మీ సందేశాన్ని ఇక్కడ టైప్ చేయండి... (పంపడానికి Enter నొక్కండి)',
      'send': 'పంపు',
      'voice': 'వాయిస్',
      'stop': 'ఆపు',
      'listening': 'వింటున్నాను... ఇప్పుడు మాట్లాడండి',
      'processing': 'మీ అభ్యర్థనను ప్రాసెస్ చేస్తున్నాను...',
      'voice_disabled': 'వాయిస్ అవుట్‌పుట్ నిలిపివేయబడింది',
      'high_contrast': 'అధిక కాంట్రాస్ట్',
      'font_size': 'ఫాంట్ సైజ్',
      'small': 'చిన్న',
      'medium': 'మధ్యమ',
      'large': 'పెద్ద',
      'speech_output': 'స్పీచ్ అవుట్‌పుట్',
      'language': 'భాష',
      'accessibility': 'యాక్సెసిబిలిటీ'
    },
    ta: {
      'ai_sales_rep': 'AI விற்பனை பிரதிநிதி',
      'welcome_message': 'வணக்கம்! நான் உங்கள் AI விற்பனை பிரதிநிதி. எங்கள் தயாரிப்புகள் மற்றும் சேவைகள் பற்றிய எந்தவொரு கேள்விகளிலும் உங்களுக்கு உதவ நான் இங்கே இருக்கிறேன். நீங்கள் உங்கள் செய்தியைத் தட்டச்சு செய்யலாம் அல்லது குரல் உள்ளீட்டைப் பயன்படுத்தலாம். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
      'type_message': 'உங்கள் செய்தியை இங்கே தட்டச்சு செய்யுங்கள்... (அனுப்ப Enter ஐ அழுத்தவும்)',
      'send': 'அனுப்பு',
      'voice': 'குரல்',
      'stop': 'நிறுத்து',
      'listening': 'கேட்கிறேன்... இப்போது பேசுங்கள்',
      'processing': 'உங்கள் கோரிக்கையை செயலாக்குகிறேன்...',
      'voice_disabled': 'குரல் வெளியீடு முடக்கப்பட்டது',
      'high_contrast': 'அதிக வேறுபாடு',
      'font_size': 'எழுத்துரு அளவு',
      'small': 'சிறிய',
      'medium': 'நடுத்தர',
      'large': 'பெரிய',
      'speech_output': 'பேச்சு வெளியீடு',
      'language': 'மொழி',
      'accessibility': 'அணுகல்தன்மை'
    },
    mr: {
      'ai_sales_rep': 'AI विक्री प्रतिनिधी',
      'welcome_message': 'नमस्कार! मी तुमचा AI विक्री प्रतिनिधी आहे. आमच्या उत्पादनांसाठी आणि सेवांसाठी कोणत्याही प्रश्नांमध्ये तुम्हाला मदत करण्यासाठी मी येथे आहे. तुम्ही तुमचा संदेश टाइप करू शकता किंवा आवाज इनपुट वापरू शकता. आज मी तुम्हाला कशी मदत करू शकतो?',
      'type_message': 'तुमचा संदेश येथे टाइप करा... (पाठवण्यासाठी Enter दाबा)',
      'send': 'पाठवा',
      'voice': 'आवाज',
      'stop': 'थांबा',
      'listening': 'ऐकत आहे... आता बोला',
      'processing': 'तुमची विनंती प्रक्रिया करत आहे...',
      'voice_disabled': 'आवाज आउटपुट अक्षम',
      'high_contrast': 'उच्च कॉन्ट्रास्ट',
      'font_size': 'फॉन्ट साइज',
      'small': 'लहान',
      'medium': 'मध्यम',
      'large': 'मोठा',
      'speech_output': 'स्पीच आउटपुट',
      'language': 'भाषा',
      'accessibility': 'प्रवेशयोग्यता'
    },
    gu: {
      'ai_sales_rep': 'AI વેચાણ પ્રતિનિધિ',
      'welcome_message': 'હેલો! હું તમારો AI વેચાણ પ્રતિનિધિ છું. અમારા ઉત્પાદનો અને સેવાઓ વિશેના કોઈપણ પ્રશ્નોમાં તમારી સહાય કરવા માટે હું અહીં છું. તમે તમારો સંદેશ ટાઇપ કરી શકો છો અથવા વૉઇસ ઇનપુટનો ઉપયોગ કરી શકો છો. આજે હું તમારી કેવી રીતે સહાય કરી શકું?',
      'type_message': 'તમારો સંદેશ અહીં ટાઇપ કરો... (મોકલવા માટે Enter દબાવો)',
      'send': 'મોકલો',
      'voice': 'વૉઇસ',
      'stop': 'બંધ કરો',
      'listening': 'સાંભળી રહ્યો છું... હવે બોલો',
      'processing': 'તમારી વિનંતી પર કામ કરી રહ્યો છું...',
      'voice_disabled': 'વૉઇસ આઉટપુટ નિષ્ક્રિય',
      'high_contrast': 'ઉચ્ચ કોન્ટ્રાસ્ટ',
      'font_size': 'ફોન્ટ સાઇઝ',
      'small': 'નાનું',
      'medium': 'મધ્યમ',
      'large': 'મોટું',
      'speech_output': 'સ્પીચ આઉટપુટ',
      'language': 'ભાષા',
      'accessibility': 'પહોંચ'
    },
    kn: {
      'ai_sales_rep': 'AI ಮಾರಾಟ ಪ್ರತಿನಿಧಿ',
      'welcome_message': 'ಹಲೋ! ನಾನು ನಿಮ್ಮ AI ಮಾರಾಟ ಪ್ರತಿನಿಧಿ. ನಮ್ಮ ಉತ್ಪಾದನೆಗಳು ಮತ್ತು ಸೇವೆಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ. ನೀವು ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಬಹುದು ಅಥವಾ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬಳಸಬಹುದು. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ?',
      'type_message': 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ... (ಕಳುಹಿಸಲು Enter ಒತ್ತಿ)',
      'send': 'ಕಳುಹಿಸಿ',
      'voice': 'ಧ್ವನಿ',
      'stop': 'ನಿಲ್ಲಿಸಿ',
      'listening': 'ಕೇಳುತ್ತಿದ್ದೇನೆ... ಈಗ ಮಾತನಾಡಿ',
      'processing': 'ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತಿದ್ದೇನೆ...',
      'voice_disabled': 'ಧ್ವನಿ ಔಟ್‌ಪುಟ್ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ',
      'high_contrast': 'ಹೆಚ್ಚಿನ ವ್ಯತ್ಯಾಸ',
      'font_size': 'ಫಾಂಟ್ ಗಾತ್ರ',
      'small': 'ಚಿಕ್ಕದು',
      'medium': 'ಮಧ್ಯಮ',
      'large': 'ದೊಡ್ಡದು',
      'speech_output': 'ಸ್ಪೀಚ್ ಔಟ್‌ಪುಟ್',
      'language': 'ಭಾಷೆ',
      'accessibility': 'ಪ್ರವೇಶಿಸುವಿಕೆ'
    },
    ml: {
      'ai_sales_rep': 'AI വിൽപ്പന പ്രതിനിധി',
      'welcome_message': 'ഹലോ! ഞാൻ നിങ്ങളുടെ AI വിൽപ്പന പ്രതിനിധിയാണ്. ഞങ്ങളുടെ ഉൽപ്പന്നങ്ങളും സേവനങ്ങളും സംബന്ധിച്ച എന്തെങ്കിലും ചോദ്യങ്ങളിൽ നിങ്ങളെ സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്. നിങ്ങൾക്ക് നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യാം അല്ലെങ്കിൽ വോയ്‌സ് ഇൻപുട്ട് ഉപയോഗിക്കാം. ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും?',
      'type_message': 'നിങ്ങളുടെ സന്ദേശം ഇവിടെ ടൈപ്പ് ചെയ്യുക... (അയയ്‌ക്കാൻ Enter അമർത്തുക)',
      'send': 'അയയ്ക്കുക',
      'voice': 'ശബ്ദം',
      'stop': 'നിർത്തുക',
      'listening': 'കേൾക്കുന്നു... ഇപ്പോൾ സംസാരിക്കുക',
      'processing': 'നിങ്ങളുടെ അഭ്യർത്ഥന പ്രോസസ്സ് ചെയ്യുന്നു...',
      'voice_disabled': 'ശബ്ദ ഔട്ട്‌പുട്ട് പ്രവർത്തനരഹിതമാക്കി',
      'high_contrast': 'ഉയർന്ന വ്യത്യാസം',
      'font_size': 'ഫോണ്ട് വലുപ്പം',
      'small': 'ചെറിയ',
      'medium': 'ഇടത്തരം',
      'large': 'വലിയ',
      'speech_output': 'സ്പീച്ച് ഔട്ട്‌പുട്ട്',
      'language': 'ഭാഷ',
      'accessibility': 'പ്രവേശനക്ഷമത'
    },
    pa: {
      'ai_sales_rep': 'AI ਵੇਚਣ ਪ੍ਰਤੀਨਿਧੀ',
      'welcome_message': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਵੇਚਣ ਪ੍ਰਤੀਨਿਧੀ ਹਾਂ। ਮੈਂ ਸਾਡੇ ਉਤਪਾਦਾਂ ਅਤੇ ਸੇਵਾਵਾਂ ਬਾਰੇ ਕਿਸੇ ਵੀ ਸਵਾਲ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ। ਤੁਸੀਂ ਆਪਣਾ ਸੰਦੇਸ਼ ਟਾਈਪ ਕਰ ਸਕਦੇ ਹੋ ਜਾਂ ਆਵਾਜ਼ ਇਨਪੁਟ ਦੀ ਵਰਤੋਂ ਕਰ ਸਕਦੇ ਹੋ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
      'type_message': 'ਆਪਣਾ ਸੰਦੇਸ਼ ਇੱਥੇ ਟਾਈਪ ਕਰੋ... (ਭੇਜਣ ਲਈ Enter ਦਬਾਓ)',
      'send': 'ਭੇਜੋ',
      'voice': 'ਆਵਾਜ਼',
      'stop': 'ਰੋਕੋ',
      'listening': 'ਸੁਣ ਰਿਹਾ ਹਾਂ... ਹੁਣ ਬੋਲੋ',
      'processing': 'ਤੁਹਾਡੀ ਬੇਨਤੀ ਦੀ ਪ੍ਰਕਿਰਿਆ ਕਰ ਰਿਹਾ ਹਾਂ...',
      'voice_disabled': 'ਆਵਾਜ਼ ਆਉਟਪੁਟ ਬੰਦ',
      'high_contrast': 'ਉੱਚ ਕਾਂਟਰਾਸਟ',
      'font_size': 'ਫੋਂਟ ਸਾਈਜ਼',
      'small': 'ਛੋਟਾ',
      'medium': 'ਮੱਧਮ',
      'large': 'ਵੱਡਾ',
      'speech_output': 'ਸਪੀਚ ਆਉਟਪੁਟ',
      'language': 'ਭਾਸ਼ਾ',
      'accessibility': 'ਪਹੁੰਚਯੋਗਤਾ'
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
