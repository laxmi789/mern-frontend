'use client'

import { useParams } from 'next/navigation'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState, useEffect } from 'react'
import Header from '../../../components/header/header.js'
import Footer from '../../../components/footer/footer.js'
import { toast } from 'react-toastify'
import { refresh } from 'next/cache'



export default function OrderIds() {
  const params = useParams();
  const { id } = params;

  const paypalClientId = ''

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (id) {
      getOrder();
    }
  }, [id]);

  async function getOrder() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setOrders(data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }

  const handlePaymentSuccess = async (paymentResult) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}/pay`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentResult),
    });

    toast('Payment Successfull')
    refresh()

  };

  if (!orders) {
    return <p>Loading order...</p>;
  }

  return (
    <>
      <Header />
      <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-xl">
          <div class="bg-[#6863af] px-6 py-4">
            <div class="flex items-center justify-between gap-2">
              <h2 class="text-lg font-semibold text-white">Order Confirmation</h2>
              <span class="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full">{orders.isPaid ? 'Paid' : 'Unpaid'}</span>
            </div>
            <p class="text-slate-200 text-sm mt-2">Thank you for your order!</p>
          </div>

          <div class="p-6">
            <div class="flex flex-wrap justify-between items-center gap-4">
              <div>
                <p class="text-slate-500 text-sm font-medium">Order Number</p>
                <p class="text-slate-900 text-sm font-medium mt-2">{orders._id}</p>
              </div>
              <div>
                <p class="text-slate-500 text-sm font-medium">Date</p>
                <p class="text-slate-900 text-sm font-medium mt-2">{orders.createdAt}</p>
              </div>
              <div>
                <p class="text-slate-500 text-sm font-medium">Total</p>
                <p class="text-sm font-medium text-indigo-700 mt-2">{orders.totalPrice}</p>
              </div>
            </div>

            <div class="bg-gray-100 rounded-xl p-4 mt-8">
              <h3 class="text-base font-medium text-slate-900 mb-6">Shipping Information</h3>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-slate-500 text-sm font-medium">Customer</p>
                  <p class="text-slate-900 text-sm font-medium mt-2">{orders.shippingAddress.fullName}</p>
                </div>

                <div>
                  <p class="text-slate-500 text-sm font-medium">Address</p>
                  <p class="text-slate-900 text-sm font-medium mt-2">{orders.shippingAddress.address + " " + orders.shippingAddress.city + " " + orders.shippingAddress.zip_code}</p>
                </div>
                <div>
                  <p class="text-slate-500 text-sm font-medium">Phone</p>
                  <p class="text-slate-900 text-sm font-medium mt-2"></p>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="text-base font-medium text-slate-900 mb-6">Order Items</h3>
              <div class="space-y-4">
                {orders.orderItems.map((item) =>
                  <div class="flex items-start gap-4 max-sm:flex-col">
                    {/*<div class="w-[70px] h-[70px] bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                  <img src="https://readymadeui.com/images/watch1.webp" alt="Product" class="w-14 h-14 object-contain rounded-sm" />
                              </div>*/}
                    <div class="flex-1">
                      <h4 class="text-sm font-medium text-slate-900">{item.productName}</h4>

                      <p class="text-slate-500 text-xs font-medium mt-1">{item.quantity}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-slate-900 text-sm font-semibold">{item.productPrice}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div class="bg-gray-100 rounded-xl p-4 mt-8">
              <h3 class="text-base font-medium text-slate-900 mb-6">Order Summary</h3>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <p class="text-sm text-slate-500 font-medium">Subtotal</p>
                  <p class="text-slate-900 text-sm font-semibold">{orders.itemsPrice}</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-sm text-slate-500 font-medium">Shipping</p>
                  <p class="text-slate-900 text-sm font-semibold">{orders.shippingPrice}</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-sm text-slate-500 font-medium">Tax</p>
                  <p class="text-slate-900 text-sm font-semibold">{orders.taxPrice}</p>
                </div>
                <div class="flex justify-between pt-3 border-t border-gray-300">
                  <p class="text-[15px] font-semibold text-slate-900">Total</p>
                  <p class="text-[15px] font-semibold text-indigo-700">{orders.totalPrice}</p>
                </div>
              </div>
            </div>
          </div>


          {!orders.isPaid && (
            <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: orders.totalPrice.toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    handlePaymentSuccess(details);
                  });
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
