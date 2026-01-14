'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboardlayout/page'

export default function allProduct(){
    const [products, setProducts] = useState([])

      async function delProduct(id){
         try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/delp`,{
            method:"DELETE",
            headers:{
              'Content-type':'application/json'
            },
            body:JSON.stringify({id})
          })
         }catch(error){
           console.log(error)
         }
      }
     

     useEffect(() =>{
         async function getProduct(){
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/productAll/`)
           const data = await res.json()     
           setProducts(data.productAll)
         }
         getProduct()
       }, [])

    return(
        <>
        <DashboardLayout />
        <table className="m-20" style={{ marginLeft: "370px" }}>
            {/*products.map(product => ( */}
            <thead>
            <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
           <tr key={product._id}>
          
          {/* First image as thumbnail */}
          
          <td>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.images[0]}`}
            alt={product.title}
            className="h-48 w-full object-cover rounded"
          />
            </td>
          <td><h3 className="font-semibold p-4">{product.title}</h3></td>
         <td> <p className="text-sm text-gray-500 p-4">{product.category}</p></td>
         <td> <p className="font-bold p-4">₹{product.price}</p></td>
         <td className="p-4 cursor-pointer"><Link href={`/dashboard/addProduct?id=${product._id}`}>Edit</Link></td>
         <td className="p-4" onClick={() => delProduct(product._id)}>Delete</td>
        </tr>
      ))}
      </tbody>
    </table>
    </>
  )
}
/*{product.images.map((img, index) => (
  <img
    key={index}
    src={`http://localhost:3001/uploads/${img}`}
    className="h-32 w-32 object-cover rounded"
  />
))}*/