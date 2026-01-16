import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRecipeStore } from '@/store/recipeStore';

// Zod schema for search validation - minimum 2 characters
const searchSchema = z.object({
  query: z.string().min(2, 'En az 2 karakter girin'),
});

type SearchFormData = z.infer<typeof searchSchema>;

/**
 * Search form with React Hook Form and Zod validation
 * Minimum 2 characters required for search
 */
export default function SearchForm() {
  const { fetchRecipesBySearch, searchQuery, clearSearch, isLoading } = useRecipeStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: searchQuery,
    },
  });

  const onSubmit = (data: SearchFormData) => {
    fetchRecipesBySearch(data.query);
  };

  const handleClear = () => {
    reset({ query: '' });
    clearSearch();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        
        <Input
          {...register('query')}
          type="text"
          placeholder="Tarif ara..."
          className="pl-10 pr-20 h-11 bg-secondary/50 border-0 focus-visible:ring-primary"
          aria-label="Tarif ara"
        />

        <div className="absolute right-1 flex items-center gap-1">
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleClear}
              aria-label="Aramayı temizle"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          <Button 
            type="submit" 
            size="sm" 
            className="h-8"
            disabled={isLoading}
          >
            Ara
          </Button>
        </div>
      </div>

      {errors.query && (
        <p className="absolute -bottom-6 left-0 text-xs text-red-500">
          {errors.query.message}
        </p>
      )}
    </form>
  );
}
