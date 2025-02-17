import { Ingredient } from "@/types/interface";
import { useFetchRecipes } from "@/hooks/useFetchRecipes";
import { RecipeCard } from "@/components/RecipeCard";
import { StateMessage } from "@/components/StateMessage";
import styles from "./RecipeResults.module.css";

interface RecipeResultsProps {
  ingredients: Ingredient[];
}

export const RecipeResults = ({ ingredients = [] }: RecipeResultsProps) => {
  const ingredientIds = ingredients.map(ingredient => ingredient.id).join(',');
  const { data, error, isLoading } = useFetchRecipes(ingredientIds);
  
  if(ingredients.length === 0) {
    return <StateMessage message="Search an ingredient to find recipes" />;
  }

  if (error) {
    return <StateMessage message="Failed to load" type="error" />;
  }
  
  if (isLoading) {
    return <StateMessage message="Loading recipes..." type="loading" />;
  }

  if (!data || data.length === 0) {
    return <StateMessage message="No recipes found with these ingredients" />;
  }

  return (
    <section>
      <div className={styles.recipeResults}>
        {data.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};