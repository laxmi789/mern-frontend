import React from 'react'
import Image from 'next/image'
//import Logo from './public/img/logo.jpg'


export default function Footer(){
    return(
        <footer className="bg-[#6863af] pt-12 pb-8 px-10 tracking-wide mt-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:flex lg:items-center">
            
             <Image src="/img/logo.png" width={165} height={60} alt="logo" />
          </div>

          <div className="lg:flex lg:items-center">
            <ul className="flex space-x-6">
            <li>
             
            </li>
            <li>
              
            </li>
            <li>
              
            </li>
          </ul>
          </div>

          <div>
            <h4 className="text-base mb-4 text-white font-extrabold">Useful links</h4>
            <ul className="space-y-4">
              <li>
                <p className="text-white hover:text-slate-400 text-sm">Cart</p>
              </li>
              <li>
                <p className="hover:text-slate-400 text-white text-sm">Profile</p>
              </li>
              
            </ul>
          </div>

          <div>
            <h4 className="text-base mb-4 text-white font-extrabold">Information</h4>
            <ul className="space-y-4">
              <li>
                <p className="hover:text-slate-400 text-white text-sm">About Us</p>
              </li>
              <li>
                <p className="hover:text-slate-400 text-white text-sm">Terms &amp; Conditions</p>
              </li>
              <li>
                <p className="hover:text-slate-400 text-white text-sm">Privacy Policy</p>
              </li>              
            </ul>
          </div>
        </div>
      </div>
    </footer>
    )
}