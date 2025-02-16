import { FastifyInstance } from 'fastify';
import { db } from '../db';

export async function recipesBySlug(fastify: FastifyInstance) {
  fastify.get('/recipes/:slug', async (request, reply) => {
    try {
      const { slug } = request.params as { slug: string };
      const recipe = await db('recipes')
        .select('id', 'recipe_name as name', 'recipe_description as description', 'recipe_image as image')
        .where('recipe_name', slug).first();
      if(!recipe) {
        return reply.status(404).send({ error: 'Recipe not found' });
      }
      return recipe;
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}