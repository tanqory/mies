import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Search, Settings, User, LogOut, Bell, HelpCircle } from "lucide-react"
import { TopBar } from "../../src/x"

const meta: Meta<typeof TopBar> = {
  title: "Mies X/TopBar",
  component: TopBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showNavigationToggle: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Interactive search field wrapper
function SearchFieldExample() {
  const [searchValue, setSearchValue] = useState("")
  const [searchVisible, setSearchVisible] = useState(false)

  return (
    <TopBar.SearchField
      value={searchValue}
      placeholder="Search products, customers, orders..."
      onChange={setSearchValue}
      onFocus={() => setSearchVisible(true)}
      onBlur={() => setTimeout(() => setSearchVisible(false), 200)}
    />
  )
}

// Mock search results
function SearchResults() {
  return (
    <div className="p-4 space-y-2">
      <div className="text-sm font-medium text-muted-foreground">Recent searches</div>
      <div className="space-y-1">
        <div className="p-2 hover:bg-muted rounded cursor-pointer">Product inventory</div>
        <div className="p-2 hover:bg-muted rounded cursor-pointer">Customer analytics</div>
        <div className="p-2 hover:bg-muted rounded cursor-pointer">Order reports</div>
      </div>
    </div>
  )
}

export const Default: Story = {
  args: {
    logo: {
      source: "https://via.placeholder.com/120x32/6366f1/white?text=LOGO",
      alt: "Company Logo",
      url: "/",
    },
    userMenu: {
      name: "John Doe",
      detail: "john@example.com",
      initials: "JD",
      actions: [
        {
          items: [
            {
              content: "Profile",
              onAction: () => console.log("Profile"),
              icon: <User className="h-4 w-4" />,
            },
            {
              content: "Settings",
              onAction: () => console.log("Settings"),
              icon: <Settings className="h-4 w-4" />,
            },
          ],
        },
        {
          items: [
            {
              content: "Help center",
              url: "/help",
              icon: <HelpCircle className="h-4 w-4" />,
            },
            {
              content: "Sign out",
              onAction: () => console.log("Sign out"),
              icon: <LogOut className="h-4 w-4" />,
            },
          ],
        },
      ],
    },
  },
}

export const WithSearch: Story = {
  render: (args) => {
    const [searchValue, setSearchValue] = useState("")
    const [searchVisible, setSearchVisible] = useState(false)

    return (
      <TopBar
        {...args}
        searchField={
          <TopBar.SearchField
            value={searchValue}
            placeholder="Search anything..."
            onChange={setSearchValue}
            onFocus={() => setSearchVisible(true)}
            onBlur={() => setTimeout(() => setSearchVisible(false), 200)}
          />
        }
        searchResults={<SearchResults />}
        searchResultsVisible={searchVisible && searchValue.length > 0}
        onSearchResultsDismiss={() => setSearchVisible(false)}
      />
    )
  },
  args: {
    logo: {
      source: "https://via.placeholder.com/120x32/6366f1/white?text=LOGO",
      alt: "Company Logo",
    },
    userMenu: {
      name: "Jane Smith",
      detail: "jane@example.com",
      actions: [
        {
          items: [
            {
              content: "Profile",
              onAction: () => console.log("Profile"),
              icon: <User className="h-4 w-4" />,
            },
          ],
        },
      ],
    },
  },
}

export const WithNotifications: Story = {
  args: {
    logo: {
      source: "https://via.placeholder.com/120x32/6366f1/white?text=STORE",
      alt: "Store Logo",
    },
    notifications: {
      count: 3,
      onAction: () => console.log("Show notifications"),
    },
    userMenu: {
      name: "Store Owner",
      detail: "Premium Plan",
      avatar: "https://via.placeholder.com/32x32/6366f1/white?text=SO",
      actions: [
        {
          title: "Account",
          items: [
            {
              content: "Account settings",
              onAction: () => console.log("Account settings"),
              icon: <Settings className="h-4 w-4" />,
            },
            {
              content: "Billing",
              onAction: () => console.log("Billing"),
            },
          ],
        },
        {
          title: "Support",
          items: [
            {
              content: "Help center",
              url: "/help",
              icon: <HelpCircle className="h-4 w-4" />,
            },
            {
              content: "Contact support",
              url: "/contact",
            },
          ],
        },
        {
          items: [
            {
              content: "Sign out",
              onAction: () => console.log("Sign out"),
              icon: <LogOut className="h-4 w-4" />,
            },
          ],
        },
      ],
    },
  },
}

export const WithMobileNavigation: Story = {
  args: {
    showNavigationToggle: true,
    onNavigationToggle: () => console.log("Toggle navigation"),
    logo: {
      source: "https://via.placeholder.com/80x32/6366f1/white?text=APP",
      alt: "App Logo",
    },
    userMenu: {
      name: "Mobile User",
      initials: "MU",
      actions: [
        {
          items: [
            {
              content: "Profile",
              onAction: () => console.log("Profile"),
            },
            {
              content: "Settings",
              onAction: () => console.log("Settings"),
            },
          ],
        },
      ],
    },
  },
}

export const WithSecondaryMenu: Story = {
  args: {
    logo: {
      source: "https://via.placeholder.com/120x32/6366f1/white?text=ADMIN",
      alt: "Admin Panel",
    },
    secondaryMenu: (
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-muted rounded-lg">
          <Settings className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
    ),
    userMenu: {
      name: "Admin User",
      detail: "Administrator",
      actions: [
        {
          items: [
            {
              content: "Admin settings",
              onAction: () => console.log("Admin settings"),
            },
          ],
        },
      ],
    },
  },
}

export const WithLogoSuffix: Story = {
  args: {
    logo: {
      source: "https://via.placeholder.com/100x32/6366f1/white?text=DEV",
      alt: "Development Environment",
    },
    logoSuffix: (
      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">
        Development
      </span>
    ),
    userMenu: {
      name: "Developer",
      detail: "dev@example.com",
      actions: [
        {
          items: [
            {
              content: "Switch to production",
              onAction: () => console.log("Switch environment"),
            },
          ],
        },
      ],
    },
  },
}

export const WithContextControl: Story = {
  args: {
    contextControl: (
      <div className="flex items-center gap-3">
        <div className="text-lg font-semibold">My Store</div>
        <select className="bg-transparent border border-muted rounded px-2 py-1 text-sm">
          <option>Production</option>
          <option>Staging</option>
          <option>Development</option>
        </select>
      </div>
    ),
    userMenu: {
      name: "Store Manager",
      detail: "manager@store.com",
      actions: [
        {
          items: [
            {
              content: "Store settings",
              onAction: () => console.log("Store settings"),
            },
          ],
        },
      ],
    },
  },
}

export const FullExample: Story = {
  render: (args) => {
    const [searchValue, setSearchValue] = useState("")
    const [searchVisible, setSearchVisible] = useState(false)

    return (
      <div>
        <TopBar
          {...args}
          searchField={
            <TopBar.SearchField
              value={searchValue}
              placeholder="Search products, customers, orders..."
              onChange={setSearchValue}
              onFocus={() => setSearchVisible(true)}
              onBlur={() => setTimeout(() => setSearchVisible(false), 200)}
            />
          }
          searchResults={<SearchResults />}
          searchResultsVisible={searchVisible && searchValue.length > 0}
          onSearchResultsDismiss={() => setSearchVisible(false)}
        />
        <div className="p-8 bg-muted/30 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground">
              This is the main content area. The TopBar component is sticky and will remain at the top when scrolling.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-background p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">Card {i + 1}</h3>
                  <p className="text-sm text-muted-foreground">
                    This is some content to demonstrate the layout with the TopBar component.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
  args: {
    showNavigationToggle: true,
    onNavigationToggle: () => console.log("Toggle navigation"),
    logo: {
      source: "https://via.placeholder.com/120x32/6366f1/white?text=PLATFORM",
      alt: "Platform Logo",
      url: "/",
    },
    notifications: {
      count: 5,
      onAction: () => console.log("Show notifications"),
    },
    secondaryMenu: (
      <button className="p-2 hover:bg-muted rounded-lg">
        <Settings className="h-5 w-5" />
      </button>
    ),
    userMenu: {
      name: "John Smith",
      detail: "john.smith@company.com",
      avatar: "https://via.placeholder.com/32x32/6366f1/white?text=JS",
      actions: [
        {
          title: "Account",
          items: [
            {
              content: "Profile",
              onAction: () => console.log("Profile"),
              icon: <User className="h-4 w-4" />,
            },
            {
              content: "Settings",
              onAction: () => console.log("Settings"),
              icon: <Settings className="h-4 w-4" />,
            },
          ],
        },
        {
          title: "Support",
          items: [
            {
              content: "Help center",
              url: "/help",
              icon: <HelpCircle className="h-4 w-4" />,
            },
            {
              content: "Documentation",
              url: "/docs",
              external: true,
            },
          ],
        },
        {
          items: [
            {
              content: "Sign out",
              onAction: () => console.log("Sign out"),
              icon: <LogOut className="h-4 w-4" />,
            },
          ],
        },
      ],
    },
  },
}