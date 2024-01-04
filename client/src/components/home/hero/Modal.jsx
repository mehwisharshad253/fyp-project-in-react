import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [news, setNews] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getallnews');
        if (response.ok) {
          const data = await response.json();
          const reversedNews = data.news.reverse(); // Reverse the news array
          let found = data.news.find(item=>item=>item.enable == true)
          setNews(found);
        } else {
          throw new Error('Failed to fetch news updates');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    setShowModal(true);
    fetchAllNews();

    // document.body.style.overflowY = 'hidden';

    // return () => {
    //   setShowModal(false);
    //   document.body.style.overflowY = 'scroll';
    // };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  let content = null;
  if (news) {
    const latestNews = news[0];
    content = (
      <>
        <h3>{news.title}</h3>
        <p>{news.description}</p>
      </>
    );
  } else {
    content = <p>No news updates available.</p>;
  }

  return (
    <>
      {showModal && (
        <div className={`modal-wrapper ${showModal ? 'show' : ''}`} onClick={closeModal}>
          <div className={`modal-container ${showModal ? 'show' : ''}`}>
            {
              news  ?
              <>
                  <h3>{news.title}</h3>
            <p>{news.description}</p>
              </>
                  :
    <p>No news updates available.</p>
            }
         
            {error && <p>Error: {error}</p>}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;






