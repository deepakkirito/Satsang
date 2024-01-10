import Head from 'next/head';
import { useContext, useEffect } from "react";
import Navigation from 'next/navigation';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Landing from '../components/Landing/index'
import { Message_data } from "../context/context";


export default function Home() {
  const { message, setMessage } = useContext(Message_data);

  useEffect(()=>{
    setMessage({...message, login:false})
  },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Satsang List</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <Landing />
    </div>
  );
}
