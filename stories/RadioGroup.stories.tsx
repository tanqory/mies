import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '../src/components/ui/radio-group';
import { Label } from '../src/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Badge } from '../src/components/ui/badge';
import { CreditCard, Truck, Zap, Apple } from 'lucide-react';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The value of the radio item that should be checked when initially rendered',
    },
    value: {
      control: 'text',
      description: 'The controlled value of the radio item to check',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the component',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic radio group with three options.',
      },
    },
  },
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" orientation="horizontal" className="flex space-x-6">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio group arranged horizontally.',
      },
    },
  },
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="starter" className="space-y-4">
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="starter" id="starter" className="mt-1" />
        <div className="space-y-1">
          <Label htmlFor="starter" className="text-base font-medium">
            Starter Plan
          </Label>
          <p className="text-sm text-muted-foreground">
            Perfect for individuals and small teams getting started.
          </p>
          <div className="text-lg font-bold">$9/month</div>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="pro" id="pro" className="mt-1" />
        <div className="space-y-1">
          <Label htmlFor="pro" className="text-base font-medium">
            Pro Plan
          </Label>
          <p className="text-sm text-muted-foreground">
            Advanced features for growing businesses and teams.
          </p>
          <div className="text-lg font-bold">$29/month</div>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
        <div className="space-y-1">
          <Label htmlFor="enterprise" className="text-base font-medium">
            Enterprise Plan
          </Label>
          <p className="text-sm text-muted-foreground">
            Custom solutions for large organizations with dedicated support.
          </p>
          <div className="text-lg font-bold">Contact us</div>
        </div>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio group with detailed descriptions and pricing.',
      },
    },
  },
};

export const PaymentMethods: Story = {
  render: () => (
    <div className="w-96">
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
      <RadioGroup defaultValue="card" className="space-y-3">
        <div className="flex items-center space-x-3 p-3 border rounded-lg">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
            <CreditCard className="h-5 w-5" />
            <div>
              <div className="font-medium">Credit or Debit Card</div>
              <div className="text-sm text-muted-foreground">Visa, Mastercard, American Express</div>
            </div>
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-3 border rounded-lg">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal" className="flex items-center gap-3 cursor-pointer flex-1">
            <div className="h-5 w-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
              P
            </div>
            <div>
              <div className="font-medium">PayPal</div>
              <div className="text-sm text-muted-foreground">Pay with your PayPal account</div>
            </div>
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-3 border rounded-lg">
          <RadioGroupItem value="apple" id="apple" />
          <Label htmlFor="apple" className="flex items-center gap-3 cursor-pointer flex-1">
            <div className="h-5 w-5 bg-black rounded flex items-center justify-center text-white">
              <Apple className="h-3 w-3" />
            </div>
            <div>
              <div className="font-medium">Apple Pay</div>
              <div className="text-sm text-muted-foreground">Touch ID or Face ID required</div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Payment method selection with icons and descriptions.',
      },
    },
  },
};

export const ShippingOptions: Story = {
  render: () => (
    <div className="w-96">
      <h3 className="text-lg font-semibold mb-4">Shipping Options</h3>
      <RadioGroup defaultValue="standard" className="space-y-3">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard" className="cursor-pointer">
              <div className="font-medium">Standard Shipping</div>
              <div className="text-sm text-muted-foreground">5-7 business days</div>
            </Label>
          </div>
          <Badge variant="outline">Free</Badge>
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="express" id="express" />
            <Label htmlFor="express" className="cursor-pointer">
              <div className="font-medium flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Express Shipping
              </div>
              <div className="text-sm text-muted-foreground">2-3 business days</div>
            </Label>
          </div>
          <Badge>$9.99</Badge>
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="overnight" id="overnight" />
            <Label htmlFor="overnight" className="cursor-pointer">
              <div className="font-medium flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Overnight Delivery
              </div>
              <div className="text-sm text-muted-foreground">Next business day</div>
            </Label>
          </div>
          <Badge>$24.99</Badge>
        </div>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shipping options with pricing and delivery times.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium">Normal State</h4>
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="normal-1" />
            <Label htmlFor="normal-1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="normal-2" />
            <Label htmlFor="normal-2">Option 2</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-muted-foreground">Disabled State</h4>
        <RadioGroup disabled defaultValue="disabled-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disabled-1" id="disabled-1" />
            <Label htmlFor="disabled-1" className="text-muted-foreground">
              Disabled Option 1
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disabled-2" id="disabled-2" />
            <Label htmlFor="disabled-2" className="text-muted-foreground">
              Disabled Option 2
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio group in normal and disabled states.',
      },
    },
  },
};

export const SurveyQuestion: Story = {
  render: () => (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Customer Satisfaction Survey</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-medium">
            How satisfied are you with our service?
          </Label>
          <RadioGroup defaultValue="satisfied">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="very-satisfied" id="very-satisfied" />
              <Label htmlFor="very-satisfied">Very Satisfied</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="satisfied" id="satisfied" />
              <Label htmlFor="satisfied">Satisfied</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neutral" id="neutral" />
              <Label htmlFor="neutral">Neutral</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dissatisfied" id="dissatisfied" />
              <Label htmlFor="dissatisfied">Dissatisfied</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="very-dissatisfied" id="very-dissatisfied" />
              <Label htmlFor="very-dissatisfied">Very Dissatisfied</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">
            How likely are you to recommend us to others?
          </Label>
          <RadioGroup defaultValue="likely" orientation="horizontal" className="flex flex-wrap gap-4">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex items-center space-x-1">
                <RadioGroupItem value={`${i + 1}`} id={`rating-${i + 1}`} />
                <Label htmlFor={`rating-${i + 1}`} className="text-sm">{i + 1}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Not likely</span>
            <span>Very likely</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Survey form with different types of radio group questions.',
      },
    },
  },
};