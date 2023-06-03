import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout, { siteTitle } from '@/components/Layout'

import Link from 'next/link'
import utilStyles from '../styles/utils.module.css';
const inter = Inter({ subsets: ['latin'] })

import { getPostsData } from '../lib/post';

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnales...
  // console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyles.headingMd}>
        私はフルスタックエンジニアです。私はフルスタックエンジニアです。私はフルスタックエンジニアです。
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>エンジニアブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={thumbnail}
                    className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <p className={utilStyles.boldText}>{title}</p>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>

    </Layout>
  )
}
