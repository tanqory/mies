import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command";
import { Badge } from "./badge";

const autocompleteVariants = cva(
  "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        outline: "border-input",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        default: "h-9 px-3 py-2 text-sm",
        lg: "h-10 px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AutocompleteOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

export interface AutocompleteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof autocompleteVariants> {
  options: AutocompleteOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  creatable?: boolean;
  onCreateOption?: (inputValue: string) => void;
  loading?: boolean;
  maxDisplayed?: number;
}

const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      className,
      variant,
      size,
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = "Select option...",
      searchPlaceholder = "Search...",
      emptyText = "No results found.",
      disabled,
      multiple = false,
      clearable = false,
      creatable = false,
      onCreateOption,
      loading = false,
      maxDisplayed = 100,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      multiple ? defaultValue || [] : defaultValue || ""
    );

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const selectedOptions = React.useMemo(() => {
      if (multiple && Array.isArray(value)) {
        return options.filter((option) => value.includes(option.value));
      } else if (!multiple && typeof value === "string") {
        return options.filter((option) => option.value === value);
      }
      return [];
    }, [options, value, multiple]);

    const filteredOptions = React.useMemo(() => {
      let filtered = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );

      if (creatable && inputValue && !filtered.some((option) => option.label === inputValue)) {
        filtered = [
          { label: `Create "${inputValue}"`, value: inputValue, group: "create" },
          ...filtered,
        ];
      }

      return filtered.slice(0, maxDisplayed);
    }, [options, inputValue, creatable, maxDisplayed]);

    const groupedOptions = React.useMemo(() => {
      const groups: Record<string, AutocompleteOption[]> = {};
      filteredOptions.forEach((option) => {
        const group = option.group || "default";
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(option);
      });
      return groups;
    }, [filteredOptions]);

    const handleSelect = (selectedValue: string) => {
      if (multiple && Array.isArray(value)) {
        const newValue = value.includes(selectedValue)
          ? value.filter((v) => v !== selectedValue)
          : [...value, selectedValue];

        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      } else {
        const newValue = value === selectedValue ? "" : selectedValue;

        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
        setOpen(false);
      }

      // Handle create option
      if (creatable && selectedValue === inputValue && onCreateOption) {
        onCreateOption(inputValue);
        setInputValue("");
      }
    };

    const handleClear = () => {
      const newValue = multiple ? [] : "";
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handleRemoveOption = (optionValue: string) => {
      if (multiple && Array.isArray(value)) {
        const newValue = value.filter((v) => v !== optionValue);
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      }
    };

    const displayValue = () => {
      if (multiple && Array.isArray(value) && value.length > 0) {
        return `${value.length} selected`;
      } else if (!multiple && typeof value === "string" && value) {
        const option = options.find((opt) => opt.value === value);
        return option?.label || value;
      }
      return placeholder;
    };

    const hasValue = multiple
      ? Array.isArray(value) && value.length > 0
      : typeof value === "string" && value;

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                autocompleteVariants({ variant, size }),
                "justify-between font-normal",
                !hasValue && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              <span className="truncate">{displayValue()}</span>
              <div className="flex items-center gap-1">
                {clearable && hasValue && !disabled && (
                  <X
                    className="h-3 w-3 opacity-50 hover:opacity-100 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                  />
                )}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput
                placeholder={searchPlaceholder}
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandEmpty>
                {loading ? "Loading..." : emptyText}
              </CommandEmpty>
              {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                <CommandGroup
                  key={groupName}
                  heading={groupName !== "default" && groupName !== "create" ? groupName : undefined}
                >
                  {groupOptions.map((option) => {
                    const isSelected = multiple
                      ? Array.isArray(value) && value.includes(option.value)
                      : value === option.value;

                    const isCreateOption = option.group === "create";

                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={handleSelect}
                        disabled={option.disabled}
                        className={cn(
                          "cursor-pointer",
                          isCreateOption && "text-primary"
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{option.label}</span>
                          {isSelected && <Check className="h-4 w-4" />}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </Command>
          </PopoverContent>
        </Popover>

        {/* Multiple selection display */}
        {multiple && Array.isArray(value) && value.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedOptions.map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className="text-xs gap-1"
              >
                {option.label}
                {!disabled && (
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => handleRemoveOption(option.value)}
                  />
                )}
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

export { Autocomplete, autocompleteVariants };