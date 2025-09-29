import type { Meta, StoryObj } from "@storybook/react"
import { EmptyState } from "../../src/x"

const meta: Meta<typeof EmptyState> = {
  title: "Mies X/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
    fullWidth: {
      control: { type: "boolean" },
    },
    imageContained: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    heading: "No products found",
    children: "Try changing the filters or search term",
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    action: {
      content: "Add product",
      onAction: () => console.log("Add product"),
    },
  },
}

export const WithSecondaryAction: Story = {
  args: {
    heading: "Upload your first file",
    children: "Share files with your team by uploading them to this space.",
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    action: {
      content: "Upload files",
      onAction: () => console.log("Upload files"),
    },
    secondaryAction: {
      content: "Learn more",
      url: "/help",
    },
  },
}

export const WithFooter: Story = {
  args: {
    heading: "Manage your inventory",
    children: "Track your stock levels and get notified when you're running low.",
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    action: {
      content: "Add inventory",
      onAction: () => console.log("Add inventory"),
    },
    footerContent: "Need help? Contact our support team",
  },
}

export const WithLargeImage: Story = {
  args: {
    heading: "Welcome to your dashboard",
    children: "Get started by creating your first project or importing existing data.",
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    largeImage: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    action: {
      content: "Create project",
      onAction: () => console.log("Create project"),
    },
  },
}

export const SmallSize: Story = {
  args: {
    size: "sm",
    heading: "No results",
    children: "Try adjusting your search",
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    imageContained: true,
  },
}

export const LargeSize: Story = {
  args: {
    size: "lg",
    heading: "Start selling online",
    children: "Create your first product and start accepting orders from customers around the world.",
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    action: {
      content: "Add your first product",
      onAction: () => console.log("Add product"),
    },
    secondaryAction: {
      content: "Import products",
      onAction: () => console.log("Import products"),
    },
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    heading: "No customers yet",
    children: "When you start getting customers, you'll see their information and order history here.",
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    action: {
      content: "Add customer",
      onAction: () => console.log("Add customer"),
    },
  },
}

export const WithExternalAction: Story = {
  args: {
    heading: "Learn more about SEO",
    children: "Improve your store's search ranking with our comprehensive SEO guide.",
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    action: {
      content: "Read documentation",
      url: "https://shopify.dev",
      external: true,
    },
    secondaryAction: {
      content: "Contact support",
      url: "/contact",
    },
  },
}

export const LoadingAction: Story = {
  args: {
    heading: "Setting up your store",
    children: "Please wait while we configure your store settings.",
    image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    action: {
      content: "Setting up...",
      loading: true,
      disabled: true,
    },
  },
}