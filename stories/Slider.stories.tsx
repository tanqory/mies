import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../src/components/ui/slider';
import { Label } from '../src/components/ui/label';
import { useState } from 'react';
import { Play, Sliders } from 'lucide-react';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An input where the user selects a value from within a given range.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'object' },
      description: 'The value of the slider when initially rendered',
    },
    value: {
      control: { type: 'object' },
      description: 'The controlled value of the slider',
    },
    min: {
      control: { type: 'number' },
      description: 'The minimum value of the slider',
    },
    max: {
      control: { type: 'number' },
      description: 'The maximum value of the slider',
    },
    step: {
      control: { type: 'number' },
      description: 'The step increment of the slider',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic slider with default settings.',
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState([25]);

    return (
      <div className="w-80 space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="volume">Volume</Label>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider
          id="volume"
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with a label and dynamic value display.',
      },
    },
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = useState([25, 75]);

    return (
      <div className="w-80 space-y-3">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${value[0]} - ${value[1]}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Range slider with two handles for selecting a range of values.',
      },
    },
  },
};

export const Steps: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Step: 1</Label>
          <span className="text-sm text-muted-foreground">50</span>
        </div>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Step: 10</Label>
          <span className="text-sm text-muted-foreground">50</span>
        </div>
        <Slider defaultValue={[50]} max={100} step={10} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Step: 25</Label>
          <span className="text-sm text-muted-foreground">50</span>
        </div>
        <Slider defaultValue={[50]} max={100} step={25} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sliders with different step values.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="space-y-3">
        <Label>Normal</Label>
        <Slider defaultValue={[50]} max={100} />
      </div>

      <div className="space-y-3">
        <Label className="text-muted-foreground">Disabled</Label>
        <Slider defaultValue={[50]} max={100} disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different states of the slider component.',
      },
    },
  },
};

export const CustomRange: Story = {
  render: () => {
    const [temp, setTemp] = useState([68]);
    const [zoom, setZoom] = useState([1]);
    const [opacity, setOpacity] = useState([0.8]);

    return (
      <div className="w-80 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Temperature</Label>
            <span className="text-sm text-muted-foreground">{temp[0]}°F</span>
          </div>
          <Slider
            value={temp}
            onValueChange={setTemp}
            min={32}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Zoom Level</Label>
            <span className="text-sm text-muted-foreground">{zoom[0]}x</span>
          </div>
          <Slider
            value={zoom}
            onValueChange={setZoom}
            min={0.1}
            max={5}
            step={0.1}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Opacity</Label>
            <span className="text-sm text-muted-foreground">{Math.round(opacity[0] * 100)}%</span>
          </div>
          <Slider
            value={opacity}
            onValueChange={setOpacity}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Sliders with custom ranges and decimal values.',
      },
    },
  },
};

export const MediaControls: Story = {
  render: () => {
    const [volume, setVolume] = useState([75]);
    const [progress, setProgress] = useState([45]);
    const [balance, setBalance] = useState([0]);

    return (
      <div className="w-80 space-y-6 p-4 border rounded-lg">
        <h3 className="font-semibold">Media Player</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              🔊 Volume
            </Label>
            <span className="text-sm text-muted-foreground">{volume[0]}%</span>
          </div>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Play className="h-4 w-4" />Progress
            </Label>
            <span className="text-sm text-muted-foreground">{progress[0]}%</span>
          </div>
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />Balance
            </Label>
            <span className="text-sm text-muted-foreground">
              {balance[0] === 0 ? 'Center' : balance[0] > 0 ? `R+${balance[0]}` : `L${balance[0]}`}
            </span>
          </div>
          <Slider
            value={balance}
            onValueChange={setBalance}
            min={-10}
            max={10}
            step={1}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Sliders used in a media player interface.',
      },
    },
  },
};

export const FilterPanel: Story = {
  render: () => {
    const [price, setPrice] = useState([0, 500]);
    const [rating, setRating] = useState([3]);
    const [distance, setDistance] = useState([25]);

    return (
      <div className="w-80 space-y-6 p-4 border rounded-lg">
        <h3 className="font-semibold">Search Filters</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Price Range</Label>
            <span className="text-sm text-muted-foreground">
              ${price[0]} - ${price[1]}
            </span>
          </div>
          <Slider
            value={price}
            onValueChange={setPrice}
            max={1000}
            step={10}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Minimum Rating</Label>
            <span className="text-sm text-muted-foreground">
              {rating[0]}+ stars
            </span>
          </div>
          <Slider
            value={rating}
            onValueChange={setRating}
            min={1}
            max={5}
            step={1}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Distance</Label>
            <span className="text-sm text-muted-foreground">
              {distance[0]} miles
            </span>
          </div>
          <Slider
            value={distance}
            onValueChange={setDistance}
            min={1}
            max={100}
            step={1}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Sliders used in a search filter panel.',
      },
    },
  },
};