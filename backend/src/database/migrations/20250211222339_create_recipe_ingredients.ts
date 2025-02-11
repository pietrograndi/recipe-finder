import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('recipe_ingredients', (table) => {
    table.increments('id').primary()
    table.integer('recipe_id').unsigned().notNullable()
    table.integer('ingredient_id').unsigned().notNullable()
    // Foreign keys
    table.foreign('recipe_id').references('recipes.id').onDelete('CASCADE');
    table.foreign('ingredient_id').references('ingredients.id').onDelete('CASCADE');
    table.unique(['recipe_id', 'ingredient_id'])
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('recipe_ingredients')
}

