import { Ingredient } from "@/types/interface";

const actionTypes = {
  ADD: 'add',
  REMOVE: 'remove'
} as const

export const addAction = (ingredient: Ingredient) => ({
  type: actionTypes.ADD,
  ingredient
})

export const removeAction = (index: number) => ({
  type: actionTypes.REMOVE,
  index
})

export type Action = 
  | { type: typeof actionTypes.ADD ; ingredient: Ingredient } 
  | { type: typeof actionTypes.REMOVE ; index: number };

export const ingredientReducer = (state: Ingredient[], action: Action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return [...state, action.ingredient];
    case actionTypes.REMOVE:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    default:
      return state; 
  }
}