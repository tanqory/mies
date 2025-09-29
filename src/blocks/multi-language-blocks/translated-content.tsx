import React from 'react';
import { cn } from '../../components/ui/utils';
import type { TranslatedTextProps, TranslatedContent } from './types';

export function TranslatedText({
  textKey,
  translations,
  currentLanguage,
  fallbackLanguage = 'en',
  className,
  as: Component = 'span',
}: TranslatedTextProps) {
  const getTranslatedText = (key: string): string => {
    const keys = key.split('.');
    let currentTranslation: any = translations[currentLanguage];
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

  const text = getTranslatedText(textKey);

  return React.createElement(Component, { className: cn(className) }, text);
}

export interface TranslatedContentProps {
  content: TranslatedContent;
  currentLanguage: string;
  fallbackLanguage?: string;
  children: (translate: (key: string) => string) => React.ReactNode;
}

export function TranslatedContent({
  content,
  currentLanguage,
  fallbackLanguage = 'en',
  children,
}: TranslatedContentProps) {
  const translate = React.useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let currentTranslation: any = content[currentLanguage];
      let fallbackTranslation: any = content[fallbackLanguage];

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
    },
    [content, currentLanguage, fallbackLanguage]
  );

  return <>{children(translate)}</>;
}