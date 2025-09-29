"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Check, ChevronDown, Search } from "lucide-react"
import { cn } from "../ui/utils"
import { cva } from "class-variance-authority"

const autocompleteVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        filled: "bg-muted border-0",
        underlined: "border-0 border-b-2 rounded-none px-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AutocompleteOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface AutocompleteEnhancedProps {
  options: AutocompleteOption[]
  value?: string
  onValueChange?: (value: string) => void
  onInputChange?: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
}

const AutocompleteEnhanced = React.forwardRef<HTMLInputElement, AutocompleteEnhancedProps>(
  (
    {
      className,
      options = [],
      value = "",
      onValueChange,
      onInputChange,
      placeholder = "Search...",
      emptyMessage = "No results found",
      disabled,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      setOpen(true)
      onInputChange?.(newValue)
    }

    const handleSelect = (option: AutocompleteOption) => {
      if (option.disabled) return

      onValueChange?.(option.value)
      setInputValue(option.label)
      setOpen(false)
    }

    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )

    return (
      <div className="relative w-full">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(autocompleteVariants(), "pl-8 pr-8", className)}
            {...props}
          />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-muted rounded p-1"
          >
            <ChevronDown className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              open && "transform rotate-180"
            )} />
          </button>
        </div>

        {open && (
          <div className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
            {filteredOptions.length === 0 ? (
              <div className="py-2 px-3 text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              <CommandPrimitive className="w-full">
                <CommandPrimitive.List className="max-h-60 overflow-auto">
                  {filteredOptions.map((option) => (
                    <CommandPrimitive.Item
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option)}
                      disabled={option.disabled}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                      <div className="flex-1">
                        <div>{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        )}
                      </div>
                      {value === option.value && (
                        <Check className="h-4 w-4" />
                      )}
                    </CommandPrimitive.Item>
                  ))}
                </CommandPrimitive.List>
              </CommandPrimitive>
            )}
          </div>
        )}
      </div>
    )
  }
)

AutocompleteEnhanced.displayName = "AutocompleteEnhanced"

export { AutocompleteEnhanced, autocompleteVariants }