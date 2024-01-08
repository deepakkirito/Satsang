'use client'
import React, { useState } from 'react'
import Link from 'next/link';


const toast = (props) => {
  console.log(props);
  return (
    <div className='toast' style={props.check == 'false' ? {animationName:'popup'} : {display:'none'}}>
        <p>{props.message}</p>
    </div>
  )
}

export default toast