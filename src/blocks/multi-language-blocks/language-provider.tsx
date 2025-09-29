import { createContext, useContext, useState, useEffect } from 'react';
import type { Language, TranslatedContent, MultiLanguageProviderProps } from './types';

interface LanguageContextType {
  currentLanguage: Language;
  supportedLanguages: Language[];
  translations: TranslatedContent;
  setLanguage: (language: Language) => void;
  translate: (key: string, fallbackLanguage?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function MultiLanguageProvider({
  children,
  defaultLanguage,
  supportedLanguages,
  translations,
}: MultiLanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      const language = supportedLanguages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, [supportedLanguages]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language.code);

    // Update document language attribute
    document.documentElement.lang = language.code;

    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language }
    }));
  };

  const translate = (key: string, fallbackLanguage = 'en'): string => {
    const keys = key.split('.');
    let currentTranslation: any = translations[currentLanguage.code];
    let fallbackTranslation: any = translations[fallbackLanguage];

    // Navigate through nested keys for current language
    for (const k of keys) {
      if (currentTranslation && typeof currentTranslation === 'object' && k in currentTranslation) {
        currentTranslation = currentTranslation[k];
      } else {
        currentTranslation = null;
        break;
      }
    }

    // If current language translation found and it's a string, return it
    if (typeof currentTranslation === 'string') {
      return currentTranslation;
    }

    // Fallback to fallback language
    for (const k of keys) {
      if (fallbackTranslation && typeof fallbackTranslation === 'object' && k in fallbackTranslation) {
        fallbackTranslation = fallbackTranslation[k];
      } else {
        fallbackTranslation = null;
        break;
      }
    }

    if (typeof fallbackTranslation === 'string') {
      return fallbackTranslation;
    }

    // Return the key if no translation found
    return key;
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    supportedLanguages,
    translations,
    setLanguage,
    translate,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a MultiLanguageProvider');
  }
  return context;
}

export function useTranslate() {
  const { translate } = useLanguage();
  return translate;
}

export function useCurrentLanguage() {
  const { currentLanguage } = useLanguage();
  return currentLanguage;
}

export function useLanguageSwitcher() {
  const { currentLanguage, supportedLanguages, setLanguage } = useLanguage();
  return {
    currentLanguage,
    supportedLanguages,
    setLanguage,
  };
}