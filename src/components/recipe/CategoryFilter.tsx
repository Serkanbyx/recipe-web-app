import { cn } from '@/lib/utils';
import { useRecipeStore } from '@/store/recipeStore';

interface CategoryFilterProps {
  onCategorySelect?: () => void;
}

/**
 * Category filter component
 * Displays cuisine list with thumbnails for filtering recipes
 */
export default function CategoryFilter({ onCategorySelect }: CategoryFilterProps) {
  const { categories, selectedCategory, fetchRecipesByCategory, searchQuery, clearSearch } = useRecipeStore();

  const handleCategoryClick = (categoryId: string) => {
    if (searchQuery) {
      clearSearch();
    }
    fetchRecipesByCategory(categoryId);
    onCategorySelect?.();
  };

  return (
    <div className="space-y-2">
      <h3 className="px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Cuisines
      </h3>
      
      <nav className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
              selectedCategory === category.id && !searchQuery
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-accent'
            )}
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-8 w-8 rounded-md object-cover"
              loading="lazy"
            />
            <span className="text-sm font-medium truncate">
              {category.name}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
