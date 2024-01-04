import React, { useState } from 'react'
import LoginModal from '../../loginmodal/LoginModal'
import { Link } from 'react-router-dom'
import './header.css'

const Head = () => {
  const [modalVisible, setmodalVisible] = useState(false)

  return (
    <>
      <section className='head'>
        <div className="container flexSB">
          <div className="logo">
            <h1>CampusConnect</h1>
            <span>BEST EDUCATION & LEARNING</span>
          </div>
          {
            !localStorage.getItem('userToken') ?
              <div onClick={() => setmodalVisible(true)}>
                <span className='loginbtn'>Login</span>
              </div>
              :
              <div>
                <Link className='profilelink loginbtn' to={'/profile'}>Profile</Link>
                <span>|</span>
                <span className='loginbtn' style={{ cursor: 'pointer' }} onClick={() => {
                  localStorage.clear()
                  window.location.href = '/'
                }}>Logout</span>
              </div>

          }
          <div className="social">
            <i className="fab fa-facebook icon"></i>
            <i className="fab fa-instagram icon"></i>
            <i className="fab fa-youtube icon"></i>
            <i className="fab fa-twitter icon"></i>
          </div>
        </div>
      </section>

      <LoginModal
        modalVisible={modalVisible}
        hideModal={() => setmodalVisible(false)}
      />
    </>
  )
}

export default Head