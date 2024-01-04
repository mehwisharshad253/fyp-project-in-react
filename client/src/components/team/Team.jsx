import React from 'react'
import './team.css'
import Back from '../common/back/Back'
import TeamCard from './TeamCard'
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'

const Team = () => {
  return (
    <>
    <Header />
      <Back title="Faculty" />
        <section className='team padding'>
            <div className="container grid">
                <TeamCard/>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Team