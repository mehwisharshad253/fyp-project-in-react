import React from 'react'
import Back from '../common/back/Back'
import CourseCard from './CourseCard'
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'

const courseHome = () => {
  return (
    <>
      <Header />
      <Back title="Explore Departments" />
      <CourseCard />
      <Footer />
    </>
  )
}

export default courseHome