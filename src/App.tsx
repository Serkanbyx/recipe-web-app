import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import RecipeDetailPage from '@/pages/RecipeDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';
import { useRecipeStore } from '@/store/recipeStore';

/**
 * Main App component with routing configuration
 * Uses React Router for navigation between pages
 */
function App() {
  const { loadFavoritesFromStorage, fetchCategories } = useRecipeStore();

  // Load favorites from localStorage and fetch categories on mount
  useEffect(() => {
    loadFavoritesFromStorage();
    fetchCategories();
  }, [loadFavoritesFromStorage, fetchCategories]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
