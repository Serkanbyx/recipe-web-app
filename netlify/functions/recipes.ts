import type { Handler, HandlerEvent } from '@netlify/functions';
import { CUISINES } from '../../src/lib/cuisines';

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
      case 'search': {
        // Search recipes by query with pagination support
        url = `${SPOONACULAR_BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${encodeURIComponent(query || '')}&number=${number}&offset=${offset}&addRecipeInformation=true&fillIngredients=true`;
        break;
      }

      case 'random': {
        // Get random recipes
        url = `${SPOONACULAR_BASE_URL}/recipes/random?apiKey=${API_KEY}&number=${number}`;
        break;
      }

      case 'detail': {
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
      }

      case 'byCategory': {
        // Search by cuisine/category with pagination support
        const cuisineName = cuisine || category || '';
        url = `${SPOONACULAR_BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${encodeURIComponent(cuisineName)}&number=${number}&offset=${offset}&addRecipeInformation=true`;
        break;
      }

      case 'categories': {
        // Spoonacular has no categories endpoint, so we return the shared static list
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ categories: CUISINES }),
        };
      }

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
