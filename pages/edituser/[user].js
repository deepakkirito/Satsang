import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Images from 'next/image';
import styles from './user.module.css'
import Toast from '../../components/Toast/index'
import { Message_data } from "../../context/context";


const user = () => {
  const [userData, setUserData] = useState(undefined)
  const { message, setMessage } = useContext(Message_data);
  const [messag, setMessag] = useState('');
  const [color, setColor] = useState('green');
  const [bgcolor, setBgcolor] = useState('#DFF2BF');
  const [check, setCheck] = useState('true');
  const [update, setUpdate] = useState('true');
  const router = useRouter()

  const user = router.query != {} && router.query.user;

  useEffect(() => {
    user && axios.get(`https://satsangapi.glitch.me/userbyid?id=${user}`).then(res => {
      const data = res.data.res[0]
      !data?.Pic ? data.Pic = 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' : ''
      setUserData(res.data.res[0])
    }).catch(err => {
      console.log(err);
    })
  }, [user])

  const handleClick = () => {
    setUpdate(false)
    axios.put(`https://satsangapi.glitch.me/user?id=${user}`, { userData: userData }).then(res => {
      console.log(res.data.res);
      // setMessage({ ...message, back: false })
      setUpdate(true)
      setCheck('false')
      setTimeout(() => {
        setCheck('true')
        // window.location.reload()
      }, 5000);
      setMessag('Data Updated Successfully')
      setBgcolor('#dff2bf')
      setColor('green')
    }).catch(err => {
      setCheck('false')
      setUpdate(true)
      setTimeout(() => {
        setCheck('true')
        // window.location.reload()
      }, 5000);
      setMessag('Try again later!!!')
      setBgcolor('#ffbaba')
      setColor('rgba(114, 15, 15, 0.575)')
      console.log(err);
    })
  }

  const handleChange = async (data) => {
    if (data.name == 'Pic') {
      let b64fileP = await toBase64(data.files[0]);
      userData.Pic = b64fileP;
      setUserData({ ...userData, [data.name]: userData.Pic })
    } else if (data.name == 'Aadhaar') {
      console.log(data.value);
      if (data.value.length > 12) {
        setCheck('false')
        setTimeout(() => {
          setCheck('true')
        }, 5000);
        setMessag('Aadhaar Number can not be greater than 12 numbers')
        setBgcolor('#ffbaba')
        setColor('rgba(114, 15, 15, 0.575)')
      } else {
        setUserData({ ...userData, [data.name]: data.value })
      }
    } else if (data.name == 'Contact_no_2' || data == 'Contact_no_1' || data.name == 'Emergency_number') {
      if (data.value.length > 10) {
        setCheck('false')
        setTimeout(() => {
          setCheck('true')
        }, 5000);
        setMessag('Contact Number can not be greater than 10 numbers')
        setBgcolor('#ffbaba')
        setColor('rgba(114, 15, 15, 0.575)')
      } else {
        setUserData({ ...userData, [data.name]: data.value })
      }
    } else {
      setUserData({ ...userData, [data.name]: data.value })
    }
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className={styles.user}>
      <div>
        <Link href={`/user/${user}`}>Cancel</Link>
        <button onClick={() => handleClick()}>Update</button>
      </div>
      <Toast check={check} message={messag} color={color} bgcolor={bgcolor} />
      <form onSubmit={e => e.preventDefault()} onChange={e => handleChange(e.target)}>
        {update && userData && userData?.Pic && <div>
          <h5>Pic : </h5>
          <img src={userData.Pic} alt='Profile'></img>
          <input type='file' placeholder='Upload Profile Pic' name='Pic' accept="image/*"></input>
        </div>}
        {update && userData ? Object.keys(userData).map((data, index) => {
          if (data != 'Pic' && data == 'Dob' || data == 'Date_of_initiation') {
            return <div>
              <h5>{data} : </h5>
              <input type='date' name={data} value={Object.values(userData)[index] != '' && Object.values(userData)[index]?.split('T')[0]} defaultValue={Object.values(userData)[index] != '' && Object.values(userData)[index]?.split('T')[0]}></input>
            </div>
          } else if (data != 'Pic' && data == 'Contact_no_1' || data == 'Contact_no_2' || data == 'Emergency_number' || data == 'Age' || data == 'Aadhaar') {
            return <div>
              <h5>{data} : </h5>
              <input type='number' name={data} value={Object.values(userData)[index]} defaultValue={Object.values(userData)[index]}></input>
            </div>
          } else if (data != 'Pic' && data == 'Gender') {
            return <div className={styles.gender}>
              <h5>{data} : </h5>
              <input type='radio' name={data} id={'Male'} value={'Male'} checked={Object.values(userData)[index] == 'Male'}></input>
              <label for={'Male'}>Male</label>
              <input type='radio' name={data} id={'Female'} value={'Female'} checked={Object.values(userData)[index] == 'Female'}></input>
              <label for={"Female"}>Female</label>
            </div>
          } else if (data != 'Pic' && data == 'In_active') {
            return <div className={styles.gender}>
              <h5>{data} : </h5>
              <input type='radio' name={data} id={'Active'} value={'Active'} checked={Object.values(userData)[index] == 'Active'}></input>
              <label for={'Active'}>Active</label>
              <input type='radio' name={data} id={'Inactive'} value={'Inactive'} checked={Object.values(userData)[index] == 'Inactive'}></input>
              <label for={"Inactive"}>Inactive</label>
            </div>
          } else if (data != 'Pic') {
            return <div>
              <h5>{data} : </h5>
              <input type='text' name={data} value={Object.values(userData)[index]} defaultValue={Object.values(userData)[index]}></input>
            </div>
          }
        }) : <Images src='/Opener Loading.gif' width='100' height='100' alt='Loading' />}
      </form>
    </div>
  )
}

export default user
