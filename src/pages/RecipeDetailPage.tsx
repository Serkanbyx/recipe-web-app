import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, Users, Flame } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Button } from '@/components/ui/button';
import { useRecipeStore } from '@/store/recipeStore';
import { extractIngredients, extractInstructions } from '@/types/recipe';
import { cn } from '@/lib/utils';

/**
 * Recipe detail page - Shows full recipe information
 * Accessible via /recipe/:id route
 * Note: External links (YouTube, source) removed for data security
 */
export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    currentRecipe, 
    isLoadingDetail, 
    fetchRecipeDetail,
    isFavorite,
    addToFavorites,
    removeFromFavorites 
  } = useRecipeStore();

  useEffect(() => {
    if (id) {
      fetchRecipeDetail(id);
    }
  }, [id, fetchRecipeDetail]);

  // Loading state
  if (isLoadingDetail) {
    return <RecipeDetailSkeleton />;
  }

  // Recipe not found
  if (!currentRecipe) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-6xl">🍽️</div>
        <h2 className="text-2xl font-bold text-foreground">Recipe not found</h2>
        <p className="mt-2 text-muted-foreground">
          This recipe has been removed or does not exist
        </p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Back to recipes
        </Button>
      </div>
    );
  }

  const isLiked = isFavorite(currentRecipe.id);
  const ingredients = extractIngredients(currentRecipe);
  const instructions = extractInstructions(currentRecipe);

  const handleFavoriteClick = () => {
    if (isLiked) {
      removeFromFavorites(currentRecipe.id);
    } else {
      addToFavorites(currentRecipe);
    }
  };

  return (
    <div className="pb-20 lg:pb-6">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4 -ml-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <article className="space-y-8">
        {/* Hero section */}
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={currentRecipe.image}
            alt={currentRecipe.title}
            className="h-64 w-full object-cover md:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {currentRecipe.cuisines?.map((cuisine) => (
                <span 
                  key={cuisine}
                  className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
                >
                  {cuisine}
                </span>
              ))}
              {currentRecipe.vegetarian && (
                <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                  Vegetarian
                </span>
              )}
              {currentRecipe.vegan && (
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                  Vegan
                </span>
              )}
              {currentRecipe.glutenFree && (
                <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white">
                  Gluten-Free
                </span>
              )}
            </div>
            
            <h1 className="font-display text-2xl font-bold text-white md:text-4xl">
              {currentRecipe.title}
            </h1>
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              'absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200',
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-black/40 text-white hover:bg-red-500'
            )}
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={cn('h-6 w-6', isLiked && 'fill-current')} />
          </button>
        </div>

        {/* Quick info */}
        <div className="flex flex-wrap gap-4">
          {currentRecipe.readyInMinutes && (
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
              <Clock className="h-4 w-4" />
              {currentRecipe.readyInMinutes} min
            </div>
          )}
          {currentRecipe.servings && (
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
              <Users className="h-4 w-4" />
              {currentRecipe.servings} servings
            </div>
          )}
          {currentRecipe.healthScore && (
            <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-2 text-sm font-medium text-green-500">
              <Flame className="h-4 w-4" />
              Health Score: {currentRecipe.healthScore}
            </div>
          )}
        </div>

        {/* Summary */}
        {currentRecipe.summary && (
          <div className="rounded-xl bg-card border border-border p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Summary
            </h2>
            <p 
              className="text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(currentRecipe.summary, { 
                  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br', 'p', 'span'],
                  ALLOWED_ATTR: [] 
                })
              }}
            />
          </div>
        )}

        {/* Content grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl bg-card border border-border p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Ingredients
              </h2>
              <ul className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="flex h-2 w-2 mt-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-foreground">
                      {ingredient.original}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Instructions
            </h2>
            <div className="space-y-4">
              {instructions.length > 0 ? (
                instructions.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-lg bg-card border border-border p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="text-foreground leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-lg bg-card border border-border p-4 text-muted-foreground">
                  Detailed instructions are not available for this recipe.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Diets & Dish Types */}
        {(currentRecipe.diets?.length > 0 || currentRecipe.dishTypes?.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {currentRecipe.diets?.map((diet) => (
              <span
                key={diet}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {diet}
              </span>
            ))}
            {currentRecipe.dishTypes?.map((type) => (
              <span
                key={type}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

// Loading skeleton
function RecipeDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-64 md:h-96 rounded-2xl skeleton" />
      <div className="flex gap-4">
        <div className="h-10 w-32 rounded-lg skeleton" />
        <div className="h-10 w-32 rounded-lg skeleton" />
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="h-96 rounded-xl skeleton" />
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 rounded-lg skeleton" />
          ))}
        </div>
      </div>
    </div>
  );
}
