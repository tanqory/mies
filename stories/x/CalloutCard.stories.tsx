import type { Meta, StoryObj } from "@storybook/react"
import { Gift, Star, Zap } from "lucide-react"
import { CalloutCard } from "../../src/x"

const meta: Meta<typeof CalloutCard> = {
  title: "Mies X/CalloutCard",
  component: CalloutCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "success", "warning", "destructive", "info"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
    dismissible: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Improve your SEO ranking",
    children: "Use the SEO optimization features to increase your store's search ranking and drive more traffic.",
    illustration: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    primaryAction: {
      content: "Learn more",
      onAction: () => console.log("Primary action"),
    },
    secondaryAction: {
      content: "Dismiss",
      onAction: () => console.log("Secondary action"),
    },
  },
}

export const Success: Story = {
  args: {
    ...Default.args,
    variant: "success",
    title: "Setup complete!",
    children: "Your store is now ready to accept payments and start selling products.",
    primaryAction: {
      content: "View store",
      onAction: () => console.log("View store"),
    },
  },
}

export const Warning: Story = {
  args: {
    ...Default.args,
    variant: "warning",
    title: "Payment setup required",
    children: "Complete your payment setup to start accepting orders from customers.",
    primaryAction: {
      content: "Setup payments",
      onAction: () => console.log("Setup payments"),
    },
  },
}

export const WithIcon: Story = {
  args: {
    ...Default.args,
    title: "Boost your sales",
    children: "Add promotional banners and discounts to increase customer engagement.",
    illustration: <Star className="h-16 w-16 text-yellow-500" />,
    primaryAction: {
      content: "Create promotion",
      onAction: () => console.log("Create promotion"),
    },
  },
}

export const Dismissible: Story = {
  args: {
    ...Default.args,
    dismissible: true,
    onDismiss: () => console.log("Dismissed"),
    title: "New features available",
    children: "Check out the latest updates and improvements to your dashboard.",
  },
}

export const WithUrlActions: Story = {
  args: {
    title: "Connect with customers",
    children: "Set up email marketing campaigns to keep your customers engaged and informed.",
    illustration: <Gift className="h-16 w-16 text-blue-500" />,
    primaryAction: {
      content: "Visit documentation",
      url: "https://shopify.dev",
      external: true,
    },
    secondaryAction: {
      content: "Learn more",
      url: "/learn-more",
    },
  },
}

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: "sm",
    title: "Quick tip",
    children: "Use keyboard shortcuts to navigate faster.",
  },
}

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: "lg",
    title: "Welcome to your new store",
    children: "Follow these steps to get your store ready for customers. We'll guide you through the process of adding products, setting up payments, and customizing your storefront.",
    illustration: <Zap className="h-20 w-20 text-purple-500" />,
  },
}