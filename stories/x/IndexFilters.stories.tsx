import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { IndexFilters } from "../../src/x"
import type { AppliedFilter, FilterOption, SortOption, TabOption } from "../../src/x"

const meta: Meta<typeof IndexFilters> = {
  title: "Mies X/IndexFilters",
  component: IndexFilters,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    hideQueryField: {
      control: { type: "boolean" },
    },
    hideFilters: {
      control: { type: "boolean" },
    },
    hideSorting: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultFilters: FilterOption[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "active" },
      { label: "Draft", value: "draft" },
      { label: "Archived", value: "archived" },
    ],
  },
  {
    key: "vendor",
    label: "Vendor",
    type: "text",
  },
  {
    key: "created",
    label: "Created",
    type: "date",
  },
]

const defaultSortOptions: SortOption[] = [
  { label: "Name A-Z", value: "name-asc", direction: "asc" },
  { label: "Name Z-A", value: "name-desc", direction: "desc" },
  { label: "Date created (newest)", value: "created-desc", direction: "desc" },
  { label: "Date created (oldest)", value: "created-asc", direction: "asc" },
]

const defaultTabs: TabOption[] = [
  { id: "all", content: "All", badge: "125" },
  { id: "active", content: "Active", badge: "85" },
  { id: "draft", content: "Draft", badge: "25" },
  { id: "archived", content: "Archived", badge: "15" },
]

// Interactive wrapper for stories
function IndexFiltersExample(props: any) {
  const [queryValue, setQueryValue] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])
  const [sortSelected, setSortSelected] = useState("name-asc")

  const handleFilterAdd = (filter: AppliedFilter) => {
    setAppliedFilters(prev => [...prev.filter(f => f.key !== filter.key), filter])
  }

  const handleFilterRemove = (filterKey: string) => {
    setAppliedFilters(prev => prev.filter(f => f.key !== filterKey))
  }

  const handleClearAll = () => {
    setQueryValue("")
    setAppliedFilters([])
  }

  return (
    <IndexFilters
      {...props}
      queryValue={queryValue}
      onQueryChange={setQueryValue}
      onQueryClear={() => setQueryValue("")}
      selectedTab={selectedTab}
      onTabSelect={setSelectedTab}
      appliedFilters={appliedFilters}
      onFilterAdd={handleFilterAdd}
      onFilterRemove={handleFilterRemove}
      onClearAll={handleClearAll}
      sortSelected={sortSelected}
      onSortChange={setSortSelected}
    />
  )
}

export const Default: Story = {
  render: (args) => <IndexFiltersExample {...args} />,
  args: {
    filters: defaultFilters,
    sortOptions: defaultSortOptions,
  },
}

export const WithTabs: Story = {
  render: (args) => <IndexFiltersExample {...args} />,
  args: {
    tabs: defaultTabs,
    filters: defaultFilters,
    sortOptions: defaultSortOptions,
  },
}

export const SearchOnly: Story = {
  render: (args) => <IndexFiltersExample {...args} />,
  args: {
    hideFilters: true,
    hideSorting: true,
    queryPlaceholder: "Search products...",
  },
}

export const FiltersOnly: Story = {
  render: (args) => <IndexFiltersExample {...args} />,
  args: {
    hideQueryField: true,
    hideSorting: true,
    filters: defaultFilters,
  },
}

export const SortingOnly: Story = {
  render: (args) => <IndexFiltersExample {...args} />,
  args: {
    hideQueryField: true,
    hideFilters: true,
    sortOptions: defaultSortOptions,
  },
}

export const Loading: Story = {
  render: (args) => <IndexFiltersExample {...args} />,
  args: {
    tabs: defaultTabs,
    filters: defaultFilters,
    sortOptions: defaultSortOptions,
    loading: true,
  },
}

export const Disabled: Story = {
  render: (args) => <IndexFiltersExample {...args} />,
  args: {
    tabs: defaultTabs,
    filters: defaultFilters,
    sortOptions: defaultSortOptions,
    disabled: true,
  },
}

export const CustomPlaceholder: Story = {
  render: (args) => <IndexFiltersExample {...args} />,
  args: {
    queryPlaceholder: "Search customers, orders, products...",
    filters: [
      {
        key: "customer",
        label: "Customer Type",
        type: "select",
        options: [
          { label: "New", value: "new" },
          { label: "Returning", value: "returning" },
          { label: "VIP", value: "vip" },
        ],
      },
      {
        key: "amount",
        label: "Order Amount",
        type: "text",
      },
    ],
    sortOptions: [
      { label: "Amount (high to low)", value: "amount-desc", direction: "desc" },
      { label: "Amount (low to high)", value: "amount-asc", direction: "asc" },
      { label: "Order date (newest)", value: "date-desc", direction: "desc" },
      { label: "Order date (oldest)", value: "date-asc", direction: "asc" },
    ],
  },
}

export const WithPrefilledData: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState("sample search")
    const [selectedTab, setSelectedTab] = useState("active")
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([
      { key: "status", value: "active", label: "Status: Active" },
      { key: "vendor", value: "Acme Corp", label: "Vendor: Acme Corp" },
    ])
    const [sortSelected, setSortSelected] = useState("created-desc")

    const handleFilterAdd = (filter: AppliedFilter) => {
      setAppliedFilters(prev => [...prev.filter(f => f.key !== filter.key), filter])
    }

    const handleFilterRemove = (filterKey: string) => {
      setAppliedFilters(prev => prev.filter(f => f.key !== filterKey))
    }

    const handleClearAll = () => {
      setQueryValue("")
      setAppliedFilters([])
    }

    return (
      <IndexFilters
        tabs={defaultTabs}
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
        queryValue={queryValue}
        onQueryChange={setQueryValue}
        onQueryClear={() => setQueryValue("")}
        filters={defaultFilters}
        appliedFilters={appliedFilters}
        onFilterAdd={handleFilterAdd}
        onFilterRemove={handleFilterRemove}
        onClearAll={handleClearAll}
        sortOptions={defaultSortOptions}
        sortSelected={sortSelected}
        onSortChange={setSortSelected}
      />
    )
  },
}

export const WithAdditionalContent: Story = {
  render: (args) => (
    <IndexFiltersExample {...args}>
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          Additional content can be placed here, such as quick actions, bulk operations, or summary information.
        </p>
      </div>
    </IndexFiltersExample>
  ),
  args: {
    tabs: defaultTabs,
    filters: defaultFilters,
    sortOptions: defaultSortOptions,
  },
}