import Fastify from 'fastify'
import cors from '@fastify/cors'
import { findRecipesAndIngredients } from './routes/searchRoutes'
import { searchByIngredients } from './routes/recipesByIngredients'
import { port } from './envConfig'
import { recipes } from './routes/recipes'
import { recipesBySlug } from './routes/recipesBySlug'


const fastify = Fastify({
  logger: true
})

fastify.register(cors, {
  origin: true
})


fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.register(findRecipesAndIngredients)
fastify.register(searchByIngredients)
fastify.register(recipes)
fastify.register(recipesBySlug)

const start = async () => {
  try {
    await fastify.listen({ port , host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()