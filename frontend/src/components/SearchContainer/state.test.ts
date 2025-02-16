import { describe, it, expect } from "vitest";
import { addAction, ingredientReducer, removeAction } from "./state";
import { Ingredient } from "@/types/interface";

describe('ingredientReducer', () => {
  it('should add an ingredient', () => {
    const initialState = [] as Ingredient[];
    const ingredient = { id: 1, name: 'Ingredient 1' };
    const action = addAction(ingredient);
    const newState = ingredientReducer(initialState, action);
    expect(newState).toEqual([ingredient]);
  });

  it('should remove an ingredient', () => {
    const initialState = [{ id: 1, name: 'Ingredient 1' }, { id: 2, name: 'Ingredient 2' }, { id: 3, name: 'Ingredient 3' }] as Ingredient[];
    const index = 1;
    const action = removeAction(index);
    const newState = ingredientReducer(initialState, action);
    expect(newState).toEqual([{ id: 1, name: 'Ingredient 1' }, { id: 3, name: 'Ingredient 3' }]);
  });

  it('should not add an ingredient if it already exists', () => {
    const initialState = [{ id: 1, name: 'Ingredient 1' }] as Ingredient[];
    const ingredient = { id: 1, name: 'Ingredient 1' };
    const action = addAction(ingredient);
    const newState = ingredientReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

