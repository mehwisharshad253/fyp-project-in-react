import React from 'react'
import './contact.css'
import Back from '../common/back/Back'
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'

const Contact = () => {
  const map = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13518.315695043124!2d74.8857985!3d32.107664199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1683136575611!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  return (
    <>
      <Header />
      <Back title="Contact Us" />
      <section className='contact padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map}></iframe>
          </div>
          <div className="right row">
            <h1>Contact Us</h1>
            <p>amet consectetur adipisicing elit. Repellendus, distinctio!</p>
            <div className="items">
              <div className="box">
                <h4>ADDRESS: </h4>
                <p>Narowal Road jesser Bypas</p>
              </div>
              <div className="box">
                <h4>Email: </h4>
                <p>Info@gmail.com</p>
              </div>
              <div className="box">
                <h4>Phone: </h4>
                <p>+92 345678228</p>
              </div>
            </div>
            <form action="">
              <div className="flexSB">
                <input type="text" name="" id="" placeholder='Name' />
                <input type="email" name="" id="" placeholder='Email' />
              </div>
              <input type="subject" name="" id="" placeholder='Subject' />
              <textarea name="" id="" cols="30" rows="10">
                create a Message Here....
              </textarea>
              <button className='primary-btn'>SEND MESSAGE</button>
            </form>
            <h3>Follow us here</h3>
            <span>FACEBOOK TWITTER INSTAGARM DRIBBLE</span>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Contact