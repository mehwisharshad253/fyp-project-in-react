import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginModal from '../loginmodal/LoginModal';
import '../allcourses/courses.css';
import toast from 'react-hot-toast'

const CourseCard = () => {
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const user = localStorage.getItem('userDetails')

  const loggedUser = JSON.parse(user)

console.log('logged',loggedUser)

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
      } else {
        throw new Error('Failed to fetch courses');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
 
  }, []);




  


  const addRating = async (courseId, rating) => {

    try {
      const response = await fetch(`http://localhost:5000/api/addrating/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: loggedUser._id,
          rating: rating,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Rating added successfully, you can handle the response data if needed
          console.log('Rating added successfully:', data);
          toast.success('Rating added successfully')
        } else {
          setError(data.error || 'Failed to add rating');
        }
      } else {
        setError('Failed to add rating');
      }
    } catch (error) {
      setError('Failed to add rating');
    }
  };

  const enrollNowClick = async (courseId) => {
    const isLoggedIn = localStorage.getItem('userToken');

    if (!isLoggedIn) {
      setModalVisible(true);
    } else {
      if (loggedUser.isAdmited) {
        try {
          const response = await fetch(`http://localhost:5000/api/enroll/${courseId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: loggedUser._id,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              // Refresh user courses after successful enrollment
              fetchCourses();
              toast.success('Course Enrolled Successfully')
              // Add rating after successful enrollment
              // await addRating(courseId, rating);
              // history.push('/addmission'); // Redirect after successful enrollment
            } else {
              setError(data.error || 'Failed to enroll in the course');
              toast.error('Failed to enroll in the course')

            }
          } else {
            const data = await response.json();
            // setError('Failed to enroll in the course');
            toast.error(data.error)

          }
        } catch (error) {
          setError('Failed to enroll in the course');
        }

      }else{
        toast.error('Please fill admission form first')
        history.push('/addmission')
      }
    }
  };

  // const userId = loggedUser ? loggedUser._id : null;
  return (
    <>
      {error && <p>Error: {error}</p>}
      <section className="coursesCard " style={{width:'95vw'}}>
        <div className="container grid2">
          {courses.map((course, index) => (
            <div className="items" key={index}>
              <div className="content flex">
                <div className="left">
                  <div className="courseimg img">
                    <img src={course.courseImage} alt="" />
                  </div>
                </div>
                <div className="text">
                  <h5 className="card-title">{course.courseName}</h5>
                  {/* <p className="card-text">Rating: {course.rating}</p> */}
                  <p className="card-text">Lectures: {course.Lectures}</p>
                </div>
              </div>
              <div className="price">
                <p className="card-text">Fee: {course.price}</p>
              </div>
              {
                course.enrolledUsers.includes(loggedUser?._id) ?

                  <button disabled className="outline-btn">
                    ALREADY ENROLLED
                  </button>
                  :
                  <button onClick={() => enrollNowClick(course._id)} className="outline-btn">
                    ENROLL NOW!
                  </button>
              }
            </div>
          ))}
        </div>
      </section>
      <LoginModal hideModal={() => setModalVisible(false)} modalVisible={modalVisible} />
    </>
  );
};

export default CourseCard;


