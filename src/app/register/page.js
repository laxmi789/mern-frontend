"use client"
import Header from '../../components/header/header.js'
import Footer from '../../components/footer/footer.js'
import Link from 'next/link'
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
      body:JSON.stringify(reqBody)
    })    

    if(response.ok){
      toast('Registered successfully')
      window.location.href = '/login'      
    } 
  }catch(error){
    console.log(error)
  }
    
  }
    return(
      <>
      <Header />
       {/*} <div className="bg-white md:h-screen">
      <div className="grid items-center gap-8 h-full">*/}
        <div className="bg-gray-100 flex items-center justify-center p-4">
        <div className="flex items-center lg:p-12 h-full bg-white w-full max-w-lg mx-auto [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <form className="max-w-lg w-full mx-auto" onSubmit={onSubmit}>
            <div className="title text-center">
            <h2 className="font-bold text-4xl my-2"> Create an <i className="md:uppercase">account</i></h2>
                  <span className="shap inline-flex"></span>
            </div>
            <div>
              
              <div className="relative flex items-center">
                <input name="name" type="text" className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter name" required />
               
              </div>
            </div>
            <div className="mt-8">
              
              <div className="relative flex items-center">
                <input name="email" type="email" className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter email" required />
                </div>
            </div>
            <div className="mt-8">
              
              <div className="relative flex items-center">
                <input name="password" type="password" className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter password" required  minLength="8"/>
                             </div>
            </div>
            
            <div className="mt-8">
              <input type="submit" className="w-full shadow-xl py-2 px-6 button min-w-32 text-sm text-white font-medium rounded-sm bg-purple-600 hover:bg-purple-500 focus:outline-none cursor-pointer" />
                
              
              <p className="text-sm text-black mt-8">Already have an account? <Link href="/login" className="text-[#6863af] font-medium hover:underline ml-1">Login here</Link></p>
            </div>
          </form>
        </div>
       
</div>
    {/*<form onSubmit={onSubmit}>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="submit" value="submit"></input>
    </form> */}

    <Footer />
    </>
    )
}