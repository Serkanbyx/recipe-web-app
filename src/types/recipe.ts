/**
 * Recipe type definitions for Spoonacular API
 */

// Main recipe interface matching Spoonacular response
export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  servings: number;
  readyInMinutes: number;
  cookingMinutes?: number;
  preparationMinutes?: number;
  sourceName?: string;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
  healthScore: number;
  pricePerServing: number;
  cheap: boolean;
  creditsText?: string;
  dairyFree: boolean;
  gaps?: string;
  glutenFree: boolean;
  instructions?: string;
  ketogenic?: boolean;
  lowFodmap?: boolean;
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30?: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: ExtendedIngredient[];
  summary: string;
  cuisines: string[];
  diets: string[];
  occasions: string[];
  analyzedInstructions: AnalyzedInstruction[];
}

// Ingredient with details
export interface ExtendedIngredient {
  id: number;
  aisle?: string;
  image?: string;
  consistency?: string;
  name: string;
  nameClean?: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: Measure;
    metric: Measure;
  };
}

export interface Measure {
  amount: number;
  unitShort: string;
  unitLong: string;
}

// Analyzed instructions
export interface AnalyzedInstruction {
  name: string;
  steps: InstructionStep[];
}

export interface InstructionStep {
  number: number;
  step: string;
  ingredients: { id: number; name: string; image: string }[];
  equipment: { id: number; name: string; image: string }[];
  length?: { number: number; unit: string };
}

// Simplified recipe for list views
export interface RecipePreview {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  readyInMinutes?: number;
  servings?: number;
  cuisines?: string[];
  dishTypes?: string[];
  diets?: string[];
  healthScore?: number;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
}

// Category/Cuisine
export interface Category {
  id: string;
  name: string;
  image: string;
}

// Ingredient for display
export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  original: string;
}

// API Response types
export interface SpoonacularSearchResponse {
  results: RecipePreview[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface SpoonacularRandomResponse {
  recipes: Recipe[];
}

export interface CategoriesResponse {
  categories: Category[];
}

// Helper function to extract ingredients from recipe
export function extractIngredients(recipe: Recipe): Ingredient[] {
  if (!recipe.extendedIngredients) return [];
  
  return recipe.extendedIngredients.map(ing => ({
    name: ing.nameClean || ing.name,
    amount: ing.amount,
    unit: ing.unit,
    original: ing.original,
  }));
}

// Helper function to extract instruction steps
export function extractInstructions(recipe: Recipe): string[] {
  if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
    return recipe.analyzedInstructions[0].steps.map(step => step.step);
  }
  
  // Fallback to raw instructions if analyzed not available
  if (recipe.instructions) {
    return recipe.instructions
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .split(/\.\s+/)
      .filter(step => step.trim().length > 0)
      .map(step => step.trim() + (step.endsWith('.') ? '' : '.'));
  }
  
  return [];
}
