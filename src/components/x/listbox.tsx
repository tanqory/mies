"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"

const listboxVariants = cva(
  "max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md",
  {
    variants: {
      variant: {
        default: "p-1",
        compact: "py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const listboxItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
  {
    variants: {
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      },
      selected: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
      selected: false,
    },
  }
)

export interface ListboxOption {
  value: string
  label: string
  disabled?: boolean
  divider?: boolean
}

export interface ListboxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listboxVariants> {
  options: ListboxOption[]
  value?: string
  onSelectionChange?: (value: string) => void
  enableKeyboardNavigation?: boolean
  accessibilityLabel?: string
}

const Listbox = React.forwardRef<HTMLDivElement, ListboxProps>(
  (
    {
      className,
      variant,
      options,
      value,
      onSelectionChange,
      enableKeyboardNavigation = true,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const [focusedIndex, setFocusedIndex] = React.useState(-1)
    const listRef = React.useRef<HTMLDivElement>(null)

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (!enableKeyboardNavigation) return

        const enabledOptions = options.filter((option) => !option.disabled)
        const enabledIndexes = options
          .map((_, index) => index)
          .filter((index) => !options[index].disabled)

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault()
            setFocusedIndex((prev) => {
              const currentEnabledIndex = enabledIndexes.indexOf(prev)
              const nextEnabledIndex =
                currentEnabledIndex < enabledIndexes.length - 1
                  ? currentEnabledIndex + 1
                  : 0
              return enabledIndexes[nextEnabledIndex]
            })
            break
          case "ArrowUp":
            event.preventDefault()
            setFocusedIndex((prev) => {
              const currentEnabledIndex = enabledIndexes.indexOf(prev)
              const prevEnabledIndex =
                currentEnabledIndex > 0
                  ? currentEnabledIndex - 1
                  : enabledIndexes.length - 1
              return enabledIndexes[prevEnabledIndex]
            })
            break
          case "Enter":
          case " ":
            event.preventDefault()
            if (focusedIndex >= 0 && !options[focusedIndex]?.disabled) {
              onSelectionChange?.(options[focusedIndex].value)
            }
            break
          case "Escape":
            setFocusedIndex(-1)
            break
        }
      },
      [enableKeyboardNavigation, options, focusedIndex, onSelectionChange]
    )

    const handleMouseMove = (index: number) => {
      setFocusedIndex(index)
    }

    const handleClick = (option: ListboxOption) => {
      if (!option.disabled) {
        onSelectionChange?.(option.value)
      }
    }

    React.useEffect(() => {
      if (enableKeyboardNavigation && focusedIndex >= 0) {
        const focusedElement = listRef.current?.children[focusedIndex] as HTMLElement
        focusedElement?.scrollIntoView({ block: "nearest" })
      }
    }, [focusedIndex, enableKeyboardNavigation])

    return (
      <div
        ref={ref}
        className={cn(listboxVariants({ variant }), className)}
        role="listbox"
        aria-label={accessibilityLabel}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div ref={listRef}>
          {options.map((option, index) => (
            <div key={option.value}>
              {option.divider && index > 0 && (
                <div className="mx-1 my-1 h-px bg-border" />
              )}
              <div
                className={cn(
                  listboxItemVariants({
                    disabled: option.disabled,
                    selected: value === option.value,
                  }),
                  focusedIndex === index && "bg-accent text-accent-foreground"
                )}
                role="option"
                aria-selected={value === option.value}
                onMouseMove={() => handleMouseMove(index)}
                onClick={() => handleClick(option)}
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  {value === option.value && (
                    <Check className="h-4 w-4" />
                  )}
                </span>
                {option.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

Listbox.displayName = "Listbox"

export { Listbox, listboxVariants }