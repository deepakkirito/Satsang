import React, { useState } from 'react'
import axios from 'axios';
import Toast from '../Toast/index'
import styles from './newuser.module.css'
import Link from 'next/link';
import Images from 'next/image';

const newuser = () => {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');
  const [check, setCheck] = useState('true');

  const handleClick = () => {
    axios.post('https://satsangapi.glitch.me/user',{userData:userData}).then((res,err) => {
      console.log(res);
      setCheck('false')
      setMessage(res.data.res)
      setTimeout(() => {
        setCheck('true')
        window.location.reload()
      }, 5000);
    })
    console.log(userData);

  }
  const handleChange = async (data) => {
    if (data.name == 'Pic') {
      let b64fileP = await toBase64(data.files[0]);
      userData.Pic = b64fileP;
      setUserData({ ...userData, [data.name]: userData.Pic})
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
    <div className={styles.newuser}>
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
          <label>Aadhar</label>
          <input type='number' placeholder='Enter Sevadaar Aadhar' name='Aadhar'></input>
        </div>
        <div className={styles.gender}>
          <label>Gender</label>

          <input type='radio' id='male' name='Gender' value='M'></input>
          <label for='male'>Male</label>

          <input type='radio' id='female' name='Gender' value='F'></input>
          <label for='female'>Female</label>
        </div>
        <div>
          <label>Age</label>
          <input type='number' placeholder='Enter Sevadaar Age' name='Age'></input>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type='date' placeholder='Enter Sevadaar Date of Birth' name='Dob'></input>
        </div>
        <div>
          <label>Contact Number</label>
          <input type='number' placeholder='Enter Sevadaar Contact number' name='Contact_no'></input>
        </div>
        <div>
          <label>Emergency Number</label>
          <input type='number' placeholder='Enter Sevadaar Emergency Number' name='Emergency_number'></input>
        </div>
        <div>
          <label>Current Address</label>
          <input type='text' placeholder='Enter Sevadaar Current Address' name='Current_address'></input>
        </div>
        <div className={styles.gender}>
          <label>Active/Inactive</label>

          <input type='radio' id='active' name='In_active' value='A'></input>
          <label for='active'>Active</label>

          <input type='radio' id='inactive' name='In_active' value='I'></input>
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
          <button onClick={handleClick}>Add Sevadaar</button>
        </div>
      </form>
      <Toast check={check} message={message}/>
    </div>
  )
}

export default newuser