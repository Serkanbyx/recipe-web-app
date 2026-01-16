import RecipeGrid from '@/components/recipe/RecipeGrid';
import { useRecipeStore } from '@/store/recipeStore';

/**
 * Home page - Recipe feed with search results or category recipes
 */
export default function HomePage() {
  const { recipes, isLoading, error, searchQuery, selectedCategory, categories } = useRecipeStore();

  // Get category name from ID
  const getCategoryName = () => {
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      return category?.name || selectedCategory;
    }
    return 'Recipes';
  };

  // Determine page title
  const getTitle = () => {
    if (searchQuery) {
      return `Results for "${searchQuery}"`;
    }
    if (selectedCategory) {
      return getCategoryName();
    }
    return 'Discover Recipes';
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
          {searchQuery ? (
            <>
              Search: <span className="gradient-text">{searchQuery}</span>
            </>
          ) : (
            <span className="gradient-text">{getTitle()}</span>
          )}
        </h1>
        <p className="text-muted-foreground">
          {searchQuery
            ? `${recipes.length} recipes found`
            : 'Discover delicious recipes from around the world'}
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Recipe grid */}
      <RecipeGrid 
        recipes={recipes} 
        isLoading={isLoading} 
        emptyMessage={searchQuery ? 'No recipes found matching your search' : 'No recipes found in this category'}
      />
    </div>
  );
}
