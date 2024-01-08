import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const product = (props) => {
  const [products, setProducts] = useState([])
  // const [products, setProducts] = useState(props.products)
  const [product, setProduct] = useState([])
  const [image, setImage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3000/api/server?file=products').then(data => {
      return data.json()
    }).then(parsed => {
      setProducts(parsed.products)
    })
  }, [])

  useEffect(() => {
    setProduct(
      products && products.filter((data) => {
        return data.id == router.query.products
      })
    )
  }, [products])

  return (
    <div style={{ textAlign: 'center' }}>
      {product.length > 0 && <div className='main'>
        <div className='container'>
          <div className='right'>
            {product[0].images.map(data => {
              return <img src={data} onClick={e => { setImage(e.target.src) }}></img>
            })}
          </div>
          <img className='left' src={!image ? product[0].thumbnail : image}></img>
          <div className='details'>
            <h1>{product[0].title}</h1>
            <h5>{product[0].category}</h5>
            <p>{product[0].description}</p>
            <p><b>Price : </b>{product[0].price}</p>
            <div style={{ display: 'flex' }}>
              <p><b>Stock : </b>{product[0].stock}</p>
              <p style={{ marginLeft: '10px' }}><b>Rating : </b>{product[0].rating}</p>
              <p style={{ marginLeft: '10px' }}><b>Discount: </b>{product[0].discountPercentage}%</p>
            </div>
          </div>
        </div>
      </div>}

      <Link href='/products' replace>
        <h1>&larr; Back</h1>
      </Link>
    </div>
  )
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:3000/api/server?file=products`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: data }
// }

export default product