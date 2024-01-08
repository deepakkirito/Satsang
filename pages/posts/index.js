import Head from 'next/head';
import Link from 'next/link';
import Images from 'next/image';
import Script from 'next/script';
import styles from '../../styles/post.module.css';

export default function FirstPost() {
    return <div className={styles.post}>
    <Head>
        <title>My first post</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <script src="/script.js"></script> */}
    </Head>
    <Script src='/script.js' strategy='beforeInteractive'>

</Script>

      <h1>First Post</h1>
      <Images src='/first-post.jpeg' width='300' height='200' alt='First Post'></Images>
      <Link href='/'>
      <h1>&larr; Back</h1>
      </Link>
    </div>
  }