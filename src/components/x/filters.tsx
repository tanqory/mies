"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Badge } from "../ui/badge"
import { X, Filter, Search } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const filtersVariants = cva("space-y-4", {
  variants: {
    variant: {
      default: "",
      compact: "space-y-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface FilterOption {
  label: string
  value: string
  disabled?: boolean
}

export interface FilterDefinition {
  key: string
  label: string
  type: "select" | "text" | "date" | "number" | "boolean"
  options?: FilterOption[]
  placeholder?: string
  multiple?: boolean
}

export interface AppliedFilter {
  key: string
  value: string | string[]
  label?: string
}

export interface FiltersProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof filtersVariants> {
  queryValue?: string
  queryPlaceholder?: string
  filters: FilterDefinition[]
  appliedFilters?: AppliedFilter[]
  disabled?: boolean
  hideQueryField?: boolean
  onQueryChange?: (value: string) => void
  onQueryClear?: () => void
  onFilterAdd?: (filter: AppliedFilter) => void
  onFilterRemove?: (filterKey: string) => void
  onFiltersClear?: () => void
}

const Filters = React.forwardRef<HTMLDivElement, FiltersProps>(
  (
    {
      className,
      variant,
      queryValue = "",
      queryPlaceholder = "Search...",
      filters,
      appliedFilters = [],
      disabled = false,
      hideQueryField = false,
      onQueryChange,
      onQueryClear,
      onFilterAdd,
      onFilterRemove,
      onFiltersClear,
      ...props
    },
    ref
  ) => {
    const [openFilterKey, setOpenFilterKey] = React.useState<string | null>(null)
    const [filterValues, setFilterValues] = React.useState<Record<string, string | string[]>>({})

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onQueryChange?.(e.target.value)
    }

    const handleFilterValueChange = (filterKey: string, value: string | string[]) => {
      setFilterValues(prev => ({ ...prev, [filterKey]: value }))
    }

    const handleFilterApply = (filter: FilterDefinition) => {
      const value = filterValues[filter.key]
      if (value && onFilterAdd) {
        onFilterAdd({
          key: filter.key,
          value,
          label: filter.label,
        })
      }
      setOpenFilterKey(null)
      setFilterValues(prev => ({ ...prev, [filter.key]: filter.multiple ? [] : "" }))
    }

    const renderFilterControl = (filter: FilterDefinition) => {
      const currentValue = filterValues[filter.key] || (filter.multiple ? [] : "")

      switch (filter.type) {
        case "select":
          if (filter.multiple && filter.options) {
            return (
              <div className="space-y-2">
                {filter.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${filter.key}-${option.value}`}
                      checked={Array.isArray(currentValue) && currentValue.includes(option.value)}
                      disabled={option.disabled}
                      onCheckedChange={(checked) => {
                        const currentArray = Array.isArray(currentValue) ? currentValue : []
                        const newValue = checked
                          ? [...currentArray, option.value]
                          : currentArray.filter(v => v !== option.value)
                        handleFilterValueChange(filter.key, newValue)
                      }}
                    />
                    <Label htmlFor={`${filter.key}-${option.value}`} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            )
          }

          return (
            <Select
              value={typeof currentValue === "string" ? currentValue : ""}
              onValueChange={(value) => handleFilterValueChange(filter.key, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={filter.placeholder || "Select..."} />
              </SelectTrigger>
              <SelectContent>
                {filter.options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )

        case "text":
        case "number":
        case "date":
          return (
            <Input
              type={filter.type === "number" ? "number" : filter.type === "date" ? "date" : "text"}
              placeholder={filter.placeholder}
              value={typeof currentValue === "string" ? currentValue : ""}
              onChange={(e) => handleFilterValueChange(filter.key, e.target.value)}
            />
          )

        case "boolean":
          return (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={filter.key}
                checked={currentValue === "true"}
                onCheckedChange={(checked) =>
                  handleFilterValueChange(filter.key, checked ? "true" : "false")
                }
              />
              <Label htmlFor={filter.key} className="text-sm">
                {filter.label}
              </Label>
            </div>
          )

        default:
          return null
      }
    }

    const getAppliedFilterDisplay = (appliedFilter: AppliedFilter) => {
      const filter = filters.find(f => f.key === appliedFilter.key)
      if (!filter) return appliedFilter.label || appliedFilter.key

      if (Array.isArray(appliedFilter.value)) {
        return `${filter.label}: ${appliedFilter.value.length} selected`
      }

      if (filter.type === "select" && filter.options) {
        const option = filter.options.find(opt => opt.value === appliedFilter.value)
        return `${filter.label}: ${option?.label || appliedFilter.value}`
      }

      return `${filter.label}: ${appliedFilter.value}`
    }

    return (
      <div
        ref={ref}
        className={cn(filtersVariants({ variant }), className)}
        {...props}
      >
        {!hideQueryField && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={queryPlaceholder}
              value={queryValue}
              onChange={handleQueryChange}
              disabled={disabled}
              className="pl-9 pr-9"
            />
            {queryValue && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                onClick={onQueryClear}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <Popover
              key={filter.key}
              open={openFilterKey === filter.key}
              onOpenChange={(open) => setOpenFilterKey(open ? filter.key : null)}
            >
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" disabled={disabled}>
                  <Filter className="mr-2 h-3 w-3" />
                  {filter.label}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium leading-none">{filter.label}</h4>
                  </div>
                  {renderFilterControl(filter)}
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOpenFilterKey(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleFilterApply(filter)}
                      disabled={!filterValues[filter.key] ||
                        (Array.isArray(filterValues[filter.key]) && filterValues[filter.key].length === 0)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>

        {appliedFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Applied filters:</span>
            {appliedFilters.map((appliedFilter) => (
              <Badge key={appliedFilter.key} variant="secondary" className="gap-1">
                <span className="truncate max-w-[200px]">
                  {getAppliedFilterDisplay(appliedFilter)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => onFilterRemove?.(appliedFilter.key)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {appliedFilters.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onFiltersClear}
                className="text-muted-foreground"
              >
                Clear all
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }
)

Filters.displayName = "Filters"

export { Filters, filtersVariants }