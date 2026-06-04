// Relative import (not the "@/" alias) so this module can also be bundled
// by the Netlify function, whose esbuild bundler does not resolve the alias.
import type { Category } from '../types/recipe';

/**
 * Single source of truth for supported cuisine categories.
 * Shared between the client API layer (`src/lib/api.ts`) and the
 * Netlify proxy function (`netlify/functions/recipes.ts`) to avoid duplication.
 *
 * Note: Spoonacular has no dedicated categories endpoint, so this static list
 * defines the cuisines we expose in the UI.
 */
export const CUISINES: Category[] = [
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
