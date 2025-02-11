import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("recipes").del();

    // Inserts seed entries
    await knex("recipes").insert([
        { id:1, recipe_name: 'pasta cacio e pepe'},
        { id:2, recipe_name: 'pasta alla gricia'},
        { id:3, recipe_name: 'pasta alla carbonara'},
        { id:4, recipe_name: 'pasta amatriciana'},
        { id:5, recipe_name: 'pasta al pesto'},
    ]);
};
