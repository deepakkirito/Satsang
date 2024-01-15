import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Images from 'next/image';
import styles from './user.module.css'
import { Message_data } from "../../context/context";

const dummyImage = 'https://previews.123rf.com/images/bsd555/bsd5552103/bsd555210304774/166504521-man-with-magnifying-glass-rgb-color-icon-unsuccessful-searching-guy-making-research-no-suitable.jpg';


const user = () => {
  const [userData, setUserData] = useState(undefined)
  const [imageData, setImageData] = useState('loading')
  const { message, setMessage } = useContext(Message_data);
  const [imgLoading, setImgLoading] = useState(false)
  const router = useRouter()

  const user = router.query != {} && router.query.user;

  useEffect(() => {
    setImgLoading(false)
    user && axios.get(`https://satsangapi.glitch.me/userbyid?id=${user}&img=false`).then(res => {
      setUserData(res.data.res[0])
      axios.get(`https://satsangapi.glitch.me/userbyid?id=${user}&img=true`).then(res=>{
        setImgLoading(true)
        setImageData(res.data.res[0].Pic)
      }).catch(err =>{
        setImgLoading(false)
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
      setImgLoading(false)
    })
  }, [user])

  return (
    <div className={styles.user}>
      <div>
        <Link href='/' onClick={() => setMessage({ ...message, back: false })}>Back</Link>
        <Link href={`/edituser/${user}`}>Edit</Link>
      </div>
      {imgLoading ? <div>
        <h5>Pic : </h5>
        <img src={imageData ? imageData : dummyImage} alt='Profile'></img>
      </div> : <Images src='/Opener Loading.gif' width='100' height='100' alt='Loading' />}
      {userData ? Object.keys(userData).map((data, index) => {
        if (data == 'Dob' || data == 'Date_of_initiation') {
          return <div>
            <h5>{data} : </h5>
            <h6>{Object.values(userData)[index].split('T')[0]}</h6>
          </div>
        } else {
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
