import { create } from 'zustand';
import type { Recipe, RecipePreview, Category } from '@/types/recipe';
import { 
  searchRecipes, 
  getRecipesByCategory, 
  getCategories, 
  getRecipeById, 
  getRandomRecipes,
  RECIPES_PER_PAGE 
} from '@/lib/api';

// Store state interface
interface RecipeState {
  // Recipe list
  recipes: RecipePreview[];
  isLoading: boolean;
  error: string | null;

  // Pagination state
  page: number;
  hasMore: boolean;
  totalResults: number;
  isLoadingMore: boolean;

  // Categories
  categories: Category[];
  selectedCategory: string | null;

  // Search
  searchQuery: string;

  // Favorites (persisted for offline access)
  favorites: Recipe[];

  // Current recipe detail
  currentRecipe: Recipe | null;
  isLoadingDetail: boolean;

  // Actions
  setRecipes: (recipes: RecipePreview[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setCurrentRecipe: (recipe: Recipe | null) => void;
  setLoadingDetail: (loading: boolean) => void;

  // Favorites actions
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: number) => void;
  isFavorite: (recipeId: number) => boolean;
  loadFavoritesFromStorage: () => void;

  // Async actions
  fetchRecipesByCategory: (category: string) => Promise<void>;
  fetchRecipesBySearch: (query: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchRecipeDetail: (id: string) => Promise<void>;
  fetchRandomRecipes: () => Promise<void>;
  fetchMoreRecipes: () => Promise<void>;
  clearSearch: () => void;
  resetPagination: () => void;
}

// Separate store for persisted favorites
const FAVORITES_KEY = 'recipe-app-favorites';

const loadFavorites = (): Recipe[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: Recipe[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

// Main store
export const useRecipeStore = create<RecipeState>()((set, get) => ({
  // Initial state
  recipes: [],
  isLoading: false,
  error: null,
  
  // Pagination initial state
  page: 0,
  hasMore: true,
  totalResults: 0,
  isLoadingMore: false,
  
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  favorites: [],
  currentRecipe: null,
  isLoadingDetail: false,

  // Basic setters
  setRecipes: (recipes) => set({ recipes }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setCurrentRecipe: (currentRecipe) => set({ currentRecipe }),
  setLoadingDetail: (isLoadingDetail) => set({ isLoadingDetail }),

  // Favorites actions
  addToFavorites: (recipe) => {
    const { favorites } = get();
    if (!favorites.find(f => f.id === recipe.id)) {
      const newFavorites = [...favorites, recipe];
      saveFavorites(newFavorites);
      set({ favorites: newFavorites });
    }
  },

  removeFromFavorites: (recipeId) => {
    const { favorites } = get();
    const newFavorites = favorites.filter(f => f.id !== recipeId);
    saveFavorites(newFavorites);
    set({ favorites: newFavorites });
  },

  isFavorite: (recipeId) => {
    const { favorites } = get();
    return favorites.some(f => f.id === recipeId);
  },

  loadFavoritesFromStorage: () => {
    const favorites = loadFavorites();
    set({ favorites });
  },

  // Reset pagination state
  resetPagination: () => {
    set({ page: 0, hasMore: true, totalResults: 0 });
  },

  // Async actions
  fetchRecipesByCategory: async (category) => {
    set({ 
      isLoading: true, 
      error: null, 
      selectedCategory: category, 
      searchQuery: '',
      page: 0,
      hasMore: true,
      totalResults: 0
    });
    try {
      const { recipes, totalResults, hasMore } = await getRecipesByCategory(category, 0);
      set({ 
        recipes, 
        isLoading: false,
        totalResults,
        hasMore,
        page: 1
      });
    } catch (error) {
      set({ 
        error: 'Failed to load recipes. Please try again.', 
        isLoading: false,
        recipes: [],
        hasMore: false
      });
    }
  },

  fetchRecipesBySearch: async (query) => {
    set({ 
      isLoading: true, 
      error: null, 
      searchQuery: query, 
      selectedCategory: null,
      page: 0,
      hasMore: true,
      totalResults: 0
    });
    try {
      const { recipes, totalResults, hasMore } = await searchRecipes(query, 0);
      set({ 
        recipes, 
        isLoading: false,
        totalResults,
        hasMore,
        page: 1
      });
    } catch (error) {
      set({ 
        error: 'Search failed. Please try again.', 
        isLoading: false,
        recipes: [],
        hasMore: false
      });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await getCategories();
      set({ categories });
      
      // Auto-select first category and load recipes
      if (categories.length > 0 && !get().searchQuery) {
        const firstCategory = categories[0].id;
        get().fetchRecipesByCategory(firstCategory);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Load random recipes as fallback
      get().fetchRandomRecipes();
    }
  },

  fetchRecipeDetail: async (id) => {
    set({ isLoadingDetail: true, currentRecipe: null });
    try {
      // First check if it's in favorites (for offline access)
      const { favorites } = get();
      const favoriteRecipe = favorites.find(f => f.id === Number(id));
      
      if (favoriteRecipe) {
        set({ currentRecipe: favoriteRecipe, isLoadingDetail: false });
        return;
      }

      // Fetch from API
      const recipe = await getRecipeById(id);
      set({ currentRecipe: recipe, isLoadingDetail: false });
    } catch (error) {
      // Try to get from favorites if offline
      const { favorites } = get();
      const favoriteRecipe = favorites.find(f => f.id === Number(id));
      
      if (favoriteRecipe) {
        set({ currentRecipe: favoriteRecipe, isLoadingDetail: false });
      } else {
        set({ currentRecipe: null, isLoadingDetail: false });
      }
    }
  },

  fetchRandomRecipes: async () => {
    set({ isLoading: true, error: null });
    try {
      const recipes = await getRandomRecipes(12);
      // Convert full recipes to preview format
      const previews: RecipePreview[] = recipes.map(r => ({
        id: r.id,
        title: r.title,
        image: r.image,
        readyInMinutes: r.readyInMinutes,
        servings: r.servings,
        cuisines: r.cuisines,
        healthScore: r.healthScore,
        vegetarian: r.vegetarian,
        vegan: r.vegan,
        glutenFree: r.glutenFree,
      }));
      set({ recipes: previews, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to load recipes.', 
        isLoading: false,
        recipes: []
      });
    }
  },

  // Fetch more recipes for infinite scroll
  fetchMoreRecipes: async () => {
    const { 
      isLoadingMore, 
      hasMore, 
      page, 
      searchQuery, 
      selectedCategory, 
      recipes 
    } = get();
    
    // Prevent duplicate requests
    if (isLoadingMore || !hasMore) return;
    
    set({ isLoadingMore: true });
    
    try {
      const offset = page * RECIPES_PER_PAGE;
      
      let response;
      if (searchQuery) {
        response = await searchRecipes(searchQuery, offset);
      } else if (selectedCategory) {
        response = await getRecipesByCategory(selectedCategory, offset);
      } else {
        set({ isLoadingMore: false });
        return;
      }
      
      const { recipes: newRecipes, hasMore: moreAvailable } = response;
      
      // Filter out duplicates by id
      const existingIds = new Set(recipes.map(r => r.id));
      const uniqueNewRecipes = newRecipes.filter(r => !existingIds.has(r.id));
      
      set({ 
        recipes: [...recipes, ...uniqueNewRecipes],
        page: page + 1,
        hasMore: moreAvailable,
        isLoadingMore: false
      });
    } catch (error) {
      console.error('Error fetching more recipes:', error);
      set({ 
        isLoadingMore: false,
        error: 'Failed to load more recipes.'
      });
    }
  },

  clearSearch: () => {
    set({ searchQuery: '', page: 0, hasMore: true, totalResults: 0 });
    const { categories, selectedCategory } = get();
    if (categories.length > 0) {
      const category = selectedCategory || categories[0].id;
      get().fetchRecipesByCategory(category);
    }
  },
}));
