"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const colorPickerVariants = cva("space-y-2", {
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

export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof colorPickerVariants> {
  label?: string
  labelHidden?: boolean
  value?: string
  onChange?: (color: string) => void
  allowAlpha?: boolean
  disabled?: boolean
  error?: string
  helpText?: string
}

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      className,
      variant,
      label,
      labelHidden = false,
      value = "#000000",
      onChange,
      allowAlpha = false,
      disabled = false,
      error,
      helpText,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value)
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
      setInternalValue(value)
    }, [value])

    const handleColorChange = (newColor: string) => {
      setInternalValue(newColor)
      onChange?.(newColor)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)
      if (newValue.match(/^#[0-9A-F]{6}$/i)) {
        onChange?.(newValue)
      }
    }

    const presetColors = [
      "#000000", "#ffffff", "#f3f4f6", "#6b7280",
      "#ef4444", "#f97316", "#eab308", "#22c55e",
      "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4",
    ]

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      } : null
    }

    const rgbToHex = (r: number, g: number, b: number) => {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    }

    const rgb = hexToRgb(internalValue)

    return (
      <div
        ref={ref}
        className={cn(colorPickerVariants({ variant }), className)}
        {...props}
      >
        {label && !labelHidden && (
          <Label className={disabled ? "opacity-50" : ""}>{label}</Label>
        )}

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className="w-full justify-start gap-2"
            >
              <div
                className="h-4 w-4 rounded border border-border"
                style={{ backgroundColor: internalValue }}
              />
              <span className="flex-1 text-left">{internalValue}</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80">
            <Tabs defaultValue="picker" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="picker">Picker</TabsTrigger>
                <TabsTrigger value="presets">Presets</TabsTrigger>
              </TabsList>

              <TabsContent value="picker" className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="hex-input" className="text-xs">Hex</Label>
                    <Input
                      id="hex-input"
                      value={internalValue}
                      onChange={handleInputChange}
                      placeholder="#000000"
                      className="mt-1"
                    />
                  </div>

                  {rgb && (
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="r-input" className="text-xs">R</Label>
                        <Input
                          id="r-input"
                          type="number"
                          min="0"
                          max="255"
                          value={rgb.r}
                          onChange={(e) => {
                            const r = parseInt(e.target.value) || 0
                            handleColorChange(rgbToHex(r, rgb.g, rgb.b))
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="g-input" className="text-xs">G</Label>
                        <Input
                          id="g-input"
                          type="number"
                          min="0"
                          max="255"
                          value={rgb.g}
                          onChange={(e) => {
                            const g = parseInt(e.target.value) || 0
                            handleColorChange(rgbToHex(rgb.r, g, rgb.b))
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="b-input" className="text-xs">B</Label>
                        <Input
                          id="b-input"
                          type="number"
                          min="0"
                          max="255"
                          value={rgb.b}
                          onChange={(e) => {
                            const b = parseInt(e.target.value) || 0
                            handleColorChange(rgbToHex(rgb.r, rgb.g, b))
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <div
                      className="mx-auto h-16 w-16 rounded-lg border border-border"
                      style={{ backgroundColor: internalValue }}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="presets">
                <div className="grid grid-cols-6 gap-2">
                  {presetColors.map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      className="h-10 w-10 p-0"
                      onClick={() => {
                        handleColorChange(color)
                        setIsOpen(false)
                      }}
                    >
                      <div
                        className="h-6 w-6 rounded border border-border"
                        style={{ backgroundColor: color }}
                      />
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>

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

ColorPicker.displayName = "ColorPicker"

export { ColorPicker, colorPickerVariants }