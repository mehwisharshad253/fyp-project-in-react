import React, { useState } from 'react'
import { Space } from 'antd'
import AppHeader from '../../components/AdminDashboard/AppHeader'
import SideMenu from '../../components/AdminDashboard/SideMenu'
import AppFooter from '../../components/AdminDashboard/AppFooter'
import './AddCourses.css'
import { toast } from 'react-hot-toast'
import { BaseUrl } from '../../config'

const AddCourses = () => {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', event.target.elements.courseImage.files[0]);
    formData.append('courseName', event.target.elements.courseName.value);
    // formData.append('Rating', selectedRating);
    formData.append('price', event.target.elements.price.value);
    formData.append('Lectures', event.target.elements.Lectures.value);

    try {
      const response = await fetch(`${BaseUrl}/addcourse`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Course added:', data.newCourse);
        if (data.success) {
          toast.success(data.message)
        }
        // Additional logic after successfully adding the course
      } else {
        console.log('Failed to add course');
        // Handle error response
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }

  };

  return (
    <div>
      <AppHeader />
      <Space className='SideMenuAndPageContent'>
        <SideMenu />
        <div className="addCourses">
          <h1 className="addCoursesTitle">Add Courses</h1>
          <form onSubmit={handleSubmit} className='addCoursesForm'>
            <div className="addCoursesItem">
              <label>Course Name</label>
              <input name='courseName' type="text" placeholder='course' />
            </div>
            <div className="addCoursesItem">
              <label>Course Lecture</label>
              <input name='Lectures' type="numbers" placeholder='lecture' />
            </div>
            <div className="addCoursesItem">
              <label>Course Price</label>
              <input name='price' type="number" placeholder='Price' />
            </div>
            <div >
              <label>Course Image</label>
              <input name='courseImage' type="file" placeholder='Price' />
            </div>
            {/* <div className="addCoursesItem">
              <div className="rating">
                <input type="radio" id="star5" name="rating" value="5" onChange={handleRatingChange} />
                <label htmlFor="star5"></label>
                <input type="radio" id="star4" name="rating" value="4" onChange={handleRatingChange} />
                <label htmlFor="star4"></label>
                <input type="radio" id="star3" name="rating" value="3" onChange={handleRatingChange} />
                <label htmlFor="star3"></label>
                <input type="radio" id="star2" name="rating" value="2" onChange={handleRatingChange} />
                <label htmlFor="star2"></label>
                <input type="radio" id="star1" name="rating" value="1" onChange={handleRatingChange} />
                <label htmlFor="star1"></label>
              </div>
              {selectedRating && <p>Selected rating: {selectedRating}</p>}
            </div> */}
            <div className="addCoursesItem">
              <button type='submit' className="addCoursesButton">Create</button>
            </div>
          </form>
        </div>
      </Space>
      <AppFooter />
    </div>
  )
}

export default AddCourses