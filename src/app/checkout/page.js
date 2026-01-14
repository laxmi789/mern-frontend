'use client'

import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header.js'
import Footer from '../../components/footer/footer.js'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export default function Checkout() {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm()

    const [cart, setCart] = useState([])
    useEffect(() => {
        getCartDetail()
    }, [])

    async function getCartDetail() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchCart`, { credentials: 'include' })
        const data = await response.json()
        setCart(data.data[0].items)
    }

    const subtotal = cart.reduce((total, item) => {
        return total + item.quantity * item.productPrice
    }, 0)

    const onSubmit = async (data) => {
        const shippingAddress = {
            fullName: data.first_name + " " + data.last_name,
            address: data.address,
            city: data.city,
            zip_code: data.zip_code,
        };



        console.log(cart)
        const itemsPrice = subtotal
        const taxPrice = 6
        const shippingPrice = 5
        const totalPrice = itemsPrice + taxPrice + shippingPrice

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    orderItems: cart,
                    shippingAddress,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
                }),
            });


              const order = await res.json()
              window.location.href = `/order/${order._id}`           


        } catch (err) {
            console.error(err);
        }
    };
    

    async function emptyCart(){
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/emptyCart`,{
                method:'DELETE',
                credentials:'include'
            })
            const data = await response.json()
           
        }catch(err){
         console.log(err)
        }
    }

    return (
        <>
            <Header />
            {cart.length > 0 ? (
                <div className="bg-white">
                    <div className="flex max-md:flex-col gap-12 max-lg:gap-4 h-full">
                        <div className="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px]">
                            <div className="relative h-full">
                                <div className="px-6 py-8 md:overflow-auto md:h-screen">
                                    <div className="space-y-4">

                                        {cart.map((item) => (
                                            <div className="flex items-start gap-4">
                                                <div className="w-full">
                                                    <h3 className="text-sm text-slate-900 font-semibold">{item.productName}</h3>
                                                    <ul className="text-xs text-slate-900 space-y-2 mt-3">
                                                        <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{item.quantity}</span></li>
                                                        <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto font-semibold">₹{item.quantity * item.productPrice}</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <hr className="border-gray-300 my-8" />
                                    <div>
                                        <ul className="text-slate-500 font-medium space-y-4">
                                            <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-semibold text-slate-900">₹{subtotal}</span></li>
                                            <li className="flex flex-wrap gap-4 text-sm">Shipping <span className="ml-auto font-semibold text-slate-900">₹6.00</span></li>
                                            <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-semibold text-slate-900">₹5.00</span></li>
                                            <hr className="border-slate-300" />
                                            <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">Total <span className="ml-auto">₹{subtotal + 6.00 + 5.00}</span></li>
                                        </ul>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 max-md:-order-1">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <h2 className="text-xl text-slate-900 font-semibold mb-6">Delivery Details</h2>
                                    <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                                        <div>
                                            <label className="text-sm text-slate-900 font-medium block mb-2">First Name</label>
                                            <input type="text" {...register('first_name', { required: 'First name required' }, { minlength: 3 })} placeholder="Enter First Name"
                                                className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                            {errors.first_name && <p className="text-sm text-red-900">{errors.first_name.message}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-900 font-medium block mb-2">Last Name</label>
                                            <input type="text" {...register('last_name', { required: 'Last name required' }, { minlength: 3 })} placeholder="Enter Last Name"
                                                className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                            {errors.last_name && <p className="text-sm text-red-900">{errors.last_name.message}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-900 font-medium block mb-2">Email</label>
                                            <input type="email" {...register('email', {
                                                required: 'email is required', pattern: {
                                                    // RFC 5322 compliant basic regex for most valid emails
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Please enter a valid email address"
                                                }
                                            })} placeholder="Enter Email"
                                                className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                            {errors.email && <p className="text-sm text-red-900">{errors.email.message}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-900 font-medium block mb-2">Phone No.</label>
                                            <input type="number" placeholder="Enter Phone No." {...register('phone', { required: 'phone number is required', minlength: 10 })}
                                                className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                            {errors.phone && <p className="text-sm text-red-900">{errors.phone.message}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-900 font-medium block mb-2">Address Line</label>
                                            <input type="text" placeholder="Enter Address Line" {...register('address', { required: 'address is required' })}
                                                className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                            {errors.address && <p className="text-sm text-red-900">{errors.address.message}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-900 font-medium block mb-2">City</label>
                                            <input type="text" placeholder="Enter City" {...register('city', { required: 'city is required' })}
                                                className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                            {errors.city && <p className="text-sm text-red-900">{errors.city.message}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-900 font-medium block mb-2">State</label>
                                            <input type="text" placeholder="Enter State" {...register('state', { required: 'state is required' })}
                                                className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                            {errors.state && <p className="text-sm text-red-900">{errors.state.message}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-900 font-medium block mb-2">Zip Code</label>
                                            <input type="text" {...register('zip_code', { required: 'Zip code is required' })} placeholder="Enter Zip Code"
                                                className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                            {errors.zip_code && <p className="text-sm text-red-900">{errors.zip_code.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <h2 className="text-xl text-slate-900 font-semibold mb-6">Payment</h2>
                                    <div className="grid gap-4 lg:grid-cols-2">

                                        <div className="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                                            <div>
                                                <div className="flex items-center">
                                                    <input type="radio" name="method" className="w-5 h-5 cursor-pointer" id="paypal" checked/>
                                                    <label for="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                                        <b>PayPal</b>
                                                    </label>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-sm text-slate-500 font-medium">Pay with your paypal account</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <input type="submit" className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide button text-white cursor-pointer" value="Complete Purchase" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (

                <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4">
                    <h1 className="text-xl font-semibold text-slate-900">Yur cart is empty</h1>
                </div>
            )

            }
            <Footer />
        </>
    )
}