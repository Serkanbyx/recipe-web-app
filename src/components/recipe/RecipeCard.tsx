import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RecipePreview, Recipe } from '@/types/recipe';
import { useRecipeStore } from '@/store/recipeStore';

interface RecipeCardProps {
  recipe: RecipePreview | Recipe;
  index?: number;
}

/**
 * Recipe card component for grid display
 * Shows recipe thumbnail, name, cooking time, and favorite button
 * Memoized to prevent unnecessary re-renders
 */
function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites, fetchRecipeDetail } = useRecipeStore();
  const isLiked = isFavorite(recipe.id);

  const handleFavoriteClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      removeFromFavorites(recipe.id);
    } else {
      // Need full recipe data for favorites (offline access)
      if ('extendedIngredients' in recipe) {
        addToFavorites(recipe as Recipe);
      } else {
        // Fetch full recipe data then add
        await fetchRecipeDetail(String(recipe.id));
        const { currentRecipe } = useRecipeStore.getState();
        if (currentRecipe) {
          addToFavorites(currentRecipe);
        }
      }
    }
  }, [isLiked, recipe, removeFromFavorites, addToFavorites, fetchRecipeDetail]);

  // Get display values
  const readyInMinutes = 'readyInMinutes' in recipe ? recipe.readyInMinutes : undefined;
  const servings = 'servings' in recipe ? recipe.servings : undefined;
  const cuisines = 'cuisines' in recipe ? recipe.cuisines : [];

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className={cn(
        'recipe-card group relative block overflow-hidden rounded-xl bg-card border border-border',
        'opacity-0 animate-fade-in',
        index <= 10 && `stagger-${Math.min(index + 1, 5)}`
      )}
      style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className={cn(
            'absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200',
            isLiked
              ? 'bg-red-500 text-white'
              : 'bg-black/40 text-white hover:bg-red-500'
          )}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={cn('h-4 w-4', isLiked && 'fill-current')}
          />
        </button>

        {/* Cuisine badge */}
        {cuisines && cuisines.length > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
            {cuisines[0]}
          </span>
        )}

        {/* Diet badges */}
        <div className="absolute left-3 bottom-3 flex gap-1">
          {recipe.vegetarian && (
            <span className="rounded-full bg-green-500/90 px-2 py-0.5 text-[10px] font-medium text-white">
              Vegetarian
            </span>
          )}
          {recipe.vegan && (
            <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-medium text-white">
              Vegan
            </span>
          )}
          {recipe.glutenFree && (
            <span className="rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-medium text-white">
              Gluten-Free
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        
        {/* Meta info */}
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          {readyInMinutes && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {readyInMinutes} min
            </span>
          )}
          {servings && (
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {servings} servings
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/**
 * Memoized RecipeCard component
 * Only re-renders when recipe.id changes or favorite status changes
 */
export default memo(RecipeCard, (prevProps, nextProps) => {
  // Only re-render if recipe id changes
  return prevProps.recipe.id === nextProps.recipe.id && 
         prevProps.index === nextProps.index;
});
