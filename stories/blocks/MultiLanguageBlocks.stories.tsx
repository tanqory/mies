import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LanguageSwitcher,
  TranslatedText,
  TranslatedContentComponent as TranslatedContent,
  LocalizedNumber,
  LocalizedDate,
  LocalizedList,
  MultiLanguageProvider,
  MultiLangNavigation,
  useLanguage,
  useTranslate,
  createNavData,
  type Language,
  type TranslatedContent as TranslationData,
} from '../../src/blocks/multi-language-blocks';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';

// Sample language data
const SAMPLE_LANGUAGES: Language[] = [
  {
    code: 'en',
    label: 'English',
    flag: '🇺🇸',
    countryCode: 'US',
  },
  {
    code: 'th',
    label: 'ไทย',
    flag: '🇹🇭',
    countryCode: 'TH',
  },
  {
    code: 'ja',
    label: '日本語',
    flag: '🇯🇵',
    countryCode: 'JP',
  },
  {
    code: 'ko',
    label: '한국어',
    flag: '🇰🇷',
    countryCode: 'KR',
  },
  {
    code: 'zh',
    label: '中文',
    flag: '🇨🇳',
    countryCode: 'CN',
  },
];

// Sample translations data
const SAMPLE_TRANSLATIONS: TranslationData = {
  en: {
    welcome: 'Welcome to our platform',
    description: 'Experience the power of multi-language support',
    demo: {
      lang: 'Language Demo',
      description: 'This content changes based on your selected language',
    },
    navigation: {
      main: 'Main',
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      projects: 'Projects',
      settings: 'Settings',
      help: 'Help & Support',
      new: 'NEW',
      'settings.caption': 'Manage your preferences',
    },
    ui: {
      selectLanguage: 'Select Language',
      currentLanguage: 'Current',
      switchTo: 'Switch to',
    },
  },
  th: {
    welcome: 'ยินดีต้อนรับสู่แพลตฟอร์มของเรา',
    description: 'สัมผัสพลังของการรองรับหลายภาษา',
    demo: {
      lang: 'การสาธิตภาษา',
      description: 'เนื้อหานี้จะเปลี่ยนไปตามภาษาที่คุณเลือก',
    },
    navigation: {
      main: 'หลัก',
      dashboard: 'แดชบอร์ด',
      analytics: 'การวิเคราะห์',
      projects: 'โครงการ',
      settings: 'การตั้งค่า',
      help: 'ช่วยเหลือ & การสนับสนุน',
      new: 'ใหม่',
      'settings.caption': 'จัดการการตั้งค่าของคุณ',
    },
    ui: {
      selectLanguage: 'เลือกภาษา',
      currentLanguage: 'ปัจจุบัน',
      switchTo: 'เปลี่ยนเป็น',
    },
  },
  ja: {
    welcome: 'プラットフォームへようこそ',
    description: '多言語サポートのパワーを体験してください',
    demo: {
      lang: '言語デモ',
      description: 'このコンテンツは選択された言語に基づいて変化します',
    },
    navigation: {
      main: 'メイン',
      dashboard: 'ダッシュボード',
      analytics: 'アナリティクス',
      projects: 'プロジェクト',
      settings: '設定',
      help: 'ヘルプ & サポート',
      new: '新規',
      'settings.caption': '環境設定を管理',
    },
    ui: {
      selectLanguage: '言語を選択',
      currentLanguage: '現在',
      switchTo: '切り替え',
    },
  },
  ko: {
    welcome: '플랫폼에 오신 것을 환영합니다',
    description: '다국어 지원의 힘을 경험해보세요',
    demo: {
      lang: '언어 데모',
      description: '이 콘텐츠는 선택된 언어에 따라 변경됩니다',
    },
    navigation: {
      main: '메인',
      dashboard: '대시보드',
      analytics: '분석',
      projects: '프로젝트',
      settings: '설정',
      help: '도움말 & 지원',
      new: '새로운',
      'settings.caption': '환경설정 관리',
    },
    ui: {
      selectLanguage: '언어 선택',
      currentLanguage: '현재',
      switchTo: '변경',
    },
  },
  zh: {
    welcome: '欢迎来到我们的平台',
    description: '体验多语言支持的力量',
    demo: {
      lang: '语言演示',
      description: '此内容根据您选择的语言而变化',
    },
    navigation: {
      main: '主要',
      dashboard: '仪表板',
      analytics: '分析',
      projects: '项目',
      settings: '设置',
      help: '帮助与支持',
      new: '新',
      'settings.caption': '管理您的偏好设置',
    },
    ui: {
      selectLanguage: '选择语言',
      currentLanguage: '当前',
      switchTo: '切换到',
    },
  },
};

