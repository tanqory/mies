"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const counterVariants = cva(
  "font-mono transition-all duration-75",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        destructive: "text-destructive",
        success: "text-accent",
        warning: "text-muted-foreground",
        muted: "text-muted-foreground",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "normal",
    },
  }
)

export interface CounterAnimationProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof counterVariants> {
  start?: number
  end: number
  duration?: number
  delay?: number
  step?: number
  precision?: number
  separator?: string
  prefix?: string
  suffix?: string
  autoStart?: boolean
  onComplete?: () => void
  onUpdate?: (value: number) => void
  easingFunction?: (t: number) => number
  formatValue?: (value: number) => string
}

// Easing functions
const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
}

const CounterAnimation = React.forwardRef<HTMLSpanElement, CounterAnimationProps>(
  (
    {
      className,
      variant,
      size,
      weight,
      start = 0,
      end,
      duration = 1000,
      delay = 0,
      step = 1,
      precision = 0,
      separator = ",",
      prefix = "",
      suffix = "",
      autoStart = true,
      onComplete,
      onUpdate,
      easingFunction = easingFunctions.easeOutQuad,
      formatValue,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState(start)
    const [isAnimating, setIsAnimating] = React.useState(false)
    const animationRef = React.useRef<number>()
    const startTimeRef = React.useRef<number>()

    // Format the display value
    const formatDisplayValue = React.useCallback((value: number) => {
      if (formatValue) {
        return formatValue(value)
      }

      // Apply precision
      const roundedValue = precision > 0
        ? Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)
        : Math.round(value)

      // Add separator for thousands
      const formattedValue = separator
        ? roundedValue.toLocaleString('en-US', {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
          })
        : roundedValue.toFixed(precision)

      return `${prefix}${formattedValue}${suffix}`
    }, [formatValue, precision, separator, prefix, suffix])

    // Animation loop function (adapted from Polaris Core logic)
    const animate = React.useCallback((currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current - delay

      if (elapsed < 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easingFunction(progress)

      // Calculate current value
      const valueRange = end - start
      const newValue = start + (valueRange * easedProgress)

      setCurrentValue(newValue)
      onUpdate?.(newValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setCurrentValue(end)
        setIsAnimating(false)
        onComplete?.()
      }
    }, [start, end, duration, delay, easingFunction, onComplete, onUpdate])

    // Start animation function
    const startAnimation = React.useCallback(() => {
      if (isAnimating) return

      setIsAnimating(true)
      setCurrentValue(start)
      startTimeRef.current = undefined

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      animationRef.current = requestAnimationFrame(animate)
    }, [start, animate, isAnimating])

    // Stop animation function
    // const stopAnimation = React.useCallback(() => {
    //   if (animationRef.current) {
    //     cancelAnimationFrame(animationRef.current)
    //   }
    //   setIsAnimating(false)
    // }, [])

    // Reset function (currently unused but available for future use)
    // const reset = React.useCallback(() => {
    //   stopAnimation()
    //   setCurrentValue(start)
    // }, [start, stopAnimation])

    // Auto-start effect
    React.useEffect(() => {
      if (autoStart) {
        const timer = setTimeout(() => {
          startAnimation()
        }, 100) // Small delay to ensure component is mounted

        return () => clearTimeout(timer)
      }
      return undefined
    }, [autoStart, startAnimation])

    // Cleanup
    React.useEffect(() => {
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [])

    // Intersection Observer for triggering animation when in view
    const [elementRef, setElementRef] = React.useState<HTMLSpanElement | null>(null)

    React.useEffect(() => {
      if (!elementRef || autoStart) return undefined

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry && entry.isIntersecting && !isAnimating) {
            startAnimation()
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(elementRef)

      return () => observer.disconnect()
    }, [elementRef, autoStart, isAnimating, startAnimation])

    const setRefs = React.useCallback((element: HTMLSpanElement | null) => {
      setElementRef(element)
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }, [ref])

    return (
      <span
        ref={setRefs}
        className={cn(
          counterVariants({ variant, size, weight }),
          isAnimating && "animate-pulse",
          className
        )}
        {...props}
      >
        {formatDisplayValue(currentValue)}
      </span>
    )
  }
)

CounterAnimation.displayName = "CounterAnimation"

// Hook for imperative control
export const useCounterAnimation = (
  initialStart: number = 0,
  initialEnd: number = 100
) => {
  const [start, setStart] = React.useState(initialStart)
  const [end, setEnd] = React.useState(initialEnd)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const counterRef = React.useRef<HTMLSpanElement>(null)

  const startAnimation = React.useCallback(() => {
    setIsAnimating(true)
    // Animation logic would be handled by the component
  }, [])

  const stopAnimation = React.useCallback(() => {
    setIsAnimating(false)
  }, [])

  const reset = React.useCallback(() => {
    setIsAnimating(false)
    // Reset logic would be handled by the component
  }, [])

  const updateRange = React.useCallback((newStart: number, newEnd: number) => {
    setStart(newStart)
    setEnd(newEnd)
  }, [])

  return {
    start,
    end,
    isAnimating,
    counterRef,
    startAnimation,
    stopAnimation,
    reset,
    updateRange,
    setStart,
    setEnd,
  }
}

export { CounterAnimation, counterVariants, easingFunctions }