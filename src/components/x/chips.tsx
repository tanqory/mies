"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const chipsVariants = cva(
  "inline-flex items-center gap-1 rounded-md border bg-background text-foreground",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive: "border-destructive/50 text-destructive",
        outline: "border-border bg-transparent",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
      },
      size: {
        default: "px-3 py-1 text-sm",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const chipVariants = cva(
  "inline-flex items-center gap-1 rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border-border text-foreground hover:bg-accent hover:text-accent-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "px-3 py-1 text-sm",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ChipItem {
  id: string
  label: string
  value: string
}

export interface ChipsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    VariantProps<typeof chipsVariants> {
  chips?: ChipItem[]
  onChipsChange?: (chips: ChipItem[]) => void
  onChipAdd?: (value: string) => void
  onChipRemove?: (chipId: string) => void
  placeholder?: string
  maxChips?: number
  allowDuplicates?: boolean
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  disabled?: boolean
  readOnly?: boolean
}

const Chips = React.forwardRef<HTMLDivElement, ChipsProps>(
  (
    {
      className,
      variant,
      size,
      chips = [],
      onChipsChange,
      onChipAdd,
      onChipRemove,
      placeholder = "Type and press Enter to add...",
      maxChips,
      allowDuplicates = false,
      inputProps,
      disabled = false,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("")
    const [internalChips, setInternalChips] = React.useState<ChipItem[]>(chips)
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Update internal chips when props change
    React.useEffect(() => {
      setInternalChips(chips)
    }, [chips])

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault()
        addChip(inputValue.trim())
      } else if (e.key === "Backspace" && !inputValue && internalChips.length > 0) {
        const lastChip = internalChips[internalChips.length - 1]
        if (lastChip) {
          removeChip(lastChip.id)
        }
      }
    }

    const addChip = (value: string) => {
      if (disabled || readOnly) return

      // Check for duplicates
      if (!allowDuplicates && internalChips.some(chip => chip.value === value)) {
        return
      }

      // Check max chips limit
      if (maxChips && internalChips.length >= maxChips) {
        return
      }

      const newChip: ChipItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        label: value,
        value: value,
      }

      const updatedChips = [...internalChips, newChip]
      setInternalChips(updatedChips)
      setInputValue("")

      onChipAdd?.(value)
      onChipsChange?.(updatedChips)
    }

    const removeChip = (chipId: string) => {
      if (disabled || readOnly) return

      const updatedChips = internalChips.filter(chip => chip.id !== chipId)
      setInternalChips(updatedChips)

      onChipRemove?.(chipId)
      onChipsChange?.(updatedChips)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      inputProps?.onChange?.(e)
    }

    const handleContainerClick = () => {
      if (!disabled && !readOnly) {
        inputRef.current?.focus()
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          chipsVariants({ variant, size }),
          "min-h-[2.5rem] cursor-text flex-wrap gap-1 p-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
          readOnly && "cursor-default",
          className
        )}
        onClick={handleContainerClick}
        {...props}
      >
        {/* Render existing chips */}
        {internalChips.map((chip) => (
          <div
            key={chip.id}
            className={cn(
              chipVariants({ variant, size }),
              "max-w-xs truncate"
            )}
          >
            <span className="truncate">{chip.label}</span>
            {!readOnly && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeChip(chip.id)
                }}
                disabled={disabled}
                className="ml-1 rounded-full hover:bg-black/10 p-0.5 transition-colors"
                aria-label={`Remove ${chip.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}

        {/* Input field */}
        {!readOnly && (!maxChips || internalChips.length < maxChips) && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={internalChips.length === 0 ? placeholder : ""}
            disabled={disabled}
            className="min-w-0 flex-1 border-none bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            {...inputProps}
          />
        )}
      </div>
    )
  }
)

Chips.displayName = "Chips"

export { Chips, chipsVariants }