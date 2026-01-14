"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from 'next/image'

import { Navigation, Pagination, Autoplay } from "swiper/modules"

export default function Slider() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}      
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="w-full"
    >
      <SwiperSlide className="bg-red-300 flex items-center justify-center">
       <Image src="/img/slider 1.png" width={1920} height={400} alt='slider1' />
    
      </SwiperSlide>

      <SwiperSlide className="bg-blue-300 flex items-center justify-center">
        <Image src="/img/slider 2.png" width={1920} height={400} alt='slider2' />
      </SwiperSlide>
      
    </Swiper>
  )
}
