import React from 'react';
import { cn } from '../../components/ui/utils';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Badge } from '../../components/ui/badge';
import type { LanguageSwitcherProps } from './types';

export function LanguageSwitcher({
  currentLanguage,
  languages,
  onLanguageChange,
  variant = 'dropdown',
  showFlag = true,
  showLabel = true,
  className,
}: LanguageSwitcherProps) {
  const handleLanguageSelect = (languageCode: string) => {
    const selectedLanguage = languages.find(lang => lang.code === languageCode);
    if (selectedLanguage) {
      onLanguageChange(selectedLanguage);
    }
  };

  const renderLanguageContent = (language: typeof currentLanguage, isCompact = false) => (
    <div className="flex items-center gap-2">
      {showFlag && (
        <span className="text-lg" role="img" aria-label={`${language.label} flag`}>
          {language.flag}
        </span>
      )}
      {showLabel && !isCompact && (
        <span className="font-medium">{language.label}</span>
      )}
      {showLabel && isCompact && (
        <span className="font-medium text-sm">{language.code.toUpperCase()}</span>
      )}
    </div>
  );

  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn('flex items-center gap-2', className)}
          >
            {renderLanguageContent(currentLanguage)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[180px]">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => onLanguageChange(language)}
              className={cn(
                'flex items-center gap-2 cursor-pointer',
                currentLanguage.code === language.code && 'bg-accent'
              )}
            >
              {renderLanguageContent(language)}
              {currentLanguage.code === language.code && (
                <Badge variant="secondary" className="ml-auto">
                  Current
                </Badge>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'select') {
    return (
      <Select value={currentLanguage.code} onValueChange={handleLanguageSelect}>
        <SelectTrigger className={cn('w-[180px]', className)}>
          <SelectValue>
            {renderLanguageContent(currentLanguage)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {renderLanguageContent(language)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {languages.map((language) => (
          <Button
            key={language.code}
            variant={currentLanguage.code === language.code ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onLanguageChange(language)}
            className="flex items-center gap-1"
          >
            {renderLanguageContent(language, true)}
          </Button>
        ))}
      </div>
    );
  }

  // minimal variant
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {languages.map((language, index) => (
        <React.Fragment key={language.code}>
          <button
            onClick={() => onLanguageChange(language)}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              currentLanguage.code === language.code
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          >
            {showFlag ? language.flag : language.code.toUpperCase()}
          </button>
          {index < languages.length - 1 && (
            <span className="text-muted-foreground">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}