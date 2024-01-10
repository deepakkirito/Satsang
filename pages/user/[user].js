import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Images from 'next/image';
import styles from './user.module.css'
import { Message_data } from "../../context/context";


const user = () => {
  const [userData, setUserData] = useState(undefined)
  const { message, setMessage } = useContext(Message_data);
  const router = useRouter()

  const user = router.query != {} && router.query.user;

  useEffect(() => {
    user && axios.get(`https://satsangapi.glitch.me/userbyid?id=${user}`).then(res => {
      setUserData(res.data.res[0])
    }).catch(err => {
      console.log(err);
    })
  }, [user])

  return (
    <div className={styles.user}>
      <div>
        <Link href='/' onClick={() => setMessage({ ...message, back: false })}>Back</Link>
        <Link href={`/edituser/${user}`}>Edit</Link>
      </div>
      {userData && userData?.Pic && <div>
        <h5>Pic : </h5>
        <img src={userData.Pic} alt='Profile'></img>
      </div>}
      {userData ? Object.keys(userData).map((data, index) => {
        if (data != 'Pic') {
          return <div>
            <h5>{data} : </h5>
            <h6>{Object.values(userData)[index]}</h6>
          </div>
        }
      }) : <Images src='/Opener Loading.gif' width='100' height='100' alt='Loading' />}
    </div>
  )
}

export default user