// Demo Components
function LanguageSwitcherDemo() {
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>(SAMPLE_LANGUAGES[0]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Dropdown Variant</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              languages={SAMPLE_LANGUAGES}
              onLanguageChange={setCurrentLanguage}
              variant="dropdown"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Select Variant</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              languages={SAMPLE_LANGUAGES}
              onLanguageChange={setCurrentLanguage}
              variant="select"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Inline Variant</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              languages={SAMPLE_LANGUAGES}
              onLanguageChange={setCurrentLanguage}
              variant="inline"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Minimal Variant</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              languages={SAMPLE_LANGUAGES}
              onLanguageChange={setCurrentLanguage}
              variant="minimal"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selected Language Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-2xl">{currentLanguage.flag}</span>
            <div>
              <div className="font-semibold">{currentLanguage.label}</div>
              <div className="text-sm text-muted-foreground">
                Code: {currentLanguage.code} | Country: {currentLanguage.countryCode}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TranslatedContentDemo() {
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>(SAMPLE_LANGUAGES[0]);

  return (
    <MultiLanguageProvider
      defaultLanguage={SAMPLE_LANGUAGES[0]}
      supportedLanguages={SAMPLE_LANGUAGES}
      translations={SAMPLE_TRANSLATIONS}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Content Translation Demo</h3>
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            languages={SAMPLE_LANGUAGES}
            onLanguageChange={setCurrentLanguage}
            variant="dropdown"
          />
        </div>

        <TranslatedContent
          content={SAMPLE_TRANSLATIONS}
          currentLanguage={currentLanguage.code}
        >
          {(translate) => (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h1 className="text-2xl font-bold mb-2">
                    {translate('welcome')}
                  </h1>
                  <p className="text-muted-foreground">
                    {translate('description')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{translate('demo.lang')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{translate('demo.description')}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </TranslatedContent>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Direct Translation</h4>
              <TranslatedText
                textKey="welcome"
                translations={SAMPLE_TRANSLATIONS}
                currentLanguage={currentLanguage.code}
                as="p"
                className="text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Nested Key</h4>
              <TranslatedText
                textKey="demo.description"
                translations={SAMPLE_TRANSLATIONS}
                currentLanguage={currentLanguage.code}
                as="p"
                className="text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Fallback Example</h4>
              <TranslatedText
                textKey="nonexistent.key"
                translations={SAMPLE_TRANSLATIONS}
                currentLanguage={currentLanguage.code}
                fallbackLanguage="en"
                as="p"
                className="text-sm italic text-muted-foreground"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </MultiLanguageProvider>
  );
}

function LocalizedFormattersDemo() {
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>(SAMPLE_LANGUAGES[0]);

  const sampleNumbers = [1234.56, 0.85, 1500000, 42];
  const sampleDate = new Date('2024-03-15T10:30:00');
  const sampleList = ['Apple', 'Banana', 'Cherry', 'Date'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Localized Formatters Demo</h3>
        <LanguageSwitcher
          currentLanguage={currentLanguage}
          languages={SAMPLE_LANGUAGES}
          onLanguageChange={setCurrentLanguage}
          variant="dropdown"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Number Formatting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleNumbers.map((num, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-muted-foreground">
                  {num} (Currency):
                </div>
                <LocalizedNumber
                  value={num}
                  currentLanguage={currentLanguage.code}
                  type="currency"
                  currency="USD"
                />

                <div className="text-muted-foreground">
                  {num} (Decimal):
                </div>
                <LocalizedNumber
                  value={num}
                  currentLanguage={currentLanguage.code}
                  type="decimal"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4 text-sm border-t pt-3">
              <div className="text-muted-foreground">
                Percentage (85%):
              </div>
              <LocalizedNumber
                value={85}
                currentLanguage={currentLanguage.code}
                type="percent"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Date & List Formatting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">Date Formats</h4>
              {(['short', 'medium', 'long', 'full'] as const).map((format) => (
                <div key={format} className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-muted-foreground capitalize">
                    {format}:
                  </div>
                  <LocalizedDate
                    date={sampleDate}
                    currentLanguage={currentLanguage.code}
                    format={format}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-3">
              <h4 className="font-medium">List Formatting</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-muted-foreground">
                  Conjunction (and):
                </div>
                <LocalizedList
                  items={sampleList}
                  currentLanguage={currentLanguage.code}
                  type="conjunction"
                />

                <div className="text-muted-foreground">
                  Disjunction (or):
                </div>
                <LocalizedList
                  items={sampleList.slice(0, 3)}
                  currentLanguage={currentLanguage.code}
                  type="disjunction"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function NavigationDemo() {
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>(SAMPLE_LANGUAGES[0]);

  const navData = React.useMemo(() => {
    const translate = (key: string) => {
      const keys = key.split('.');
      let translation: any = SAMPLE_TRANSLATIONS[currentLanguage.code];

      for (const k of keys) {
        if (translation && typeof translation === 'object' && k in translation) {
          translation = translation[k];
        } else {
          return key;
        }
      }

      return typeof translation === 'string' ? translation : key;
    };

    return createNavData(translate);
  }, [currentLanguage.code]);

  return (
    <MultiLanguageProvider
      defaultLanguage={SAMPLE_LANGUAGES[0]}
      supportedLanguages={SAMPLE_LANGUAGES}
      translations={SAMPLE_TRANSLATIONS}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Multi-Language Navigation</h3>
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            languages={SAMPLE_LANGUAGES}
            onLanguageChange={setCurrentLanguage}
            variant="dropdown"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MultiLangNavigation
            navData={navData}
            onItemClick={(item) => {
              console.log('Navigation item clicked:', item);
            }}
          />

          <Card>
            <CardHeader>
              <CardTitle>Current Language Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentLanguage.flag}</span>
                  <div>
                    <div className="font-semibold">{currentLanguage.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {currentLanguage.code} - {currentLanguage.countryCode}
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  Navigation labels are automatically translated based on the selected language.
                  Try switching languages to see the navigation items change.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MultiLanguageProvider>
  );
}

// Demo components array
const DEMO_COMPONENTS = [
  { name: 'Language Switcher', component: <LanguageSwitcherDemo /> },
  { name: 'Translated Content', component: <TranslatedContentDemo /> },
  { name: 'Localized Formatters', component: <LocalizedFormattersDemo /> },
  { name: 'Multi-Language Navigation', component: <NavigationDemo /> },
];

// Meta configuration
const meta: Meta<typeof LanguageSwitcherDemo> = {
  title: 'Blocks/Multi-Language',
  component: LanguageSwitcherDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Multi-Language Component Blocks following next-ts implementation patterns with @tanqory/mies components.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcherDemo>;

// Main Multi-Language View Story
export const MultiLanguageView: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Multi-Language Components</h1>
        <p className="text-muted-foreground">
          Comprehensive multi-language support with translation, localization and language switching
        </p>
      </div>

      <div className="space-y-16">
        {DEMO_COMPONENTS.map((demo, index) => (
          <section key={demo.name} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{demo.name}</h2>
              <div className="text-sm text-muted-foreground">
                Component demonstration following next-ts pattern
              </div>
            </div>
            <div className="border rounded-lg p-6 bg-card">
              {demo.component}
            </div>
          </section>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multi-Language view component exactly like next-ts implementation with comprehensive language support.',
      },
    },
  },
};

// Individual component stories
export const LanguageSwitcherExample: Story = {
  render: () => <LanguageSwitcherDemo />,
};

export const TranslatedContentExample: Story = {
  render: () => <TranslatedContentDemo />,
};

export const LocalizedFormattersExample: Story = {
  render: () => <LocalizedFormattersDemo />,
};

export const NavigationExample: Story = {
  render: () => <NavigationDemo />,
};

// Export data for other stories
export { SAMPLE_LANGUAGES, SAMPLE_TRANSLATIONS, DEMO_COMPONENTS };