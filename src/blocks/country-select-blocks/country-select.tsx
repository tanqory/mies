import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { cn } from '../../components/ui/utils';

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode?: string;
}

export interface CountrySelectProps {
  value?: string;
  onChange?: (country: Country) => void;
  placeholder?: string;
  label?: string;
  showFlags?: boolean;
  showDialCode?: boolean;
  searchable?: boolean;
  countries?: Country[];
  className?: string;
}

// Common countries list
const DEFAULT_COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82' },
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '+234' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', dialCode: '+20' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '+7' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', dialCode: '+90' }
];

export function CountrySelect({
  value,
  onChange,
  placeholder = 'Select a country',
  label,
  showFlags = true,
  showDialCode = false,
  searchable = true,
  countries = DEFAULT_COUNTRIES,
  className,
}: CountrySelectProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredCountries = React.useMemo(() => {
    if (!searchTerm) return countries;
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countries, searchTerm]);

  const selectedCountry = countries.find(country => country.code === value);

  const handleSelect = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      onChange?.(country);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const renderCountryOption = (country: Country) => (
    <div className="flex items-center gap-2">
      {showFlags && <span className="text-lg">{country.flag}</span>}
      <span className="flex-1">{country.name}</span>
      {showDialCode && country.dialCode && (
        <span className="text-sm text-muted-foreground">{country.dialCode}</span>
      )}
    </div>
  );

  const renderSelectedValue = () => {
    if (!selectedCountry) return placeholder;
    return (
      <div className="flex items-center gap-2">
        {showFlags && <span>{selectedCountry.flag}</span>}
        <span>{selectedCountry.name}</span>
        {showDialCode && selectedCountry.dialCode && (
          <span className="text-muted-foreground">({selectedCountry.dialCode})</span>
        )}
      </div>
    );
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}
      
      <Select
        value={value}
        onValueChange={handleSelect}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            {renderSelectedValue()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {searchable && (
            <div className="px-2 pb-2">
              <Input
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                No countries found
              </div>
            ) : (
              filteredCountries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {renderCountryOption(country)}
                </SelectItem>
              ))
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}

