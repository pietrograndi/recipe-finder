import { useReducer } from "react";
import { RecipeResults } from "./RecipeResults"
import { Search } from "./Search/Search"
import { Ingredient } from "@/types/interface";
import { ingredientReducer } from "./state";


export const SearchContainer = () => {
  const [ingredientState, dispatch] = useReducer(ingredientReducer, [] as Ingredient[]);
  
  return (
    <div>
      <Search ingredients={ingredientState} handleIngredient={dispatch} />
      <RecipeResults />
    </div>
  )
} 