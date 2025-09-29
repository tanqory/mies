"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"

const optionListVariants = cva(
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

const optionItemVariants = cva(
  "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors",
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

export interface OptionListOption {
  value: string
  label: string
  disabled?: boolean
  media?: React.ReactNode
  helpText?: string
}

export interface OptionListSection {
  title?: string
  options: OptionListOption[]
}

export interface OptionListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof optionListVariants> {
  sections?: OptionListSection[]
  options?: OptionListOption[]
  selected?: string[]
  allowMultiple?: boolean
  onChange?: (selected: string[]) => void
}

const OptionList = React.forwardRef<HTMLDivElement, OptionListProps>(
  (
    {
      className,
      variant,
      sections,
      options,
      selected = [],
      allowMultiple = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const allSections = sections || (options ? [{ options }] : [])

    const handleOptionClick = (value: string) => {
      if (!onChange) return

      if (allowMultiple) {
        const newSelected = selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value]
        onChange(newSelected)
      } else {
        onChange([value])
      }
    }

    const isSelected = (value: string) => selected.includes(value)

    const renderOption = (option: OptionListOption) => {
      const { value, label, disabled = false, media, helpText } = option

      return (
        <div
          key={value}
          className={cn(
            optionItemVariants({
              disabled,
              selected: isSelected(value),
            })
          )}
          onClick={() => !disabled && handleOptionClick(value)}
          role="option"
          aria-selected={isSelected(value)}
          aria-disabled={disabled}
        >
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            {isSelected(value) && <Check className="h-4 w-4" />}
          </span>

          <div className="flex items-center gap-3 flex-1">
            {media && <div className="flex-shrink-0">{media}</div>}

            <div className="flex-1 min-w-0">
              <div className="truncate">{label}</div>
              {helpText && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  {helpText}
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(optionListVariants({ variant }), className)}
        role="listbox"
        aria-multiselectable={allowMultiple}
        {...props}
      >
        {allSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {section.title}
              </div>
            )}
            <div className="space-y-0.5">
              {section.options.map((option) => renderOption(option))}
            </div>
            {sectionIndex < allSections.length - 1 && (
              <div className="mx-1 my-2 h-px bg-border" />
            )}
          </div>
        ))}
      </div>
    )
  }
)

OptionList.displayName = "OptionList"

export { OptionList, optionListVariants }