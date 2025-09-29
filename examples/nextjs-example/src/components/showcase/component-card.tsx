'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  Badge,
  LucideIcons,
} from '@tanqory/mies';
import type { ComponentItem } from '../../config/components-config';

// Simple cn utility function for className merging
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface ComponentCardProps {
  item: ComponentItem;
  className?: string;
}

const getIconComponent = (iconName: string) => {
  // Map icon names to Lucide components
  const iconMap: Record<string, React.ComponentType<any>> = {
    'palette': LucideIcons.Palette,
    'type': LucideIcons.Type,
    'grid': LucideIcons.Grid3X3,
    'star': LucideIcons.Star,
    'layers': LucideIcons.Layers,
    'chevron-down': LucideIcons.ChevronDown,
    'alert-triangle': LucideIcons.AlertTriangle,
    'message-square': LucideIcons.MessageSquare,
    'maximize': LucideIcons.Maximize,
    'search': LucideIcons.Search,
    'user': LucideIcons.User,
    'tag': LucideIcons.Tag,
    'navigation': LucideIcons.Navigation,
    'mouse-pointer': LucideIcons.MousePointer,
    'credit-card': LucideIcons.CreditCard,
    'check-square': LucideIcons.CheckSquare,
    'chevron-up': LucideIcons.ChevronUp,
    'table': LucideIcons.Table,
    'calendar': LucideIcons.Calendar,
    'square': LucideIcons.Square,
    'hash': LucideIcons.Hash,
    'activity': LucideIcons.Activity,
    'circle': LucideIcons.Circle,
    'minus': LucideIcons.Minus,
    'loader': LucideIcons.Loader2,
    'sliders': LucideIcons.SlidersHorizontal,
    'trending-up': LucideIcons.TrendingUp,
    'toggle-left': LucideIcons.ToggleLeft,
    'layout': LucideIcons.Layout,
    'file-text': LucideIcons.FileText,
    'clock': LucideIcons.Clock,
    'toggle-right': LucideIcons.ToggleRight,
    'help-circle': LucideIcons.HelpCircle,
    'git-branch': LucideIcons.GitBranch,
    'zap': LucideIcons.Zap,
    'images': LucideIcons.Images,
    'bar-chart': LucideIcons.BarChart,
    'move': LucideIcons.Move,
    'file-edit': LucideIcons.FileEdit,
    'globe': LucideIcons.Globe,
    'upload': LucideIcons.Upload,
    'settings': LucideIcons.Settings,
  };

  return iconMap[iconName] || LucideIcons.Package;
};

const getPackageTypeColor = (packageType: ComponentItem['packageType']) => {
  switch (packageType) {
    case 'Foundation':
      return 'default';
    case '@tanqory/mies':
      return 'secondary';
    case 'Extra':
      return 'outline';
    case 'Custom':
      return 'destructive';
    default:
      return 'default';
  }
};

export function ComponentCard({ item, className }: ComponentCardProps) {
  const IconComponent = getIconComponent(item.icon);
  const badgeVariant = getPackageTypeColor(item.packageType);

  return (
    <Link
      href={item.href}
      className={cn(
        'block group transition-all duration-200 hover:scale-105',
        className
      )}
    >
      <Card className="h-full border transition-all duration-200 hover:shadow-lg hover:border-primary/30 group-hover:bg-muted/30">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4 h-full">
          {/* Package Type Badge */}
          <div className="w-full flex justify-end">
            <Badge variant={badgeVariant} className="text-xs">
              {item.packageType}
            </Badge>
          </div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <IconComponent className="h-8 w-8 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center space-y-2">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            )}
          </div>

          {/* Hover indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center gap-1 text-xs text-primary font-medium">
              <span>View details</span>
              <LucideIcons.ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}