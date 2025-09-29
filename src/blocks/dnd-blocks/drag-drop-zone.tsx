import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';
import { GripVertical, Upload } from 'lucide-react';
import type { DnDItem, DropZone } from './types';

export interface DragDropZoneProps {
  zones: DropZone[];
  onZonesChange?: (zones: DropZone[]) => void;
  onItemMove?: (itemId: string, fromZoneId: string, toZoneId: string) => void;
  className?: string;
  disabled?: boolean;
  renderItem?: (item: DnDItem, zoneId: string) => React.ReactNode;
  renderEmptyZone?: (zone: DropZone) => React.ReactNode;
}

interface DraggableItemProps {
  item: DnDItem;
  zoneId: string;
  disabled?: boolean;
  renderItem?: (item: DnDItem, zoneId: string) => React.ReactNode;
}

function DraggableItem({ item, zoneId, disabled = false, renderItem }: DraggableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: item.id,
    disabled,
    data: {
      item,
      zoneId,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group cursor-pointer',
        isDragging && 'opacity-50'
      )}
      {...attributes}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {renderItem ? renderItem(item, zoneId) : (
              item.content || item.name
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-muted-foreground cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
            {...listeners}
          >
            <GripVertical className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface DroppableZoneProps {
  zone: DropZone;
  children: React.ReactNode;
  isOver: boolean;
  renderEmptyZone?: (zone: DropZone) => React.ReactNode;
}

function DroppableZone({ zone, children, isOver, renderEmptyZone }: DroppableZoneProps) {
  const { isOver: isOverDroppable, setNodeRef } = useDroppable({
    id: zone.id,
    data: {
      type: 'zone',
      zone,
    },
  });

  const isEmpty = zone.items.length === 0;

  return (
    <Card
      ref={setNodeRef}
      className={cn(
        'transition-colors',
        (isOver || isOverDroppable) && 'ring-2 ring-primary ring-offset-2',
        isEmpty && 'border-dashed'
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">
          {zone.title}
          {zone.maxItems && (
            <span className="ml-2 text-xs text-muted-foreground">
              ({zone.items.length}/{zone.maxItems})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 min-h-[120px]">
          {isEmpty && renderEmptyZone ? (
            renderEmptyZone(zone)
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center h-24 text-muted-foreground">
              <Upload className="h-8 w-8 mb-2" />
              <p className="text-sm">Drop items here</p>
            </div>
          ) : (
            children
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function DragDropZone({
  zones,
  onZonesChange,
  onItemMove,
  className,
  disabled = false,
  renderItem,
  renderEmptyZone,
}: DragDropZoneProps) {
  const [internalZones, setInternalZones] = useState(zones);
  const [activeItem, setActiveItem] = useState<DnDItem | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<string>('');

  const actualZones = onZonesChange ? zones : internalZones;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const activeData = active.data.current;

    if (activeData?.item) {
      setActiveItem(activeData.item);
      setActiveZoneId(activeData.zoneId);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveItem(null);
    setActiveZoneId('');

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.item && overData?.zone) {
      const item = activeData.item;
      const fromZoneId = activeData.zoneId;
      const toZoneId = overData.zone.id;
      const toZone = overData.zone;

      // Check if move is allowed
      if (fromZoneId === toZoneId) return;
      if (!toZone.acceptsItems) return;
      if (toZone.maxItems && toZone.items.length >= toZone.maxItems) return;

      if (onItemMove) {
        onItemMove(item.id, fromZoneId, toZoneId);
      } else {
        // Update zones internally
        const newZones = actualZones.map(zone => {
          if (zone.id === fromZoneId) {
            return {
              ...zone,
              items: zone.items.filter(zoneItem => zoneItem.id !== item.id),
            };
          }
          if (zone.id === toZoneId) {
            return {
              ...zone,
              items: [...zone.items, item],
            };
          }
          return zone;
        });

        if (onZonesChange) {
          onZonesChange(newZones);
        } else {
          setInternalZones(newZones);
        }
      }
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actualZones.map((zone) => (
            <DroppableZone
              key={zone.id}
              zone={zone}
              isOver={false}
              renderEmptyZone={renderEmptyZone}
            >
              {zone.items.map((item) => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  zoneId={zone.id}
                  disabled={disabled}
                  renderItem={renderItem}
                />
              ))}
            </DroppableZone>
          ))}
        </div>

        <DragOverlay>
          {activeItem ? (
            <Card className="rotate-3 shadow-lg">
              <CardContent className="p-3">
                {renderItem ? renderItem(activeItem, activeZoneId) : (
                  activeItem.content || activeItem.name
                )}
              </CardContent>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}