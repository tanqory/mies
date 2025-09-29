import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../src/components/ui/toggle';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote, Code, Star, Heart, Bookmark } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A two-state button that can be either on or off.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
      description: 'The visual variant of the toggle',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
      description: 'The size of the toggle',
    },
    pressed: {
      control: 'boolean',
      description: 'The controlled pressed state of the toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default toggle button.',
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <Toggle aria-label="Bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle with an icon.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle variant="default" aria-label="Bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different toggle variants.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm" aria-label="Small">
        <Bold className="h-3 w-3" />
      </Toggle>
      <Toggle size="default" aria-label="Default">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        <Bold className="h-5 w-5" />
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different toggle sizes.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle aria-label="Normal">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle pressed aria-label="Pressed">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle disabled aria-label="Disabled">
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle disabled pressed aria-label="Disabled Pressed">
        <Code className="h-4 w-4" />
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different toggle states including pressed and disabled.',
      },
    },
  },
};

export const TextFormatting: Story = {
  render: () => {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-1 p-1 border rounded-lg">
          <Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={italic} onPressedChange={setItalic} aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={underline} onPressedChange={setUnderline} aria-label="Underline">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="p-4 border rounded-lg">
          <p className={`
            ${bold ? 'font-bold' : ''}
            ${italic ? 'italic' : ''}
            ${underline ? 'underline' : ''}
          `}>
            This text will reflect the formatting options selected above.
            Try toggling the formatting buttons to see the changes!
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive text formatting toolbar with live preview.',
      },
    },
  },
};

export const TextAlignment: Story = {
  render: () => {
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-1 p-1 border rounded-lg">
          <Toggle
            pressed={alignment === 'left'}
            onPressedChange={() => setAlignment('left')}
            aria-label="Align left"
          >
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={alignment === 'center'}
            onPressedChange={() => setAlignment('center')}
            aria-label="Align center"
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={alignment === 'right'}
            onPressedChange={() => setAlignment('right')}
            aria-label="Align right"
          >
            <AlignRight className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="p-4 border rounded-lg">
          <p className={`text-${alignment}`}>
            This paragraph demonstrates the text alignment feature.
            The alignment will change based on your selection above.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Text alignment toolbar with mutually exclusive toggles.',
      },
    },
  },
};

export const EditorToolbar: Story = {
  render: () => {
    const [formatting, setFormatting] = useState({
      bold: false,
      italic: false,
      underline: false,
      code: false,
      quote: false,
      list: false,
      orderedList: false,
    });

    const updateFormatting = (key: keyof typeof formatting) => {
      setFormatting(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-1 p-2 border rounded-lg">
          {/* Text formatting */}
          <div className="flex items-center gap-1">
            <Toggle
              pressed={formatting.bold}
              onPressedChange={() => updateFormatting('bold')}
              aria-label="Bold"
              size="sm"
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={formatting.italic}
              onPressedChange={() => updateFormatting('italic')}
              aria-label="Italic"
              size="sm"
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={formatting.underline}
              onPressedChange={() => updateFormatting('underline')}
              aria-label="Underline"
              size="sm"
            >
              <Underline className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={formatting.code}
              onPressedChange={() => updateFormatting('code')}
              aria-label="Code"
              size="sm"
            >
              <Code className="h-4 w-4" />
            </Toggle>
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Block formatting */}
          <div className="flex items-center gap-1">
            <Toggle
              pressed={formatting.quote}
              onPressedChange={() => updateFormatting('quote')}
              aria-label="Quote"
              size="sm"
            >
              <Quote className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={formatting.list}
              onPressedChange={() => updateFormatting('list')}
              aria-label="Bullet list"
              size="sm"
            >
              <List className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={formatting.orderedList}
              onPressedChange={() => updateFormatting('orderedList')}
              aria-label="Numbered list"
              size="sm"
            >
              <ListOrdered className="h-4 w-4" />
            </Toggle>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Active formatting: {Object.entries(formatting)
            .filter(([_, active]) => active)
            .map(([key]) => key)
            .join(', ') || 'None'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Rich text editor toolbar with multiple formatting options.',
      },
    },
  },
};

export const FavoriteActions: Story = {
  render: () => {
    const [favorites, setFavorites] = useState({
      star: false,
      heart: false,
      bookmark: false,
    });

    const toggleFavorite = (type: keyof typeof favorites) => {
      setFavorites(prev => ({ ...prev, [type]: !prev[type] }));
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Toggle
            variant="outline"
            pressed={favorites.star}
            onPressedChange={() => toggleFavorite('star')}
            aria-label="Star"
          >
            <Star className={`h-4 w-4 ${favorites.star ? 'fill-current' : ''}`} />
            Star
          </Toggle>

          <Toggle
            variant="outline"
            pressed={favorites.heart}
            onPressedChange={() => toggleFavorite('heart')}
            aria-label="Like"
          >
            <Heart className={`h-4 w-4 ${favorites.heart ? 'fill-current text-red-500' : ''}`} />
            Like
          </Toggle>

          <Toggle
            variant="outline"
            pressed={favorites.bookmark}
            onPressedChange={() => toggleFavorite('bookmark')}
            aria-label="Bookmark"
          >
            <Bookmark className={`h-4 w-4 ${favorites.bookmark ? 'fill-current' : ''}`} />
            Bookmark
          </Toggle>
        </div>

        <div className="text-sm text-muted-foreground">
          {Object.entries(favorites).some(([_, active]) => active) ? (
            <span>
              You've marked this as: {Object.entries(favorites)
                .filter(([_, active]) => active)
                .map(([key]) => key)
                .join(', ')}
            </span>
          ) : (
            <span>No actions selected</span>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Favorite/action toggles with text labels and visual feedback.',
      },
    },
  },
};

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Toggle aria-label="Bold with text">
          <Bold className="mr-2 h-4 w-4" />
          Bold
        </Toggle>
        <Toggle variant="outline" aria-label="Italic with text">
          <Italic className="mr-2 h-4 w-4" />
          Italic
        </Toggle>
      </div>

      <div className="flex items-center gap-2">
        <Toggle size="sm" aria-label="Small with text">
          <Code className="mr-2 h-3 w-3" />
          Code
        </Toggle>
        <Toggle size="lg" aria-label="Large with text">
          <Quote className="mr-2 h-5 w-5" />
          Quote
        </Toggle>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggles with both icons and text labels.',
      },
    },
  },
};