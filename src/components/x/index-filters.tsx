"use client"

import * as React from "react"
import { Search, Filter, X, ChevronDown, SortAsc, SortDesc } from "lucide-react"
import { cn } from "../ui/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

export interface FilterOption {
  key: string
  label: string
  type?: "select" | "text" | "date"
  options?: { label: string; value: string }[]
}

export interface AppliedFilter {
  key: string
  value: string
  label: string
}

export interface SortOption {
  label: string
  value: string
  direction?: "asc" | "desc"
}

export interface TabOption {
  id: string
  content: string
  badge?: string | number
}

export interface IndexFiltersProps {
  className?: string
  tabs?: TabOption[]
  selectedTab?: string
  onTabSelect?: (tabId: string) => void
  queryValue?: string
  queryPlaceholder?: string
  onQueryChange?: (value: string) => void
  onQueryClear?: () => void
  filters?: FilterOption[]
  appliedFilters?: AppliedFilter[]
  onFilterAdd?: (filter: AppliedFilter) => void
  onFilterRemove?: (filterKey: string) => void
  onClearAll?: () => void
  sortOptions?: SortOption[]
  sortSelected?: string
  onSortChange?: (value: string) => void
  loading?: boolean
  disabled?: boolean
  hideQueryField?: boolean
  hideFilters?: boolean
  hideSorting?: boolean
  children?: React.ReactNode
}

const IndexFilters = React.forwardRef<HTMLDivElement, IndexFiltersProps>(
  (
    {
      className,
      tabs,
      selectedTab,
      onTabSelect,
      queryValue = "",
      queryPlaceholder = "Search...",
      onQueryChange,
      onQueryClear,
      filters = [],
      appliedFilters = [],
      onFilterAdd,
      onFilterRemove,
      onClearAll,
      sortOptions = [],
      sortSelected,
      onSortChange,
      loading = false,
      disabled = false,
      hideQueryField = false,
      hideFilters = false,
      hideSorting = false,
      children,
    },
    ref
  ) => {
    const [isFilterOpen, setIsFilterOpen] = React.useState(false)
    const [pendingFilters, setPendingFilters] = React.useState<Record<string, string>>({})

    const handleQueryChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onQueryChange?.(e.target.value)
      },
      [onQueryChange]
    )

    const handleClearQuery = React.useCallback(() => {
      onQueryClear?.()
    }, [onQueryClear])

    const handleFilterApply = React.useCallback(() => {
      Object.entries(pendingFilters).forEach(([key, value]) => {
        if (value.trim()) {
          const filter = filters.find(f => f.key === key)
          if (filter) {
            onFilterAdd?.({
              key,
              value: value.trim(),
              label: `${filter.label}: ${value.trim()}`
            })
          }
        }
      })
      setPendingFilters({})
      setIsFilterOpen(false)
    }, [pendingFilters, filters, onFilterAdd])

    const handleFilterChange = React.useCallback((key: string, value: string) => {
      setPendingFilters(prev => ({
        ...prev,
        [key]: value
      }))
    }, [])

    const handleFilterRemove = React.useCallback((filterKey: string) => {
      onFilterRemove?.(filterKey)
    }, [onFilterRemove])

    const handleSortChange = React.useCallback((value: string) => {
      onSortChange?.(value)
    }, [onSortChange])

    const selectedSortOption = React.useMemo(() => {
      return sortOptions.find(option => option.value === sortSelected)
    }, [sortOptions, sortSelected])

    const getSortIcon = () => {
      if (!selectedSortOption) return SortAsc
      return selectedSortOption.direction === "desc" ? SortDesc : SortAsc
    }

    const SortIcon = getSortIcon()

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {/* Tabs */}
        {tabs && tabs.length > 0 && (
          <Tabs value={selectedTab} onValueChange={onTabSelect}>
            <TabsList className="h-auto p-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  disabled={disabled}
                  className="flex items-center gap-2"
                >
                  {tab.content}
                  {tab.badge && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                      {tab.badge}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search Field */}
          {!hideQueryField && (
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={queryPlaceholder}
                value={queryValue}
                onChange={handleQueryChange}
                disabled={disabled || loading}
                className="pl-10 pr-10"
              />
              {queryValue && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearQuery}
                  disabled={disabled}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}

          {/* Filter Button */}
          {!hideFilters && filters.length > 0 && (
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={disabled || loading}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {appliedFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                      {appliedFilters.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-80">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Add Filters</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFilterOpen(false)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>

                  {filters.map((filter) => (
                    <div key={filter.key} className="space-y-2">
                      <label className="text-sm font-medium">{filter.label}</label>
                      {filter.type === "select" && filter.options ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              {pendingFilters[filter.key] || "Select..."}
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            {filter.options.map((option) => (
                              <DropdownMenuItem
                                key={option.value}
                                onClick={() => handleFilterChange(filter.key, option.value)}
                              >
                                {option.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Input
                          type={filter.type === "date" ? "date" : "text"}
                          placeholder={`Enter ${filter.label.toLowerCase()}...`}
                          value={pendingFilters[filter.key] || ""}
                          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleFilterApply} className="flex-1">
                      Apply Filters
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPendingFilters({})
                        setIsFilterOpen(false)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Sort Button */}
          {!hideSorting && sortOptions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={disabled || loading} className="gap-2">
                  <SortIcon className="h-4 w-4" />
                  {selectedSortOption?.label || "Sort"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className="flex items-center gap-2"
                  >
                    {option.direction === "desc" ? (
                      <SortDesc className="h-4 w-4" />
                    ) : (
                      <SortAsc className="h-4 w-4" />
                    )}
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Clear All Button */}
          {appliedFilters.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              disabled={disabled || loading}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Applied Filters */}
        {appliedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {appliedFilters.map((filter) => (
              <Badge
                key={filter.key}
                variant="secondary"
                className="gap-1 pr-1"
              >
                {filter.label}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFilterRemove(filter.key)}
                  disabled={disabled}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* Additional Content */}
        {children}
      </div>
    )
  }
)

IndexFilters.displayName = "IndexFilters"

export { IndexFilters }