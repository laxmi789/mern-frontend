'use client'
import { useRouter } from 'next/navigation'
import Header from '../../components/header/header.js'
import Footer from '../../components/footer/footer.js'
import Link from 'next/link'
import { toast } from 'react-toastify'


export default function Login(){
 
    const onSubmit = async (e) => {      
        e.preventDefault()
      const formData = new FormData(e.target)
      const data = Object.fromEntries(formData.entries())
      
      try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method:'POST',
        credentials: 'include', 
        headers:{
            'Content-type':'application/json',
        },      
          body:JSON.stringify(data)
      })
      if(response.status == 200){
        toast('Login Successful')        
        window.location.href = '/'
      }
    }catch(error){
     alert(error)
    }
    } 

    return(
      <>      
      <Header />
        <div className="bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white w-full max-w-lg mx-auto [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] p-4 lg:p-5 rounded-md">
        <div className="items-center">
          <form className="p-4 md:p-6" onSubmit={onSubmit}>
           <div className="title text-center">
            <h2 className="font-bold text-4xl my-2">  <i className="md:uppercase">Login</i></h2>
                  <span className="shap inline-flex"></span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input name="email" type="text" required className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter email" />
                 
                </div>
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input name="password" type="password" required className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter password" />
                  
                </div>
              </div>
              
            </div>

            <div className="mt-8">
              <button type="submit" className="w-full shadow-xl py-2 px-4 text-[15px] tracking-wide font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                Sign in
              </button>
              <p className="text-sm mt-6 text-center text-slate-600">Don't have an account? <Link href="/register" className="text-[#6863af] font-medium tracking-wide hover:underline ml-1">Register here</Link></p>
            </div>
          </form>

         
        </div>
      </div>
    </div>
    <Footer />
    </>

    )
}