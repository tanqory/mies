import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src/components/ui/checkbox';
import { Label } from '../src/components/ui/label';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A checkbox component for binary choices with indeterminate state support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked" defaultChecked />
        <Label htmlFor="checked">Checked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="indeterminate" checked="indeterminate" />
        <Label htmlFor="indeterminate">Indeterminate</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="text-muted-foreground">Disabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="text-muted-foreground">Disabled (Checked)</Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different states of the checkbox component.',
      },
    },
  },
};

export const Controlled: Story = {
  render: function ControlledCheckbox() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="controlled">Controlled checkbox</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          State: {checked ? 'Checked' : 'Unchecked'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled checkbox with state management.',
      },
    },
  },
};

export const CheckboxGroup: Story = {
  render: function CheckboxGroup() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const items = [
      { id: 'apple', label: 'Apple' },
      { id: 'banana', label: 'Banana' },
      { id: 'cherry', label: 'Cherry' },
      { id: 'date', label: 'Date' },
    ];

    const handleItemChange = (itemId: string, checked: boolean) => {
      if (checked) {
        setSelectedItems([...selectedItems, itemId]);
      } else {
        setSelectedItems(selectedItems.filter(id => id !== itemId));
      }
    };

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Select your favorite fruits:</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={selectedItems.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleItemChange(item.id, checked as boolean)
                }
              />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Selected: {selectedItems.length > 0 ? selectedItems.join(', ') : 'None'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple checkboxes working as a group.',
      },
    },
  },
};

export const WithSelectAll: Story = {
  render: function CheckboxWithSelectAll() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const items = [
      { id: 'read', label: 'Read permissions' },
      { id: 'write', label: 'Write permissions' },
      { id: 'execute', label: 'Execute permissions' },
      { id: 'delete', label: 'Delete permissions' },
    ];

    const allSelected = selectedItems.length === items.length;
    const someSelected = selectedItems.length > 0 && selectedItems.length < items.length;

    const handleSelectAll = () => {
      if (allSelected) {
        setSelectedItems([]);
      } else {
        setSelectedItems(items.map(item => item.id));
      }
    };

    const handleItemChange = (itemId: string, checked: boolean) => {
      if (checked) {
        setSelectedItems([...selectedItems, itemId]);
      } else {
        setSelectedItems(selectedItems.filter(id => id !== itemId));
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b">
          <Checkbox
            id="select-all"
            checked={allSelected ? true : someSelected ? 'indeterminate' : false}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="select-all" className="font-medium">
            Select All Permissions
          </Label>
        </div>
        <div className="space-y-2 pl-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={selectedItems.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleItemChange(item.id, checked as boolean)
                }
              />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {selectedItems.length} of {items.length} permissions selected
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox group with "Select All" functionality and indeterminate state.',
      },
    },
  },
};

export const InForm: Story = {
  render: function CheckboxInForm() {
    const [formData, setFormData] = useState({
      newsletter: false,
      terms: false,
      privacy: false,
      marketing: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert('Check console for form data');
    };

    const canSubmit = formData.terms && formData.privacy;

    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <h3 className="text-lg font-medium">Account Preferences</h3>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, newsletter: checked as boolean })
              }
            />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="marketing"
              checked={formData.marketing}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, marketing: checked as boolean })
              }
            />
            <Label htmlFor="marketing">Receive marketing emails</Label>
          </div>

          <div className="border-t pt-3 space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.terms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, terms: checked as boolean })
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Accept terms and conditions*
                </Label>
                <p className="text-xs text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="privacy"
                checked={formData.privacy}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, privacy: checked as boolean })
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="privacy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Privacy Policy*
                </Label>
                <p className="text-xs text-muted-foreground">
                  Acknowledge that you have read our privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </button>

        {!canSubmit && (
          <p className="text-xs text-muted-foreground">
            * Required fields must be checked to proceed
          </p>
        )}
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes used in a form context with validation.',
      },
    },
  },
};