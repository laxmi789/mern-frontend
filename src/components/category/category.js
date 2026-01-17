import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function Category(){
    return(
        <div>
    <div className="title text-center" id="category">
    <h2 className="font-bold text-4xl my-10"> Our Trending <i className="break-normal">Category</i></h2>
    </div>
    <div className="flex">
       <Link href="/category?category=top"><div className="m-4"><Image src="/img/top categoy.jpg" width={600} height={300} alt="image1"/></div></Link>
       <Link href="/category?category=tshirt"><div className="m-4"><Image src="/img/t-shirt category.jpg" width={600} height={300} alt="image2"/></div></Link>
      <Link href="/category?category=traditional suit"><div className="m-4"><Image src="/img/suit category.jpg" width={600} height={300} alt="image3"/></div></Link>
    </div>
    </div>
    )
}
