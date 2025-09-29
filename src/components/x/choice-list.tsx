"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Checkbox } from "../ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

const choiceListVariants = cva("space-y-3", {
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

export interface ChoiceListChoice {
  label: string
  value: string
  helpText?: string
  disabled?: boolean
  describedByError?: boolean
}

export interface ChoiceListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof choiceListVariants> {
  title?: string
  titleHidden?: boolean
  choices: ChoiceListChoice[]
  selected: string[]
  allowMultiple?: boolean
  name?: string
  error?: string | boolean
  onChange?: (selected: string[]) => void
}

const ChoiceList = React.forwardRef<HTMLDivElement, ChoiceListProps>(
  (
    {
      className,
      variant,
      title,
      titleHidden = false,
      choices,
      selected,
      allowMultiple = false,
      name,
      error,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleSingleChange = (value: string) => {
      onChange?.([value])
    }

    const handleMultipleChange = (value: string, checked: boolean | "indeterminate") => {
      if (checked === true) {
        onChange?.([...selected, value])
      } else {
        onChange?.(selected.filter(item => item !== value))
      }
    }

    const errorId = error ? `${name}-error` : undefined

    if (allowMultiple) {
      return (
        <div
          ref={ref}
          className={cn(choiceListVariants({ variant }), className)}
          role="group"
          aria-labelledby={title && !titleHidden ? `${name}-title` : undefined}
          aria-describedby={errorId}
          {...props}
        >
          {title && !titleHidden && (
            <div className="space-y-2">
              <h3 id={`${name}-title`} className="text-sm font-medium leading-none">
                {title}
              </h3>
            </div>
          )}

          <div className="space-y-3">
            {choices.map((choice) => (
              <div key={choice.value} className="flex items-start space-x-3">
                <Checkbox
                  id={`${name}-${choice.value}`}
                  checked={selected.includes(choice.value)}
                  disabled={choice.disabled}
                  onCheckedChange={(checked) =>
                    handleMultipleChange(choice.value, checked)
                  }
                  aria-describedby={
                    choice.helpText ? `${name}-${choice.value}-help` : undefined
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor={`${name}-${choice.value}`}
                    className={cn(
                      "text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      choice.disabled && "opacity-70"
                    )}
                  >
                    {choice.label}
                  </Label>
                  {choice.helpText && (
                    <p
                      id={`${name}-${choice.value}-help`}
                      className="text-xs text-muted-foreground"
                    >
                      {choice.helpText}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {error && typeof error === "string" && (
            <p id={errorId} className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(choiceListVariants({ variant }), className)}
        {...props}
      >
        {title && !titleHidden && (
          <div className="space-y-2">
            <h3 id={`${name}-title`} className="text-sm font-medium leading-none">
              {title}
            </h3>
          </div>
        )}

        <RadioGroup
          value={selected[0] || ""}
          onValueChange={handleSingleChange}
          name={name}
          aria-labelledby={title && !titleHidden ? `${name}-title` : undefined}
          aria-describedby={errorId}
        >
          <div className="space-y-3">
            {choices.map((choice) => (
              <div key={choice.value} className="flex items-start space-x-3">
                <RadioGroupItem
                  value={choice.value}
                  id={`${name}-${choice.value}`}
                  disabled={choice.disabled}
                  aria-describedby={
                    choice.helpText ? `${name}-${choice.value}-help` : undefined
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor={`${name}-${choice.value}`}
                    className={cn(
                      "text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      choice.disabled && "opacity-70"
                    )}
                  >
                    {choice.label}
                  </Label>
                  {choice.helpText && (
                    <p
                      id={`${name}-${choice.value}-help`}
                      className="text-xs text-muted-foreground"
                    >
                      {choice.helpText}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>

        {error && typeof error === "string" && (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    )
  }
)

ChoiceList.displayName = "ChoiceList"

export { ChoiceList, choiceListVariants }