import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favorites');
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    }
  }, []);

  const toggleFavorite = (recipeId: number) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (recipeId: number) => favorites.includes(recipeId);

  return { favorites, toggleFavorite, isFavorite };
}; 