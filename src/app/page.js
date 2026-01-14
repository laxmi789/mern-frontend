import Image from "next/image";
import Slider from '../components/slider/slider.js'
import Header from '../components/header/header.js'
import About from '../components/about/about.js'
import Product from '../components/product/product.js'
import Contact from '../components/contact/contact.js'
import Footer from '../components/footer/footer.js'
//import Image1 from './public/img/slider1.jpg'
//import Image2 from '../../img/slider2.jpg'

import Category from '../components/category/category.js'

{/* https://readymadeui.com/tailwind-ecommerce */}

export default function Home() {
  return (    
  <>
    <Header />
    <Slider />
   {/*  <About /> */}
   <Category />
    <Product />
   {/* <Contact /> */}
    <Footer />
    </>
  );
}
