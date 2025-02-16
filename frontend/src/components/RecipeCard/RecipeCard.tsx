import { RecipeWithIngredients } from "@/types/interface";
import styles from "./RecipeCard.module.css";
import { FavIcon } from "../icons/favIncon";
import { useFavorites } from "@/hooks/useFavorites";
import cx from "classnames";
import router from "next/router";

interface RecipeCardProps {
  recipe: RecipeWithIngredients;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <div className={styles.recipeCard} onClick={() => router.push(`/recipes/${encodeURIComponent(recipe.name)}`)}>
      <div className={styles.recipeHeader}>
        <div>
        pronto meno di 30 min
        </div>
        <button
           onClick={() => toggleFavorite(recipe.id)}
           className={cx(styles.favButton, { [styles.active]: isFavorite(recipe.id) })}>
          <FavIcon />
        </button>
      </div>
      <div className={styles.recipeMain}>
        <h3>{recipe.name}</h3>
        {recipe.description && <span>{recipe.description}</span>}
        <div className={styles.ingredients}>
          {recipe.ingredients.map((ingredient) => (
            <span key={ingredient.id}>{ingredient.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};