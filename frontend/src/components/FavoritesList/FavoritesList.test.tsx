import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FavoritesList } from './FavoritesList';

vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    favorites: [1, 2],
    toggleFavorite: vi.fn(),
    isFavorite: (id: number) => [1, 2].includes(id),
  }),
}));

describe('FavoritesList Component', () => {
  const mockRecipes = [
    {
      id: 1,
      name: 'Pasta al Pomodoro',
      image: '',
      description: '',
      ingredients: [{ id: 1, name: 'Pasta' }],
    },
    {
      id: 2,
      name: 'Pizza Margherita',
      image: '',
      description: '',
      ingredients: [{ id: 2, name: 'Mozzarella' }],
    },
    {
      id: 3,
      name: 'Risotto',
      image: '',
      description: '',
      ingredients: [{ id: 3, name: 'Riso' }],
    },
  ];

  it('renders empty state message when no recipes are provided', () => {
    render(<FavoritesList recipes={[]} />);
    expect(screen.getByText('Click on the star icon to start collecting some recipes.')).toBeInTheDocument();
  });

  it('renders the correct number of favorite recipes', () => {
    render(<FavoritesList recipes={mockRecipes} />);
    const recipeCards = screen.getAllByText('30 min ~');
    expect(recipeCards).toHaveLength(2);
  });


  it('only renders recipes that are in favorites', () => {
    render(<FavoritesList recipes={mockRecipes} />);
    expect(screen.getByText('Pasta al Pomodoro')).toBeInTheDocument();
    expect(screen.getByText('Pizza Margherita')).toBeInTheDocument();
    expect(screen.queryByText('Risotto')).not.toBeInTheDocument();
  });

  it('renders the correct number of favorite recipes', () => {
    render(<FavoritesList recipes={mockRecipes} />);
    expect(screen.getByText('You saved 2 recipes')).toBeInTheDocument();
  });
}); 