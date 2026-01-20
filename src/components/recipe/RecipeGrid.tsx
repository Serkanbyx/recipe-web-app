import { useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import RecipeCard from './RecipeCard';
import RecipeCardSkeleton from './RecipeCardSkeleton';
import { useIntersectionObserver } from '@/hooks';
import { useRecipeStore } from '@/store/recipeStore';
import type { RecipePreview, Recipe } from '@/types/recipe';

interface RecipeGridProps {
  recipes: (RecipePreview | Recipe)[];
  isLoading?: boolean;
  emptyMessage?: string;
}

/**
 * Responsive grid layout for recipe cards
 * Shows loading skeletons, empty state, and supports infinite scroll
 */
export default function RecipeGrid({ 
  recipes, 
  isLoading = false, 
  emptyMessage = 'No recipes found' 
}: RecipeGridProps) {
  const { hasMore, isLoadingMore, fetchMoreRecipes, totalResults } = useRecipeStore();
  
  // Intersection observer for infinite scroll trigger
  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  // Fetch more when scroll sentinel is visible
  const handleLoadMore = useCallback(() => {
    if (isIntersecting && hasMore && !isLoadingMore && !isLoading) {
      fetchMoreRecipes();
    }
  }, [isIntersecting, hasMore, isLoadingMore, isLoading, fetchMoreRecipes]);

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  // Show skeletons while initial loading
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
    <div className="space-y-8">
      {/* Recipe grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe, index) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            index={index}
          />
        ))}
      </div>

      {/* Load more indicator */}
      {hasMore && (
        <div 
          ref={loadMoreRef}
          className="flex flex-col items-center justify-center py-8"
        >
          {isLoadingMore ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading more recipes...</span>
            </div>
          ) : (
            <button
              onClick={fetchMoreRecipes}
              className="px-6 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Load more recipes
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      {!hasMore && recipes.length > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Showing all {recipes.length} of {totalResults} recipes
        </p>
      )}
    </div>
  );
}
