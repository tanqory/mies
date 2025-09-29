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
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';
import { GripVertical, Plus, X } from 'lucide-react';
import type { DnDItem, Orientation, IndicatorShape, DragEndEvent } from './types';

export interface SortableListProps {
  items: DnDItem[];
  onItemsChange?: (items: DnDItem[]) => void;
  orientation?: Orientation;
  indicatorShape?: IndicatorShape;
  showAddButton?: boolean;
  onAddItem?: () => void;
  onRemoveItem?: (itemId: string) => void;
  className?: string;
  itemClassName?: string;
  disabled?: boolean;
}

interface SortableItemProps {
  item: DnDItem;
  orientation: Orientation;
  indicatorShape: IndicatorShape;
  onRemove?: (itemId: string) => void;
  className?: string;
  disabled?: boolean;
}

function SortableItem({
  item,
  orientation,
  onRemove,
  className,
  disabled = false
}: SortableItemProps) {
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
        'relative group',
        isDragging && 'opacity-50 z-50',
        orientation === 'horizontal' && 'min-w-[200px]',
        className
      )}
      {...attributes}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {item.content || item.name}
          </div>

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.id)}
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

export function SortableList({
  items,
  onItemsChange,
  orientation = 'vertical',
  indicatorShape = 'box',
  showAddButton = true,
  onAddItem,
  onRemoveItem,
  className,
  itemClassName,
  disabled = false,
}: SortableListProps) {
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
        name: `Item ${actualItems.length + 1}`,
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
        <div className={orientation === 'horizontal' ? 'flex justify-center' : ''}>
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
          strategy={orientation === 'vertical' ? verticalListSortingStrategy : horizontalListSortingStrategy}
        >
          <div
            className={cn(
              'gap-3',
              orientation === 'vertical' ? 'flex flex-col' : 'flex flex-row overflow-x-auto pb-2',
              orientation === 'horizontal' && 'min-h-[120px]'
            )}
          >
            {actualItems.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                orientation={orientation}
                indicatorShape={indicatorShape}
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