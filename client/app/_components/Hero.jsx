import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <div>
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-32 ">
                <div className="mx-auto max-w-xl text-center">
                <h1 className="text-3xl font-extrabold sm:text-5xl">
                    Manage Your Income
                    <strong className="font-extrabold text-primary sm:block"> Control Your Expense </strong>
                </h1>

                <p className="mt-4 sm:text-xl/relaxed">
                    Unlock the magic of mindful spending and watch your savings.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <a
                    className="block w-full rounded bg-orange-500 px-12 py-3 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring active:bg-red-500 sm:w-auto shadow-md"
                    href="/dashboard"
                    >
                    Go to Dashboard
                    </a>
                </div>
                <div className="mt-8 flex flex-wrap justify-center border shadow-md">
                    <Image src={'/images/dashboardDesign.png'} alt='ExpTrack logo' width={600} height={500}/>
                    {/* <Image src={'/images/dashboardImage01.png'} alt='ExpTrack logo' width={500} height={500}/>
                    <Image src={'/images/dashboardImage02.png'} alt='ExpTrack logo' width={500} height={500}/>
                    <Image src={'/images/dashboardImage03.png'} alt='ExpTrack logo' width={500} height={500}/> */}
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Hero
