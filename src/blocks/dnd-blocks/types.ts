import type { DragEndEvent as DndKitDragEndEvent } from '@dnd-kit/core';
import React from 'react';

export interface DnDItem {
  id: string;
  name: string;
  content?: React.ReactNode;
}

export interface DropZone {
  id: string;
  title: string;
  items: DnDItem[];
  acceptsItems?: boolean;
  maxItems?: number;
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanTask[];
}

export interface KanbanTask extends DnDItem {
  status: string;
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: Date;
}

export type DragEndEvent = DndKitDragEndEvent;

export type DropAnimation = {
  duration?: number;
  easing?: string;
};

export type Orientation = 'vertical' | 'horizontal';
export type IndicatorShape = 'box' | 'line';