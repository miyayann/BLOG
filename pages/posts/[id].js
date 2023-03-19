import { getPostData, getAllPostIds } from "@/lib/post";
import Head from "next/head";
import Layout from "../../components/Layout";
import utils from "../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData
    }
  }
}

export default function Post({postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utils.headingXl}>{postData.title}</h1>
      <br/>
      <div className={utils.lightText}>{postData.date}</div>
      <br/>
      <div dangerouslySetInnerHTML={{__html: postData.blogContentHtml}}/>
      </article>
    </Layout>
  );
}