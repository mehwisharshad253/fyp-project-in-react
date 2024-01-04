import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import './footer.css';
import FeedbackForm from '../../Feedback/FeedbackForm';

const Footer = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const openFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>Heritage</h1>
            <span>Physical EDUCATION</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, aperiam in? Enim, expedita provident !</p>

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Courses</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Pricing</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li><Link to="#" onClick={openFeedbackModal}>Feedback</Link></li>
            </ul>
          </div>
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                Narowal Jesser Bypass Heritage College
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +92 392 3929 210
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                info@yourdomain.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2023 All rights reserved | This template is made with <i className='fa fa-heart'></i> by Mehwish
        </p>
      </div>
      <FeedbackForm isOpen={isFeedbackModalOpen} onRequestClose={closeFeedbackModal} />
    </>
  );
};

export default Footer;
