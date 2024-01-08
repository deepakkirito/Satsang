import Head from 'next/head';
import Navigation from 'next/navigation';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Landing from '../components/Landing/index'


export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Satsang List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Landing />
    </div>
  );
}
