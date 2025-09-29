import { cn } from '../../components/ui/utils';
import type { LocalizedNumberProps, LocalizedDateProps } from './types';

export function LocalizedNumber({
  value,
  currentLanguage,
  type = 'decimal',
  currency = 'USD',
  minimumFractionDigits,
  maximumFractionDigits,
  className,
}: LocalizedNumberProps) {
  const formatNumber = (num: number): string => {
    if (isNaN(num) || num === null || num === undefined) {
      return '—';
    }

    const locale = getLocaleFromLanguage(currentLanguage || 'en');

    try {
      switch (type) {
        case 'currency':
          return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits,
            maximumFractionDigits,
          }).format(num);

        case 'percent':
          return new Intl.NumberFormat(locale, {
            style: 'percent',
            minimumFractionDigits,
            maximumFractionDigits,
          }).format(num / 100);

        case 'integer':
          return new Intl.NumberFormat(locale, {
            maximumFractionDigits: 0,
          }).format(num);

        default: // decimal
          return new Intl.NumberFormat(locale, {
            minimumFractionDigits,
            maximumFractionDigits,
          }).format(num);
      }
    } catch (error) {
      return num.toString();
    }
  };

  return (
    <span className={cn(className)}>
      {formatNumber(value)}
    </span>
  );
}

export function LocalizedDate({
  date,
  currentLanguage,
  format = 'medium',
  timeZone,
  className,
}: LocalizedDateProps) {
  const formatDate = (inputDate: Date | string): string => {
    try {
      const dateObj = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

      if (isNaN(dateObj.getTime())) {
        return '—';
      }

      const locale = getLocaleFromLanguage(currentLanguage || 'en');

      const formatOptions: Intl.DateTimeFormatOptions = {
        timeZone,
      };

      switch (format) {
        case 'short':
          formatOptions.dateStyle = 'short';
          break;
        case 'medium':
          formatOptions.dateStyle = 'medium';
          break;
        case 'long':
          formatOptions.dateStyle = 'long';
          break;
        case 'full':
          formatOptions.dateStyle = 'full';
          break;
        default:
          formatOptions.dateStyle = 'medium';
      }

      return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
    } catch (error) {
      return typeof date === 'string' ? date : date.toString();
    }
  };

  return (
    <span className={cn(className)}>
      {formatDate(date)}
    </span>
  );
}

function getLocaleFromLanguage(languageCode: string): string {
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'th': 'th-TH',
    'ja': 'ja-JP',
    'ko': 'ko-KR',
    'zh': 'zh-CN',
    'fr': 'fr-FR',
    'de': 'de-DE',
    'es': 'es-ES',
    'it': 'it-IT',
    'pt': 'pt-BR',
    'ru': 'ru-RU',
    'ar': 'ar-SA',
    'hi': 'hi-IN',
  };

  return localeMap[languageCode?.toLowerCase()] || 'en-US';
}

export interface LocalizedListProps {
  items: string[];
  currentLanguage: string;
  type?: 'conjunction' | 'disjunction';
  className?: string;
}

export function LocalizedList({
  items,
  currentLanguage,
  type = 'conjunction',
  className,
}: LocalizedListProps) {
  const formatList = (list: string[]): string => {
    if (list.length === 0) return '';
    if (list.length === 1) return list[0] || '';

    const locale = getLocaleFromLanguage(currentLanguage || 'en');

    try {
      // Check if Intl.ListFormat is supported
      if (typeof (Intl as any).ListFormat !== 'undefined') {
        return new (Intl as any).ListFormat(locale, {
          style: 'long',
          type,
        }).format(list);
      }
    } catch (error) {
      // Fall through to manual formatting
    }

    // Fallback to simple comma-separated list
    if (type === 'disjunction') {
      return list.slice(0, -1).join(', ') + ' or ' + (list[list.length - 1] || '');
    }
    return list.slice(0, -1).join(', ') + ' and ' + (list[list.length - 1] || '');
  };

  return (
    <span className={cn(className)}>
      {formatList(items)}
    </span>
  );
}