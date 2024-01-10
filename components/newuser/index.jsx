import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Toast from '../Toast/index'
import styles from './newuser.module.css'
import Link from 'next/link';
import Images from 'next/image';

const newuser = () => {
  const [userData, setUserData] = useState({
    Pic: "",
    Name: "",
    Badge_ID: "",
    Father_husband: "",
    Aadhaar: "",
    Gender: "",
    Age: "",
    Dob: "",
    Contact_no_1: "",
    Contact_no_2: "",
    Emergency_number: "",
    Current_address: "",
    Status: "",
    In_active: "",
    Date_of_initiation: "",
    Area_location: "",
    Satsang_place: ""
});
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('green');
  const [bgcolor, setBgcolor] = useState('#DFF2BF');
  const [check, setCheck] = useState('true');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleClick = () => {
    setLoading(true)
    axios.post('https://satsangapi.glitch.me/user',{userData:userData}).then((res,err) => {
      setLoading(false)
      setCheck('false')
      setMessage(res.data.res)
      setBgcolor('#DFF2BF')
      setColor('green')
      setTimeout(() => {
        setCheck('true')
        window.location.reload()
      }, 5000);
    }).catch(err=>{
      setLoading(false)
      setCheck('false')
      setMessage('Try Again Later!!!')
      setBgcolor('#ffbaba')
      setColor('rgba(114, 15, 15, 0.575)')
      setTimeout(() => {
        setCheck('true')
        window.location.reload()
      }, 5000);
      console.log(err);
    })
  }
  const handleChange = async (data) => {
    if (data.name == 'Pic') {
      let b64fileP = await toBase64(data.files[0]);
      userData.Pic = b64fileP;
      setUserData({ ...userData, [data.name]: userData.Pic})
    } else if(data.name == 'Aadhaar') {
      console.log(data.value);
      if(data.value.length > 12) {
        setCheck('false')
        setTimeout(() => {
          setCheck('true')
        }, 5000);
        setMessage('Aadhaar Number can not be greater than 12 numbers')
        setBgcolor('#ffbaba')
        setColor('rgba(114, 15, 15, 0.575)')
      } else {
        setUserData({ ...userData, [data.name]: data.value })
      }
    } else if(data.name == 'Contact_no_1' || data.name == 'Contact_no_2' || data.name == 'Emergency_number') {
      if(data.value.length > 10) {
        setCheck('false')
        setTimeout(() => {
          setCheck('true')
        }, 5000);
        setMessage('Contact Number can not be greater than 10 numbers')
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

    console.log(userData);

  return (
    <div className={styles.newuser}>
      <Toast check={check} message={message} color={color} bgcolor={bgcolor}/>
      <h2>Add New Sevadaar</h2>
      <form onSubmit={e => e.preventDefault()} onChange={e => handleChange(e.target)}>
        <div>
          <label>Profile Pic</label>
          {userData?.Pic && <img src={userData.Pic} alt='Profile'></img>}
          <input type='file' name='Pic'></input>
        </div>
        <div>
          <label>Name</label>
          <input type='text' placeholder='Enter Sevadaar Name' name='Name'></input>
        </div>
        <div>
          <label>Badge ID</label>
          <input type='text' placeholder='Enter Sevadaar Badge ID' name='Badge_ID'></input>
        </div>
        <div>
          <label>Father's/Husband's Name</label>
          <input type='text' placeholder="Enter Sevadaar Father's/Husband's Name" name='Father_husband'></input>
        </div>
        <div>
          <label>Aadhaar</label>
          <input type='number' placeholder='Enter Sevadaar Aadhaar' name='Aadhaar' value={userData.Aadhaar}></input>
        </div>
        <div className={styles.gender}>
          <label>Gender</label>

          <input type='radio' id='male' name='Gender' value='Male'></input>
          <label for='male'>Male</label>

          <input type='radio' id='female' name='Gender' value='Female'></input>
          <label for='female'>Female</label>
        </div>
        <div>
          <label>Age</label>
          <input type='number' placeholder='Enter Sevadaar Age' name='Age' max='100'></input>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type='date' placeholder='Enter Sevadaar Date of Birth' name='Dob'></input>
        </div>
        <div>
          <label>Contact Number</label>
          <input type='number' placeholder='Enter Sevadaar Contact number' name='Contact_no_1' value={userData.Contact_no_1}></input>
        </div>
        <div>
          <label>Contact Number</label>
          <input type='number' placeholder='Enter Sevadaar Contact number' name='Contact_no_2' value={userData.Contact_no_2}></input>
        </div>
        <div>
          <label>Emergency Number</label>
          <input type='number' placeholder='Enter Sevadaar Emergency Number' name='Emergency_number' value={userData.Emergency_number}></input>
        </div>
        <div>
          <label>Current Address</label>
          <input type='text' placeholder='Enter Sevadaar Current Address' name='Current_address'></input>
        </div>
        <div className={styles.gender}>
          <label>Active/Inactive</label>

          <input type='radio' id='active' name='In_active' value='Active'></input>
          <label for='active'>Active</label>

          <input type='radio' id='inactive' name='In_active' value='Inactive'></input>
          <label for='inactive'>Inactive</label>
        </div>
        <div>
          <label>Status</label>
          <input type='text' placeholder='Enter Sevadaar Status' name='Status'></input>
        </div>
        <div>
          <label>Date of Initiation</label>
          <input type='date' placeholder='Enter Sevadaar Date of Initiation' name='Date_of_initiation'></input>
        </div>
        <div>
          <label>Area/Location</label>
          <input type='text' placeholder='Enter Sevadaar Area/Location' name='Area_location'></input>
        </div>
        <div>
          <label>Satsang Place</label>
          <input type='text' placeholder='Enter Sevadaar Satsang Place' name='Satsang_place'></input>
        </div>
        <div className={styles.addBtn}>
          <button onClick={handleClick}>Add Sevadaar</button>
          {loading && <Images src='/Opener Loading.gif' width='30' height='30'></Images>}
        </div>
      </form>
    </div>
  )
}

export default newuser