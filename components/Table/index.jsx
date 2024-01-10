'useclient'
import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import styles from './table.module.css';
import Link from 'next/link';
import Images from 'next/image';
import { Message_data } from "../../context/context";

const table = () => {
    const [userData, setUserData] = useState([])
    const [searchData, setSearchData] = useState('')
    const [searching, setSearching] = useState(false)
    const { message, setMessage } = useContext(Message_data);
    const router = useRouter()

    useEffect(() => {
        setSearching(true)
        setTimeout(() => {
            getUser()
            setSearching(false)
        }, 1000);
    }, [])

    const handleSearch = () => {
        setSearching(true)
        setUserData([])
        if(searchData.length) {
            axios.get(`https://satsangapi.glitch.me/search?text=${searchData}`)
            .then((res, err) => {
                setUserData(res.data.res)
                setSearching(false)
            })
            .catch(err => {
                console.log(err);
                window.location.reload()
            })
        } else {
            getUser()
            setSearching(false)
        }
    }

    const getUser = () => {
        axios.get('https://satsangapi.glitch.me/user')
            .then(res => {
                setUserData(res.data.res)
            })
            .catch(err => {
                console.log(err);
                window.location.reload()
            })
    }

    const viewUser = (id) => {
        router.push(`/user/${id}`)
        setMessage({...message, back:true})
    }

    // console.log(userData, searchData.length);

    return (
        <div className={styles.table}>
            <section>
                <input type='search' placeholder='Search' onChange={e => setSearchData(e.target.value)}></input>
                <Images src='/Right Arrow.gif' width='40' height='30' alt='Loading' onClick={handleSearch}></Images>
            </section>
            <section>
                <table>
                    <thead>
                        <tr>
                            <td>S. No.</td>
                            <td>Name</td>
                            <td>Badge ID</td>
                            <td><button>Add all</button></td>
                        </tr>
                    </thead>
                    <tbody>
                        {userData && userData.length ? userData.map((data, index) => {
                            return <tr key={index} style={data.In_active == 'Inactive' ? {backgroundColor:'#FFBABA'} : data.In_active == 'Active' ? {backgroundColor:'#DFF2BF'} : {backgroundColor:'#ffffff'}}>
                                <td onClick={e => viewUser(e.target.id)} id={data._id}>{index + 1}</td>
                                <td onClick={e => viewUser(e.target.id)} id={data._id}>{data.Name}</td>
                                <td onClick={e => viewUser(e.target.id)} id={data._id}>{data.Badge_ID}</td>
                                <td><button>Add</button></td>
                            </tr>
                        }) : <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>{searchData.length && !searching ? 'No results found' : <Images src='/Opener Loading.gif' width={100} height={100}></Images>}</td>
                            <td>-</td>
                        </tr>}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default table