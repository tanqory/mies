import React from 'react';
import { cn } from '../../components/ui/utils';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useTranslate } from './language-provider';

export interface NavItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
  caption?: string;
  info?: React.ReactNode;
  disabled?: boolean;
  children?: NavItem[];
}

export interface NavGroup {
  subheader?: string;
  items: NavItem[];
}

export interface MultiLangNavigationProps {
  navData: NavGroup[];
  className?: string;
  onItemClick?: (item: NavItem) => void;
}

export function MultiLangNavigation({
  navData,
  className,
  onItemClick,
}: MultiLangNavigationProps) {
  const translate = useTranslate();

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isDisabled = item.disabled || item.path === '#disabled';
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.path} className={cn('w-full', depth > 0 && 'ml-4')}>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start h-auto p-3 text-left',
            isDisabled && 'opacity-50 cursor-not-allowed'
          )}
          disabled={isDisabled}
          onClick={() => !isDisabled && onItemClick?.(item)}
        >
          <div className="flex items-center gap-3 w-full">
            {item.icon && (
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {item.icon}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">
                  {translate(item.title)}
                </span>
                {item.info && item.info}
              </div>

              {item.caption && (
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {translate(item.caption)}
                </p>
              )}
            </div>
          </div>
        </Button>

        {hasChildren && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="p-4">
        <nav className="space-y-6">
          {navData.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-2">
              {group.subheader && (
                <h3 className="text-sm font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">
                  {translate(group.subheader)}
                </h3>
              )}

              <div className="space-y-1">
                {group.items.map(item => renderNavItem(item))}
              </div>
            </div>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

export function createNavData(translate: (key: string) => string): NavGroup[] {
  return [
    {
      subheader: translate('navigation.main'),
      items: [
        {
          title: translate('navigation.dashboard'),
          path: '/dashboard',
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
          ),
        },
        {
          title: translate('navigation.analytics'),
          path: '/analytics',
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          ),
        },
        {
          title: translate('navigation.projects'),
          path: '/projects',
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
          ),
          info: (
            <Badge variant="secondary" className="text-xs">
              {translate('navigation.new')}
            </Badge>
          ),
        },
        {
          title: translate('navigation.settings'),
          path: '/settings',
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
            </svg>
          ),
          caption: translate('navigation.settings.caption'),
        },
        {
          title: translate('navigation.help'),
          path: '#disabled',
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C7.59,4 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z"/>
            </svg>
          ),
          disabled: true,
        },
      ],
    },
  ];
}