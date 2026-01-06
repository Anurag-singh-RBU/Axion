import PlasmaWaveV2 from '@/(Plasma)/PlasmaV2'
import Image from 'next/image'
import React from 'react'
import Header from './Navbar'
import Hero from './Hero'
import Footer from '../footer'

const Landing = () => {
  return (
    <div className="relative bg-[#060010]">

      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 min-h-dvh z-0 block sm:hidden">
          <Image src="/hero.jpg" alt="Hero Background" fill className="object-cover mx-auto mt-15 opacity-50" priority/>
        </div>

        <div className="absolute inset-0 z-0 hidden sm:block">
          <PlasmaWaveV2 rotationDeg={125} scrollPauseThreshold={400} className="opacity-50"/>
        </div>

        <div className="relative z-10">
          <Header/>
          <Hero/>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Landing