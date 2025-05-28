// src/components/atoms/SearchInput/SearchInput.tsx
// src/components/atoms/SearchInput/SearchInput.tsx
import Input from '../Input/Input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  id,
  disabled = false,
}: SearchInputProps) => {
  return (
    <Input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`search-input ${className}`}
      id={id}
      disabled={disabled}
      ariaLabel={placeholder}
    />
  );
};