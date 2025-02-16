import { FastifyInstance } from 'fastify';
import { db } from '../db';

export async function recipes(fastify: FastifyInstance) {
  fastify.get('/recipes', async (request, reply) => {

    try {
      const recipes = await db('recipes')
        .select('id', 'recipe_name as name', 'recipe_description as description', 'recipe_image as image')
      return recipes;
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
