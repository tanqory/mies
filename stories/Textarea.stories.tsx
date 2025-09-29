import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../src/components/ui/textarea';
import { Label } from '../src/components/ui/label';
import { Button } from '../src/components/ui/button';
import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A multi-line text input field.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'The number of visible text lines',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default textarea component.',
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea with an associated label.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Textarea placeholder="This textarea is disabled." disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled textarea component.',
      },
    },
  },
};

export const WithText: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        defaultValue="This is some default text that appears in the textarea when it loads."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea with default text content.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <Label>Small (2 rows)</Label>
        <Textarea placeholder="Small textarea..." rows={2} />
      </div>
      <div className="space-y-2">
        <Label>Medium (4 rows)</Label>
        <Textarea placeholder="Medium textarea..." rows={4} />
      </div>
      <div className="space-y-2">
        <Label>Large (6 rows)</Label>
        <Textarea placeholder="Large textarea..." rows={6} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textareas with different row heights.',
      },
    },
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 280;

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="tweet">What's happening?</Label>
        <Textarea
          id="tweet"
          placeholder="What's on your mind?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Share your thoughts</span>
          <span>{value.length}/{maxLength}</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with character count and maximum length.',
      },
    },
  },
};

export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    };

    return (
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <input
            id="contact-name"
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            placeholder="Your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <input
            id="contact-email"
            type="email"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
            placeholder="your.email@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            placeholder="Tell us what you're thinking about..."
            value={formData.message}
            onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
            rows={4}
            required
          />
        </div>
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea used in a contact form.',
      },
    },
  },
};

export const CommentBox: Story = {
  render: () => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([
      { id: 1, text: 'Great post! Thanks for sharing.', author: 'John Doe' },
      { id: 2, text: 'Very informative. Looking forward to more content like this.', author: 'Jane Smith' }
    ]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (comment.trim()) {
        setComments(prev => [...prev, {
          id: prev.length + 1,
          text: comment,
          author: 'You'
        }]);
        setComment('');
      }
    };

    return (
      <div className="w-96 space-y-4">
        <h3 className="text-lg font-semibold">Comments</h3>

        <div className="space-y-3">
          {comments.map(comment => (
            <div key={comment.id} className="border-l-2 border-muted pl-4 py-2">
              <p className="text-sm">{comment.text}</p>
              <p className="text-xs text-muted-foreground mt-1">— {comment.author}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="new-comment">Add a comment</Label>
            <Textarea
              id="new-comment"
              placeholder="What do you think?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {comment.length} characters
            </span>
            <Button type="submit" disabled={!comment.trim()}>
              Post Comment
            </Button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive comment box with existing comments.',
      },
    },
  },
};

export const CodeEditor: Story = {
  render: () => {
    const [code, setCode] = useState(`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`);

    return (
      <div className="w-96 space-y-2">
        <Label htmlFor="code-editor">JavaScript Code</Label>
        <Textarea
          id="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="font-mono text-sm"
          rows={8}
          placeholder="Enter your code here..."
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Lines: {code.split('\n').length}</span>
          <span>Characters: {code.length}</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea configured for code input with monospace font.',
      },
    },
  },
};