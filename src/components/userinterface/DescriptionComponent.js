import React, { useState } from 'react'


export default function DescriptionComponent() {

    const [readme, setreadme] = useState(false)


    const handlereadme = () => {
        setreadme(!readme);
    }


    return (
        <div className='w-[100%]  border-t-4  border-gray-100  bg-gray-100 ' >
            <div className="main-container bg-gray-100 max-w-[1800px] flex justify-between  mx-auto p-[20px] flex-col">

                <div className="title text-[18px] mb-[10px] font-bold text-gray-600">
                    Wellness Forever: One-stop Wellness destination
                </div>
                <div className="description ">
                    As we continue to grow, we will inevitably face medical issues. Whether it's a case of a common cold or something  To make things easier for you, we offer a wide range of solutions for all your last-minute medical emergencies and products to supplement your journey for a better and healthier life.
                </div>

                <div className='readme' >

                {!readme ? (
                        <div className='font-bold my-[10px] cursor-pointer text-gray-800 ' onClick={handlereadme}>
                            Read More...
                        </div>
                    ):(<>
                    With online medicine stores making online ordering, pick-up, and home delivery available and accessible 24x7, being in shape has never been more straightforward. All you need to do is browse the various categories on our official site to locate your item. Once you've found your products or medicines, be sure to add them to your cart and proceed to checkout. We offer flexible payment options and are compatible with online portals such as Google Pay, Paytm, credit cards, and so on to make your transactions quick and effective.
                    With online medicine stores making online ordering, pick-up, and home delivery available and accessible 24x7, being in shape has never been more straightforward. All you need to do is browse the various categories on our official site to locate your item. Once you've found your products or medicines, be sure to add them to your cart and proceed to checkout. We offer flexible payment options and are compatible with online portals such as Google Pay, Paytm, credit cards, and so on to make your transactions quick and effective.With online medicine stores making online ordering, pick-up, and home delivery available and accessible 24x7, being in shape has never been more straightforward. All you need to do is browse the various categories on our official site to locate your item. Once you've found your products or medicines, be sure to add them to your cart and proceed to checkout. We offer flexible payment options and are compatible with online portals such as Google Pay, Paytm, credit cards, and so on to make your transactions quick and effective. 
                    <div className='font-bold my-[10px] cursor-pointer' onClick={handlereadme} >
                        Read Less...
                        </div>
                        </>)}
                </div>


            </div>
        </div>
    )
}
