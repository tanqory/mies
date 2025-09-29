'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const translations = {
  en: {
    welcome: 'Welcome to our platform',
    description: 'Experience our international platform with multi-language support',
    features: 'Features',
    about: 'About Us',
    contact: 'Contact',
    login: 'Login',
    signup: 'Sign Up',
    dashboard: 'Dashboard',
    settings: 'Settings',
    logout: 'Logout',
  },
  th: {
    welcome: 'ยินดีต้อนรับสู่แพลตฟอร์มของเรา',
    description: 'สัมผัสประสบการณ์แพลตฟอร์มระดับโลกของเราพร้อมการรองรับหลายภาษา',
    features: 'คุณสมบัติ',
    about: 'เกี่ยวกับเรา',
    contact: 'ติดต่อ',
    login: 'เข้าสู่ระบบ',
    signup: 'สมัครสมาชิก',
    dashboard: 'แดชบอร์ด',
    settings: 'การตั้งค่า',
    logout: 'ออกจากระบบ',
  },
  ja: {
    welcome: '私たちのプラットフォームへようこそ',
    description: '多言語サポートを備えた国際的なプラットフォームをご体験ください',
    features: '機能',
    about: '私たちについて',
    contact: 'お問い合わせ',
    login: 'ログイン',
    signup: 'サインアップ',
    dashboard: 'ダッシュボード',
    settings: '設定',
    logout: 'ログアウト',
  },
  ko: {
    welcome: '저희 플랫폼에 오신 것을 환영합니다',
    description: '다국어 지원을 제공하는 국제적인 플랫폼을 경험해보세요',
    features: '기능',
    about: '회사 소개',
    contact: '연락처',
    login: '로그인',
    signup: '회원가입',
    dashboard: '대시보드',
    settings: '설정',
    logout: '로그아웃',
  },
  zh: {
    welcome: '欢迎来到我们的平台',
    description: '体验我们支持多语言的国际化平台',
    features: '功能',
    about: '关于我们',
    contact: '联系我们',
    login: '登录',
    signup: '注册',
    dashboard: '仪表板',
    settings: '设置',
    logout: '退出',
  },
  fr: {
    welcome: 'Bienvenue sur notre plateforme',
    description: 'Découvrez notre plateforme internationale avec support multilingue',
    features: 'Fonctionnalités',
    about: 'À propos',
    contact: 'Contact',
    login: 'Connexion',
    signup: 'Inscription',
    dashboard: 'Tableau de bord',
    settings: 'Paramètres',
    logout: 'Déconnexion',
  },
  de: {
    welcome: 'Willkommen auf unserer Plattform',
    description: 'Erleben Sie unsere internationale Plattform mit mehrsprachiger Unterstützung',
    features: 'Funktionen',
    about: 'Über uns',
    contact: 'Kontakt',
    login: 'Anmelden',
    signup: 'Registrieren',
    dashboard: 'Dashboard',
    settings: 'Einstellungen',
    logout: 'Abmelden',
  },
  es: {
    welcome: 'Bienvenido a nuestra plataforma',
    description: 'Experimenta nuestra plataforma internacional con soporte multiidioma',
    features: 'Características',
    about: 'Acerca de',
    contact: 'Contacto',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    dashboard: 'Panel',
    settings: 'Configuración',
    logout: 'Cerrar sesión',
  },
};

