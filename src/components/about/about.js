import React from 'react'
//import slider3 from './public/img/slider2.jpg'
import Image from 'next/image'

export default function About(){
    return(
        <div className="flex m-10">
            <div className="w-[50%]">
                <div className="title text-left">
<h6 className="font-bold text-sm">About Us</h6>
<h2 className="font-bold text-4xl"> Outstanding Digital <i className="break-normal">Experience</i></h2>
<span className="shap text-left inline-flex"></span>
<p>At Markominds, we are passionate about shaping the next generation of digital marketers through hands-on, real-world SEO training.

We are a dedicated SEO and digital marketing company that not only helps businesses grow online but also invests in fresh talent through our structured SEO internship programs. Our internships are designed to provide practical experience in keyword research, on-page optimization, backlink strategies, content marketing, analytics, and more.

With a team of experienced mentors and live project exposure, we bridge the gap between theoretical knowledge and industry skills — preparing you for real-world digital marketing roles</p>
</div>
                 
            </div>
            <div className="w-[50%]">
                
<Image src={slider3} width={700} height={500} alt='slider3' />

            </div>
        </div>
    )
} 