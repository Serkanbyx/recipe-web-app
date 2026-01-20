import type { Handler, HandlerEvent } from '@netlify/functions';

const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';
const API_KEY = process.env.SPOONACULAR_API_KEY;

// CORS headers for all responses
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

/**
 * Netlify Function to proxy Spoonacular API requests
 * This keeps the API key secure on the server side
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (!API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'API key not configured' }),
    };
  }

  const { action, query, id, category, cuisine, number = '12', offset = '0' } = event.queryStringParameters || {};

  try {
    let url = '';

    switch (action) {
      case 'search':
        // Search recipes by query with pagination support
        url = `${SPOONACULAR_BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${encodeURIComponent(query || '')}&number=${number}&offset=${offset}&addRecipeInformation=true&fillIngredients=true`;
        break;

      case 'random':
        // Get random recipes
        url = `${SPOONACULAR_BASE_URL}/recipes/random?apiKey=${API_KEY}&number=${number}`;
        break;

      case 'detail':
        // Get recipe by ID
        if (!id) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Recipe ID is required' }),
          };
        }
        url = `${SPOONACULAR_BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`;
        break;

      case 'byCategory':
        // Search by cuisine/category with pagination support
        const cuisineName = cuisine || category || '';
        url = `${SPOONACULAR_BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${encodeURIComponent(cuisineName)}&number=${number}&offset=${offset}&addRecipeInformation=true`;
        break;

      case 'categories':
        // Return available cuisines (Spoonacular doesn't have a categories endpoint, so we return a static list)
        const cuisines = [
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
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ categories: cuisines }),
        };

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid action. Use: search, random, detail, byCategory, categories' }),
        };
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: data.message || 'API request failed' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
