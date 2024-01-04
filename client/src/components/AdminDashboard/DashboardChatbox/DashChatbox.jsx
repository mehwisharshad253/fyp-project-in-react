import React, { useEffect, useRef, useState } from 'react';
import './DashChatbox.css'; // Import the CSS file for styling
import { BaseUrl } from '../../../config';
import firebase from 'firebase';
import { database } from '../../../firebase/config';
import { Badge, Space, Switch } from 'antd';


const Chatbox = () => {

  const user = JSON.parse(localStorage.getItem('userDetails'))
  const [messageCounts, setMessageCounts] = useState({});


  const refff = useRef()
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistories, setChatHistories] = useState({});
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversationStarted, setConversationStarted] = useState(false);


  const [chatMessages, setChatMessages] = useState([]);


  useEffect(() => {
    getUsers()

  }, [])




  const getUsers = () => {
    fetch(`${BaseUrl}/getallusers`)
      .then(res => res.json())
      .then(data => {
        let filterd = data.users.filter(user => user.role == 'user')
        setUserList(filterd)
      }).catch(err => {
        console.log(err)
      })

  }

  useEffect(() => {
    // Check for new messages from users and update unread message count for the corresponding user
    const handleNewMessage = (snapshot) => {
      const newMessage = snapshot.val();
      if (newMessage.senderUID !== user._id && !newMessage.isRead) {
        setMessageCounts((prevCounts) => ({
          ...prevCounts,
          [newMessage.senderUID]: (prevCounts[newMessage.senderUID] || 0) + 1,
        }));
      }
    };

    if (selectedUser?._id) {
      database
        .ref('chatMessages')
        .child(selectedUser._id)
        .child(user._id)
        .on('child_added', handleNewMessage);
    }

    return () => {
      // Cleanup when component unmounts
      if (selectedUser?._id) {
        database
          .ref('chatMessages')
          .child(selectedUser._id)
          .child(user._id)
          .off('child_added', handleNewMessage);
      }
    };
  }, [selectedUser]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedUser(null);
      setConversationStarted(false);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() === '') {
      return;
    }
    database.ref('chatMessages')
      .child(user._id)
      .child(selectedUser._id)
      .push({
        message: message,
        senderUID: user._id,
        receiverUID: selectedUser._id,
        timeStamp: Date.now(),
        isRead: false

      })
      .then(res => {
        database.ref('chatMessages')
          .child(selectedUser._id)
          .child(user._id)
          .push({
            message: message,
            senderUID: user._id,
            receiverUID: selectedUser._id,
            timeStamp: Date.now(),
            isRead: false
          })
          .then(res => {
            console.log("Data added successfully");
            setMessage('')
          }).catch(Err => {
            console.log(Err)
          })
      }).catch(Err => {
        console.log(Err)
      })





  };

  const handleUserClick = (user) => {

    setSelectedUser(user);
    getChatMessages(user._id);
    // Set the message count for the selected user to zero when a conversation is started
    setMessageCounts((prevCounts) => ({ ...prevCounts, [user._id]: 0 }));
    setConversationStarted(true);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
    setConversationStarted(false);
    // setUserList(['User 1', 'User 2', 'User 3']);
  };







  const getChatMessages = (id) => {
    console.log("id arhi h?", id);
    firebase.database()
      .ref('chatMessages')
      .child(user._id)
      .child(id)
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
          makeReadable(id, dataArray)
        }
      })
  }


  const makeReadable = (id, myArray) => {

    let lastElement = myArray[myArray.length - 1];


    firebase.database()
      .ref('chatMessages')
      .child(user._id)
      .child(id)
      .child(lastElement.key)
      .update({
        isRead: true
      })
    // firebase.database()
    //   .ref('chatMessages')
    //   .child(id)
    //   .child(user._id)
    //   .child(lastElement.key)
    //   .update({
    //     isRead: true
    //   })
  }


  const getChatMessagesCount = (id) => {
    // Use the messageCounts state to get the count of unread messages for the user
    return messageCounts[id] || 0;
  };




  const getTotalUnreadMessages = () => {
    // Sum up the unread message counts for all users
    return Object.values(messageCounts).reduce((sum, count) => sum + count, 0);
  };

  const getUsersWithBadge = () => {
    return userList.map((user) => ({
      ...user,
      unreadMessages: getChatMessagesCount(user._id),
    }));
  };



  return (
    <>
      <div className={`chatbox-icon ${isOpen ? 'hidden' : ''}`} onClick={handleToggle}>
        {/* Icon or button content goes here */}
      </div>
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            {!selectedUser && (
              <button className="close-button" onClick={handleToggle}>
                Close
              </button>
            )}
            {selectedUser && (
              <button className="back-button" onClick={handleBackToList}>
                Back
              </button>
            )}
          </div>
          {!selectedUser && (
            <div className="user-list">
              <h2 className="old-style-class">User List</h2>
              <Badge
                count={getTotalUnreadMessages()}
                style={{ backgroundColor: '#ff4d4f', marginLeft: 5 }}
              />
              <ul className="old-style-class">
                {userList.map((user, index) => (
                  <li style={{ display: 'flex' }} key={index} onClick={() => handleUserClick(user)}>
                    {user.name} {user.unreadMessages > 0 && (
                      <Badge count={user.unreadMessages} style={{ backgroundColor: '#ff4d4f', marginLeft: 5 }} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedUser && (
            <>
              <div className="selected-user">
                <div>{selectedUser.name}</div>
                <div>
                  <Badge
                    count={getChatMessagesCount(selectedUser._id)}
                    style={{ backgroundColor: '#52c41a', marginLeft: 5 }}
                  />

                </div>
              </div>
              {conversationStarted && (
                <>
                  <div className="chat-messages">
                    {chatMessages?.map((msg, index) => (
                      <div
                        key={index}
                        className={`chat-message ${msg.sendBy == selectedUser._id ? 'receiver' : 'sender'}`}
                      >
                        {/* {msg.sendBy == user._id ? <div>send krny wala :{user.name}</div> : <div className="message-sender">{selectedUser.name}</div>} */}
                        <p className="chat-message-text">{msg.receiveBy == user._id ? `${msg.msg}` : msg.msg}</p>
                        <div className="message-time">{new Date().toLocaleTimeString()}</div>
                      </div>
                    ))}
                    <div ref={refff}></div>
                  </div>
                  <div className="message-input-container">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={message}
                      onChange={handleMessageChange}
                      className="message-input old-style-class"
                    />
                    <button type="button" onClick={handleSubmit} className="send-button old-style-class">
                      Send
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbox;

