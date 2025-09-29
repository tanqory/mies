import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';
import { GripVertical, Plus, X } from 'lucide-react';
import type { DnDItem, DragEndEvent } from './types';

export interface SortableGridProps {
  items: DnDItem[];
  onItemsChange?: (items: DnDItem[]) => void;
  columns?: number;
  showAddButton?: boolean;
  onAddItem?: () => void;
  onRemoveItem?: (itemId: string) => void;
  className?: string;
  itemClassName?: string;
  disabled?: boolean;
  gap?: number;
}

interface SortableGridItemProps {
  item: DnDItem;
  onRemove?: (itemId: string) => void;
  className?: string;
  disabled?: boolean;
}

function SortableGridItem({
  item,
  onRemove,
  className,
  disabled = false
}: SortableGridItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group cursor-pointer',
        isDragging && 'opacity-50 z-50',
        className
      )}
      {...attributes}
    >
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center min-h-[100px] text-center">
          <div className="flex-1 flex items-center justify-center">
            {item.content || (
              <div className="text-2xl font-semibold text-muted-foreground">
                {item.name}
              </div>
            )}
          </div>

          <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground cursor-grab active:cursor-grabbing"
              {...listeners}
            >
              <GripVertical className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SortableGrid({
  items,
  onItemsChange,
  columns = 4,
  showAddButton = true,
  onAddItem,
  onRemoveItem,
  className,
  itemClassName,
  disabled = false,
  gap = 4,
}: SortableGridProps) {
  const [internalItems, setInternalItems] = useState(items);
  const actualItems = onItemsChange ? items : internalItems;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = actualItems.findIndex((item) => item.id === active.id);
      const newIndex = actualItems.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(actualItems, oldIndex, newIndex);

      if (onItemsChange) {
        onItemsChange(newItems);
      } else {
        setInternalItems(newItems);
      }
    }
  }

  const handleAddItem = () => {
    if (onAddItem) {
      onAddItem();
    } else {
      const newItem: DnDItem = {
        id: `item-${Date.now()}`,
        name: `${actualItems.length + 1}`,
      };
      const newItems = [...actualItems, newItem];

      if (onItemsChange) {
        onItemsChange(newItems);
      } else {
        setInternalItems(newItems);
      }
    }
  };

  const handleRemoveItem = (itemId: string) => {
    if (onRemoveItem) {
      onRemoveItem(itemId);
    } else {
      const newItems = actualItems.filter(item => item.id !== itemId);

      if (onItemsChange) {
        onItemsChange(newItems);
      } else {
        setInternalItems(newItems);
      }
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {showAddButton && (
        <div className="flex justify-center">
          <Button
            onClick={handleAddItem}
            variant="outline"
            size="sm"
            className="w-fit"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={actualItems.map(item => item.id)}
          strategy={rectSortingStrategy}
        >
          <div
            className={cn('grid', `gap-${gap}`)}
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {actualItems.map((item) => (
              <SortableGridItem
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
                className={itemClassName}
                disabled={disabled}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}