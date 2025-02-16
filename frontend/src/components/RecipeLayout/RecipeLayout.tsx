import { Ingredient, Recipe } from '@/types/interface';
import styles from './RecipeLayout.module.css';
import { FavIcon } from '../icons/favIncon';
import { useFavorites } from '@/hooks/useFavorites';

interface RecipeLayoutProps {
  recipe: Recipe;
  ingredients: Ingredient[];
}

export const RecipeLayout = ({ recipe, ingredients }: RecipeLayoutProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <article className={styles.recipeContainer}>
      <header className={styles.recipeHeader}>
        <div className={styles.titleSection}>
          <h1>{recipe.name}</h1>
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className={styles.favoriteButton}
            aria-label={isFavorite(recipe.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
          >
            <FavIcon />
          </button>
        </div>
        {recipe.description && (
          <p className={styles.description}>{recipe.description}</p>
        )}
      </header>

      <div className={styles.mainContent}>
        <div className={styles.imageSection}>
          {recipe.image && (
            <img 
              src={recipe.image} 
              alt={recipe.name}
              className={styles.recipeImage}
            />
          )}
        </div>

        <div className={styles.contentSection}>
          <section className={styles.ingredientsSection}>
            <h2>Ingredienti</h2>
            <ul className={styles.ingredientsList}>
              {ingredients.map((ingredient) => (
                <li key={ingredient.id} className={styles.ingredientItem}>
                  <span className={styles.ingredientName}>{ingredient.name}</span>
                  {ingredient.description && (
                    <span className={styles.ingredientDescription}>
                      {ingredient.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.preparationSection}>
            <h2>Preparazione</h2>
            <div className={styles.preparationSteps}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse 
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum.
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};