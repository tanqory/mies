import React from 'react';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  homeLabel?: string;
  homeHref?: string;
  className?: string;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

export function Breadcrumbs({
  items,
  separator,
  showHome = true,
  homeLabel = 'หน้าแรก',
  homeHref = '/',
  className,
  onItemClick,
}: BreadcrumbsProps) {
  const defaultSeparator = (
    <svg className="w-4 h-4 text-muted-foreground mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: homeLabel, href: homeHref, icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )}, ...items]
    : items;

  const handleItemClick = (item: BreadcrumbItem, index: number) => {
    if (!item.disabled && onItemClick) {
      onItemClick(item, index);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-1', className)}>
      <ol className="flex items-center space-x-1">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="flex items-center">
              {item.href && !item.disabled ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'h-auto p-1 font-normal hover:bg-muted',
                    isLast && 'text-foreground font-medium cursor-default hover:bg-transparent'
                  )}
                  onClick={() => handleItemClick(item, index)}
                  disabled={isLast}
                >
                  <div className="flex items-center space-x-1">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </Button>
              ) : (
                <div className={cn(
                  'flex items-center space-x-1 px-1 py-1 text-sm',
                  item.disabled ? 'text-muted-foreground' : 'text-foreground'
                )}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              )}

              {!isLast && (
                <span className="flex items-center">
                  {separator || defaultSeparator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}