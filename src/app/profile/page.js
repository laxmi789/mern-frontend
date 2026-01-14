'use client'

import Header from '../../components/header/header.js'
import Footer from '../../components/footer/footer.js' 
import { useState, useEffect } from 'react'

export default function Profile(){
  const [order, setOrder] = useState([])

    useEffect(() => {        
        getAllOrders()
    }, [])
    
    async function getAllOrders(){
      try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orderDetail`, {method:'GET',credentials:'include'})
          const data = await response.json()          
            setOrder(data.orders)
        }catch(error){
          console.log(error)
        }
      }
      
    
      async function getOrder() {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}`, {
            credentials: 'include',
          });
          const data = await res.json()
          setOrder(data.orders);
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      }
    
      
    
      // ✅ IMPORTANT GUARD
      if (!order) {
        return <p>Loading order...</p>;
      }
      return(
        <>
        <Header />
        {order.map((item) =>
          <h1>{item.shippingAddress.fullName}</h1>
        )}
        <Footer />
        </>
      )
    
}