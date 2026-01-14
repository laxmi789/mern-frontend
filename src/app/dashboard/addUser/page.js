"use client"
import { useState } from "react"

import Header from '../../../components/header/header.js'
import Footer from '../../../components/footer/footer.js'
import DashboardLayout from "@/components/dashboardlayout/page.js"
import { toast } from 'react-toastify'

export default function Register(){  
    async function onSubmit(e){
    e.preventDefault()   
    
    try{
    const formData = new FormData(e.target)
    const reqBody = Object.fromEntries(formData.entries())

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(reqBody),
      userRole:JSON.stringify('admin')      
    })    

    if(response.ok){
      toast('user registered successfully')      
    } 
  }catch(error){
    console.log(error)
  }
    
  }
    return(
      <>
      <DashboardLayout />
        <div className="bg-white md:h-screen">
      <div className="grid items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">          
        </div>

        <div className="flex items-center lg:p-12 p-2 h-full lg:w-11/12 lg:ml-auto">
          <form className="max-w-lg w-full mx-auto" onSubmit={onSubmit}>
            <div className="mb-12">
              <h1 className="text-3xl font-semibold text-purple-400">Create an account</h1>
            </div>

            <div>
              <label className="text-black text-xs block mb-2">Full Name</label>
              <div className="relative flex items-center">
                <input name="name" type="text" className="w-full bg-transparent text-sm text-black border-b border-slate-500 focus:border-white pl-2 pr-8 py-3 outline-none" placeholder="Enter name" required />
               
              </div>
            </div>
            <div className="mt-8">
              <label className="text-black text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input name="email" type="email" className="w-full bg-transparent text-sm text-black border-b border-slate-500 focus:border-white pl-2 pr-8 py-3 outline-none" placeholder="Enter email" required />
                </div>
            </div>
            <div className="mt-8">
              <label className="text-black text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input name="password" type="password" className="w-full bg-transparent text-sm text-black border-b border-slate-500 focus:border-white pl-2 pr-8 py-3 outline-none" placeholder="Enter password" required  minLength="8"/>
                             </div>
            </div>
          
            
            <div className="mt-8">
              <input type="submit" className="w-max shadow-xl py-3 px-6 min-w-32 text-sm text-black font-medium rounded-sm bg-purple-600 hover:bg-purple-500 focus:outline-none cursor-pointer" />
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
    )
}

