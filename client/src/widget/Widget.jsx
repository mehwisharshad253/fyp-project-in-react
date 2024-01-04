import React, { useState, useEffect } from 'react';
import './Widget.css';
import { MdVisibility } from 'react-icons/md';

const Widget = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getallusers');
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className='widget'>
      <span className="widgetTitle">New Join Member</span>
      <div className="widgetListContainer"> {/* Added a container */}
        <ul className="widgetList">
          {users.map((user) => (
            <li className="widgetListItem" key={user.id}>
              <img
                src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                alt=""
                className='widgetImg'
              />
              <div className="widgetUser">
                <span className="widgetUserName">{user.name}</span>
                <span className="widgetUserTitle">{user.title}</span>
              </div>
              <button className="widgetButton">
                <MdVisibility />
                Display
              </button>
            </li>
          ))}
        </ul>
      </div>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Widget;
