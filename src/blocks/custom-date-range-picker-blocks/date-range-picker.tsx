import React from 'react';
import { DatePicker } from '../../components/ui/date-picker';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../components/ui/utils';

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  presets?: Array<{
    label: string;
    range: DateRange;
  }>;
  className?: string;
}

const DEFAULT_PRESETS = [
  {
    label: 'Last 7 days',
    range: {
      from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      to: new Date(),
    },
  },
  {
    label: 'Last 30 days',
    range: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      to: new Date(),
    },
  },
  {
    label: 'Last 3 months',
    range: {
      from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      to: new Date(),
    },
  },
  {
    label: 'Last 6 months',
    range: {
      from: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      to: new Date(),
    },
  },
  {
    label: 'This year',
    range: {
      from: new Date(new Date().getFullYear(), 0, 1),
      to: new Date(),
    },
  },
];

export function DateRangePicker({
  value,
  onChange,
  label,
  placeholder = 'Select date range',
  minDate,
  maxDate,
  presets = DEFAULT_PRESETS,
  className,
}: DateRangePickerProps) {
  const [fromDate, setFromDate] = React.useState<Date | undefined>(value?.from);
  const [toDate, setToDate] = React.useState<Date | undefined>(value?.to);

  React.useEffect(() => {
    if (fromDate && toDate) {
      onChange?.({ from: fromDate, to: toDate });
    } else {
      onChange?.(undefined);
    }
  }, [fromDate, toDate, onChange]);

  const handlePresetClick = (preset: { label: string; range: DateRange }) => {
    setFromDate(preset.range.from);
    setToDate(preset.range.to);
  };

  const clearSelection = () => {
    setFromDate(undefined);
    setToDate(undefined);
  };

  const formatDateRange = () => {
    if (!fromDate || !toDate) return placeholder;
    return `${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}`;
  };

  return (
    <div className={cn('space-y-4', className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{formatDateRange()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Date Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">From Date</Label>
              <DatePicker
                date={fromDate}
                onDateChange={setFromDate}
                placeholder="Select start date"
                calendarProps={{
                  fromDate: minDate,
                  toDate: toDate || maxDate,
                  disabled: { before: minDate || new Date(0), after: toDate || maxDate || new Date() }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">To Date</Label>
              <DatePicker
                date={toDate}
                onDateChange={setToDate}
                placeholder="Select end date"
                calendarProps={{
                  fromDate: fromDate || minDate,
                  toDate: maxDate,
                  disabled: { before: fromDate || minDate || new Date(0), after: maxDate || new Date() }
                }}
              />
            </div>
          </div>

          {/* Presets */}
          {presets.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm">Quick Selection</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {presets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePresetClick(preset)}
                    className="justify-start text-xs h-8"
                  >
                    {preset.label}
                  </Button>
                ))}\n              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={clearSelection}
              disabled={!fromDate && !toDate}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

