"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Check, ChevronDown, X } from "lucide-react"
import { Badge } from "../ui/badge"

const comboboxVariants = cva("space-y-2", {
  variants: {
    variant: {
      default: "",
      compact: "space-y-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof comboboxVariants> {
  label?: string
  labelHidden?: boolean
  placeholder?: string
  options: ComboboxOption[]
  value?: string[]
  allowMultiple?: boolean
  allowCreation?: boolean
  disabled?: boolean
  loading?: boolean
  error?: string
  helpText?: string
  emptyMessage?: string
  searchPlaceholder?: string
  onSelectionChange?: (selected: string[]) => void
  onCreateOption?: (inputValue: string) => void
}

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      className,
      variant,
      label,
      labelHidden = false,
      placeholder = "Select options...",
      options,
      value = [],
      allowMultiple = false,
      allowCreation = false,
      disabled = false,
      loading = false,
      error,
      helpText,
      emptyMessage = "No options found",
      searchPlaceholder = "Search...",
      onSelectionChange,
      onCreateOption,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")

    const selectedOptions = options.filter(option => value.includes(option.value))
    const isSelected = (optionValue: string) => value.includes(optionValue)

    const handleSelect = (selectedValue: string) => {
      let newValue: string[]

      if (allowMultiple) {
        if (isSelected(selectedValue)) {
          newValue = value.filter(v => v !== selectedValue)
        } else {
          newValue = [...value, selectedValue]
        }
      } else {
        newValue = isSelected(selectedValue) ? [] : [selectedValue]
        setOpen(false)
      }

      onSelectionChange?.(newValue)
    }

    const handleRemove = (valueToRemove: string) => {
      const newValue = value.filter(v => v !== valueToRemove)
      onSelectionChange?.(newValue)
    }

    const handleCreate = () => {
      if (inputValue.trim() && onCreateOption) {
        onCreateOption(inputValue.trim())
        setInputValue("")
      }
    }

    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )

    const showCreateOption = allowCreation &&
      inputValue.trim() &&
      !options.some(option => option.label.toLowerCase() === inputValue.toLowerCase())

    const getDisplayText = () => {
      if (value.length === 0) return placeholder
      if (!allowMultiple) {
        const selected = selectedOptions[0]
        return selected?.label || placeholder
      }
      return `${value.length} selected`
    }

    return (
      <div
        ref={ref}
        className={cn(comboboxVariants({ variant }), className)}
        {...props}
      >
        {label && !labelHidden && (
          <Label className={disabled ? "opacity-50" : ""}>{label}</Label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={cn(
                "w-full justify-between",
                !value.length && "text-muted-foreground"
              )}
            >
              <span className="truncate">{getDisplayText()}</span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput
                placeholder={searchPlaceholder}
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandList>
                <CommandEmpty>
                  <div className="text-center p-4">
                    <p className="text-sm text-muted-foreground">{emptyMessage}</p>
                    {showCreateOption && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCreate}
                        className="mt-2"
                      >
                        Create "{inputValue}"
                      </Button>
                    )}
                  </div>
                </CommandEmpty>

                {filteredOptions.length > 0 && (
                  <CommandGroup>
                    {filteredOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        onSelect={() => handleSelect(option.value)}
                        className="flex items-center gap-2"
                      >
                        <Check
                          className={cn(
                            "h-4 w-4",
                            isSelected(option.value) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="flex-1 truncate">{option.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {showCreateOption && filteredOptions.length > 0 && (
                  <CommandGroup>
                    <CommandItem onSelect={handleCreate}>
                      <span className="text-muted-foreground">
                        Create "{inputValue}"
                      </span>
                    </CommandItem>
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {allowMultiple && value.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className="gap-1"
              >
                <span className="truncate max-w-[100px]">{option.label}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemove(option.value)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {helpText && !error && (
          <p className="text-xs text-muted-foreground">{helpText}</p>
        )}

        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)

Combobox.displayName = "Combobox"

export { Combobox, comboboxVariants }