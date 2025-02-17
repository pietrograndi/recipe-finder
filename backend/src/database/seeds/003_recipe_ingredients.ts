import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("recipe_ingredients").del();

    // Inserts seed entries
    await knex("recipe_ingredients").insert([
        // caciopepe
        { recipe_id: 1, ingredient_id: 1 },
        { recipe_id: 1, ingredient_id: 4 },
        { recipe_id: 1, ingredient_id: 5 },
        // gricia
        { recipe_id: 2, ingredient_id: 1 },
        { recipe_id: 2, ingredient_id: 2 },
        { recipe_id: 2, ingredient_id: 4 },
        { recipe_id: 2, ingredient_id: 5 },
        // carbonara
        { recipe_id: 3, ingredient_id: 1 },
        { recipe_id: 3, ingredient_id: 2 },
        { recipe_id: 3, ingredient_id: 4 },
        { recipe_id: 3, ingredient_id: 5 },
        { recipe_id: 3, ingredient_id: 3 },
        // amatriciana
        { recipe_id: 4, ingredient_id: 1 },
        { recipe_id: 4, ingredient_id: 2 },
        { recipe_id: 4, ingredient_id: 4 },
        { recipe_id: 4, ingredient_id: 5 },
        { recipe_id: 4, ingredient_id: 8 },
        { recipe_id: 4, ingredient_id: 10 },
        // pesto
        { recipe_id: 5, ingredient_id: 1 },
        { recipe_id: 5, ingredient_id: 9 },
        { recipe_id: 5, ingredient_id: 7 },
        { recipe_id: 5, ingredient_id: 12 },
        // norma
        { recipe_id: 6, ingredient_id: 6 },
        { recipe_id: 6, ingredient_id: 14 },
        { recipe_id: 6, ingredient_id: 13 },
        { recipe_id: 6, ingredient_id: 12 },
        { recipe_id: 6, ingredient_id: 8 },
        { recipe_id: 6, ingredient_id: 1 },
    ]);
};
