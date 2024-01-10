'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './navbar.module.css';
import { Message_data } from "../../context/context";
import { useContext } from "react";


const navbar = () => {
    const [route, setRoute] = useState(false)
    const { message, setMessage } = useContext(Message_data);
    const router = useRouter()


    useEffect(() => {
        if (window.localStorage.getItem('login') == 'false') {
            router.push('/auth')
          } else if (window.localStorage.getItem('login') == 'true') {
            router.push('/')
          } else {
          router.push('/auth')
        }
        if(window.location.href == 'http://localhost:3000/') {
            setRoute(true)
        } else {setRoute(false)}
    }, [])

    const handleClick = () => {
        if (message?.add == true) {
            setMessage({...message, add:false})
        } else {
            setMessage({...message, add:true})
        }
    }

    const handleLogout = () => {
        router.push('/auth')
        window.localStorage.removeItem('login')
    }


    return (
        <div className={styles.navbar} style={message && message?.login ? {display:'none'} : {display:'block'}}>
            <nav>
                <div>
                    <h2>Satsang Ghar List</h2>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
                {!message?.back && <div>
                    <button 
                    onClick={handleClick} 
                    style={message?.add ? {backgroundColor:'rgba(189, 2, 2, 0.297)'} : {backgroundColor:'rgba(245, 222, 179, 0.297)'}}
                    >{ !message?.add ? 'Add New Sevadaar' : 'Cancel'}</button>
                </div>}
            </nav>
        </div>
    )
}

export default navbar