import React, { useEffect, useState } from 'react'
import styles from './auth.module.css';
import Link from 'next/link';
import Login from "../../components/login";
import { useRouter } from 'next/navigation'



const auth = () => {

  const router = useRouter()

  useEffect(() => {
    if (window.localStorage.getItem('login') == 'false') {
        router.push('/auth')
      } else if (window.localStorage.getItem('login') == 'true') {
        router.push('/')
      } else {
      router.push('/auth')
    }
}, [])

  return (
    <div className={styles.auth}>
      <Login />
    </div>
  )
}

export default auth