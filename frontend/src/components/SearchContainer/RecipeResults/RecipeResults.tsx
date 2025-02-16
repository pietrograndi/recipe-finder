import { Ingredient } from "@/types/interface";
import { useFetchRecipes } from "@/hooks/useFetchRecipes";
import { RecipeCard } from "@/components/RecipeCard";
import styles from "./RecipeResults.module.css";

interface RecipeResultsProps {
  ingredients: Ingredient[];
}

export const RecipeResults = ({ ingredients = [] }: RecipeResultsProps) => {
  const ingredientIds = ingredients.map(ingredient => ingredient.id).join(',');
  const { data, error, isLoading } = useFetchRecipes(ingredientIds);
  
  if(ingredients.length === 0) return <div>Search an ingredient to find recipes</div>;

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;


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