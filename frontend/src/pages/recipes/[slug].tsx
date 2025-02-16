import { Recipe } from "@/types/interface";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from 'next/head';

const RecipePage = (props: { recipe: Recipe }) => {
  return (
    <div>
      <Head>
        <title>{props.recipe.name} - Recipe</title>
      </Head>
      <h1>{props.recipe.name}</h1>
      <p>{props.recipe.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await fetch(`${process.env.BACKEND}/recipes`);
  const recipesData = await recipes.json();
  return {
    paths: recipesData.map((recipe: Recipe) => ({ params: { slug: recipe.name } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipe = await fetch(`${process.env.BACKEND}/recipes/${encodeURIComponent(params?.slug as string)}`);
  const recipeData = await recipe.json() as Recipe;
  return {
    props: { recipe: recipeData },
  };
};
export default RecipePage;  