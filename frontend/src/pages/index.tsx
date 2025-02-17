import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import cx from 'classnames';
import { SearchContainer } from '@/components/SearchContainer';
import { Navigation } from '@/components/Navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="A simple recipe search app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`} >
        <header>
          <div className={cx(styles.center)}>
            <Navigation />
          </div>
        </header>
        <main> 
          <div className={cx(styles.center)}>
            <SearchContainer />
          </div>
        </main>
      </div>
    </>
  );
}
