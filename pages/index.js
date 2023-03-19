import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "@/components/Layout";
import utils from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  {
    console.log(allPostsData);
  }
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utils.headingMd} style={{ paddingBottom: 10 }}>
          <p>NextJSの練習ですNextJSの練習ですNextJSの練習です</p>
        </section>

        <section className={utils.headingMd}>
          <h2>BLOG</h2>
          <div className={styles.grid}>
            {allPostsData.map(({ id, title, date, thumbnail }) => {
              return (
                <article key={id}>
                  <Link href={`/posts/${id}`}>
                    <img src={thumbnail} className={styles.thumbnailImage} />
                  </Link>
                  <Link href={`/posts/${id}`}>
                    <p className={utils.boldText}>{title}</p>
                  </Link>
                  <br />
                  <small className={utils.lightText}>{date}</small>
                </article>
              );
            })}
          </div>
        </section>
      </Layout>
    </>
  );
}
