'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Header from '../../components/header/header.js'
import Footer from '../../components/footer/footer.js'


export default function Category() {
  
  const [data, setData] = useState([]);
  const [btntext, setBtntext] = useState('Add To Cart')

  

  async function getCategory() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/${query}`,
        {
          method: 'GET',
        }
      )

      const result = await response.json();
      setData(result.data);


    } catch (err) {
      console.log(err);
    }
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
      <div className="bg-white p-4 mx-auto max-w-[1400px]">
        <div className="title text-center">

          <h2 className="font-bold text-4xl my-10">  <i className="md:uppercase">{query}</i></h2>
          <span className="shap inline-flex"></span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.map((item) => (
            <div className="group overflow-hidden relative" key={item._id}>
              <a href="javascript:void(0)" className="block">
                <div className="aspect-[3/4] bg-slate-100 w-full overflow-hidden">
                  <Link href={`/product/${item._id}`}>
                    <img src={item.img} alt="Product-1"
                      className="w-full h-full object-cover object-top hover:scale-110 transition-all duration-700" />
                  </Link>
                </div>
              </a>
              <div className="p-4 relative">
                <div className="flex flex-wrap justify-between gap-2 w-full absolute px-4 pt-3 z-10
            transition-all duration-500
            left-0 right-0
            group-hover:bottom-20
            lg:bottom-5 lg:opacity-0 lg:bg-white lg:group-hover:opacity-100
            max-lg:bottom-20 max-lg:py-3 max-lg:bg-white/60">

                  <button type="button" title="Add to cart" className="bg-transparent outline-0 border-0 cursor-pointer text-sm text-white py-2 px-8" onClick={() => addToCart(item._id, item.title, item.price)}>
                    {btntext}              </button>
                </div>
                <div className="z-20 relative bg-white">
                  <Link href={`/product/${item._id}`}><h6 className="text-[15px] font-semibold text-slate-900 truncate">{item.title}</h6></Link>
                  <h6 className="text-sm text-slate-600 font-medium mt-2">₹{item.price}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
