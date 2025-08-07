import React from 'react'
import './globals.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Partners from './components/Partners'
import Journey from './components/Journey'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Apply from './components/Apply'

const page = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Partners />
      <Journey />
      <About />
      <Testimonials />
      <Apply />
      
  
    </div>
  )
}

export default page