"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const rangeVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-2",
        default: "h-3",
        lg: "h-4",
        xl: "h-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const trackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-2",
        default: "h-3",
        lg: "h-4",
        xl: "h-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const rangeVariants_thumb = cva(
  "block rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-7 w-7",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface RangeEnhancedProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof rangeVariants> {
  showProgress?: boolean
  showValue?: boolean
  showMinMax?: boolean
  formatValue?: (value: number) => string
  progressColor?: string
  trackColor?: string
  thumbColor?: string
  label?: string
  description?: string
}

const RangeEnhanced = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RangeEnhancedProps
>(
  (
    {
      className,
      size,
      showProgress = true,
      showValue = false,
      showMinMax = false,
      formatValue = (value) => value.toString(),
      progressColor,
      trackColor,
      thumbColor,
      label,
      description,
      value,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(
      value || defaultValue || [min]
    )

    React.useEffect(() => {
      if (value) {
        setInternalValue(value)
      }
    }, [value])

    const currentValue = value || internalValue
    const progress = currentValue[0] ? ((currentValue[0] - min) / (max - min)) * 100 : 0

    // Calculate thumb distortion for better visual alignment (from Polaris Core logic)
    const thumbWidth = React.useMemo(() => {
      switch (size) {
        case "xs": return 0.75 // 12px / 16
        case "sm": return 1 // 16px / 16
        case "default": return 1.25 // 20px / 16
        case "lg": return 1.5 // 24px / 16
        case "xl": return 1.75 // 28px / 16
        default: return 1.25
      }
    }, [size])

    const distortion = (50 - progress) * thumbWidth / 100
    const adjustedProgress = `calc(${progress}% + ${distortion}rem)`

    const handleValueChange = (newValue: number[]) => {
      setInternalValue(newValue)
      props.onValueChange?.(newValue)
    }

    return (
      <div className="w-full space-y-2">
        {/* Label and Value */}
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {formatValue(currentValue[0] || 0)}
              </span>
            )}
          </div>
        )}

        {/* Slider */}
        <SliderPrimitive.Root
          ref={ref}
          className={cn(rangeVariants({ size }), className)}
          value={currentValue}
          onValueChange={handleValueChange}
          min={min}
          max={max}
          step={step}
          {...props}
        >
          <SliderPrimitive.Track
            className={cn(trackVariants({ size }))}
            style={{
              backgroundColor: trackColor,
            }}
          >
            {showProgress && (
              <SliderPrimitive.Range
                className="absolute h-full bg-primary rounded-full"
                style={{
                  width: adjustedProgress,
                  backgroundColor: progressColor,
                }}
              />
            )}
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(rangeVariants_thumb({ size }))}
            style={{
              borderColor: thumbColor || progressColor,
            }}
          />
        </SliderPrimitive.Root>

        {/* Min/Max Labels */}
        {showMinMax && (
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    )
  }
)

RangeEnhanced.displayName = "RangeEnhanced"

export { RangeEnhanced, rangeVariants }