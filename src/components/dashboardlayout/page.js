import Link from 'next/link';


export default function DashboardLayout({ children }) {
    return (     
      <>
        <div className="relative bg-[#070b18] h-full">
      <div className="flex items-start">
        <nav id="sidebar" className="lg:w-[270px] max-lg:fixed transition-all duration-500 shrink-0 z-[100]">
          <div id="sidebar-collapse-menu"
            className="bg-[#081028] shadow-lg h-screen fixed top-0 left-0 overflow-auto overflow-x-hidden z-[99] lg:w-[270px] max-lg:w-0 max-lg:invisible transition-all duration-500">
            <div className="bg-[#081028] items-center gap-4 pt-6 pb-2 px-4 sticky top-0 min-h-[64px] z-[100]">
                <Link href="" className="text-base font-semibold text-gray-300 tracking-wide">Dashboard </Link>         
                
        <p className="mt-4"></p>
                <Link href="" className="text-base font-semibold text-gray-300 tracking-wide mt-20">Products </Link>         

                  <ul className="sub-menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8">
                    <li>
                      <Link href="/dashboard/allProducts"
                        className="text-gray-300 text-md font-medium block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300">
                        <span>All Products</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/addProduct"
                        className="text-gray-300 text-md font-medium block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300">
                        <span>Add Product</span>
                      </Link>
                    </li>                    
                  </ul>

                  <p></p>
                <Link href="" className="text-base font-semibold text-gray-300 tracking-wide">Users </Link>         

                  <ul className="sub-menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8">
                    <li>
                      <Link href="/dashboard/allUsers"
                        className="text-gray-300 text-md font-medium block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300">
                        <span>All Users</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/addUser"
                        className="text-gray-300 text-md font-medium block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300">
                        <span>Add User</span>
                      </Link>
                    </li>                    
                  </ul>

                <p></p>
                <Link href="" className="text-base font-semibold text-gray-300 tracking-wide">Orders </Link> 
                  </div>
                  </div>
             </nav>
               
        <section className="main-content w-full p-6 max-lg:ml-8">       
            {children}
        </section>
      </div>
    </div>
     </>
    )
  }
