import React from 'react';
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Button } from '../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { cn } from '../../components/ui/utils';
import { Home } from 'lucide-react';

export interface BreadcrumbNavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbNavItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  showHome?: boolean;
  homeHref?: string;
  homeIcon?: React.ReactNode;
  className?: string;
  onItemClick?: (item: BreadcrumbNavItem, index: number) => void;
}

export function BreadcrumbNav({
  items,
  separator,
  maxItems = 5,
  showHome = true,
  homeHref = '/',
  homeIcon = <Home className="h-4 w-4" />,
  className,
  onItemClick,
}: BreadcrumbNavProps) {
  const allItems = showHome ? [{ label: 'Home', href: homeHref, icon: homeIcon }, ...items] : items;
  const shouldCollapse = allItems.length > maxItems;
  
  const getVisibleItems = () => {
    if (!shouldCollapse) return { start: allItems, collapsed: [], end: [] };

    const start = allItems.slice(0, 2);
    const end = allItems.slice(-2);
    const collapsed = allItems.slice(2, -2);

    return { start, collapsed, end };
  };

  const handleItemClick = (item: BreadcrumbNavItem, index: number, event: React.MouseEvent) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    onItemClick?.(item, index);
  };

  const renderBreadcrumbNavItem = (item: BreadcrumbNavItem, index: number, isLast: boolean) => {
    const content = (
      <div className="flex items-center gap-1">
        {item.icon && <span className="text-sm">{item.icon}</span>}
        <span>{item.label}</span>
      </div>
    );

    return (
      <BreadcrumbItem key={`${item.label}-${index}`}>
        {isLast ? (
          <BreadcrumbPage className={cn(item.disabled && 'opacity-50')}>
            {content}
          </BreadcrumbPage>
        ) : item.href ? (
          <BreadcrumbLink
            href={item.href}
            className={cn(item.disabled && 'opacity-50 cursor-not-allowed')}
            onClick={(e) => handleItemClick(item, index, e)}
          >
            {content}
          </BreadcrumbLink>
        ) : (
          <span className={cn('text-muted-foreground', item.disabled && 'opacity-50')}>
            {content}
          </span>
        )}
      </BreadcrumbItem>
    );
  };

  if (!shouldCollapse) {
    return (
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {allItems.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              {renderBreadcrumbNavItem(item, index, index === allItems.length - 1)}
              {index < allItems.length - 1 && (
                <BreadcrumbSeparator>
                  {separator || '/'}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const { start, collapsed, end } = getVisibleItems();

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {/* Start items */}
        {start.map((item: BreadcrumbNavItem, index: number) => (
          <React.Fragment key={`start-${item.label}-${index}`}>
            {renderBreadcrumbNavItem(item, index, false)}
            <BreadcrumbSeparator>{separator || '/'}</BreadcrumbSeparator>
          </React.Fragment>
        ))}

        {/* Collapsed items */}
        {collapsed.length > 0 && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    aria-label="Show more breadcrumb items"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {collapsed.map((item: BreadcrumbNavItem, index: number) => (
                    <DropdownMenuItem
                      key={`collapsed-${item.label}-${index}`}
                      disabled={item.disabled}
                      onClick={() => item.href && handleItemClick(item, start.length + index, {} as React.MouseEvent)}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <span className="text-sm">{item.icon}</span>}
                        <span>{item.label}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{separator || '/'}</BreadcrumbSeparator>
          </>
        )}

        {/* End items */}
        {end.map((item: BreadcrumbNavItem, index: number) => (
          <React.Fragment key={`end-${item.label}-${index}`}>
            {renderBreadcrumbNavItem(
              item,
              start.length + collapsed.length + index,
              index === end.length - 1
            )}
            {index < end.length - 1 && (
              <BreadcrumbSeparator>{separator || '/'}</BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

