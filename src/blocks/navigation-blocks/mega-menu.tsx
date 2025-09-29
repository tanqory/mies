import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { cn } from '../../components/ui/utils';

export interface MegaMenuItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string;
  description?: string;
  children?: MegaMenuItem[];
}

export interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuProps {
  trigger: React.ReactNode;
  sections: MegaMenuSection[];
  featured?: {
    title: string;
    description: string;
    image?: string;
    href?: string;
  };
  className?: string;
  onItemClick?: (item: MegaMenuItem) => void;
}

export function MegaMenu({
  trigger,
  sections,
  featured,
  className,
  onItemClick,
}: MegaMenuProps) {
  const handleItemClick = (item: MegaMenuItem) => {
    onItemClick?.(item);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn('w-96 p-4', className)}
        align="start"
        sideOffset={8}
      >
        <div className="grid gap-4">
          {/* Featured Section */}
          {featured && (
            <Card className="mb-4">
              <CardContent className="p-4">
                {featured.image && (
                  <div className="w-full h-32 bg-muted rounded-md mb-3 overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h4 className="font-semibold text-sm mb-1">{featured.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{featured.description}</p>
                {featured.href && (
                  <Button size="sm" variant="outline" className="w-full">
                    เรียนรู้เพิ่มเติม
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Menu Sections */}
          <div className="grid grid-cols-2 gap-6">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <DropdownMenuLabel className="px-0 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </DropdownMenuLabel>
                <div className="mt-2 space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <DropdownMenuItem
                      key={itemIndex}
                      className="px-0 py-2 cursor-pointer hover:bg-muted/50"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        {item.icon && (
                          <div className="flex-shrink-0 w-5 h-5 text-muted-foreground mt-0.5">
                            {item.icon}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium truncate">
                              {item.label}
                            </span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {item.children && (
                          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                {sectionIndex < sections.length - 1 && (
                  <DropdownMenuSeparator className="my-4" />
                )}
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                ดูทั้งหมด
              </Button>
              <Button size="sm" className="flex-1">
                เริ่มต้นใช้งาน
              </Button>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}