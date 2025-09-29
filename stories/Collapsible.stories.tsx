import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../src/components/ui/collapsible';
import { Button } from '../src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Badge } from '../src/components/ui/badge';
import { ChevronDown, Settings, User, CreditCard, Bell, HelpCircle, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An interactive component which expands/collapses a panel.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the collapsible',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The open state of the collapsible when it is initially rendered',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[350px]">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between">
            Can I use this in my project?
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            Yes. Free to use for personal and commercial projects. No attribution required.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic collapsible component with a simple question and answer.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-[350px] space-y-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            size="sm"
          >
            {isOpen ? 'Close' : 'Open'} Details
          </Button>
          <span className="text-sm text-muted-foreground">
            Status: {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between">
              Project Details
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 space-y-2">
              <p className="text-sm">
                <strong>Project Name:</strong> Website Redesign
              </p>
              <p className="text-sm">
                <strong>Due Date:</strong> March 15, 2024
              </p>
              <p className="text-sm">
                <strong>Status:</strong> In Progress
              </p>
              <p className="text-sm">
                <strong>Team Members:</strong> 4 people
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled collapsible with external button to toggle state.',
      },
    },
  },
};

export const FAQ: Story = {
  render: () => (
    <div className="w-[500px] space-y-2">
      <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>

      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between text-left h-auto p-4">
            <span>What is your refund policy?</span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 text-sm text-muted-foreground">
            We offer a 30-day money-back guarantee. If you're not satisfied with your purchase,
            contact our support team within 30 days for a full refund.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t" />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between text-left h-auto p-4">
            <span>How do I cancel my subscription?</span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 text-sm text-muted-foreground">
            You can cancel your subscription at any time from your account settings.
            Go to Billing → Subscription → Cancel Subscription.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t" />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between text-left h-auto p-4">
            <span>Do you offer enterprise pricing?</span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 text-sm text-muted-foreground">
            Yes! We offer custom enterprise pricing for teams of 50+ users.
            Contact our sales team at enterprise@example.com for a quote.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t" />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between text-left h-auto p-4">
            <span>Is my data secure?</span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 text-sm text-muted-foreground">
            Absolutely. We use industry-standard encryption and security practices.
            Your data is encrypted in transit and at rest, and we're SOC 2 compliant.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FAQ section with multiple collapsible items.',
      },
    },
  },
};

export const SettingsPanel: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between h-auto p-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4" />
                <span>Profile Information</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-3 pb-3 space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <input
                  type="text"
                  className="w-full h-8 px-3 text-sm border rounded-md"
                  defaultValue="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  className="w-full px-3 py-2 text-sm border rounded-md"
                  rows={2}
                  defaultValue="Software developer passionate about UI/UX"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between h-auto p-3">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-3 pb-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email notifications</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push notifications</span>
                <input type="checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS notifications</span>
                <input type="checkbox" />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between h-auto p-3">
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-3 pb-3 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Current Plan</span>
                <Badge>Pro</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Next billing date</span>
                <span className="text-sm text-muted-foreground">March 15, 2024</span>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                Manage Billing
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between h-auto p-3">
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4" />
                <span>Advanced</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-3 pb-3 space-y-3">
              <Button size="sm" variant="outline" className="w-full">
                Export Data
              </Button>
              <Button size="sm" variant="destructive" className="w-full">
                Delete Account
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Settings panel with collapsible sections for different categories.',
      },
    },
  },
};

export const ProjectList: Story = {
  render: () => {
    const projects = [
      {
        name: 'Website Redesign',
        status: 'In Progress',
        tasks: 12,
        completed: 8,
        team: ['John', 'Sarah', 'Mike']
      },
      {
        name: 'Mobile App',
        status: 'Planning',
        tasks: 8,
        completed: 2,
        team: ['Alice', 'Bob']
      },
      {
        name: 'API Integration',
        status: 'Complete',
        tasks: 5,
        completed: 5,
        team: ['Charlie', 'David', 'Eve']
      }
    ];

    return (
      <div className="w-[450px] space-y-2">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        {projects.map((project, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex w-full justify-between h-auto p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-muted-foreground">{project.status}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={project.status === 'Complete' ? 'default' : 'secondary'}>
                    {project.completed}/{project.tasks}
                  </Badge>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 border border-t-0 rounded-b-lg space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((project.completed / project.tasks) * 100)}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(project.completed / project.tasks) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Team Members</div>
                  <div className="flex gap-1">
                    {project.team.map((member, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm">Edit Project</Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Project list with expandable details for each project.',
      },
    },
  },
};

export const CustomTrigger: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-[350px]">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              <span className="flex-1 text-left">Show/Hide Details</span>
              {isOpen ? (
                <Minus className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Created:</span>
                    <span className="text-sm text-muted-foreground">March 1, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last modified:</span>
                    <span className="text-sm text-muted-foreground">March 10, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Size:</span>
                    <span className="text-sm text-muted-foreground">2.4 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Type:</span>
                    <span className="text-sm text-muted-foreground">Document</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsible with custom trigger using plus/minus icons.',
      },
    },
  },
};