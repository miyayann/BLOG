import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css"
import utils from "../styles/utils.module.css"
import Link from "next/link";

const name = "奇跡"
export const siteTitle = "Next.js Blog";

const Layout = ({children,home}) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
          <Image className={`${utils.borderCircle} ${styles.headerHomeImage}`} src="/thirteen.svg" width={100} height={50}/>
          </>
        ) : (
          <>
          <Image className={utils.borderCircle} src="/thirteen.svg" width={100} height={50}/>
          </>
        )}
        <h1>{name}</h1>
      </header>
      <main>{children}</main>
      <div style={{paddingTop: 20 }}>
      {!home && (
        <Link href="/">← ホームに戻る</Link>
      )}
      </div>
    </div>
  );
}

export default Layout;