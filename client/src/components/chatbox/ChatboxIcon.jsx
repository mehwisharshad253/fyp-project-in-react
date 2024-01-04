import React, { useState } from 'react';
import './ChatboxIcon.css'; // Import the CSS file for styling
import Chatbox from './Chatbox';
import LoginModal from '../loginmodal/LoginModal';
import { toast } from 'react-hot-toast';

const ChatboxIcon = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);

  const authToken = localStorage.getItem('userToken')

  const toggleChatbox = () => {

    if (authToken) {
      setIsChatboxOpen(!isChatboxOpen);
    } else {
      toast.error('Please login first')
      setmodalVisible(true)
    }
  };


  return (
    <div>
      <div className={`chatbox-icon ${isChatboxOpen ? 'hide' : ''}`} onClick={toggleChatbox}>
        {/* <img src="/image/chat.png" alt="Chat Icon" className="chatbox-icon-image" /> */}
      </div>

      {isChatboxOpen && <Chatbox />}

      <LoginModal 
        hideModal={()=>setmodalVisible(false)}
        modalVisible={modalVisible}

      />
    </div>
  );
};

export default ChatboxIcon;



