'use client'

import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header.js'
import Footer from '../../components/footer/footer.js'

import Link from 'next/link'


export default function Cart() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    getCartDetail()
  }, [])
 
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  
  async function getCartDetail() {
    const response = await fetch(`${API_URL}/api/fetchCart`, { credentials: 'include' })
    const data = await response.json()
    setCart(data.data[0].items)
  }

  async function incrementQuantity(id) {
    try {
      const response = await fetch(`${API_URL}/api/incrementquantity`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      if (response.status == 200) {
        getCartDetail()
      }
    } catch (error) {
      console.log(error)
    }

  }

  async function decrementQuantity(id) {
    try {
      const response = await fetch(`${API_URL}/api/decrementquantity`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      if (response.status == 200) {
        getCartDetail()
      }
    } catch (error) {
      console.log(error)
    }

  }

  const subtotal = cart.reduce((total, item) => {
    return total + item.quantity * item.productPrice
  }, 0)

  async function deleteCart(id) {
    try {
      const response = await fetch(`${API_URL}/api/deleteCart`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      if (response.status === 200) {
        getCartDetail()
        //alert('deleted successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!cart) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />
    {cart && cart.length > 0 ? (  
    <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4">
          <h1 className="text-xl font-semibold text-slate-900">Shopping Cart</h1>
          <div className="w-full py-10">
            <table className="w-full">
              <tr className="bg-[#6863af] text-white p-25 h-[40px]"><th></th><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th></tr>

              {cart.map((item) => (

                <tr className="text-center text-black p-25 h-[40px] border-[#6863af] border">
                  <td><button type="button"
                    class="items-center justify-center w-[25px] h-[25px] cursor-pointer bg-[#6863af] outline-none rounded-full text-white" onClick={() => deleteCart(item.productId)}>x</button></td>
                  <td>{item.productName}</td>
                  <td>₹{item.productPrice}</td>
                  <td> <div class="gap-3 mt-auto text-center">
                    <button type="button"
                      class="items-center justify-center w-[25px] h-[25px] cursor-pointer bg-[#6863af] outline-none rounded-full text-white" onClick={() => decrementQuantity(item.productId)}>
                      -
                    </button>
                    <span class="font-semibold text-base leading-[25px] p-2">{item.quantity}</span>
                    <button type="button"
                      class="w-[25px] h-[25px] cursor-pointer bg-[#6863af] outline-none rounded-full text-white" onClick={() => incrementQuantity(item.productId)}>
                      +
                    </button>
                  </div>
                  </td>
                  <td>₹{item.productPrice * item.quantity}</td>
                </tr>
              ))}
            </table>
          </div>

          <div className="bg-white text-right align-right justify-end w-max rounded-md px-6 py-6 h-max shadow-sm border border-gray-250">
            <ul className="text-slate-500 font-medium space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-semibold text-slate-900">₹{subtotal}</span></li>
              <li className="flex flex-wrap gap-4 text-sm">Shipping <span className="ml-auto font-semibold text-slate-900">₹2.00</span></li>
              <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-semibold text-slate-900">₹4.00</span></li>
              <hr className="border-slate-300" />
              <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">Total <span className="ml-auto">₹{subtotal + 2.00 + 4.00}</span></li>
            </ul>
            <div className="mt-8 space-y-4">
              <Link href="/checkout"> <button type="button" className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md cursor-pointer">Buy Now</button></Link>
              <Link href="/"><button type="button" className="text-sm mt-2 px-4 py-2.5 w-full font-medium tracking-wide bg-slate-50 text-white border border-gray-300 rounded-md cursor-pointer">Continue Shopping</button></Link>
            </div>

          </div>
        </div>
      ) : (
        <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4">
          <h1 className="text-xl font-semibold text-slate-900">Yur cart is empty</h1>
        </div>

      )}
      <Footer />
    </>
  )
}
