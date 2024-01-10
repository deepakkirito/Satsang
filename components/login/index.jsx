'useclient'
import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import styles from './login.module.css';
import Link from 'next/link';
import axios from "axios";
import Toast from '../Toast/index'
import Images from 'next/image';
import { useRouter } from 'next/navigation'
import { Message_data } from "../../context/context";

const login = () => {
  const [loginData, setLoginData] = useState({username: '', password:''});
  const [login, setLogin] = useState('');
  const [messag, setMessag] = useState('');
  const [check, setCheck] = useState('');
  const [loading, setLoading] = useState('false');
  const { message, setMessage } = useContext(Message_data);
  const router = useRouter()

  useEffect(()=>{
    axios.get('https://satsangapi.glitch.me/user')
    setMessage({...message,login:'true'})
  },[])

  const handleClick = () => {
    if(loginData.password.length >= 8) {
      setLoading('true')
      axios.get(`https://satsangapi.glitch.me/login?username=${loginData.username}&password=${loginData.password}`)
      .then(data => {
        if (data.data.res == 'success') {
          window.localStorage.setItem('login', 'true')
          setTimeout(() => {
            // window.location.reload()
            router.push('/')
            setLoading('false')
          }, 1000);
        } else if (data.data.res == 'invalid') {
        setLoading('false')
        window.localStorage.setItem('login', 'false')
        setCheck(window.localStorage.getItem('login'))
        setMessag('Invalid Username or Password')
        setTimeout(() => {
          setCheck('true')
        }, 6000);
      }
    })
  } else {
    setCheck('false')
    setMessag('Enter more than 8 character password')
    setTimeout(() => {
      setCheck('true')
    }, 6000);
    }
  }
  

  return (
    <main className={styles.login}>
      <h1>Satsang Login</h1>
      <h4>A data record application for Satsang</h4>
      <form onSubmit={e=>e.preventDefault()} className={styles.login_form} onChange={e=>setLoginData({...loginData, [e.target.name] : e.target.value})}>
      <h3>Radha Swami</h3>
        <div>
          <label>Username</label>
          <input type='text' placeholder='Enter Username' name='username'></input>
        </div>
        <div>
          <label>Password</label>
          <input type='password' placeholder='Enter Password' name='password'></input>
        </div>
        <section>
        {loading == 'false'? <button 
          onClick={handleClick}
          disabled={loginData.username == '' || loginData.password == ''}
          >Login</button> : <Images src='/Opener Loading.gif' width='65' height='65' alt='Loading'></Images>}
          <br />
          <Link href='/forgot-password'>Forget Password !!!</Link>
        </section>
      </form>
      <Toast check={check} message={messag} color={'rgba(114, 15, 15, 0.575)'} bgcolor={'#FFBABA'}/>
    </main>
  )
}

export default login