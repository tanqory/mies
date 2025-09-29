"use client"

import * as React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { cn } from "../ui/utils"

export interface DragDropItem {
  id: UniqueIdentifier
  content: React.ReactNode
  data?: any
  disabled?: boolean
}

export interface DragDropProps {
  items: DragDropItem[]
  onItemsChange?: (items: DragDropItem[]) => void
  onDragStart?: (event: DragStartEvent) => void
  onDragEnd?: (event: DragEndEvent) => void
  strategy?: "vertical" | "horizontal" | "grid"
  disabled?: boolean
  showHandle?: boolean
  className?: string
}

interface SortableItemProps {
  item: DragDropItem
  showHandle?: boolean
  disabled?: boolean
}

const SortableItem: React.FC<SortableItemProps> = ({
  item,
  showHandle = true,
  disabled = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: disabled || item.disabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative bg-background border rounded-lg p-3 transition-all duration-200 select-none",
        isDragging ? "border-primary shadow-lg scale-105 z-50 rotate-1" : "border-border shadow-sm",
        (disabled || item.disabled) && "opacity-50 cursor-not-allowed"
      )}
      {...(!showHandle ? { ...listeners, ...attributes } : {})}
    >
      <div className="flex items-center">
        {showHandle && (
          <div
            className="flex items-center justify-center text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing transition-colors mr-2"
            {...listeners}
            {...attributes}
          >
            <GripVertical className="h-4 w-4" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {item.content}
        </div>
      </div>
    </div>
  )
}

const DragDrop = React.forwardRef<HTMLDivElement, DragDropProps>(
  (
    {
      className,
      items,
      onItemsChange,
      onDragStart,
      onDragEnd,
      strategy = "vertical",
      disabled = false,
      showHandle = true,
      ...props
    },
    ref
  ) => {
    const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)
    const [internalItems, setInternalItems] = React.useState<DragDropItem[]>(items)

    React.useEffect(() => {
      setInternalItems(items)
    }, [items])

    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 8,
        },
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    )

    const sortingStrategy = React.useMemo(() => {
      switch (strategy) {
        case "horizontal":
          return horizontalListSortingStrategy
        case "grid":
          return rectSortingStrategy
        default:
          return verticalListSortingStrategy
      }
    }, [strategy])

    const handleDragStart = (event: DragStartEvent) => {
      const { active } = event
      setActiveId(active.id)
      onDragStart?.(event)
    }

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event

      if (over && active.id !== over.id) {
        const oldIndex = internalItems.findIndex((item) => item.id === active.id)
        const newIndex = internalItems.findIndex((item) => item.id === over.id)

        const newItems = arrayMove(internalItems, oldIndex, newIndex)
        setInternalItems(newItems)
        onItemsChange?.(newItems)
      }

      setActiveId(null)
      onDragEnd?.(event)
    }

    const activeItem = activeId ? internalItems.find(item => item.id === activeId) : null

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={internalItems.map(item => item.id)}
          strategy={sortingStrategy}
        >
          <div
            ref={ref}
            className={cn(
              "w-full",
              strategy === "vertical" && "flex flex-col gap-2",
              strategy === "horizontal" && "flex flex-row gap-2",
              strategy === "grid" && "grid gap-2 grid-cols-3",
              disabled && "pointer-events-none opacity-50",
              className
            )}
            {...props}
          >
            {internalItems.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                showHandle={showHandle}
                disabled={disabled}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeItem ? (
            <div className="relative bg-background border border-primary rounded-lg p-3 shadow-lg scale-105 rotate-1">
              {activeItem.content}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    )
  }
)

DragDrop.displayName = "DragDrop"

export const useDragDrop = (initialItems: DragDropItem[]) => {
  const [items, setItems] = React.useState<DragDropItem[]>(initialItems)

  const addItem = React.useCallback((item: DragDropItem, index?: number) => {
    setItems(prev => {
      if (index !== undefined) {
        const newItems = [...prev]
        newItems.splice(index, 0, item)
        return newItems
      }
      return [...prev, item]
    })
  }, [])

  const removeItem = React.useCallback((id: UniqueIdentifier) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const updateItem = React.useCallback((id: UniqueIdentifier, updates: Partial<DragDropItem>) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ))
  }, [])

  return {
    items,
    setItems,
    addItem,
    removeItem,
    updateItem,
  }
}

export { DragDrop, SortableItem }