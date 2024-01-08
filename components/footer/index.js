'useclient'
import React, { useState } from 'react'
import styles from './footer.module.css';
import Link from 'next/link';


const footer = () => {
      const [route, setRoute] = useState('')

  return (
      <footer className={styles.footer}>
        <h3>Satsang Ghar</h3>
        <h5>Indirapuram</h5>
      </footer>
  )
}

export default footer