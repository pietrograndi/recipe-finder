import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Listbox } from './Listbox';

describe('Listbox Component', () => {
  const mockIngredients = [
    { id: 1, name: 'Carota', unit: 'g' },
    { id: 2, name: 'Patata', unit: 'g' }
  ];

  const mockRecipes = [
    { id: 1, name: 'Pasta al pomodoro', servings: 4 },
    { id: 2, name: 'Pizza margherita', servings: 2 }
  ];

  const mockProps = {
    searchTerm: 'pa',
    suggestions: {
      ingredients: mockIngredients,
      recipes: mockRecipes
    },
    inputId: 'search-input',
    showRecipes: true,
    onSelect: vi.fn(),
    activeIndex: 0,
    ingredientsIds: []
  };

  it('renders without crashing', () => {
    render(<Listbox {...mockProps} />);
    expect(screen.getByRole('listbox')).toBeDefined();
  });

  it('shows "Nessun risultato trovato" when no suggestions are available', () => {
    render(
      <Listbox
        {...mockProps}
        suggestions={{ ingredients: [], recipes: [] }}
      />
    );
    expect(screen.getByText('Nessun risultato trovato')).toBeInTheDocument();
  });

  it('renders ingredients section when ingredients are available', () => {
    render(<Listbox {...mockProps} />);
    expect(screen.getByText('🥬 Ingredienti')).toBeInTheDocument();
    expect(screen.getByText(/Carota/)).toBeInTheDocument();;
    expect(screen.getByText(/Patata/)).toBeInTheDocument();;
  });

  it('renders recipes section when recipes are available and showRecipes is true', () => {
    render(<Listbox {...mockProps} />);
    expect(screen.getByText('🍽️ Ricette')).toBeInTheDocument();;
    expect(screen.getByText(/Pasta al pomodoro/)).toBeInTheDocument();;
    expect(screen.getByText(/Pizza margherita/)).toBeInTheDocument();;
  });

  it('does not render recipes section when showRecipes is false', () => {
    render(<Listbox {...mockProps} showRecipes={false} />);
    expect(screen.queryByText('🍽️ Ricette')).toBeNull();
  });

  it('limits ingredients suggestions to 5 items', () => {
    const manyIngredients = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      name: `Ingredient ${i}`,
      description: `Description ${i}`
    }));

    render(
      <Listbox
        {...mockProps}
        searchTerm='Ingredient'
        suggestions={{ ...mockProps.suggestions, ingredients: manyIngredients }}
      />
    );

    const ingredientElements = screen.getAllByText(/Ingredient \d/);
    expect(ingredientElements.length).toBe(5);
  });

  it('limits recipes suggestions to 5 items', () => {
    const manyRecipes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      name: `Recipe ${i}`,
      description: `Description ${i}`
    }));

    render(
      <Listbox
        {...mockProps}
        searchTerm='Recipe'
        suggestions={{ ...mockProps.suggestions, recipes: manyRecipes }}
      />
    );

    const recipeElements = screen.getAllByText(/Recipe \d/);
    expect(recipeElements.length).toBe(5);
  });

  it('has correct ARIA attributes', () => {
    render(<Listbox {...mockProps} />);
    const listbox = screen.getByRole('listbox');
    expect(listbox.getAttribute('aria-label')).toBe('Suggerimenti ricerca');
    expect(listbox.getAttribute('aria-owns')).toBe('search-input');
  });
});
