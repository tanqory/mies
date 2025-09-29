import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  SortableList,
  SortableGrid,
  DragDropZone,
  KanbanBoard,
  type DnDItem,
  type DropZone,
  type KanbanColumn,
  type KanbanTask
} from '../../src/blocks/dnd-blocks';
import { Badge } from '../../src/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../src/components/ui/avatar';
import { CalendarDays, User, AlertTriangle } from 'lucide-react';

const meta: Meta = {
  title: 'Blocks/DnD',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Drag and drop components for creating interactive lists, grids, and kanban boards.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

// Sample data
const sampleItems: DnDItem[] = Array.from({ length: 8 }, (_, index) => ({
  id: `item-${index + 1}`,
  name: `Item ${index + 1}`,
}));

const sampleDropZones: DropZone[] = [
  {
    id: 'todo',
    title: 'To Do',
    items: [
      { id: 'task-1', name: 'Design homepage' },
      { id: 'task-2', name: 'Set up database' },
    ],
    acceptsItems: true,
  },
  {
    id: 'progress',
    title: 'In Progress',
    items: [
      { id: 'task-3', name: 'Implement authentication' },
    ],
    acceptsItems: true,
    maxItems: 3,
  },
  {
    id: 'done',
    title: 'Done',
    items: [
      { id: 'task-4', name: 'Create project structure' },
      { id: 'task-5', name: 'Install dependencies' },
    ],
    acceptsItems: true,
  },
];

const sampleKanbanTasks: KanbanTask[] = [
  {
    id: 'task-1',
    name: 'Design homepage mockup',
    status: 'todo',
    priority: 'high',
    assignee: 'alice',
    dueDate: new Date('2024-02-15'),
    content: 'Create wireframes and visual design for the main landing page',
  },
  {
    id: 'task-2',
    name: 'Set up development environment',
    status: 'todo',
    priority: 'medium',
    assignee: 'bob',
  },
  {
    id: 'task-3',
    name: 'Implement user authentication',
    status: 'progress',
    priority: 'high',
    assignee: 'charlie',
    dueDate: new Date('2024-02-20'),
  },
  {
    id: 'task-4',
    name: 'Database schema design',
    status: 'review',
    priority: 'medium',
    assignee: 'diana',
  },
  {
    id: 'task-5',
    name: 'Create project documentation',
    status: 'done',
    priority: 'low',
    assignee: 'eve',
  },
];

const sampleKanbanColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    items: sampleKanbanTasks.filter(task => task.status === 'todo'),
  },
  {
    id: 'progress',
    title: 'In Progress',
    items: sampleKanbanTasks.filter(task => task.status === 'progress'),
  },
  {
    id: 'review',
    title: 'Code Review',
    items: sampleKanbanTasks.filter(task => task.status === 'review'),
  },
  {
    id: 'done',
    title: 'Done',
    items: sampleKanbanTasks.filter(task => task.status === 'done'),
  },
];

// Sortable List Stories
export const SortableListVertical: StoryObj<typeof SortableList> = {
  render: () => {
    const [items, setItems] = useState(sampleItems.slice(0, 5));

    return (
      <div className="w-80">
        <SortableList
          items={items}
          onItemsChange={setItems}
          orientation="vertical"
        />
      </div>
    );
  },
};

export const SortableListHorizontal: StoryObj<typeof SortableList> = {
  render: () => {
    const [items, setItems] = useState(sampleItems.slice(0, 4));

    return (
      <div className="w-full max-w-4xl">
        <SortableList
          items={items}
          onItemsChange={setItems}
          orientation="horizontal"
        />
      </div>
    );
  },
};

export const SortableListCustomItems: StoryObj<typeof SortableList> = {
  render: () => {
    const [items, setItems] = useState([
      {
        id: '1',
        name: 'Task 1',
        content: (
          <div className="flex items-center space-x-3">
            <Badge variant="destructive">High Priority</Badge>
            <span>Fix critical bug in payment system</span>
            <Avatar className="h-6 w-6">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        ),
      },
      {
        id: '2',
        name: 'Task 2',
        content: (
          <div className="flex items-center space-x-3">
            <Badge variant="default">Medium</Badge>
            <span>Update user documentation</span>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </div>
        ),
      },
      {
        id: '3',
        name: 'Task 3',
        content: (
          <div className="flex items-center space-x-3">
            <Badge variant="secondary">Low</Badge>
            <span>Refactor CSS styles</span>
          </div>
        ),
      },
    ]);

    return (
      <div className="w-96">
        <SortableList
          items={items}
          onItemsChange={setItems}
          orientation="vertical"
        />
      </div>
    );
  },
};

