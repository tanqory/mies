import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { cn } from '../../components/ui/utils';
import {
  GripVertical,
  Plus,
  MoreHorizontal,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import type { KanbanColumn, KanbanTask } from './types';

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onColumnsChange?: (columns: KanbanColumn[]) => void;
  onTaskMove?: (taskId: string, fromColumnId: string, toColumnId: string, newIndex?: number) => void;
  onAddTask?: (columnId: string) => void;
  onTaskClick?: (task: KanbanTask) => void;
  className?: string;
  disabled?: boolean;
}

interface KanbanTaskCardProps {
  task: KanbanTask;
  columnId: string;
  disabled?: boolean;
  onClick?: (task: KanbanTask) => void;
}

function KanbanTaskCard({ task, columnId, disabled = false, onClick }: KanbanTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    disabled,
    data: {
      type: 'task',
      task,
      columnId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-3 w-3" />;
      case 'medium':
        return <Clock className="h-3 w-3" />;
      case 'low':
        return <CheckCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group cursor-pointer hover:shadow-md transition-shadow',
        isDragging && 'opacity-50 rotate-3 shadow-lg'
      )}
      onClick={() => onClick?.(task)}
      {...attributes}
    >
      <CardContent className="p-3">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm leading-relaxed flex-1">
              {task.name}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
              {...listeners}
            >
              <GripVertical className="h-3 w-3" />
            </Button>
          </div>

          {/* Content */}
          {task.content && (
            <div className="text-xs text-muted-foreground">
              {task.content}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              {task.priority && (
                <Badge variant={getPriorityColor(task.priority)} className="h-5">
                  {getPriorityIcon(task.priority)}
                  <span className="ml-1 capitalize">{task.priority}</span>
                </Badge>
              )}

              {task.dueDate && (
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {task.dueDate.toLocaleDateString()}
                </div>
              )}
            </div>

            {task.assignee && (
              <Avatar className="h-6 w-6">
                <AvatarImage src={`https://avatar.vercel.sh/${task.assignee}`} />
                <AvatarFallback className="text-xs">
                  {task.assignee.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface KanbanColumnProps {
  column: KanbanColumn;
  tasks: KanbanTask[];
  onAddTask?: (columnId: string) => void;
  onTaskClick?: (task: KanbanTask) => void;
  disabled?: boolean;
}

function KanbanColumnComponent({
  column,
  tasks,
  onAddTask,
  onTaskClick,
  disabled = false
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });

  return (
    <Card className={cn('h-fit min-w-[280px]', isOver && 'ring-2 ring-primary ring-offset-2')}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {column.title}
            <Badge variant="secondary" className="ml-2 h-5">
              {tasks.length}
            </Badge>
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0" ref={setNodeRef}>
        <div className="space-y-3 min-h-[400px]">
          <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <KanbanTaskCard
                key={task.id}
                task={task}
                columnId={column.id}
                disabled={disabled}
                onClick={onTaskClick}
              />
            ))}
          </SortableContext>

          {onAddTask && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddTask(column.id)}
              className="w-full h-8 border-dashed border-2 text-muted-foreground hover:text-foreground hover:border-solid"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function KanbanBoard({
  columns,
  onColumnsChange,
  onTaskMove,
  onAddTask,
  onTaskClick,
  className,
  disabled = false,
}: KanbanBoardProps) {
  const [internalColumns, setInternalColumns] = useState(columns);
  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null);

  const actualColumns = onColumnsChange ? columns : internalColumns;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const activeData = active.data.current;

    if (activeData?.type === 'task') {
      setActiveTask(activeData.task);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === 'task' && overData?.type === 'column') {
      const taskId = active.id as string;
      const fromColumnId = activeData.columnId;
      const toColumnId = overData.column.id;

      if (fromColumnId === toColumnId) return;

      const newColumns = actualColumns.map(column => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            items: column.items.filter(item => item.id !== taskId),
          };
        }
        if (column.id === toColumnId) {
          const sourceColumn = actualColumns.find(col => col.id === fromColumnId);
          const task = sourceColumn?.items.find(item => item.id === taskId);

          if (task) {
            return {
              ...column,
              items: [...column.items, task],
            };
          }
        }
        return column;
      });

      if (onColumnsChange) {
        onColumnsChange(newColumns);
      } else {
        setInternalColumns(newColumns);
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // Handle task reordering within the same column
    if (activeData?.type === 'task' && overData?.type === 'task') {
      const activeColumnId = activeData.columnId;
      const overColumnId = overData.columnId;

      if (activeColumnId === overColumnId) {
        const columnIndex = actualColumns.findIndex(col => col.id === activeColumnId);
        const column = actualColumns[columnIndex];

        if (!column) return;

        const oldIndex = column.items.findIndex(item => item.id === active.id);
        const newIndex = column.items.findIndex(item => item.id === over.id);

        if (oldIndex !== newIndex) {
          const newItems = arrayMove(column.items, oldIndex, newIndex);
          const newColumns = [...actualColumns];
          newColumns[columnIndex] = { ...column, items: newItems };

          if (onColumnsChange) {
            onColumnsChange(newColumns);
          } else {
            setInternalColumns(newColumns);
          }

          if (onTaskMove) {
            onTaskMove(active.id as string, activeColumnId, overColumnId, newIndex);
          }
        }
      }
    }
  }

  const handleAddTask = (columnId: string) => {
    if (onAddTask) {
      onAddTask(columnId);
    } else {
      const newTask: KanbanTask = {
        id: `task-${Date.now()}`,
        name: `New Task`,
        status: columnId,
        priority: 'medium',
      };

      const newColumns = actualColumns.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            items: [...column.items, newTask],
          };
        }
        return column;
      });

      if (onColumnsChange) {
        onColumnsChange(newColumns);
      } else {
        setInternalColumns(newColumns);
      }
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          {actualColumns.map((column) => (
            <KanbanColumnComponent
              key={column.id}
              column={column}
              tasks={column.items as KanbanTask[]}
              onAddTask={handleAddTask}
              onTaskClick={onTaskClick}
              disabled={disabled}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <Card className="rotate-3 shadow-lg opacity-90">
              <CardContent className="p-3">
                <h4 className="font-medium text-sm">{activeTask.name}</h4>
              </CardContent>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}