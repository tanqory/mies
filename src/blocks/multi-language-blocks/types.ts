export interface Language {
  code: string;
  label: string;
  flag: string;
  countryCode: string;
}

export interface TranslationData {
  [key: string]: string | TranslationData;
}

export interface TranslatedContent {
  [languageCode: string]: TranslationData;
}

export interface LanguageSwitcherProps {
  currentLanguage: Language;
  languages: Language[];
  onLanguageChange: (language: Language) => void;
  variant?: 'dropdown' | 'select' | 'inline' | 'minimal';
  showFlag?: boolean;
  showLabel?: boolean;
  className?: string;
}

export interface TranslatedTextProps {
  textKey: string;
  translations: TranslatedContent;
  currentLanguage: string;
  fallbackLanguage?: string;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

export interface LanguageDetectorProps {
  supportedLanguages: Language[];
  defaultLanguage: Language;
  onLanguageDetected: (language: Language) => void;
  enableBrowserDetection?: boolean;
  enableGeolocation?: boolean;
}

export interface MultiLanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage: Language;
  supportedLanguages: Language[];
  translations: TranslatedContent;
}

export interface LocalizedNumberProps {
  value: number;
  currentLanguage: string;
  type?: 'currency' | 'percent' | 'decimal' | 'integer';
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  className?: string;
}

export interface LocalizedDateProps {
  date: Date | string;
  currentLanguage: string;
  format?: 'short' | 'medium' | 'long' | 'full';
  timeZone?: string;
  className?: string;
}