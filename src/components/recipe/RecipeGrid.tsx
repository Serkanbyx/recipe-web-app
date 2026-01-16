import RecipeCard from './RecipeCard';
import RecipeCardSkeleton from './RecipeCardSkeleton';
import type { RecipePreview, Recipe } from '@/types/recipe';

interface RecipeGridProps {
  recipes: (RecipePreview | Recipe)[];
  isLoading?: boolean;
  emptyMessage?: string;
}

/**
 * Responsive grid layout for recipe cards
 * Shows loading skeletons and empty state
 */
export default function RecipeGrid({ 
  recipes, 
  isLoading = false, 
  emptyMessage = 'No recipes found' 
}: RecipeGridProps) {
  // Show skeletons while loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <RecipeCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Empty state
  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-6xl">🍳</div>
        <h3 className="text-xl font-semibold text-foreground">
          {emptyMessage}
        </h3>
        <p className="mt-2 text-muted-foreground">
          Try searching for something else or explore categories
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe, index) => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          index={index}
        />
      ))}
    </div>
  );
}
