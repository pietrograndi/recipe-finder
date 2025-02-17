import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import styles from '@/styles/Home.module.css';
import { RecipeWithIngredients } from "@/types/interface";
import { Geist, Geist_Mono } from 'next/font/google';
import Head from "next/head";
import { FavoritesList } from "@/components/FavoritesList/FavoritesList";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const FavoritesPage = (props: { recipes: RecipeWithIngredients[] }) => {
  return (
    <div>
      <Head>
        <title>Favorites - Recipe</title>
      </Head>
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <div className={styles.center}>
            <Navigation />
          </div>
        </header>
        <main>
          <div className={styles.center}> 
          <FavoritesList recipes={props.recipes} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const recipes = await fetch(`${process.env.BACKEND}/recipes`);
  const recipesData = await recipes.json();
  return {
    props: { recipes: recipesData.recipes },
    revalidate: 60 * 60 * 24,
  };
};

export default FavoritesPage;
