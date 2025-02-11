import 'dotenv/config';

export default {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || 5432,
      database: process.env.DATABASE_NAME || 'my_recipe_db',
      user: process.env.DATABASE_USER || 'user',
      password: process.env.DATABASE_PASSWORD || 'password',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || 5432,
      database: process.env.DATABASE_NAME || 'my_recipe_db',
      user: process.env.DATABASE_USER || 'user',
      password: process.env.DATABASE_PASSWORD || 'password',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
}; 