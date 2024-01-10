import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const test = () => {
  const router =useRouter()
  console.log(router.query);
  const {test} = router.query
  return (
    <div style={{textAlign:'center'}}>
      <h1>{test}</h1>
      <Link href='/' replace>
      <h1>&larr; Back</h1>
      </Link>
    </div>
  )
}

export default test