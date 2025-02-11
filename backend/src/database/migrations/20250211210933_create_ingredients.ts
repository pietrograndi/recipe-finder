import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ingredients', (table) => {
    table.increments('id').primary()
    table.string('ingredient_name').notNullable().unique()
    table.text('ingredient_description')
    table.string('ingredient_image')
    table.timestamps(true,true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ingredients')
}

