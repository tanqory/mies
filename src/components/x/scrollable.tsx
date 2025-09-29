"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const scrollableVariants = cva("", {
  variants: {
    horizontal: {
      true: "overflow-x-auto",
      false: "overflow-x-hidden",
    },
    vertical: {
      true: "overflow-y-auto",
      false: "overflow-y-hidden",
    },
    shadow: {
      true: "",
      false: "",
    },
    hint: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    horizontal: false,
    vertical: true,
    shadow: false,
    hint: false,
  },
})

export interface ScrollableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scrollableVariants> {
  children: React.ReactNode
  focusable?: boolean
  onScrolledToBottom?: () => void
}

const Scrollable = React.forwardRef<HTMLDivElement, ScrollableProps>(
  (
    {
      className,
      horizontal,
      vertical,
      shadow,
      hint,
      children,
      focusable = false,
      onScrolledToBottom,
      ...props
    },
    ref
  ) => {
    const [isScrolledToBottom, setIsScrolledToBottom] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [showTopShadow, setShowTopShadow] = React.useState(false)
    const [showBottomShadow, setShowBottomShadow] = React.useState(false)
    const scrollableRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => scrollableRef.current!, [])

    const handleScroll = React.useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1

        setIsScrolled(scrollTop > 0)
        setIsScrolledToBottom(isAtBottom)

        if (shadow) {
          setShowTopShadow(scrollTop > 0)
          setShowBottomShadow(!isAtBottom && scrollHeight > clientHeight)
        }

        if (isAtBottom && onScrolledToBottom) {
          onScrolledToBottom()
        }
      },
      [shadow, onScrolledToBottom]
    )

    React.useEffect(() => {
      const element = scrollableRef.current
      if (!element || !shadow) return

      // Initial shadow state
      const { scrollTop, scrollHeight, clientHeight } = element
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1

      setShowTopShadow(scrollTop > 0)
      setShowBottomShadow(!isAtBottom && scrollHeight > clientHeight)
    }, [shadow, children])

    return (
      <div className={cn("relative", className)} {...props}>
        {/* Top shadow */}
        {shadow && showTopShadow && (
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background/80 to-transparent pointer-events-none z-10" />
        )}

        {/* Scrollable content */}
        <div
          ref={scrollableRef}
          className={cn(
            scrollableVariants({ horizontal, vertical }),
            focusable && "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
          tabIndex={focusable ? 0 : undefined}
          onScroll={handleScroll}
        >
          {children}
        </div>

        {/* Bottom shadow */}
        {shadow && showBottomShadow && (
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-background/80 to-transparent pointer-events-none z-10" />
        )}

        {/* Scroll hint */}
        {hint && !isScrolled && (
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none">
            Scroll for more
          </div>
        )}
      </div>
    )
  }
)

Scrollable.displayName = "Scrollable"

export { Scrollable, scrollableVariants }