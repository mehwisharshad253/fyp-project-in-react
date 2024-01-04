import React, { useRef, useState } from 'react';
import './Chatbox.css'; // Import the CSS file for styling
import { database } from '../../firebase/config';
import firebase from 'firebase';
import { useEffect } from 'react';
import { BaseUrl } from '../../config';


const Chatbox = () => {

  const chatref = useRef()

  const user = JSON.parse(localStorage.getItem('userDetails'))

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [adminDetails, setadminDetails] = useState({})

  const [unreadMessages, setUnreadMessages] = useState(0);

  const getAdminData = () => {

    fetch(`${BaseUrl}/getallusers`)
      .then(res => res.json())
      .then(data => {
        let founded = data.users.find(user => user.role == 'admin')
        console.log(founded);
        setadminDetails(founded)
        if (founded) {
          console.log('worj?')
          database.ref('chatMessages')
            .child(user._id)
            .child(founded?._id)
            .on('value', snapshot => {
              if (snapshot.exists()) {
                let dataArray = []
                snapshot.forEach((snap, index) => {
                  dataArray.push({
                    sendBy: snap.child("senderUID").val(),
                    receiveBy: snap.child("receiverUID").val(),
                    msg: snap.child("message").val(),
                    key: snap.key
                  })
                })
                setChatMessages(dataArray)
                console.log(dataArray)
              }
            })

        }
      }).catch(err => {
        console.log(err)
      })



  }




  useEffect(() => {


    getAdminData()


  }, [])




  useEffect(() => {
    // Check for new messages from admin and update unread message count
    const handleNewMessage = (snapshot) => {
      const newMessage = snapshot.val();
      if (newMessage.senderUID === adminDetails._id && !newMessage.isRead) {
        setUnreadMessages((prevUnread) => prevUnread + 1);
      }
    };

    if (adminDetails._id) {
      database
        .ref('chatMessages')
        .child(user._id)
        .child(adminDetails._id)
        .on('child_added', handleNewMessage);
    }

    return () => {
      // Cleanup when component unmounts
      if (adminDetails._id) {
        database
          .ref('chatMessages')
          .child(user._id)
          .child(adminDetails._id)
          .off('child_added', handleNewMessage);
      }
    };
  }, [adminDetails]);



  const handleToggle = () => {
    if (unreadMessages > 0) {
      setUnreadMessages(0);
      // Mark messages as read in Firebase (you need to implement this part)
    }
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message.trim() === '') {
      return; // Do nothing if the message is empty or contains only whitespace
    }

    database.ref('chatMessages')
      .child(user._id)
      .child(adminDetails._id)
      .push({
        message: message,
        senderUID: user._id,
        receiverUID: adminDetails._id,
        timeStamp: Date.now(),
        isRead: false
      })
      .then(res => {
        database.ref('chatMessages')
          .child(adminDetails._id)
          .child(user._id)
          .push({
            message: message,
            senderUID: user._id,
            receiverUID: adminDetails._id,
            timeStamp: Date.now(),
            isRead: false


          })
          .then(res => {
            console.log("Data added successfully");
            let idd = document.getElementById('chat-end-panel')
            chatref.current.scrollIntoView({
              behavior: 'smooth'
            })
          }).catch(Err => {
            console.log(Err)
          })
      }).catch(Err => {
        console.log(Err)
      })



    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // })
    // setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    setMessage('');
  };

  return (
    <>
      {isOpen ? (
        <div className="chatbox">
          <button className="close-button" onClick={handleToggle}>
            Close
          </button>
          <div className="chatbox-content">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sendBy === user._id ? 'sender' : 'receiver'}`}
              >
                {msg.sendBy == user._id ? <div className="message-sender">You</div> : <div></div>}
                <p className="chat-message-text">{msg.msg}</p>
              </div>
            ))}
          </div>
          <div ref={chatref}></div>
          <form onSubmit={handleSubmit} className="message-input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={handleMessageChange}
              className="message-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="chatbox-icon" onClick={handleToggle}>
          {/* Icon or button content goes here */}
          {unreadMessages > 0 && <div style={{
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            height: 25,
            width: 25,
            borderRadius: 25/2,
            marginBottom:50,
            marginLeft:20,
            border:'1px solid red',
            backgroundColor: 'green'
          }} className="message-badge">{unreadMessages}</div>}
        </div>
      )}
    </>
  );
};

export default Chatbox;








