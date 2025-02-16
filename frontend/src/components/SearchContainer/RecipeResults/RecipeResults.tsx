import { Ingredient } from "@/types/interface";
import { useFetchRecipes } from "@/hooks/useFetchRecipes";

interface RecipeResultsProps {
  ingredients: Ingredient[];
}

export const RecipeResults = ({ ingredients = [] }: RecipeResultsProps) => {
  const ingredientIds = ingredients.map(ingredient => ingredient.id).join(',');
  const { data, error, isLoading } = useFetchRecipes(ingredientIds);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log(data)

  return (
    <section>
      <ul>
        {data.map((recipe) => (
          <li key={recipe.id}>{recipe.name} - {recipe.description}</li>
        ))}
      </ul>
    </section>
  );
};