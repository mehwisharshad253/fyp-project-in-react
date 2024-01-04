import React, { useState } from 'react'
import Head from './Head'
import './header.css'
import { Link, useHistory } from 'react-router-dom'
import LoginModal from '../../loginmodal/LoginModal'
const Header = () => {

  const history = useHistory()


  const [click, setClick] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false)


  const goToAddmissions = () => {

    let isLoggedIn = localStorage.getItem('userToken')
    if (!isLoggedIn) {
      setmodalVisible(true)
    } else {
      history.push('/addmission')
    }
  }
  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Departments</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/team">Faculty</Link></li>
            <li><Link to="/academic">Academic</Link></li>
            <li className='linktag' onClick={goToAddmissions}>Addmission</li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="start">
            <div className="button">GET CERTIFICATE</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
      <LoginModal
        modalVisible={modalVisible}
        hideModal={() => setmodalVisible(false)}
      />
    </>
  )
}

export default Header