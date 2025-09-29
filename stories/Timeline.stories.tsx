import type { Meta, StoryObj } from '@storybook/react';
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineSeparator,
} from '../src/components/ui/timeline';
import { Calendar, GitCommit, Star, Zap, User, CheckCircle } from 'lucide-react';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A timeline component that displays a list of events in chronological order.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'center'],
      description: 'Position of the timeline content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 'left',
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Timeline {...args}>
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>
            <TimelineTitle>Project Started</TimelineTitle>
            <TimelineDescription>
              Initial project setup and configuration completed
            </TimelineDescription>
            <TimelineTime dateTime="2024-01-01">January 1, 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot variant="primary" />
          <TimelineContent>
            <TimelineTitle>Design Phase</TimelineTitle>
            <TimelineDescription>
              UI/UX design and wireframes created
            </TimelineDescription>
            <TimelineTime dateTime="2024-01-15">January 15, 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot variant="success" />
          <TimelineContent>
            <TimelineTitle>Development Complete</TimelineTitle>
            <TimelineDescription>
              All features implemented and tested
            </TimelineDescription>
            <TimelineTime dateTime="2024-02-28">February 28, 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem isLast>
          <TimelineDot variant="primary" />
          <TimelineContent>
            <TimelineTitle>Launch</TimelineTitle>
            <TimelineDescription>
              Project successfully launched to production
            </TimelineDescription>
            <TimelineTime dateTime="2024-03-15">March 15, 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Timeline>
        <TimelineItem>
          <TimelineDot icon={<Calendar className="h-4 w-4" />} variant="primary" />
          <TimelineContent>
            <TimelineTitle>Event Scheduled</TimelineTitle>
            <TimelineDescription>
              Team meeting scheduled for project kickoff
            </TimelineDescription>
            <TimelineTime>2 hours ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot icon={<GitCommit className="h-4 w-4" />} />
          <TimelineContent>
            <TimelineTitle>Code Committed</TimelineTitle>
            <TimelineDescription>
              New features pushed to repository
            </TimelineDescription>
            <TimelineTime>5 hours ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot icon={<Star className="h-4 w-4" />} variant="warning" />
          <TimelineContent>
            <TimelineTitle>Review Requested</TimelineTitle>
            <TimelineDescription>
              Code review requested for pull request #123
            </TimelineDescription>
            <TimelineTime>1 day ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem isLast>
          <TimelineDot icon={<CheckCircle className="h-4 w-4" />} variant="success" />
          <TimelineContent>
            <TimelineTitle>Task Completed</TimelineTitle>
            <TimelineDescription>
              All requirements successfully implemented
            </TimelineDescription>
            <TimelineTime>2 days ago</TimelineTime>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
};

export const Center: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Timeline position="center">
        <TimelineItem>
          <TimelineDot variant="primary" />
          <TimelineContent>
            <TimelineTitle>Q1 2024</TimelineTitle>
            <TimelineDescription>
              Product planning and initial development
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot variant="success" />
          <TimelineContent>
            <TimelineTitle>Q2 2024</TimelineTitle>
            <TimelineDescription>
              Beta testing and user feedback collection
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot variant="warning" />
          <TimelineContent>
            <TimelineTitle>Q3 2024</TimelineTitle>
            <TimelineDescription>
              Final testing and preparation for launch
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem isLast>
          <TimelineDot variant="primary" />
          <TimelineContent>
            <TimelineTitle>Q4 2024</TimelineTitle>
            <TimelineDescription>
              Product launch and market expansion
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Timeline>
        <TimelineItem>
          <TimelineDot variant="default" />
          <TimelineContent>
            <TimelineTitle>Default Variant</TimelineTitle>
            <TimelineDescription>Standard timeline item</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot variant="primary" />
          <TimelineContent>
            <TimelineTitle>Primary Variant</TimelineTitle>
            <TimelineDescription>Important milestone or event</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot variant="success" />
          <TimelineContent>
            <TimelineTitle>Success Variant</TimelineTitle>
            <TimelineDescription>Completed task or achievement</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot variant="warning" />
          <TimelineContent>
            <TimelineTitle>Warning Variant</TimelineTitle>
            <TimelineDescription>Important notice or pending action</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot variant="destructive" />
          <TimelineContent>
            <TimelineTitle>Destructive Variant</TimelineTitle>
            <TimelineDescription>Error, failure, or critical issue</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem isLast>
          <TimelineDot variant="outline" />
          <TimelineContent>
            <TimelineTitle>Outline Variant</TimelineTitle>
            <TimelineDescription>Future or planned event</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Small Dots</h3>
        <Timeline>
          <TimelineItem>
            <TimelineDot size="sm" variant="primary" />
            <TimelineContent>
              <TimelineTitle>Small Timeline Item</TimelineTitle>
              <TimelineDescription>With small dot size</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem isLast>
            <TimelineDot size="sm" />
            <TimelineContent>
              <TimelineTitle>Another Small Item</TimelineTitle>
              <TimelineDescription>Compact timeline layout</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Large Dots</h3>
        <Timeline>
          <TimelineItem>
            <TimelineDot size="lg" variant="success" icon={<Zap className="h-5 w-5" />} />
            <TimelineContent>
              <TimelineTitle>Large Timeline Item</TimelineTitle>
              <TimelineDescription>With large dot size and icon</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem isLast>
            <TimelineDot size="lg" variant="primary" />
            <TimelineContent>
              <TimelineTitle>Another Large Item</TimelineTitle>
              <TimelineDescription>Prominent timeline layout</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  ),
};

export const WithSeparators: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Timeline>
        <TimelineItem>
          <TimelineDot variant="success" />
          <TimelineContent>
            <TimelineTitle>Phase 1 Complete</TimelineTitle>
            <TimelineDescription>All initial requirements finished</TimelineDescription>
            <TimelineTime>March 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot variant="success" />
          <TimelineContent>
            <TimelineTitle>Phase 2 Complete</TimelineTitle>
            <TimelineDescription>Advanced features implemented</TimelineDescription>
            <TimelineTime>June 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>

        <TimelineSeparator>Summer Break</TimelineSeparator>

        <TimelineItem>
          <TimelineDot variant="primary" />
          <TimelineContent>
            <TimelineTitle>Phase 3 Started</TimelineTitle>
            <TimelineDescription>Final phase of development begun</TimelineDescription>
            <TimelineTime>September 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem isLast>
          <TimelineDot variant="outline" />
          <TimelineContent>
            <TimelineTitle>Final Launch</TimelineTitle>
            <TimelineDescription>Product launch scheduled</TimelineDescription>
            <TimelineTime>December 2024</TimelineTime>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
};