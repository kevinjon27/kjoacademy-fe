'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface LanguageChangerProps {
  className?: string;
  onLanguageChange?: (language: string) => void;
}

export function LanguageChanger({ className, onLanguageChange }: LanguageChangerProps) {
  const [currentLanguage, setCurrentLanguage] = useState('id');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'id', flag: '🇮🇩', name: 'ID' },
    { code: 'en', flag: '🇺🇸', name: 'EN' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setIsOpen(false);
    onLanguageChange?.(languageCode);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-[80px] justify-between"
      >
        <span className="flex items-center gap-1">
          <span>{currentLang.flag}</span>
          <span className="text-sm">{currentLang.name}</span>
        </span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 min-w-[80px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`w-full px-3 py-2 text-sm text-left hover:bg-accent transition-colors flex items-center gap-2 ${
                currentLanguage === language.code ? 'bg-accent' : ''
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
