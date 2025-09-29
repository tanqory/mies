import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../src/components/ui/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A collapsible content component that allows users to show and hide sections of related content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'Whether multiple items can be open at once',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether items can be collapsed when in single mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern and follows best practices for keyboard navigation.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic accordion with single item selection.',
      },
    },
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>General Information</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>This section contains general information about our services.</p>
              <ul className="list-disc list-inside space-y-1">
                <li>24/7 customer support</li>
                <li>Free shipping on orders over $50</li>
                <li>30-day return policy</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Account & Billing</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>Information about your account and billing:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Manage payment methods</li>
                <li>View billing history</li>
                <li>Update account information</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Technical Support</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>Get help with technical issues:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Troubleshooting guides</li>
                <li>API documentation</li>
                <li>Contact technical support</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion that allows multiple items to be open simultaneously.',
      },
    },
  },
};

export const FAQ: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="faq-1">
          <AccordionTrigger>How do I create an account?</AccordionTrigger>
          <AccordionContent>
            <p>To create an account, click the "Sign Up" button in the top right corner of our website. Fill out the required information including your name, email address, and a secure password. You'll receive a confirmation email to verify your account.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
            <p>We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our encrypted payment system.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>How can I track my order?</AccordionTrigger>
          <AccordionContent>
            <p>Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's tracking page. You can also check your order status in your account dashboard.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-4">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            <p>We offer a 30-day return policy for most items. Items must be returned in their original condition with all packaging and accessories. Digital products and personalized items are not eligible for returns. Return shipping costs are the responsibility of the customer unless the item was defective or incorrectly shipped.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-5">
          <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
          <AccordionContent>
            <p>Yes, we ship to over 100 countries worldwide. International shipping costs vary by destination and package weight. Customers are responsible for any customs duties or import taxes. Delivery times typically range from 7-21 business days depending on the destination.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world FAQ example with detailed content.',
      },
    },
  },
};

export const WithDefaultValue: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Accordion type="single" collapsible defaultValue="item-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>Getting Started</AccordionTrigger>
          <AccordionContent>
            Learn the basics of using our platform with this comprehensive guide.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Quick Setup Guide</AccordionTrigger>
          <AccordionContent>
            This section is open by default. Follow these steps to get up and running quickly with our service.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Advanced Features</AccordionTrigger>
          <AccordionContent>
            Discover advanced features and customization options to enhance your experience.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion with a pre-selected default open item.',
      },
    },
  },
};

export const WithRichContent: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Accordion type="single" collapsible>
        <AccordionItem value="features">
          <AccordionTrigger>Product Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance</h4>
                  <p className="text-sm">Lightning fast with optimized performance.</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <h4 className="font-semibold mb-2">Security</h4>
                  <p className="text-sm">Enterprise-grade security protocols.</p>
                </div>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm italic">
                  "This product has transformed our workflow and increased our productivity by 300%."
                </p>
                <p className="text-xs text-muted-foreground mt-2">- Happy Customer</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pricing">
          <AccordionTrigger>Pricing Plans</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Basic Plan</h4>
                    <p className="text-sm text-muted-foreground">Perfect for small teams</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$9</div>
                    <div className="text-sm text-muted-foreground">/month</div>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4 border-primary">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Pro Plan</h4>
                    <p className="text-sm text-muted-foreground">Most popular choice</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$29</div>
                    <div className="text-sm text-muted-foreground">/month</div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion with rich content including cards and structured layouts.',
      },
    },
  },
};