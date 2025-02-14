import { Ingredient, Recipe, RecipeByIngredients } from '@/types/interface';
import { useState } from 'react';

interface Response {
  ingredients: Ingredient[]
  recipes: Recipe[]
  recipesByIngredients: RecipeByIngredients[]
}

export const useSearchRecipe = () => {
  const [data, setData] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const searchRecipes = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchTerm('');
      setData(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchTerm(searchTerm);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/findRecipesAndIngredients?query=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching recipes');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    searchTerm,
    searchRecipes
  };
};

