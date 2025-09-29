import React from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { cn } from '../../components/ui/utils';

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presetColors?: string[];
  showInput?: boolean;
  showPresets?: boolean;
  label?: string;
  className?: string;
}

const DEFAULT_PRESETS = [
  'hsl(var(--destructive))', 'hsl(var(--success))', 'hsl(var(--primary))', 'hsl(var(--accent))',
  'hsl(var(--warning))', 'hsl(var(--secondary))', 'hsl(var(--muted))', 'hsl(var(--border))',
  'hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'
];

export function ColorPicker({
  value = '#000000',
  onChange,
  presetColors = DEFAULT_PRESETS,
  showInput = true,
  showPresets = true,
  label,
  className,
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = React.useState(value);
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    setCurrentColor(value);
    setInputValue(value);
  }, [value]);

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    setInputValue(color);
    onChange?.(color);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      setCurrentColor(newValue);
      onChange?.(newValue);
    }
  };

  const isValidHex = (hex: string) => {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}
      
      {/* Current Color Display */}
      <div className="flex items-center space-x-3">
        <div
          className={cn(
            "w-12 h-12 rounded-lg border-2 border-muted cursor-pointer transition-transform hover:scale-105",
            "bg-[var(--current-color)]"
          )}
          style={{ '--current-color': currentColor } as React.CSSProperties}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'color';
            input.value = currentColor;
            input.onchange = (e) => handleColorChange((e.target as HTMLInputElement).value);
            input.click();
          }}
        />
        <div>
          <div className="text-sm font-medium">{currentColor.toUpperCase()}</div>
          <div className="text-xs text-muted-foreground">Click to open color picker</div>
        </div>
      </div>

      {/* Hex Input */}
      {showInput && (
        <div className="space-y-2">
          <Label htmlFor="hex-input" className="text-sm">Hex Color</Label>
          <Input
            id="hex-input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="#000000"
            className={cn(
              'font-mono',
              !isValidHex(inputValue) && inputValue !== '' && 'border-destructive'
            )}
          />
          {!isValidHex(inputValue) && inputValue !== '' && (
            <p className="text-xs text-destructive">Please enter a valid hex color (e.g., #FF0000)</p>
          )}
        </div>
      )}

      {/* Preset Colors */}
      {showPresets && presetColors.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm">Preset Colors</Label>
          <div className="grid grid-cols-6 gap-2">
            {presetColors.map((color, index) => (
              <button
                key={index}
                className={cn(
                  'w-8 h-8 rounded-md border-2 transition-all hover:scale-110 bg-[var(--preset-color)]',
                  currentColor.toLowerCase() === color.toLowerCase()
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-muted hover:border-muted-foreground'
                )}
                style={{ '--preset-color': color } as React.CSSProperties}
                onClick={() => handleColorChange(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

