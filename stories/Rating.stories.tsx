import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '../src/components/ui/rating';
import { useState } from 'react';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A star rating component that allows users to rate items with customizable precision and styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Current rating value',
    },
    max: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Maximum number of stars',
    },
    precision: {
      control: { type: 'select' },
      options: [1, 0.5],
      description: 'Rating precision (1 = whole stars, 0.5 = half stars)',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size of the rating component',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the rating is read-only',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the rating is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    max: 5,
    precision: 1,
    size: 'default',
  },
};

export const HalfStars: Story = {
  args: {
    value: 3.5,
    max: 5,
    precision: 0.5,
    size: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Small:</span>
        <Rating value={4} size="sm" readOnly />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Default:</span>
        <Rating value={4} size="default" readOnly />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Large:</span>
        <Rating value={4} size="lg" readOnly />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveRating() {
    const [value, setValue] = useState(0);

    return (
      <div className="flex flex-col gap-4">
        <Rating
          value={value}
          onValueChange={setValue}
          precision={0.5}
        />
        <p className="text-sm text-muted-foreground">
          Current rating: {value} stars
        </p>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4.5,
    precision: 0.5,
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 2,
    disabled: true,
  },
};

export const MaxStars: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">5 Stars (Default):</span>
        <Rating value={4} readOnly />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">10 Stars:</span>
        <Rating value={7} max={10} readOnly />
      </div>
    </div>
  ),
};

export const WithForm: Story = {
  render: function FormRating() {
    const [rating, setRating] = useState(0);

    return (
      <form className="flex flex-col gap-4 p-4 border rounded-lg">
        <label className="text-sm font-medium">
          How would you rate this product?
        </label>
        <Rating
          value={rating}
          onValueChange={setRating}
          precision={0.5}
          name="product-rating"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRating(0)}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={rating === 0}
            className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            Submit Rating
          </button>
        </div>
      </form>
    );
  },
};