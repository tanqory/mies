import React from 'react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible';
import { cn } from '../../components/ui/utils';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: SidebarItem[];
  disabled?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  collapsed?: boolean;
  className?: string;
  onItemClick?: (item: SidebarItem) => void;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  items,
  activeItem,
  collapsed = false,
  className,
  onItemClick,
  onToggleCollapse,
}: SidebarProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const handleItemClick = (item: SidebarItem) => {
    if (!item.disabled) {
      onItemClick?.(item);
    }
  };

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const isActive = activeItem === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openItems.has(item.id);
    const paddingLeft = collapsed ? 'pl-3' : level === 0 ? 'pl-3' : `pl-${3 + level * 4}`;

    if (hasChildren) {
      return (
        <Collapsible key={item.id} open={isOpen} onOpenChange={() => toggleItem(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start font-normal h-10',
                paddingLeft,
                isActive && 'bg-accent text-accent-foreground',
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
              disabled={item.disabled}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  {item.icon && (
                    <span className="flex-shrink-0 w-5 h-5">
                      {item.icon}
                    </span>
                  )}
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {!collapsed && item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {!collapsed && (
                    <svg
                      className={cn(
                        'w-4 h-4 transition-transform',
                        isOpen && 'rotate-90'
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </div>
            </Button>
          </CollapsibleTrigger>
          {!collapsed && (
            <CollapsibleContent className="space-y-1">
              {item.children?.map(child => renderSidebarItem(child, level + 1))}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(
          'w-full justify-start font-normal h-10',
          paddingLeft,
          isActive && 'bg-accent text-accent-foreground',
          item.disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={() => handleItemClick(item)}
        disabled={item.disabled}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            {item.icon && (
              <span className="flex-shrink-0 w-5 h-5">
                {item.icon}
              </span>
            )}
            {!collapsed && (
              <span className="truncate">{item.label}</span>
            )}
          </div>
          {!collapsed && item.badge && (
            <Badge variant="secondary" className="text-xs">
              {item.badge}
            </Badge>
          )}
        </div>
      </Button>
    );
  };

  return (
    <div className={cn(
      'flex flex-col h-full bg-background border-r',
      collapsed ? 'w-16' : 'w-64',
      className
    )}>
      {/* Header */}
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-semibold truncate">เมนู</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="w-8 h-8 p-0"
          >
            <svg
              className={cn(
                'w-4 h-4 transition-transform',
                collapsed && 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {items.map(item => renderSidebarItem(item))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">ผู้ใช้งาน</p>
              <p className="text-xs text-muted-foreground truncate">user@example.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}