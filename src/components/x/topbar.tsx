"use client"

import * as React from "react"
import { Menu, Search, Bell, ChevronDown } from "lucide-react"
import { cn } from "../ui/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { Badge } from "../ui/badge"

export interface TopBarAction {
  content: string
  onAction?: () => void
  url?: string
  external?: boolean
  icon?: React.ReactNode
  disabled?: boolean
}

export interface TopBarActionGroup {
  title?: string
  items: TopBarAction[]
}

export interface TopBarUserInfo {
  name: string
  detail?: string
  initials?: string
  avatar?: string
  actions: TopBarActionGroup[]
}

export interface TopBarLogo {
  url?: string
  source: string
  alt: string
  width?: number
}

export interface TopBarProps {
  className?: string
  showNavigationToggle?: boolean
  onNavigationToggle?: () => void
  logo?: TopBarLogo
  logoSuffix?: React.ReactNode
  contextControl?: React.ReactNode
  searchField?: React.ReactNode
  searchResults?: React.ReactNode
  searchResultsVisible?: boolean
  onSearchResultsDismiss?: () => void
  secondaryMenu?: React.ReactNode
  userMenu?: TopBarUserInfo
  notifications?: {
    count?: number
    onAction?: () => void
  }
}

interface SearchFieldProps {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  disabled?: boolean
}

interface UserMenuProps extends TopBarUserInfo {
  open: boolean
  onToggle: () => void
}

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ value = "", placeholder = "Search...", onChange, onFocus, onBlur, disabled }, ref) => {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
      },
      [onChange]
    )

    return (
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          className="pl-10 bg-muted/50 border-muted focus:bg-background"
        />
      </div>
    )
  }
)

SearchField.displayName = "SearchField"

const UserMenu = React.forwardRef<HTMLButtonElement, UserMenuProps>(
  ({ name, detail, initials, avatar, actions, open, onToggle }, ref) => {
    const renderAction = (action: TopBarAction) => {
      if (action.url) {
        return (
          <DropdownMenuItem asChild disabled={action.disabled}>
            <a
              href={action.url}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2"
            >
              {action.icon}
              {action.content}
            </a>
          </DropdownMenuItem>
        )
      }

      return (
        <DropdownMenuItem
          onClick={action.onAction}
          disabled={action.disabled}
          className="flex items-center gap-2"
        >
          {action.icon}
          {action.content}
        </DropdownMenuItem>
      )
    }

    return (
      <DropdownMenu open={open} onOpenChange={onToggle}>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className="gap-2 h-auto p-2 hover:bg-muted"
          >
            <div className="hidden sm:block text-right text-sm">
              <div className="font-medium">{name}</div>
              {detail && (
                <div className="text-muted-foreground text-xs">{detail}</div>
              )}
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="text-xs">
                {initials || name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="space-y-1">
              <div className="font-medium">{name}</div>
              {detail && (
                <div className="text-muted-foreground text-xs">{detail}</div>
              )}
            </div>
          </DropdownMenuLabel>

          {actions.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              <DropdownMenuSeparator />
              {group.title && (
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                  {group.title}
                </DropdownMenuLabel>
              )}
              {group.items.map((action, actionIndex) => (
                <div key={actionIndex}>
                  {renderAction(action)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

UserMenu.displayName = "UserMenu"

const TopBar = React.forwardRef<HTMLDivElement, TopBarProps>(
  (
    {
      className,
      showNavigationToggle = false,
      onNavigationToggle,
      logo,
      logoSuffix,
      contextControl,
      searchField,
      searchResults,
      searchResultsVisible = false,
      onSearchResultsDismiss,
      secondaryMenu,
      userMenu,
      notifications,
    },
    ref
  ) => {
    const [userMenuOpen, setUserMenuOpen] = React.useState(false)

    const handleUserMenuToggle = React.useCallback(() => {
      setUserMenuOpen(prev => !prev)
    }, [])

    const navigationToggleMarkup = showNavigationToggle && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onNavigationToggle}
        className="md:hidden p-2"
        aria-label="Toggle navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>
    )

    const logoMarkup = logo && (
      <div className="flex items-center gap-2">
        {logo.url ? (
          <a href={logo.url} className="flex items-center">
            <img
              src={logo.source}
              alt={logo.alt}
              className="h-8"
              style={{ width: logo.width }}
            />
          </a>
        ) : (
          <img
            src={logo.source}
            alt={logo.alt}
            className="h-8"
            style={{ width: logo.width }}
          />
        )}
        {logoSuffix}
      </div>
    )

    const searchMarkup = searchField && (
      <Popover open={searchResultsVisible} onOpenChange={onSearchResultsDismiss}>
        <PopoverTrigger asChild>
          <div className="flex-1">
            {searchField}
          </div>
        </PopoverTrigger>
        {searchResults && (
          <PopoverContent className="w-96 p-0" align="start">
            {searchResults}
          </PopoverContent>
        )}
      </Popover>
    )

    const notificationsMarkup = notifications && (
      <Button
        variant="ghost"
        size="sm"
        onClick={notifications.onAction}
        className="relative p-2"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {notifications.count && notifications.count > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
          >
            {notifications.count > 99 ? "99+" : notifications.count}
          </Badge>
        )}
      </Button>
    )

    const userMenuMarkup = userMenu && (
      <UserMenu
        {...userMenu}
        open={userMenuOpen}
        onToggle={handleUserMenuToggle}
      />
    )

    return (
      <div
        ref={ref}
        className={cn(
          "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {navigationToggleMarkup}
            {contextControl || logoMarkup}
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 justify-center max-w-2xl mx-4">
            {searchMarkup}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            {searchField && (
              <div className="md:hidden">
                <Button variant="ghost" size="sm" className="p-2">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            )}

            {secondaryMenu}
            {notificationsMarkup}
            {userMenuMarkup}
          </div>
        </div>

        {/* Mobile Search */}
        {searchField && (
          <div className="md:hidden border-t bg-background p-4">
            {searchField}
          </div>
        )}
      </div>
    )
  }
)

TopBar.displayName = "TopBar"

// Compound component pattern
const TopBarWithSubComponents = TopBar as typeof TopBar & {
  SearchField: typeof SearchField
  UserMenu: typeof UserMenu
}

TopBarWithSubComponents.SearchField = SearchField
TopBarWithSubComponents.UserMenu = UserMenu

export { TopBarWithSubComponents as TopBar, SearchField, UserMenu }