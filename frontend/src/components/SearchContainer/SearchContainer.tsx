import { useReducer } from "react";
import { RecipeResults } from "./RecipeResults"
import { Search } from "./Search/Search"
import { Ingredient } from "@/types/interface";
import { ingredientReducer } from "./state";
import styles from './SearchContainer.module.css';
import homeStyles from '@/styles/Home.module.css';
import cx from 'classnames';


export const SearchContainer = () => {
  const [ingredientState, dispatch] = useReducer(ingredientReducer, [] as Ingredient[]);

  return (
    <div className={cx(styles.searchContainer, homeStyles.center)}>
      <Search ingredients={ingredientState} handleIngredient={dispatch} />
      <RecipeResults ingredients={ingredientState} />
    </div>
  )
} 