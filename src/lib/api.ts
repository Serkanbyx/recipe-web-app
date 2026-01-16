import axios from 'axios';
import type { 
  Recipe, 
  RecipePreview, 
  Category,
  SpoonacularSearchResponse,
  SpoonacularRandomResponse,
  CategoriesResponse
} from '@/types/recipe';

// API base URL - uses Netlify Functions in production, direct API in development
const API_BASE_URL = import.meta.env.DEV 
  ? 'https://api.spoonacular.com'
  : '/api/recipes';

// For development only - in production, API key is in Netlify Functions
const DEV_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || '';

// Create axios instance
const api = axios.create({
  timeout: 15000,
});

/**
 * Build API URL based on environment
 */
function buildUrl(action: string, params: Record<string, string> = {}): string {
  if (import.meta.env.DEV) {
    // Development: Direct API calls
    const searchParams = new URLSearchParams({ apiKey: DEV_API_KEY, ...params });
    
    switch (action) {
      case 'search':
        return `${API_BASE_URL}/recipes/complexSearch?${searchParams}&addRecipeInformation=true&fillIngredients=true`;
      case 'random':
        return `${API_BASE_URL}/recipes/random?${searchParams}`;
      case 'detail':
        return `${API_BASE_URL}/recipes/${params.id}/information?apiKey=${DEV_API_KEY}&includeNutrition=false`;
      case 'byCategory':
        return `${API_BASE_URL}/recipes/complexSearch?${searchParams}&addRecipeInformation=true`;
      default:
        return API_BASE_URL;
    }
  } else {
    // Production: Netlify Functions
    const searchParams = new URLSearchParams({ action, ...params });
    return `${API_BASE_URL}?${searchParams}`;
  }
}

/**
 * Search recipes by query
 * @param query - Search term (minimum 2 characters)
 */
export async function searchRecipes(query: string): Promise<RecipePreview[]> {
  try {
    const url = buildUrl('search', { query, number: '12' });
    const response = await api.get<SpoonacularSearchResponse>(url);
    
    return response.data.results || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
}

/**
 * Get recipe details by ID
 * @param id - Recipe ID
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const url = buildUrl('detail', { id });
    const response = await api.get<Recipe>(url);
    
    return response.data || null;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
}

/**
 * Get all categories/cuisines
 */
export async function getCategories(): Promise<Category[]> {
  try {
    if (import.meta.env.DEV) {
      // Return static categories in development
      return [
        { id: 'italian', name: 'Italian', image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=100&h=100&fit=crop' },
        { id: 'mexican', name: 'Mexican', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop' },
        { id: 'chinese', name: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=100&h=100&fit=crop' },
        { id: 'indian', name: 'Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&h=100&fit=crop' },
        { id: 'japanese', name: 'Japanese', image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=100&h=100&fit=crop' },
        { id: 'thai', name: 'Thai', image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=100&h=100&fit=crop' },
        { id: 'french', name: 'French', image: 'https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=100&h=100&fit=crop' },
        { id: 'greek', name: 'Greek', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=100&h=100&fit=crop' },
        { id: 'spanish', name: 'Spanish', image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=100&h=100&fit=crop' },
        { id: 'korean', name: 'Korean', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=100&h=100&fit=crop' },
        { id: 'vietnamese', name: 'Vietnamese', image: 'https://images.unsplash.com/photo-1576577445504-6af96477db52?w=100&h=100&fit=crop' },
        { id: 'american', name: 'American', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop' },
      ];
    }
    
    const url = buildUrl('categories');
    const response = await api.get<CategoriesResponse>(url);
    return response.data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Get recipes by category/cuisine
 * @param category - Category/cuisine name
 */
export async function getRecipesByCategory(category: string): Promise<RecipePreview[]> {
  try {
    const url = buildUrl('byCategory', { cuisine: category, number: '12' });
    const response = await api.get<SpoonacularSearchResponse>(url);
    
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw error;
  }
}

/**
 * Get random recipes
 * @param count - Number of recipes to fetch
 */
export async function getRandomRecipes(count: number = 12): Promise<Recipe[]> {
  try {
    const url = buildUrl('random', { number: String(count) });
    const response = await api.get<SpoonacularRandomResponse>(url);
    
    return response.data.recipes || [];
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw error;
  }
}
