import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFavorites } from './useFavorites';

describe('useFavorites', () => {
  let mockStorage: { [key: string]: string } = {};

  beforeEach(() => {
    mockStorage = {};
    
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key) => mockStorage[key]),
      setItem: vi.fn((key, value) => {
        mockStorage[key] = value;
      }),
    });

    vi.stubGlobal('window', {
      localStorage,
    });
  });

  it('should initialize with empty favorites if no stored data', () => {
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
  });

  it('should initialize with stored favorites', () => {
    mockStorage.favorites = JSON.stringify([1, 2, 3]);
    
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites).toEqual([1, 2, 3]);
    expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
  });

  it('should add a recipe to favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.toggleFavorite(1);
    });
    
    expect(result.current.favorites).toEqual([1]);
    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([1]));
  });

  it('should remove a recipe from favorites', () => {
    mockStorage.favorites = JSON.stringify([1, 2, 3]);
    
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.toggleFavorite(2);
    });
    
    expect(result.current.favorites).toEqual([1, 3]);
    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([1, 3]));
  });

  it('should check if a recipe is favorite', () => {
    mockStorage.favorites = JSON.stringify([1, 2, 3]);
    
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.isFavorite(4)).toBe(false);
  });

  it('should handle toggling the same recipe multiple times', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.toggleFavorite(1); 
    });
    expect(result.current.favorites).toEqual([1]);
    
    act(() => {
      result.current.toggleFavorite(1); 
    });
    expect(result.current.favorites).toEqual([]);
    
    act(() => {
      result.current.toggleFavorite(1);
    });
    expect(result.current.favorites).toEqual([1]);
  });
}); 