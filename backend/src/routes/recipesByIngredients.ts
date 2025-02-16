import { FastifyInstance } from 'fastify';
import { db } from '../db';

export async function searchByIngredients(fastify: FastifyInstance) {
  fastify.get('/recipes/searchByIngredients', async (request, reply) => {
    const { ingredients } = request.query as { ingredients: string };
    const ingredientList = Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(id => parseInt(id,10));

    if (!ingredients) {
      return reply.status(400).send({ error: 'ingredientIds parameter is required' });
    }
    
    try {
      const recipesByIngredients = ingredients.length > 0 ? await db('recipe_ingredients')
        .select('recipe_id as id', 'recipe_name as name')
        .join('recipes', 'recipe_ingredients.recipe_id', 'recipes.id')
        .join('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
        .where('ingredient_id', 'in', ingredientList)
        .groupBy('recipe_id', 'recipe_name')
        .limit(5) : [];
      
        const recipesWithIngredients = await Promise.all(recipesByIngredients.map(async (recipe) => {
          const ingredientsForRecipe = await db('recipe_ingredients')
            .join('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
            .where('recipe_id', recipe.id)
            .select('ingredient_name','ingredient_id');
          return {
            ...recipe,
            ingredients: ingredientsForRecipe.map(ing => ({
              id:ing.ingredient_id, 
              name:ing.ingredient_name,
              description:ing.description,
            })) 
          };
        }));
        

      return {
        recipes: recipesWithIngredients
      }
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  })
}