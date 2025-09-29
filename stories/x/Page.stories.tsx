import type { Meta, StoryObj } from "@storybook/react"
import { Plus, Download, Edit, Trash2, Settings, ChevronRight } from "lucide-react"
import { Page } from "../../src/x"
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card"
import { Badge } from "../../src/components/ui/badge"

const meta: Meta<typeof Page> = {
  title: "Mies X/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "select" },
      options: ["default", "full", "narrow"],
    },
    spacing: {
      control: { type: "select" },
      options: ["none", "sm", "default", "lg"],
    },
    fullWidth: {
      control: { type: "boolean" },
    },
    narrowWidth: {
      control: { type: "boolean" },
    },
    titleHidden: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Products",
    children: (
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your products will appear here.</p>
        </CardContent>
      </Card>
    ),
  },
}

export const WithSubtitle: Story = {
  args: {
    title: "Customer Analytics",
    subtitle: "Track customer behavior and engagement metrics",
    children: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Metric {i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-muted-foreground">Total this month</p>
            </CardContent>
          </Card>
        ))}
      </div>
    ),
  },
}

export const WithPrimaryAction: Story = {
  args: {
    title: "Orders",
    subtitle: "Manage your store orders",
    primaryAction: {
      content: "Create order",
      onAction: () => console.log("Create order"),
      icon: <Plus className="h-4 w-4" />,
      primary: true,
    },
    children: (
      <Card>
        <CardContent className="p-6">
          <p>Recent orders will be displayed here.</p>
        </CardContent>
      </Card>
    ),
  },
}

export const WithSecondaryActions: Story = {
  args: {
    title: "Product Details",
    subtitle: "Manage your product information",
    primaryAction: {
      content: "Save",
      onAction: () => console.log("Save product"),
      primary: true,
    },
    secondaryActions: [
      {
        content: "Export",
        onAction: () => console.log("Export"),
        icon: <Download className="h-4 w-4" />,
      },
      {
        content: "Duplicate",
        onAction: () => console.log("Duplicate"),
      },
    ],
    children: (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Product title, description, and other basic details.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Set product pricing and cost information.</p>
          </CardContent>
        </Card>
      </div>
    ),
  },
}

export const WithActionGroups: Story = {
  args: {
    title: "Inventory Management",
    subtitle: "Track and manage your stock levels",
    primaryAction: {
      content: "Add inventory",
      onAction: () => console.log("Add inventory"),
      primary: true,
    },
    actionGroups: [
      {
        title: "Actions",
        actions: [
          {
            content: "Import inventory",
            onAction: () => console.log("Import"),
            icon: <Download className="h-4 w-4" />,
          },
          {
            content: "Export inventory",
            onAction: () => console.log("Export"),
            icon: <ChevronRight className="h-4 w-4" />,
          },
        ],
      },
      {
        title: "Settings",
        actions: [
          {
            content: "Configure alerts",
            onAction: () => console.log("Configure"),
            icon: <Settings className="h-4 w-4" />,
          },
        ],
      },
    ],
    children: (
      <Card>
        <CardContent className="p-6">
          <p>Inventory tracking interface would go here.</p>
        </CardContent>
      </Card>
    ),
  },
}

export const WithBreadcrumb: Story = {
  args: {
    title: "Edit Product",
    subtitle: "Update product information",
    backAction: {
      content: "Products",
      onAction: () => console.log("Back to products"),
    },
    primaryAction: {
      content: "Save changes",
      onAction: () => console.log("Save"),
      primary: true,
    },
    secondaryActions: [
      {
        content: "Preview",
        onAction: () => console.log("Preview"),
      },
    ],
    children: (
      <Card>
        <CardHeader>
          <CardTitle>Product Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Product editing form would be here.</p>
        </CardContent>
      </Card>
    ),
  },
}

export const WithPagination: Story = {
  args: {
    title: "All Orders",
    subtitle: "View and manage customer orders",
    pagination: {
      hasPrevious: true,
      hasNext: true,
      onPrevious: () => console.log("Previous page"),
      onNext: () => console.log("Next page"),
    },
    primaryAction: {
      content: "Create order",
      onAction: () => console.log("Create order"),
      primary: true,
    },
    children: (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded">
                <div>
                  <div className="font-medium">Order #{1000 + i}</div>
                  <div className="text-sm text-muted-foreground">Customer Name</div>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ),
  },
}

export const WithTitleMetadata: Story = {
  args: {
    title: "Premium Plan",
    titleMetadata: <Badge variant="secondary">Active</Badge>,
    subtitle: "Manage your subscription and billing",
    primaryAction: {
      content: "Upgrade",
      onAction: () => console.log("Upgrade"),
      primary: true,
    },
    children: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Current month usage statistics.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Billing history and payment methods.</p>
          </CardContent>
        </Card>
      </div>
    ),
  },
}

export const FullWidth: Story = {
  args: {
    title: "Dashboard",
    subtitle: "Overview of your store performance",
    fullWidth: true,
    primaryAction: {
      content: "View reports",
      onAction: () => console.log("View reports"),
    },
    children: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Metric {i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{(Math.random() * 10000).toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        ))}
      </div>
    ),
  },
}

export const NarrowWidth: Story = {
  args: {
    title: "Account Settings",
    subtitle: "Manage your personal preferences",
    narrowWidth: true,
    primaryAction: {
      content: "Save settings",
      onAction: () => console.log("Save settings"),
      primary: true,
    },
    children: (
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full p-2 border rounded" defaultValue="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="w-full p-2 border rounded" defaultValue="john@example.com" />
          </div>
        </CardContent>
      </Card>
    ),
  },
}

export const WithUrlActions: Story = {
  args: {
    title: "Documentation",
    subtitle: "Learn how to use our platform",
    primaryAction: {
      content: "View API docs",
      url: "https://api.example.com/docs",
      external: true,
    },
    secondaryActions: [
      {
        content: "Support center",
        url: "/support",
      },
      {
        content: "Community",
        url: "https://community.example.com",
        external: true,
      },
    ],
    children: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Quick start guide for new users.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>API Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Complete API documentation.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Code examples and tutorials.</p>
          </CardContent>
        </Card>
      </div>
    ),
  },
}