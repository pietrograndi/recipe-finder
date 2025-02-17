import { RecipeWithIngredients } from "@/types/interface";
import { RecipeCard } from "@/components/RecipeCard";
import { StateMessage } from "@/components/StateMessage";
import styles from "./FavoritesList.module.css";
import { useFavorites } from "@/hooks/useFavorites";
import cx from "classnames";


interface FavoritesListProps {
  recipes: RecipeWithIngredients[];
}

export const FavoritesList = ({ recipes }: FavoritesListProps) => {
  const { favorites } = useFavorites();
  
  if (!recipes || recipes.length === 0) {
    return <StateMessage message="Click on the star icon to start collecting some recipes." />;
  }

  return (
    <section className={cx(styles.container)}>
      <div className={styles.header}>
        <h1>Le tue recipes preferite</h1>
        <p className={styles.subtitle}>You saved {favorites.length} recipes</p>
      </div>
      <div className={styles.recipeResults}>
        {recipes
          .filter((recipe) => favorites.includes(recipe.id))
          .map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </section>
  );
}; 