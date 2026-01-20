import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRecipeStore } from '@/store/recipeStore';
import { useDebounce } from '@/hooks';

// Zod schema for search validation - minimum 2 characters
const searchSchema = z.object({
  query: z.string().min(2, 'Enter at least 2 characters'),
});

type SearchFormData = z.infer<typeof searchSchema>;

// Debounce delay in milliseconds
const SEARCH_DEBOUNCE_DELAY = 500;

/**
 * Search form with React Hook Form, Zod validation, and debounced auto-search
 * Supports both instant submit and debounced typing search
 * Minimum 2 characters required for search
 */
export default function SearchForm() {
  const { fetchRecipesBySearch, searchQuery, clearSearch, isLoading } = useRecipeStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  
  // Debounced search value
  const debouncedSearchValue = useDebounce(inputValue, SEARCH_DEBOUNCE_DELAY);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: searchQuery,
    },
  });

  // Auto-search when debounced value changes (minimum 2 chars)
  useEffect(() => {
    if (debouncedSearchValue.length >= 2 && debouncedSearchValue !== searchQuery) {
      fetchRecipesBySearch(debouncedSearchValue);
    }
  }, [debouncedSearchValue, fetchRecipesBySearch, searchQuery]);

  // Sync input value with store's search query
  useEffect(() => {
    if (searchQuery !== inputValue) {
      setInputValue(searchQuery);
      setValue('query', searchQuery);
    }
  }, [searchQuery, setValue, inputValue]);

  const onSubmit = useCallback((data: SearchFormData) => {
    // Immediate search on form submit
    if (data.query !== searchQuery) {
      fetchRecipesBySearch(data.query);
    }
  }, [fetchRecipesBySearch, searchQuery]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setValue('query', value);
  }, [setValue]);

  const handleClear = useCallback(() => {
    setInputValue('');
    reset({ query: '' });
    clearSearch();
  }, [reset, clearSearch]);

  // Check if currently searching (debounce pending or loading)
  const isSearching = isLoading || (inputValue.length >= 2 && inputValue !== searchQuery);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
      <div className="relative flex items-center">
        {isSearching ? (
          <Loader2 className="absolute left-3 h-4 w-4 text-primary animate-spin pointer-events-none" />
        ) : (
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        
        <Input
          {...register('query')}
          type="text"
          placeholder="Search recipes..."
          className="pl-10 pr-20 h-11 bg-secondary/50 border-0 focus-visible:ring-primary"
          aria-label="Search recipes"
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
        />

        <div className="absolute right-1 flex items-center gap-1">
          {inputValue && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          <Button 
            type="submit" 
            size="sm" 
            className="h-8"
            disabled={isLoading || inputValue.length < 2}
          >
            Search
          </Button>
        </div>
      </div>

      {errors.query && inputValue.length > 0 && inputValue.length < 2 && (
        <p className="absolute -bottom-6 left-0 text-xs text-red-500">
          {errors.query.message}
        </p>
      )}
    </form>
  );
}
