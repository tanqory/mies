import React from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { cn } from '../../components/ui/utils';

export interface SearchSuggestion {
  id: string;
  text: string;
  category?: string;
  count?: number;
}

export interface SearchFilter {
  id: string;
  label: string;
  active: boolean;
}

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  filters?: SearchFilter[];
  loading?: boolean;
  className?: string;
  showFilters?: boolean;
  showRecentSearches?: boolean;
  onSearch?: (query: string) => void;
  onChange?: (value: string) => void;
  onSuggestionClick?: (suggestion: SearchSuggestion) => void;
  onFilterChange?: (filters: SearchFilter[]) => void;
  onClearRecent?: () => void;
}

export function SearchBar({
  placeholder = 'ค้นหา...',
  value = '',
  suggestions = [],
  recentSearches = [],
  filters = [],
  loading = false,
  className,
  showFilters = false,
  showRecentSearches = true,
  onSearch,
  onChange,
  onSuggestionClick,
  onFilterChange,
  onClearRecent,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
    setIsOpen(newValue.length > 0 || showRecentSearches);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch?.(searchValue.trim());
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchValue(suggestion.text);
    onChange?.(suggestion.text);
    onSuggestionClick?.(suggestion);
    setIsOpen(false);
  };

  const handleRecentClick = (search: string) => {
    setSearchValue(search);
    onChange?.(search);
    onSearch?.(search);
    setIsOpen(false);
  };

  const handleFilterToggle = (filterId: string) => {
    const newFilters = filters.map(filter =>
      filter.id === filterId ? { ...filter, active: !filter.active } : filter
    );
    onFilterChange?.(newFilters);
  };

  const activeFilters = filters.filter(f => f.active);

  const shouldShowDropdown = isOpen && (
    (searchValue.length > 0 && suggestions.length > 0) ||
    (showRecentSearches && recentSearches.length > 0 && searchValue.length === 0)
  );

  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      {/* Active Filters */}
      {showFilters && activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {activeFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => handleFilterToggle(filter.id)}
            >
              {filter.label}
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Badge>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={searchValue}
              onChange={handleInputChange}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 200)}
              className="pl-10 pr-4"
              disabled={loading}
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <Button type="submit" className="ml-2" disabled={loading || !searchValue.trim()}>
            ค้นหา
          </Button>

          {/* Filters Button */}
          {showFilters && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
                  </svg>
                  <span className="ml-2 hidden sm:inline">ตัวกรอง</span>
                  {activeFilters.length > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                      {activeFilters.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {filters.map((filter) => (
                  <DropdownMenuItem
                    key={filter.id}
                    onClick={() => handleFilterToggle(filter.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span>{filter.label}</span>
                    {filter.active && (
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </form>

        {/* Search Suggestions Dropdown */}
        {shouldShowDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
            {/* Recent Searches */}
            {showRecentSearches && searchValue.length === 0 && recentSearches.length > 0 && (
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-muted-foreground">การค้นหาล่าสุด</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearRecent}
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                  >
                    ล้างทั้งหมด
                  </Button>
                </div>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 hover:bg-muted/50 cursor-pointer rounded-sm"
                    onClick={() => handleRecentClick(search)}
                  >
                    <svg className="w-4 h-4 text-muted-foreground mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                    </svg>
                    <span className="text-sm truncate">{search}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {searchValue.length > 0 && suggestions.length > 0 && (
              <div className="p-3">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">คำแนะนำ</h4>
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="flex items-center justify-between p-2 hover:bg-muted/50 cursor-pointer rounded-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center min-w-0">
                      <svg className="w-4 h-4 text-muted-foreground mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      <div className="min-w-0">
                        <span className="text-sm truncate block">{suggestion.text}</span>
                        {suggestion.category && (
                          <span className="text-xs text-muted-foreground">{suggestion.category}</span>
                        )}
                      </div>
                    </div>
                    {suggestion.count && (
                      <Badge variant="outline" className="text-xs ml-2">
                        {suggestion.count.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {searchValue.length > 0 && suggestions.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                ไม่พบคำแนะนำสำหรับ "{searchValue}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}