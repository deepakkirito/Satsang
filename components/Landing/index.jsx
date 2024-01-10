'use client'
import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { useRouter } from 'next/navigation'
import styles from './landing.module.css';
import Link from 'next/link';
import Table from '../Table/index'
import Newuser from '../newuser/index'
import { Message_data } from "../../context/context";



const landing = () => {
    const [route, setRoute] = useState(false)
    const { message, setMessage } = useContext(Message_data);
    const router = useRouter()

    console.log(message);

    return (
        <div className={styles.landing}>
            {!message?.add && <Table />}
            {message?.add && <Newuser />}
        </div>
    )
}

export default landing