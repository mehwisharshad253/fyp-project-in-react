import React from 'react'
import { coursesCard } from '../../dummydata'
import Title from '../common/title/Title'
import Gallery from '../Gallery/Gallery'



const Habout = () => {
  return (
    <>
        <section className='homeAbout'>
            <div className="container">
                <Title subtitle="Our Gallery" title="Explore Our Gallery" />
            <div className="coursesCard">
          < Gallery />
        </div>
            </div>
        </section>
    </>
  )
}

export default Habout