function LanguageSwitcher({ currentLanguage, onLanguageChange }: {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <LucideIcons.Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function TranslatedContent({ language }: { language: string }) {
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.welcome}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Navigation Menu */}
        <div className="space-y-3">
          <h4 className="font-medium">Navigation Menu</h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">{t.features}</Button>
            <Button variant="outline" size="sm">{t.about}</Button>
            <Button variant="outline" size="sm">{t.contact}</Button>
          </div>
        </div>

        {/* User Actions */}
        <div className="space-y-3">
          <h4 className="font-medium">User Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">{t.login}</Button>
            <Button variant="secondary" size="sm">{t.signup}</Button>
            <Button variant="ghost" size="sm">{t.dashboard}</Button>
            <Button variant="ghost" size="sm">{t.settings}</Button>
            <Button variant="destructive" size="sm">{t.logout}</Button>
          </div>
        </div>

        {/* Language Information */}
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">
              {languages.find(lang => lang.code === language)?.flag}
            </span>
            <h4 className="font-medium">
              {languages.find(lang => lang.code === language)?.name}
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Current language: {language.toUpperCase()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function RTLDemo({ language }: { language: string }) {
  const isRTL = ['ar', 'he', 'fa'].includes(language);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LucideIcons.ArrowLeftRight className="h-5 w-5" />
          RTL Support Demo
        </CardTitle>
        <CardDescription>
          Demonstration of right-to-left text direction support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`space-y-4 ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Text Direction Example</h4>
            <p className="text-muted-foreground">
              {isRTL
                ? 'هذا مثال على النص من اليمين إلى اليسار'
                : 'This is an example of left-to-right text direction'
              }
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={isRTL ? 'default' : 'outline'}
              onClick={() => {/* Toggle RTL */}}
            >
              RTL Mode
            </Button>
            <Button
              variant={!isRTL ? 'default' : 'outline'}
              onClick={() => {/* Toggle LTR */}}
            >
              LTR Mode
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MultiLanguagePage() {
  const [currentLanguage, setCurrentLanguage] = React.useState('en');

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Multi-Language</h1>
              <p className="text-muted-foreground text-lg">
                Internationalization features with language switching and localization
              </p>
            </div>
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">10+ Languages</Badge>
            <Badge variant="outline">RTL Support</Badge>
            <Badge variant="outline">Dynamic Switching</Badge>
          </div>
        </div>

        {/* Language Switcher Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Globe className="h-5 w-5" />
              Language Switching Demo
            </CardTitle>
            <CardDescription>
              Interactive demonstration of language switching functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TranslatedContent language={currentLanguage} />
          </CardContent>
        </Card>

        {/* Available Languages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Languages className="h-5 w-5" />
              Supported Languages
            </CardTitle>
            <CardDescription>
              Complete list of available language options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className={`p-4 border rounded-lg text-center cursor-pointer transition-colors hover:bg-muted ${
                    currentLanguage === lang.code ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setCurrentLanguage(lang.code)}
                >
                  <div className="text-2xl mb-2">{lang.flag}</div>
                  <div className="text-sm font-medium">{lang.name}</div>
                  <div className="text-xs text-muted-foreground">{lang.code.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* RTL Support */}
        <RTLDemo language={currentLanguage} />

        {/* Localization Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Settings className="h-5 w-5" />
              Localization Features
            </CardTitle>
            <CardDescription>
              Available internationalization and localization capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: LucideIcons.Globe, title: 'Language Detection', description: 'Automatic browser language detection' },
                { icon: LucideIcons.ArrowLeftRight, title: 'RTL Support', description: 'Right-to-left text direction' },
                { icon: LucideIcons.Calendar, title: 'Date Formatting', description: 'Locale-specific date formats' },
                { icon: LucideIcons.DollarSign, title: 'Currency', description: 'Regional currency formatting' },
                { icon: LucideIcons.Clock, title: 'Time Zones', description: 'Time zone aware formatting' },
                { icon: LucideIcons.Hash, title: 'Number Formatting', description: 'Locale-specific number formats' },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center space-y-3 p-4 border rounded-lg">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Code className="h-5 w-5" />
              Implementation Examples
            </CardTitle>
            <CardDescription>
              Code examples for implementing multi-language support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Translation Hook</h4>
                <code className="text-sm">
                  {`const { t, locale, setLocale } = useTranslation();`}
                </code>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Translation Usage</h4>
                <code className="text-sm">
                  {`<Button>{t('common.login')}</Button>`}
                </code>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Language Switching</h4>
                <code className="text-sm">
                  {`setLocale('th'); // Switch to Thai`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}