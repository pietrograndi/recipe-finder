import { RecipeWithIngredients } from "@/types/interface";
import styles from "./RecipeCard.module.css";
import { FavIcon } from "../icons/favIncon";
import { useFavorites } from "@/hooks/useFavorites";
import cx from "classnames";
import Link from "next/link";
interface RecipeCardProps {
  recipe: RecipeWithIngredients;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <div className={styles.recipeCard}>
      <div className={styles.recipeHeader}>
        <div>
        30 min ~
        </div>
        <button
           onClick={() => toggleFavorite(recipe.id)}
           className={cx(styles.favButton, { [styles.active]: isFavorite(recipe.id) })}>
          <FavIcon />
        </button>
      </div>
      <div className={styles.recipeMain}>
        {recipe.image && (
          <div 
            className={styles.imageContainer}
            role="img" 
            aria-label={`Foto di ${recipe.name}`}
          >
            <img 
              src={recipe.image} 
              alt={recipe.name}
              loading="lazy"
            />
          </div>
        )}
        <div className={styles.infoContainer}>
          <h3>
            <Link href={`/recipes/${encodeURIComponent(recipe.name)}`}>
              {recipe.name}
            </Link>
          </h3>
          <div className={styles.ingredients}>
            {recipe.ingredients.map((ingredient) => (
              <span key={ingredient.id}>{ingredient.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};