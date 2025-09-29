import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ContactForm,
  LoginForm,
  SearchBar
} from '../../src/blocks/form-blocks';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../src/components/ui/select';
import { _mock } from '../../src/utils/mock-data';

// Form field configuration ตามแบบ next-ts
const CONTACT_FORM_FIELDS = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text' as const,
    required: true,
    placeholder: 'Enter your full name',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email' as const,
    required: true,
    placeholder: 'Enter your email address',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel' as const,
    required: false,
    placeholder: 'Enter your phone number',
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text' as const,
    required: false,
    placeholder: 'Enter your company name',
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'select' as const,
    required: true,
    options: [
      { value: 'general', label: 'General Inquiry' },
      { value: 'support', label: 'Technical Support' },
      { value: 'sales', label: 'Sales Inquiry' },
      { value: 'partnership', label: 'Partnership' },
    ],
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea' as const,
    required: true,
    placeholder: 'Enter your message...',
    rows: 4,
  },
];

// Search suggestions ตามแบบ next-ts
const SEARCH_SUGGESTIONS = Array.from({ length: 10 }, (_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  category: ['Documentation', 'Tutorial', 'API', 'Component'][index % 4],
}));

const SEARCH_FILTERS = [
  {
    key: 'category',
    label: 'Category',
    options: ['All', 'Documentation', 'Tutorial', 'API', 'Component']
  },
  {
    key: 'type',
    label: 'Type',
    options: ['All', 'Article', 'Video', 'Example', 'Reference']
  },
  {
    key: 'difficulty',
    label: 'Difficulty',
    options: ['All', 'Beginner', 'Intermediate', 'Advanced']
  },
];

// Demo components ตามแบบ next-ts
function ContactFormDemo() {
  return (
    <div className="max-w-2xl mx-auto">
      <ContactForm
        fields={CONTACT_FORM_FIELDS}
        title="Contact Us"
        description="Fill out the form below and we'll get back to you as soon as possible."
        submitButtonText="Send Message"
        onSubmit={async (data) => {
          console.log('Contact form submitted:', data);
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          alert('Message sent successfully!');
        }}
        className="space-y-6"
      />
    </div>
  );
}

function LoginFormDemo() {
  return (
    <div className="max-w-md mx-auto">
      <LoginForm
        title="Sign In"
        description="Enter your credentials to access your account"
        showRememberMe={true}
        showForgotPassword={true}
        showSignUpLink={true}
        onSubmit={async (credentials) => {
          console.log('Login attempted:', credentials);
          // Simulate login
          await new Promise(resolve => setTimeout(resolve, 1000));
          alert('Login successful!');
        }}
        onForgotPassword={() => {
          alert('Password reset link will be sent to your email');
        }}
        className="p-6 border rounded-lg bg-card"
      />
    </div>
  );
}

function SearchBarDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="font-medium mb-3">Basic Search</h4>
        <SearchBar
          placeholder="Search documentation, tutorials, or examples..."
          suggestions={SEARCH_SUGGESTIONS}
          onSearch={(query) => {
            console.log('Search query:', query);
          }}
          onSuggestionClick={(suggestion) => {
            console.log('Suggestion clicked:', suggestion);
          }}
        />
      </div>

      <div>
        <h4 className="font-medium mb-3">Search with Filters</h4>
        <SearchBar
          placeholder="Search with advanced filters..."
          suggestions={SEARCH_SUGGESTIONS}
          filters={SEARCH_FILTERS}
          showFilters={true}
          onSearch={(query, filters) => {
            console.log('Search with filters:', { query, filters });
          }}
          className="w-full"
        />
      </div>

      <div>
        <h4 className="font-medium mb-3">Search with Categories</h4>
        <SearchBar
          placeholder="Search by category..."
          suggestions={SEARCH_SUGGESTIONS}
          showCategories={true}
          onSearch={(query) => {
            console.log('Category search:', query);
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}

function CountrySelectDemo() {
  const [selectedCountry, setSelectedCountry] = React.useState<string>('');

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Basic Country Select</h4>
          <Select onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="th">Thailand</SelectItem>
              <SelectItem value="jp">Japan</SelectItem>
              <SelectItem value="kr">South Korea</SelectItem>
              <SelectItem value="cn">China</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h4 className="font-medium mb-3">With Default Value</h4>
          <Select defaultValue="th">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">🇺🇸 United States</SelectItem>
              <SelectItem value="th">🇹🇭 Thailand</SelectItem>
              <SelectItem value="jp">🇯🇵 Japan</SelectItem>
              <SelectItem value="kr">🇰🇷 South Korea</SelectItem>
              <SelectItem value="cn">🇨🇳 China</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Searchable with Flags</h4>
        <div className="max-w-md">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Search or select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">🇺🇸 United States (US)</SelectItem>
              <SelectItem value="th">🇹🇭 Thailand (TH)</SelectItem>
              <SelectItem value="jp">🇯🇵 Japan (JP)</SelectItem>
              <SelectItem value="kr">🇰🇷 South Korea (KR)</SelectItem>
              <SelectItem value="cn">🇨🇳 China (CN)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function DateRangePickerDemo() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const presets = [
    { label: 'Today', days: 0 },
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
    { label: 'Last 6 months', days: 180 },
    { label: 'Last year', days: 365 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Basic Date Range</h4>
          <div className="flex gap-2 items-center">
            <Input
              type="date"
              placeholder="Start date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>to</span>
            <Input
              type="date"
              placeholder="End date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">With Presets</h4>
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {presets.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const end = new Date();
                    const start = new Date();
                    start.setDate(end.getDate() - preset.days);
                    setStartDate(start.toISOString().split('T')[0]);
                    setEndDate(end.toISOString().split('T')[0]);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span>to</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Custom Format</h4>
        <div className="max-w-md space-y-2">
          <div className="flex gap-2 flex-wrap">
            {presets.slice(0, 3).map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
              >
                {preset.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <Input type="date" placeholder="dd/mm/yyyy" />
            <span>to</span>
            <Input type="date" placeholder="dd/mm/yyyy" />
          </div>
        </div>
      </div>
    </div>
  );
}

// DEMO_COMPONENTS ตามแบบ next-ts
const DEMO_COMPONENTS = [
  { name: 'Contact Form', component: <ContactFormDemo /> },
  { name: 'Login Form', component: <LoginFormDemo /> },
  { name: 'Search Bar', component: <SearchBarDemo /> },
  { name: 'Country Select', component: <CountrySelectDemo /> },
  { name: 'Date Range Picker', component: <DateRangePickerDemo /> },
];

function FormBlocksDemo() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Form Blocks</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Form component examples following the next-ts implementation patterns.
        </p>
      </div>
    </div>
  );
}

// Meta configuration
const meta: Meta<typeof FormBlocksDemo> = {
  title: 'Blocks/Form',
  component: FormBlocksDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Form component blocks following next-ts implementation patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Main Form View Story
export const FormView: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Form Components</h1>
        <p className="text-muted-foreground">
          Form components for user input and data collection
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
        story: 'Form view component exactly like next-ts implementation with various form types.',
      },
    },
  },
};

// Individual component stories
export const ContactFormExample: Story = {
  render: () => <ContactFormDemo />,
};

export const LoginFormExample: Story = {
  render: () => <LoginFormDemo />,
};

export const SearchExample: Story = {
  render: () => <SearchBarDemo />,
};

export const CountryExample: Story = {
  render: () => <CountrySelectDemo />,
};

export const DateRangeExample: Story = {
  render: () => <DateRangePickerDemo />,
};

// Export data for other stories
export { CONTACT_FORM_FIELDS, SEARCH_SUGGESTIONS, SEARCH_FILTERS, DEMO_COMPONENTS };