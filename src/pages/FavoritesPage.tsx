import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecipeGrid from '@/components/recipe/RecipeGrid';
import { Button } from '@/components/ui/button';
import { useRecipeStore } from '@/store/recipeStore';

/**
 * Favorites page - Shows saved recipes
 * Works offline with PWA caching
 */
export default function FavoritesPage() {
  const { favorites } = useRecipeStore();

  // Convert Recipe to RecipePreview format for grid
  const favoritesPreviews = favorites.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    readyInMinutes: recipe.readyInMinutes,
    servings: recipe.servings,
    cuisines: recipe.cuisines,
    healthScore: recipe.healthScore,
    vegetarian: recipe.vegetarian,
    vegan: recipe.vegan,
    glutenFree: recipe.glutenFree,
  }));

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold lg:text-4xl">
          <span className="gradient-text">My Favorites</span>
        </h1>
        <p className="text-muted-foreground">
          {favorites.length > 0
            ? `${favorites.length} saved recipe${favorites.length !== 1 ? 's' : ''}`
            : 'Save recipes and access them even when offline!'}
        </p>
      </div>

      {/* Favorites grid or empty state */}
      {favorites.length > 0 ? (
        <RecipeGrid recipes={favoritesPreviews} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            No favorites yet
          </h3>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Discover recipes and click the heart icon to add them to your favorites.
            Access them even when offline!
          </p>
          <Link to="/">
            <Button className="mt-6">
              Discover Recipes
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
