'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/header/header.js'
import Footer from '../../../components/footer/footer.js'


export default function Product() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState([]);
  const [btntext, setBtntext] = useState('Add To Cart')

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);


  async function getProduct() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`);
      const data = await res.json();
      setProduct(data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }


  if (!product) {
    return <div>Loading...</div>;
  }

  async function addToCart(id, name, price) {
    setBtntext('Adding')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id, name, price })

      })
      console.log(response)
      if (response.status === 401) {
        window.location.href = '/login'

      }

      if (response.status === 200) {
        setBtntext('Added')

        window.location.href = '/cart'
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Header />
      <div className="bg-white">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 rounded-sm">

            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">



              {/* Main Image */}

              <div className="rounded-sm shadow-md relative">

                { /* <img
      src={`http://localhost:3001/uploads/${image[0]}`}
      alt="Product"
      className="w-4/6 rounded-sm mx-auto"
    /> */}

                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.mainImage}`}
                  alt="Product"
                  className="rounded-sm mx-auto"
                />

              </div>

              {/* Thumbnails */}

              <div className="mt-4 flex flex-wrap justify-center gap-4 mx-auto">
                {product?.images?.map((image, index) => (
                  <div
                    key={index}
                    className="w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center rounded-sm p-2 shadow-md cursor-pointer"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`}
                      alt={`Product-${index}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ))}
              </div>



            </div>

            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-slate-900">{product.title}</h3>
              <div className="flex items-center space-x-1 mt-2">

              </div>

              <p className="text-sm text-slate-500 mt-4">{product.description}</p>

              <div className="flex flex-wrap gap-4 mt-8">
                <p className="text-slate-900 text-2xl font-semibold">₹{product.price}</p>
                <p className="text-slate-500 text-base"><strike>₹{Number(product.price) + Number(100)}</strike> </p>
              </div>

              <div className="flex gap-4 mt-12 max-w-md">
                {/*<button type="button" className="w-full px-4 py-2.5 cursor-pointer outline-none border border-[#6863af] bg-[#6863af] hover:bg-black-900 text-white text-sm font-medium rounded-sm">Buy now</button>*/}
                <p className="text-slate-500 text-base">Category: <b className="font-bold">{product.category}</b></p>


                <button type="button" className="px-10 py-2.5 cursor-pointer outline-none border border-[#6863af] bg-transparent hover:bg-slate-50 text-white text-sm font-medium rounded-sm" onClick={() => addToCart(product._id, product.title, product.price)}>{btntext}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 