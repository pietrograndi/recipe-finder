import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("recipes").del();

    // Inserts seed entries
    await knex("recipes").insert([
        { id:1, recipe_name: 'caciopepe', recipe_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewXZbE4-cV5hweG6HOJniscXRpvSANmOHg1YD5WaMKyuodFLaGmFogn3KyeJh93RBupYfA5pE8SOGgTSPy4PAxwxJNXFJsbeTwgzVmA'},
        { id:2, recipe_name: 'gricia', recipe_image: 'https://www.giallozafferano.it/images/245-24521/Pasta-alla-gricia_450x300_sp.jpg'},  
        { id:3, recipe_name: 'carbonara', recipe_image: 'https://images.dissapore.com/wp-content/uploads/2024/10/spaghetti-alla-carbonara-ricetta.jpg?width=1280&height=720&quality=20'},
        { id:4, recipe_name: 'amatriciana', recipe_image: 'https://cdn.shortpixel.ai/spai/q_glossy+w_1278+h_847+to_webp+ret_img/mutti-parma.com/app/uploads/sites/7/2019/09/pasta-allamatriciana-scaled.jpg'},
        { id:5, recipe_name: 'pesto', recipe_image: 'https://www.fattoincasadabenedetta.it/wp-content/uploads/2022/07/AdobeStock_235021478-1200x900.jpg'},
        { id:6, recipe_name: 'norma', recipe_image: 'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2009/12/ricetta-pasta-norma/_jcr_content/header-par/image_single.img.jpg/1562754500727.jpg'},
    ]);
};
