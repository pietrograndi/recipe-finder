import { FastifyInstance } from 'fastify';
import { db } from '../db';

export async function recipes(fastify: FastifyInstance) {
  fastify.get('/recipes', async (request, reply) => {

    try {
      const recipes = await db('recipes')
        .select('id', 'recipe_name as name', 'recipe_description as description', 'recipe_image as image')
      
      const ingredients = await Promise.all(recipes.map(async (recipe) => {
        const ingredients = await db('ingredients')
          .select('ingredient_name as name', 'ingredient_description as description', 'recipe_ingredients.recipe_id as recipe_id')
          .join('recipe_ingredients', 'ingredients.id', 'recipe_ingredients.ingredient_id')
          .where('recipe_ingredients.recipe_id', recipe.id);
        return ingredients;
      }));
      const flattenedIngredients = ingredients.flat();
      const r = recipes.map(item => {
        return {
          ...item,
          ingredients: flattenedIngredients.filter(ingredient => ingredient.recipe_id === item.id)
        }
      })

      return {recipes: r};
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
