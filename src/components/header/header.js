import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Import icons from Font Awesome


export default function Header(){
    return(
<header className="border-b border-gray-300 tracking-wide relative z-50">
      <section className="py-3 bg-[#6863af] text-white text-center px-10">
        <p className="text-sm">Summer Sale: Save up to 40% on select items. Limited-time offer!</p>
      </section>

      <div className="flex flex-wrap items-center gap-4 px-10 py-3 relative bg-white min-h-[65px]">
        <p className="hidden max-lg:block">
          <Image src="/img/logo.png" width={165} height={60} alt="logo" className="w-36" /></p>
        <div id="collapseMenu"
          className="w-full max-lg:hidden lg:!block max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          <button id="toggleClose" className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer">
            
          </button>

          <div
            className="lg:flex max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">

            <ul className="lg:flex lg:gap-x-8 max-lg:space-y-2">
              <li className="mb-6 hidden max-lg:block">
                <Image src="/img/logo.png" width={165} height={60} alt="logo" className="w-36" />
              </li>
              <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3">
                
                <p 
                className="hover:text-[#6863af] font-medium text-black block text-[15px]">Home</p> </li>
              <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><p 
                className="hover:text-[#6863af] font-medium text-black block text-[15px]"><Link src="/#category">Category</Link></p> </li>
              <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><p 
                className="hover:text-[#6863af] font-medium text-black block text-[15px]"><Link src="/#products">Product</Link></p> </li>
              
            </ul>

            <p 
              className="m-auto absolute lg:left-2/4 lg:top-1/4 lg:-translate-x-1/2 max-lg:hidden"><Image src="/img/logo.png" width={165} height={50} alt="logo" className="w-36" /></p> 

            <ul className="lg:flex lg:space-x-8 max-lg:space-y-2 max-lg:mt-2 ml-auto">
              <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3">{/* Cart Icon */}
          <a href="/cart" aria-label="View Cart">
            <FaShoppingCart size={24} /> {/* Use the component, adjust size as needed */}
          </a> </li>
              <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><a href="/profile" aria-label="User Profile">
            <FaUser size={24} /> {/* Use the component, adjust size as needed */}
          </a> </li>
              
            </ul>
          </div>
        </div>

        <div className="flex ml-auto lg:hidden">
          <button id="toggleOpen" className="cursor-pointer">
            
          </button>
        </div>
      </div>
    </header>
)
}
