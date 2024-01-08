'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './landing.module.css';
import Link from 'next/link';
import Table from '../Table/index'
import Newuser from '../newuser/index'



const landing = () => {
    const [route, setRoute] = useState(false)
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

    const handleClick = () => {
        if (route == true) {
            setRoute(false)
        } else {
            setRoute(true)
        }
    }

    const handleLogout = () => {
        router.push('/auth')
        window.localStorage.removeItem('login')
    }

    return (
        <div className={styles.landing}>
            <nav>
                <div>
                    <h2>Satsang Ghar List</h2>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
                <div>
                    <button 
                    onClick={handleClick} 
                    style={route ? {backgroundColor:'rgba(189, 2, 2, 0.297)'} : {backgroundColor:'rgba(245, 222, 179, 0.297)'}}
                    >{ !route ? 'Add New Sevadaar' : 'Cancel'}</button>
                </div>
            </nav>
            {!route && <Table />}
            {route && <Newuser />}
        </div>
    )
}

export default landing