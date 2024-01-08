import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'


export default function products() {
  const [products, setProducts] = useState([])
  const [count, setCount] = useState('')
  const [total, setTotal] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3000/api/server?file=products').then(data => {
      console.log(data);
      return data.json()
    }).then(parsed => {
      console.log(parsed);
      setProducts(parsed.products)
      setCount(parsed.limit)
      setTotal(parsed.total)
    })
  }, [])

  const handleClick = (e) => {
    router.push('products/' + e)
  }

  return (
    <div>
      <h1>Products {count + '/' + total}</h1>
      <Link href='/' replace>
        <h1>&larr; Back</h1>
      </Link>
      <ol>
        {products && products.map((data, index) => {
          // return <li key={data.id} onClick={(e) => handleClick(e.target.name)}>
          //   <img name={data.id} src={data.thumbnail}></img>
          //   <div name={data.id}>
          //     <h3 name={data.id}>{data.title}</h3>
          //     <p name={data.id}>{data.description.substr(0, 50)}...</p>
          //   </div>
          // </li>
          return <Link href={`products/${data.id}`}>
            <li key={data.id} onClick={(e) => handleClick(e.target.name)}>
              <img src={data.thumbnail}></img>
              <div>
                <h3>{data.title}</h3>
                <p>{data.description.substr(0, 50)}...</p>
              </div>
            </li>
          </Link>
        })}
      </ol>
    </div>

  )
}