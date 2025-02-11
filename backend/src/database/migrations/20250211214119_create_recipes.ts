import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary()
    table.string('recipe_name').notNullable().unique()
    table.text('recipe_description')
    table.string('recipe_image')
    table.timestamps(true,true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('recipes')
}

