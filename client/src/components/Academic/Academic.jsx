import React from 'react'
import '../Academic/Academic.css'
import Back from '../common/back/Back'
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'

const Academic = () => {
  return (
    <>
      <Header />
      <Back title="Academic" />
      <div className="container">
        <p>Below are the Academics Department List please click on the link for details regarding each department and offered courses related to each department.</p>
        <h3>I. Faculty of Language & Linguistics</h3>
        <div className="accordion accordion-flush m-3" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Department of English
              </button>
            </h2>
          </div>
        </div>

        <h3>II. Faculty of Computing & IT</h3>
        <div className="accordion accordion-flush m-3" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Department of Computer Science & Software Engineering
              </button>
            </h2>
          </div>
        </div>

        <h3>III. Faculty of Sciences</h3>
        <div className="accordion accordion-flush m-3" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Department of Chemistry
              </button>
            </h2>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Department of Physics
              </button>
            </h2>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Department of Mathematics
              </button>
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Academic