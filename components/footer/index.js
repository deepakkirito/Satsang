'useclient'
import React, { useState } from 'react'
import styles from './footer.module.css';
import Link from 'next/link';
import { Message_data } from "../../context/context";
import { useContext } from "react";


const footer = () => {
  const { message, setMessage } = useContext(Message_data);

  return (
      <footer className={styles.footer} style={message && message?.login ? {display:'none'} : {display:'block'}}>
        <h5>Satsang Ghar</h5>
        <h6>Indirapuram</h6>
      </footer>
  )
}

export default footer