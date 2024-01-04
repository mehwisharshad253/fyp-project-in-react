import React, { useState } from 'react';
import './DashChatboxIcon.css'; // Import the CSS file for styling
import DashChatbox from './DashChatbox';


const DashChatboxIcon = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  return (
    <div>
      <div className={`chatbox-icon ${isChatboxOpen ? 'hide' : ''}`} onClick={toggleChatbox}>
        {/* <img src="/image/chat.png" alt="Chat Icon" className="chatbox-icon-image" /> */}
      </div>
      {isChatboxOpen && <DashChatbox/>}
    </div>
  );
};

export default DashChatboxIcon;