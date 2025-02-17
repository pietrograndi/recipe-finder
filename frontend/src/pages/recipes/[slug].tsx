import { Ingredient, Recipe } from "@/types/interface";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Geist, Geist_Mono } from 'next/font/google';
import cx from 'classnames';
import { RecipeLayout } from "@/components/RecipeLayout";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const RecipePage = (props: { recipe: Recipe & { ingredients: Ingredient[] } }) => {
  return (
    <div>
      <Head>
        <title>{props.recipe.name} - Recipe</title>
      </Head>
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`} >
        <header>
          <div className={cx(styles.center)}>
            <Navigation />
          </div>
        </header>
        <main> 
          <RecipeLayout recipe={props.recipe} ingredients={props.recipe.ingredients} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await fetch(`${process.env.BACKEND}/recipes`);
  const recipesData = await recipes.json();
  return {
    paths: recipesData.recipes.map((recipe: Recipe) => ({ params: { slug: recipe.name } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipe = await fetch(`${process.env.BACKEND}/recipes/${encodeURIComponent(params?.slug as string)}`);
  const recipeData = await recipe.json() as Recipe;
  console.log(recipeData)
  return {
    props: { recipe: recipeData },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default RecipePage;  