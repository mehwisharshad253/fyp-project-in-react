import React from 'react'
import Hero from './hero/Hero'
import AboutCard from '../about/AboutCard'
import HAbout from './Habout'
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'
import ChatboxIcon from '../chatbox/ChatboxIcon'
import Modal from './hero/Modal'



const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutCard />
      <HAbout />
      <Footer />
      <ChatboxIcon/>
      <Modal/>
    </>
  )
}

export default Home