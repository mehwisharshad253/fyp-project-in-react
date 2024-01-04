import AppHeader from '../../components/AdminDashboard/AppHeader';
import SideMenu from '../../components/AdminDashboard/SideMenu';
import React, { useState } from 'react';
import { Space } from 'antd';
import './Holidays.css';
import AppFooter from '../../components/AdminDashboard/AppFooter';
import { BaseUrl } from '../../config';
import { toast } from 'react-hot-toast';
import NewsList from '../NewsList/NewsList';

const Holidays = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BaseUrl}/news`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('News update added:', data);
        if (data.success) {
          toast.success(data.message);
        }
        // Additional logic after successfully adding the news update
      } else {
        console.log('Failed to add news update');
        // Handle error response
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <div>
      <AppHeader />
      <Space className="SideMenuAndPageContent">
        <SideMenu />
        <div className="newsContainer">
          <div className="addNews">
            <h3 className="addCoursesTitle">Add News & updates</h3>
            <form className="addNewsForm" onSubmit={handleSubmit}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                cols="30"
                rows="10"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>

             <div className='my-3'>
             <button type="submit">Submit</button>
             </div>
            </form>
          <NewsList/>
          </div>
        </div>
      </Space>
      <AppFooter />
    </div>
  );
};

export default Holidays;

