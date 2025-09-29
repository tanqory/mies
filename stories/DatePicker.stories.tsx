import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, DateRangePicker, TimePicker, DateTimePicker } from '../src/components/ui/date-picker';
import { useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Date and time picker components for selecting dates, date ranges, times, and combined date-time values.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Pick a date',
  },
};

export const WithDefaultValue: Story = {
  args: {
    date: new Date('2024-03-15'),
    placeholder: 'Pick a date',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Pick a date',
    date: new Date('2024-03-15'),
  },
};

export const CustomFormat: Story = {
  args: {
    placeholder: 'Pick a date',
    format: 'MM/dd/yyyy',
  },
};

export const Controlled: Story = {
  render: function ControlledDatePicker() {
    const [date, setDate] = useState<Date>();

    return (
      <div className="space-y-4">
        <DatePicker
          date={date}
          onDateChange={setDate}
          placeholder="Pick a date"
        />
        <p className="text-sm text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : 'None'}
        </p>
      </div>
    );
  },
};

// Date Range Picker Stories
export const DateRangeDefault: Story = {
  render: () => (
    <DateRangePicker placeholder="Pick a date range" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'A date range picker that allows selecting a start and end date.',
      },
    },
  },
};

export const DateRangeWithDefault: Story = {
  render: () => (
    <DateRangePicker
      dateRange={{
        from: new Date('2024-03-01'),
        to: new Date('2024-03-15')
      }}
      placeholder="Pick a date range"
    />
  ),
};

export const DateRangeControlled: Story = {
  render: function ControlledDateRangePicker() {
    const [dateRange, setDateRange] = useState<{
      from: Date | undefined;
      to: Date | undefined;
    }>({
      from: undefined,
      to: undefined,
    });

    return (
      <div className="space-y-4">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          placeholder="Pick a date range"
          numberOfMonths={2}
        />
        <div className="text-sm text-muted-foreground">
          <p>From: {dateRange.from ? dateRange.from.toLocaleDateString() : 'None'}</p>
          <p>To: {dateRange.to ? dateRange.to.toLocaleDateString() : 'None'}</p>
        </div>
      </div>
    );
  },
};

// Time Picker Stories
export const TimeDefault: Story = {
  render: () => (
    <TimePicker placeholder="Select time" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'A time picker component for selecting hours and minutes.',
      },
    },
  },
};

export const Time24Hour: Story = {
  render: () => (
    <TimePicker
      placeholder="Select time (24h)"
      format24
    />
  ),
};

export const TimeWithDefault: Story = {
  render: () => (
    <TimePicker
      time={{ hour: 14, minute: 30 }}
      placeholder="Select time"
    />
  ),
};

export const TimeControlled: Story = {
  render: function ControlledTimePicker() {
    const [time, setTime] = useState<{ hour: number; minute: number }>();

    return (
      <div className="space-y-4">
        <TimePicker
          time={time}
          onTimeChange={setTime}
          placeholder="Select time"
        />
        <p className="text-sm text-muted-foreground">
          Selected: {time ? `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}` : 'None'}
        </p>
      </div>
    );
  },
};

// Date Time Picker Stories
export const DateTimeDefault: Story = {
  render: () => (
    <DateTimePicker placeholder="Pick date and time" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'A combined date and time picker component.',
      },
    },
  },
};

export const DateTime24Hour: Story = {
  render: () => (
    <DateTimePicker
      placeholder="Pick date and time (24h)"
      format24
    />
  ),
};

export const DateTimeControlled: Story = {
  render: function ControlledDateTimePicker() {
    const [dateTime, setDateTime] = useState<Date>();

    return (
      <div className="space-y-4 w-64">
        <DateTimePicker
          dateTime={dateTime}
          onDateTimeChange={setDateTime}
          placeholder="Pick date and time"
        />
        <p className="text-sm text-muted-foreground">
          Selected: {dateTime ? dateTime.toLocaleString() : 'None'}
        </p>
      </div>
    );
  },
};

// All Components Showcase
export const AllVariants: Story = {
  render: function AllDatePickerVariants() {
    const [date, setDate] = useState<Date>();
    const [dateRange, setDateRange] = useState<{
      from: Date | undefined;
      to: Date | undefined;
    }>({ from: undefined, to: undefined });
    const [time, setTime] = useState<{ hour: number; minute: number }>();
    const [dateTime, setDateTime] = useState<Date>();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Picker</label>
          <DatePicker
            date={date}
            onDateChange={setDate}
            placeholder="Pick a date"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range Picker</label>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            placeholder="Pick date range"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Time Picker</label>
          <TimePicker
            time={time}
            onTimeChange={setTime}
            placeholder="Select time"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date Time Picker</label>
          <DateTimePicker
            dateTime={dateTime}
            onDateTimeChange={setDateTime}
            placeholder="Pick date & time"
          />
        </div>

        <div className="md:col-span-2 pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Selected Values:</h3>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Date: {date ? date.toLocaleDateString() : 'None'}</p>
            <p>Date Range: {dateRange.from && dateRange.to
              ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
              : 'None'}</p>
            <p>Time: {time ? `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}` : 'None'}</p>
            <p>Date Time: {dateTime ? dateTime.toLocaleString() : 'None'}</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A showcase of all date/time picker variants with their current values displayed.',
      },
    },
  },
};

// Form Example
export const FormExample: Story = {
  render: function DatePickerForm() {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [meetingTime, setMeetingTime] = useState<{ hour: number; minute: number }>();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', {
        startDate,
        endDate,
        meetingTime,
      });
      alert('Check console for submitted values');
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6 w-80">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Start Date *</label>
          <DatePicker
            date={startDate}
            onDateChange={setStartDate}
            placeholder="Select start date"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Project End Date</label>
          <DatePicker
            date={endDate}
            onDateChange={setEndDate}
            placeholder="Select end date"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Daily Meeting Time</label>
          <TimePicker
            time={meetingTime}
            onTimeChange={setMeetingTime}
            placeholder="Select meeting time"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
            disabled={!startDate}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              setStartDate(undefined);
              setEndDate(undefined);
              setMeetingTime(undefined);
            }}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'An example form using multiple date/time pickers with validation.',
      },
    },
  },
};