
import React from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage, supportedLanguages } from '@/hooks/useLanguage';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const handleLanguageChange = (languageCode: string) => {
    const language = supportedLanguages.find(lang => lang.code === languageCode);
    if (language) {
      setLanguage(language);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Languages className="w-4 h-4" />
      <Select value={currentLanguage.code} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder={t('language')} />
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{language.nativeName}</span>
                <span className="text-xs text-gray-500">({language.name})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
