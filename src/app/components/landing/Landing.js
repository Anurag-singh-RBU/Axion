import PlasmaWaveV2 from '@/Plasma/PlasmaV2'
import Image from 'next/image'
import Footer from './footer'
import Hero from './Hero'
import Header from './Navbar'
import SectionCards from './SectionCards'
import Shipping from './Shipping'
import Tools from './Tools'
import Points from './Points'
import ClickSpark from "../../../components/ClickSpark"
import MagicBento from "../../../components/MagicBento"

const Landing = () => {
  return (
    <div className="relative bg-[#060010]">
      <ClickSpark sparkColor='#fff' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute left-0 right-0 z-0 block sm:hidden" style={{ top: 0, height: '580px', minHeight: 0, maxHeight: '600px' }}>
          <Image src="/hero.jpg" alt="Hero Background" fill className="object-cover mx-auto mt-15 opacity-50" priority style={{ objectFit: 'cover', height: '100%' }}/>
        </div>

        <div className="absolute inset-0 z-0 hidden sm:block">
          <PlasmaWaveV2 rotationDeg={125} scrollPauseThreshold={400} className="opacity-50"/>
        </div>

        <div className="relative z-10 mb-20">
          <Header/>
          <Hero/>
          <Shipping/>
          <SectionCards/>
          <Points/>
          <Tools/> 
          <div className='mx-auto mt-30 sm:flex justify-center items-center hidden'>
            <MagicBento textAutoHide={true} enableStars={true} enableSpotlight={true} enableBorderGlow={true} enableTilt={true} enableMagnetism={true} clickEffect={true} spotlightRadius={300} 
            particleCount={12} glowColor="132, 0, 255"/>
          </div>
        </div>
      </div>
      <Footer/>
      </ClickSpark>
    </div>
  )
}

export default Landing