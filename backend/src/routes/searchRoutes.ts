import { FastifyInstance } from 'fastify';
import { db } from '../db';

export async function findRecipesAndIngredients(fastify: FastifyInstance) {
  fastify.get('/findRecipesAndIngredients', async (request, reply) => {
    const { query } = request.query as { query: string };
    if (!query) {
      return reply.status(400).send({ error: 'Query parameter is required' });
    }

    try {
      const ingredients = await db('ingredients')
        .select('id', 'ingredient_name', 'ingredient_description', 'ingredient_image')
        .where('ingredient_name', 'ilike', `%${query}%`);

      const recipes = await db('recipes')
        .select('id', 'recipe_name', 'recipe_description', 'recipe_image')
        .where('recipe_name', 'ilike', `%${query}%`);

      const recipesByIngredients = ingredients.length > 0 ? await db('recipe_ingredients')
        .select('recipe_id as id', 'recipe_name', 'ingredient_name')
        .join('recipes', 'recipe_ingredients.recipe_id', 'recipes.id')
        .join('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
        .where('ingredient_id', 'in', ingredients.map(ingredient => ingredient.id))
        .groupBy('recipe_id', 'recipe_name', 'ingredient_name')
        .limit(5) : [];

      return {
        ingredients,
        recipes,
        recipesByIngredients,
      };
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}