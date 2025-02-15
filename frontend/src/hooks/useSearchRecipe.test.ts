import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearchRecipe } from './useSearchRecipe';

describe('useSearchRecipe', () => {
  const mockResponse = {
    ingredients: [
      { id: 1, name: 'Carota', description: 'orange' }
    ],
    recipes: [
      { id: 1, name: 'Pasta al pomodoro', description: 'carboidrati' }
    ],
    recipesByIngredients: []
  };

  const mockFetch = vi.fn();
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSearchRecipe());

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.searchTerm).toBe('');
  });

  it('should handle empty search term', async () => {
    const { result } = renderHook(() => useSearchRecipe());

    await act(async () => {
      await result.current.searchRecipes('   ');
    });

    expect(result.current.data).toBeNull();
    expect(result.current.searchTerm).toBe('');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should fetch and set data successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const { result } = renderHook(() => useSearchRecipe());

    await act(async () => {
      await result.current.searchRecipes('pasta');
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/findRecipesAndIngredients?query=pasta')
    );
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.searchTerm).toBe('pasta');
  });

  it('should handle API error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const { result } = renderHook(() => useSearchRecipe());

    await act(async () => {
      await result.current.searchRecipes('pasta');
    });

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch recipes');
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useSearchRecipe());

    await act(async () => {
      await result.current.searchRecipes('pasta');
    });

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Network error');
  });

  it('should handle loading state correctly', async () => {
    mockFetch.mockImplementationOnce(() => 
      new Promise(resolve => 
        setTimeout(() => 
          resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse)
          }), 
          100
        )
      )
    );

    const { result } = renderHook(() => useSearchRecipe());

    act(() => {
      result.current.searchRecipes('pasta');
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockResponse);
  });
}); 