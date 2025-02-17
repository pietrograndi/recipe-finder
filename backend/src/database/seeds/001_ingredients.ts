import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("ingredients").del();

    // Inserts seed entries
    await knex("ingredients").insert([
        { id:1, ingredient_name: "spaghetti", ingredient_description: "Pasta di grano duro lunga e sottile." },
        { id:2, ingredient_name: "guanciale", ingredient_description: "Taglio di carne di maiale stagionato, ricco di sapore." },
        { id:3, ingredient_name: "uova", ingredient_description: "Uova fresche" },
        { id:4, ingredient_name: "pecorino romano", ingredient_description: "Formaggio stagionato a base di latte di pecora, dal sapore deciso." },
        { id:5, ingredient_name: "pepe nero", ingredient_description: "spezia" },
        { id:6, ingredient_name: "aglio", ingredient_description: "ingrediente aromatico" },
        { id:7, ingredient_name: "basilico", ingredient_description: null },
        { id:8, ingredient_name: "pomodori pelati", ingredient_description: null },
        { id:9, ingredient_name: "pinoli" },
        { id:10, ingredient_name: "peperoncino" },
        { id:11, ingredient_name: "bacon" },
        { id:12, ingredient_name: "olio evo" },
        { id:13, ingredient_name: "ricotta" },
        { id:14, ingredient_name: "melanzane" },
    ]);
};