// Sortable Grid Stories
export const SortableGridDefault: StoryObj<typeof SortableGrid> = {
  render: () => {
    const [items, setItems] = useState(sampleItems);

    return (
      <div className="w-full max-w-2xl">
        <SortableGrid
          items={items}
          onItemsChange={setItems}
          columns={4}
        />
      </div>
    );
  },
};

export const SortableGridTwoColumns: StoryObj<typeof SortableGrid> = {
  render: () => {
    const [items, setItems] = useState(sampleItems.slice(0, 6));

    return (
      <div className="w-full max-w-lg">
        <SortableGrid
          items={items}
          onItemsChange={setItems}
          columns={2}
        />
      </div>
    );
  },
};

// Drag Drop Zone Stories
export const DragDropZoneDefault: StoryObj<typeof DragDropZone> = {
  render: () => {
    const [zones, setZones] = useState(sampleDropZones);

    return (
      <div className="w-full max-w-4xl">
        <DragDropZone
          zones={zones}
          onZonesChange={setZones}
        />
      </div>
    );
  },
};

export const DragDropZoneCustom: StoryObj<typeof DragDropZone> = {
  render: () => {
    const [zones, setZones] = useState([
      {
        id: 'backlog',
        title: 'Backlog',
        items: [
          {
            id: 'feature-1',
            name: 'User Profile',
            content: (
              <div className="space-y-2">
                <div className="font-medium">User Profile Feature</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>Frontend Team</span>
                  <AlertTriangle className="h-3 w-3 text-orange-500" />
                  <span>Blocked</span>
                </div>
              </div>
            ),
          },
        ],
        acceptsItems: true,
      },
      {
        id: 'sprint',
        title: 'Current Sprint',
        items: [],
        acceptsItems: true,
        maxItems: 3,
      },
      {
        id: 'testing',
        title: 'Testing',
        items: [],
        acceptsItems: true,
      },
    ]);

    return (
      <div className="w-full max-w-4xl">
        <DragDropZone
          zones={zones}
          onZonesChange={setZones}
          renderItem={(item) => item.content || item.name}
        />
      </div>
    );
  },
};

// Kanban Board Stories
export const KanbanBoardDefault: StoryObj<typeof KanbanBoard> = {
  render: () => {
    const [columns, setColumns] = useState(sampleKanbanColumns);

    return (
      <div className="w-full h-[600px] overflow-auto">
        <KanbanBoard
          columns={columns}
          onColumnsChange={setColumns}
          onTaskClick={(task) => console.log('Task clicked:', task)}
        />
      </div>
    );
  },
};

export const KanbanBoardMinimal: StoryObj<typeof KanbanBoard> = {
  render: () => {
    const [columns, setColumns] = useState([
      {
        id: 'todo',
        title: 'To Do',
        items: [
          {
            id: 'task-1',
            name: 'Task 1',
            status: 'todo',
          },
          {
            id: 'task-2',
            name: 'Task 2',
            status: 'todo',
          },
        ],
      },
      {
        id: 'doing',
        title: 'Doing',
        items: [],
      },
      {
        id: 'done',
        title: 'Done',
        items: [
          {
            id: 'task-3',
            name: 'Completed Task',
            status: 'done',
          },
        ],
      },
    ]);

    return (
      <div className="w-full h-[500px] overflow-auto">
        <KanbanBoard
          columns={columns}
          onColumnsChange={setColumns}
        />
      </div>
    );
  },
};

// Combined Demo
export const DnDShowcase: StoryObj = {
  render: () => {
    const [listItems, setListItems] = useState(sampleItems.slice(0, 4));
    const [gridItems, setGridItems] = useState(sampleItems.slice(4, 8));
    const [zones, setZones] = useState(sampleDropZones);

    return (
      <div className="w-full max-w-6xl space-y-12">
        {/* Sortable List */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sortable List</h3>
          <div className="w-80">
            <SortableList
              items={listItems}
              onItemsChange={setListItems}
              orientation="vertical"
            />
          </div>
        </div>

        {/* Sortable Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sortable Grid</h3>
          <SortableGrid
            items={gridItems}
            onItemsChange={setGridItems}
            columns={4}
          />
        </div>

        {/* Drag Drop Zones */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Drag & Drop Zones</h3>
          <DragDropZone
            zones={zones}
            onZonesChange={setZones}
          />
        </div>
      </div>
    );
  },
};