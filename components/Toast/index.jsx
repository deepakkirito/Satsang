'use client'
import React, { useState } from 'react'
import Link from 'next/link';


const toast = (props) => {
  console.log(props);
  return (
    <div className='toast' style={props.check == 'false' ? {animationName:'popup', color:props.color, backgroundColor:props.bgcolor, border:`2px solid ${props.color}`} : {display:'none'}}>
        <p>{props.message}</p>
    </div>
  )
}

export default toast