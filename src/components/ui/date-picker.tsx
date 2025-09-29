import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  calendarProps?: React.ComponentProps<typeof Calendar>;
  inputProps?: React.ComponentProps<typeof Input>;
  format?: string;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      date,
      onDateChange,
      placeholder = "Pick a date",
      disabled,
      className,
      calendarProps,
      inputProps,
      format: dateFormat = "PPP",
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    React.useEffect(() => {
      if (date) {
        setInputValue(format(date, dateFormat));
      } else {
        setInputValue("");
      }
    }, [date, dateFormat]);

    const handleDateSelect = (selectedDate: Date | undefined) => {
      onDateChange?.(selectedDate);
      setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      // Try to parse the input value as a date
      try {
        const parsedDate = new Date(value);
        if (!isNaN(parsedDate.getTime())) {
          onDateChange?.(parsedDate);
        }
      } catch {
        // Invalid date, ignore
      }
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <Input
                {...inputProps}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="border-0 p-0 h-auto bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={disabled}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              {...calendarProps}
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={disabled}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export interface DateRangePickerProps {
  dateRange?: { from: Date | undefined; to: Date | undefined };
  onDateRangeChange?: (range: { from: Date | undefined; to: Date | undefined } | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  calendarProps?: React.ComponentProps<typeof Calendar>;
  numberOfMonths?: number;
}

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      dateRange,
      onDateRangeChange,
      placeholder = "Pick a date range",
      disabled,
      className,
      calendarProps,
      numberOfMonths = 2,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const formatDateRange = () => {
      if (!dateRange?.from) {
        return placeholder;
      }

      if (dateRange.to) {
        return `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`;
      }

      return format(dateRange.from, "LLL dd, y");
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              {...calendarProps}
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onDateRangeChange as any}
              numberOfMonths={numberOfMonths}
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";

export interface TimePickerProps {
  time?: { hour: number; minute: number };
  onTimeChange?: (time: { hour: number; minute: number }) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  format24?: boolean;
}

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      time,
      onTimeChange,
      placeholder = "Select time",
      disabled,
      className,
      format24 = false,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [hours, setHours] = React.useState(time?.hour || 12);
    const [minutes, setMinutes] = React.useState(time?.minute || 0);
    const [period, setPeriod] = React.useState<"AM" | "PM">("AM");

    React.useEffect(() => {
      if (time) {
        if (format24) {
          setHours(time.hour);
        } else {
          const displayHour = time.hour === 0 ? 12 : time.hour > 12 ? time.hour - 12 : time.hour;
          setHours(displayHour);
          setPeriod(time.hour >= 12 ? "PM" : "AM");
        }
        setMinutes(time.minute);
      }
    }, [time, format24]);

    const formatTime = () => {
      if (!time) return placeholder;

      if (format24) {
        return `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
      } else {
        const displayHour = time.hour === 0 ? 12 : time.hour > 12 ? time.hour - 12 : time.hour;
        const period = time.hour >= 12 ? "PM" : "AM";
        return `${displayHour}:${time.minute.toString().padStart(2, "0")} ${period}`;
      }
    };

    const handleTimeChange = (newHours: number, newMinutes: number, newPeriod?: "AM" | "PM") => {
      let actualHours = newHours;

      if (!format24 && newPeriod) {
        if (newPeriod === "PM" && newHours !== 12) {
          actualHours = newHours + 12;
        } else if (newPeriod === "AM" && newHours === 12) {
          actualHours = 0;
        }
      }

      onTimeChange?.({ hour: actualHours, minute: newMinutes });
    };

    const generateOptions = (max: number) => {
      return Array.from({ length: max }, (_, i) => i);
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !time && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatTime()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            <div className="flex items-center space-x-2">
              <select
                value={hours}
                onChange={(e) => {
                  const newHours = parseInt(e.target.value);
                  setHours(newHours);
                  handleTimeChange(newHours, minutes, period);
                }}
                className="px-3 py-1 border border-input rounded-md bg-background"
                disabled={disabled}
              >
                {generateOptions(format24 ? 24 : 12).map((hour) => (
                  <option key={hour} value={format24 ? hour : hour === 0 ? 12 : hour}>
                    {format24 ? hour.toString().padStart(2, "0") : (hour === 0 ? 12 : hour)}
                  </option>
                ))}
              </select>
              <span>:</span>
              <select
                value={minutes}
                onChange={(e) => {
                  const newMinutes = parseInt(e.target.value);
                  setMinutes(newMinutes);
                  handleTimeChange(hours, newMinutes, period);
                }}
                className="px-3 py-1 border border-input rounded-md bg-background"
                disabled={disabled}
              >
                {generateOptions(60).map((minute) => (
                  <option key={minute} value={minute}>
                    {minute.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              {!format24 && (
                <select
                  value={period}
                  onChange={(e) => {
                    const newPeriod = e.target.value as "AM" | "PM";
                    setPeriod(newPeriod);
                    handleTimeChange(hours, minutes, newPeriod);
                  }}
                  className="px-3 py-1 border border-input rounded-md bg-background"
                  disabled={disabled}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";

export interface DateTimePickerProps {
  dateTime?: Date;
  onDateTimeChange?: (dateTime: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  format24?: boolean;
  dateFormat?: string;
}

const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      dateTime,
      onDateTimeChange,
      placeholder = "Pick date and time",
      disabled,
      className,
      format24 = false,
      dateFormat = "PPP",
      ...props
    },
    ref
  ) => {
    const handleDateChange = (date: Date | undefined) => {
      if (!date) {
        onDateTimeChange?.(undefined);
        return;
      }

      const newDateTime = new Date(date);
      if (dateTime) {
        newDateTime.setHours(dateTime.getHours(), dateTime.getMinutes());
      }
      onDateTimeChange?.(newDateTime);
    };

    const handleTimeChange = (time: { hour: number; minute: number }) => {
      const newDateTime = dateTime ? new Date(dateTime) : new Date();
      newDateTime.setHours(time.hour, time.minute);
      onDateTimeChange?.(newDateTime);
    };

    const currentTime = dateTime ? { hour: dateTime.getHours(), minute: dateTime.getMinutes() } : undefined;

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <DatePicker
          date={dateTime}
          onDateChange={handleDateChange}
          placeholder="Pick date"
          disabled={disabled}
          format={dateFormat}
        />
        <TimePicker
          time={currentTime}
          onTimeChange={handleTimeChange}
          placeholder="Pick time"
          disabled={disabled}
          format24={format24}
        />
      </div>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export { DatePicker, DateRangePicker, TimePicker, DateTimePicker };