import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from '../src/components/ui/autocomplete';
import { useState } from 'react';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An autocomplete component that combines a text input with a dropdown of suggested options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when value is selected',
    },
    creatable: {
      control: 'boolean',
      description: 'Allow creating new options',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
  { label: 'Honeydew', value: 'honeydew' },
];

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'South Korea', value: 'kr' },
];

const groupedOptions = [
  { label: 'Apple', value: 'apple', group: 'Fruits' },
  { label: 'Banana', value: 'banana', group: 'Fruits' },
  { label: 'Cherry', value: 'cherry', group: 'Fruits' },
  { label: 'Carrot', value: 'carrot', group: 'Vegetables' },
  { label: 'Broccoli', value: 'broccoli', group: 'Vegetables' },
  { label: 'Spinach', value: 'spinach', group: 'Vegetables' },
  { label: 'Chicken', value: 'chicken', group: 'Meat' },
  { label: 'Beef', value: 'beef', group: 'Meat' },
  { label: 'Fish', value: 'fish', group: 'Meat' },
];

export const Default: Story = {
  args: {
    options: fruits,
    placeholder: 'Select a fruit...',
  },
};

export const Multiple: Story = {
  args: {
    options: fruits,
    multiple: true,
    placeholder: 'Select fruits...',
    clearable: true,
  },
};

export const Clearable: Story = {
  args: {
    options: countries,
    placeholder: 'Select a country...',
    clearable: true,
    defaultValue: 'us',
  },
};

export const Creatable: Story = {
  render: function CreatableAutocomplete() {
    const [options, setOptions] = useState(fruits);
    const [value, setValue] = useState<string>();

    const handleCreateOption = (inputValue: string) => {
      const newOption = {
        label: inputValue,
        value: inputValue.toLowerCase().replace(/\s+/g, '-'),
      };
      setOptions([...options, newOption]);
      setValue(newOption.value);
    };

    return (
      <div className="w-80">
        <Autocomplete
          options={options}
          value={value}
          onValueChange={setValue}
          placeholder="Select or create a fruit..."
          creatable
          onCreateOption={handleCreateOption}
          clearable
        />
        <p className="text-xs text-muted-foreground mt-2">
          Type something that doesn't exist and press Enter to create it
        </p>
      </div>
    );
  },
};

export const Grouped: Story = {
  args: {
    options: groupedOptions,
    placeholder: 'Select food...',
  },
};

export const MultipleGrouped: Story = {
  args: {
    options: groupedOptions,
    multiple: true,
    placeholder: 'Select foods...',
    clearable: true,
  },
};

export const Loading: Story = {
  args: {
    options: [],
    loading: true,
    placeholder: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    options: fruits,
    disabled: true,
    placeholder: 'Disabled autocomplete',
    defaultValue: 'apple',
  },
};

export const CustomMessages: Story = {
  args: {
    options: fruits,
    placeholder: 'Search fruits...',
    searchPlaceholder: 'Type to search fruits...',
    emptyText: 'No fruits found. Try a different search term.',
  },
};

export const WithSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <label className="text-sm font-medium">Small</label>
        <Autocomplete
          options={fruits}
          size="sm"
          placeholder="Small autocomplete"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Default</label>
        <Autocomplete
          options={fruits}
          size="default"
          placeholder="Default autocomplete"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Large</label>
        <Autocomplete
          options={fruits}
          size="lg"
          placeholder="Large autocomplete"
        />
      </div>
    </div>
  ),
};

export const ControlledExample: Story = {
  render: function ControlledAutocomplete() {
    const [singleValue, setSingleValue] = useState<string>('');
    const [multipleValue, setMultipleValue] = useState<string[]>([]);

    return (
      <div className="flex flex-col gap-6 w-80">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Single Selection
          </label>
          <Autocomplete
            options={fruits}
            value={singleValue}
            onValueChange={setSingleValue}
            placeholder="Select a fruit..."
            clearable
          />
          <p className="text-xs text-muted-foreground mt-1">
            Selected: {singleValue || 'None'}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Multiple Selection
          </label>
          <Autocomplete
            options={fruits}
            value={multipleValue}
            onValueChange={setMultipleValue}
            multiple
            placeholder="Select fruits..."
            clearable
          />
          <p className="text-xs text-muted-foreground mt-1">
            Selected: {multipleValue.length ? multipleValue.join(', ') : 'None'}
          </p>
        </div>
      </div>
    );
  },
};

export const AsyncExample: Story = {
  render: function AsyncAutocomplete() {
    const [options, setOptions] = useState<Array<{label: string, value: string}>>([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<string>();

    // Simulate async data loading
    const loadOptions = async (searchTerm: string) => {
      if (!searchTerm) {
        setOptions([]);
        return;
      }

      setLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const filtered = fruits.filter(fruit =>
        fruit.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setOptions(filtered);
      setLoading(false);
    };

    return (
      <div className="w-80">
        <Autocomplete
          options={options}
          value={value}
          onValueChange={setValue}
          loading={loading}
          placeholder="Type to search..."
          searchPlaceholder="Search for fruits..."
          emptyText="No fruits found"
        />
        <p className="text-xs text-muted-foreground mt-2">
          This simulates async data loading. Type to trigger the search.
        </p>
      </div>
    );
  },
};