import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const ratingVariants = cva(
  "inline-flex items-center gap-0.5",
  {
    variants: {
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const starVariants = cva(
  "cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
      },
      state: {
        empty: "text-muted-foreground/40 hover:text-muted-foreground/60",
        filled: "text-accent hover:text-accent/80",
        half: "text-accent hover:text-accent/80",
      },
    },
    defaultVariants: {
      size: "default",
      state: "empty",
    },
  }
);

interface StarIconProps {
  filled?: boolean;
  half?: boolean;
  className?: string;
}

const StarIcon = ({ filled = false, half = false, className }: StarIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled || half ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    {half ? (
      <defs>
        <linearGradient id="half-fill">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
    ) : null}
    <polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      fill={half ? "url(#half-fill)" : filled ? "currentColor" : "none"}
    />
  </svg>
);

export interface RatingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ratingVariants> {
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: number;
  readOnly?: boolean;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
  name?: string;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      size,
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      precision = 1,
      readOnly = false,
      disabled = false,
      onValueChange,
      name,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const displayValue = hoverValue !== null ? hoverValue : value;

    const handleClick = (newValue: number) => {
      if (readOnly || disabled) return;

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handleMouseEnter = (newValue: number) => {
      if (readOnly || disabled) return;
      setHoverValue(newValue);
    };

    const handleMouseLeave = () => {
      if (readOnly || disabled) return;
      setHoverValue(null);
    };

    const getStarState = (starIndex: number): "empty" | "filled" | "half" => {
      // const starValue = starIndex + 1;
      const diff = displayValue - starIndex;

      if (diff >= 1) return "filled";
      if (diff >= 0.5 && precision === 0.5) return "half";
      if (diff > 0 && precision < 1) return "filled";
      return "empty";
    };

    const getStarValue = (starIndex: number, event: React.MouseEvent) => {
      if (precision === 0.5) {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const isLeftHalf = event.clientX - rect.left < rect.width / 2;
        return starIndex + (isLeftHalf ? 0.5 : 1);
      }
      return starIndex + 1;
    };

    return (
      <div
        ref={ref}
        className={cn(ratingVariants({ size, className }))}
        role="radiogroup"
        aria-label={`Rating ${displayValue} out of ${max}`}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const starState = getStarState(i);
          const starValue = i + 1;

          return (
            <button
              key={i}
              type="button"
              className={cn(starVariants({ size, state: starState }))}
              disabled={disabled}
              onClick={(event) => handleClick(getStarValue(i, event))}
              onMouseEnter={(event) => handleMouseEnter(getStarValue(i, event))}
              onMouseLeave={handleMouseLeave}
              aria-label={`Rate ${starValue} star${starValue !== 1 ? 's' : ''}`}
              role="radio"
              aria-checked={value >= starValue}
              tabIndex={readOnly || disabled ? -1 : 0}
            >
              <StarIcon
                filled={starState === "filled"}
                half={starState === "half"}
                className="h-full w-full"
              />
            </button>
          );
        })}

        {name && (
          <input
            type="hidden"
            name={name}
            value={value}
          />
        )}
      </div>
    );
  }
);

Rating.displayName = "Rating";

export { Rating, ratingVariants };