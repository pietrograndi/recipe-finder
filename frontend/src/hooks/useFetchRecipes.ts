import { Recipe } from '@/types/interface';
import { useEffect, useState } from 'react';

export const useFetchRecipes = (ingredients: string) => {
  const [data, setData] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!ingredients) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8080/recipes/searchByIngredients?ingredients=${ingredients}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const result: {recipes: Recipe[]} = await response.json();
        setData(result.recipes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching recipes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [ingredients]);

  return { data, error, isLoading };
}; 