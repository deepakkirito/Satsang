'useclient'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './table.module.css';
import Link from 'next/link';
import Images from 'next/image';

const table = () => {
    const [userData, setUserData] = useState({})

    useEffect(()=>{
        setTimeout(() => {
            axios.get('https://satsangapi.glitch.me/user')
            .then((res, err)=>{
                setUserData(res.data.res)
            })
            .catch(err=>{
                console.log(err);
            })
        }, 1000);
    },[])
    console.log(userData);
    
    return (
        <div className={styles.table}>
            <section>
                <input type='search' placeholder='Search'></input>
                <Images src='/Right Arrow.gif' width='50' height='50' alt='Loading'></Images>
            </section>
            <section>
                <table>
                    <thead>
                        <tr>
                            <td>S. No.</td>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Badge ID</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.length ? userData.map((data,index)=>{
                            return <tr>
                            <td>{index+1}</td>
                            <td>{data.Name}</td>
                            <td>{data.Contact_no}</td>
                            <td>{data.Badge_ID}</td>
                            <td><button>Edit</button></td>
                        </tr>
                        }): <tr>
                        <td>-</td>
                        <td>-</td>
                        <td><Images src='/Opener Loading.gif' width={100} height={100}></Images></td>
                        <td>-</td>
                        <td>-</td>
                        
                    </tr>}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default table