import React, { useState } from 'react';
import { Space } from 'antd';
import AppHeader from '../../components/AdminDashboard/AppHeader';
import SideMenu from '../../components/AdminDashboard/SideMenu';
import AppFooter from '../../components/AdminDashboard/AppFooter';
import { toast } from 'react-hot-toast';
import { BaseUrl } from '../../config';
import CreatableSelect from 'react-select/creatable';
import './addstaff.css'


const AddStaff = () => {
  const [formData, setFormData] = useState({
    StaffName: '',
    Position: '',
    accounts: [],
    courseImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, courseImage: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('StaffName', formData.StaffName);
    formDataToSend.append('Position', formData.Position);
    formDataToSend.append('StaffImage', formData.courseImage);
    formData.accounts.forEach((account, index) => {
      // Append each account object as JSON string with a unique key
      formDataToSend.append(`accounts[${index}]`, JSON.stringify(account));
    });

    try {
      const response = await fetch(`${BaseUrl}/addstaff`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('New staff member added:', data.newStaff);
        if (data.success) {
          toast.success(data.message);
        }
        // Additional logic after successfully adding the staff member
      } else {
        console.error('Failed to add staff member');
        // Handle error response
      }
    } catch (error) {
      console.error('Error occurred while adding staff member:', error);
      // Handle error, e.g., show an error message to the user
    }
  };



  const colourOptions = []

  console.log(formData.accounts)
  return (
    <div>
      <AppHeader />
      <Space className='SideMenuAndPageContent'>
        <SideMenu />
        <div className='addStaff'>
          <h1 className='addStaffTitle'>Add Staff</h1>
          <form className='addCoursesForm' onSubmit={handleSubmit} >
            <div className='row'>
              <div className=' addStaffItem'>
                <label>Staff Name:</label>
                <input type="text" name="StaffName" onChange={handleInputChange} required />
              </div>
              <div className='addStaffItem'>
                <label>Position:</label>
                <input type="text" name="Position" onChange={handleInputChange} required />
              </div>
            </div>

            <div>
              <div className='addStaffItem'>
                <label>Accounts:</label>
                <CreatableSelect onChange={(vals) => setFormData({ ...formData, accounts: vals })} isMulti isClearable options={colourOptions} />
                {/* <input type="text" name="Accounts" onChange={handleInputChange} required /> */}
              </div>

                <label>Staff Image:</label>
                <input name='courseImage' type='file' onChange={handleImageChange} required />
              
            </div>
            <div className='addStaffItem'>
            <button type='submit' className='addStaffButton'>Add Staff</button>
            </div>
          </form>
        </div>
      </Space>
      <AppFooter />
    </div>
  );
};

export default AddStaff;




