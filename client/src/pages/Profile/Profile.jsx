import React, { useEffect, useState } from 'react'
import Header from '../../components/common/heading/Header'
import Back from '../../components/common/back/Back'
import CourseCard from '../../components/CourseCard/CourseCard';

const Profile = () => {

  const [courses, setCourses] = useState([]);


  const user = localStorage.getItem('userDetails')

  const loggedUser = JSON.parse(user)






  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/mycourses/${loggedUser._id}`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
      } else {
        throw new Error('Failed to fetch courses');
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);


  return (
    <div>
      <Header />
      <Back title="Profile" />

      <div className='container'>
        <h1 className='p-2'>My Courses</h1>
        <CourseCard reload={fetchCourses} courses={courses} />
      </div>

    </div>
  )
}

export default Profile