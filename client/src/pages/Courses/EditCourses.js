import React, { useState, useEffect, setError } from 'react';
import { Space } from 'antd';
import AppHeader from '../../components/AdminDashboard/AppHeader';
import SideMenu from '../../components/AdminDashboard/SideMenu';
import AppFooter from '../../components/AdminDashboard/AppFooter';
import './EditCourses.css';
import toast from 'react-hot-toast';

const EditCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editedRowIndex, setEditedRowIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [updatedCourseName, setUpdatedCourseName] = useState('');
  const [updatedLectures, setUpdatedLectures] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [query, setQuery] = useState('');

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
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteModal = (id) => {
    let url = `http://localhost:5000/api/course/${id}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.success('Delete Successfully');
          fetchCourses();
        } else {
          console.error(resp.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };


  const handleEdit = (index, id, courseName, lectures, price) => {
    console.log(id)
    setEditedRowIndex(index);
    setEditId(id);
    setUpdatedCourseName(courseName);
    setUpdatedLectures(lectures);
    setUpdatedPrice(price);
  };


  const handleUpdate = async () => {
    const updatedData = {
      courseName: updatedCourseName,
      Lectures: updatedLectures,
      price: updatedPrice,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/course/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          fetchCourses();
          toast.success('Course Updated Successfully');
          setEditId(null);
          setEditedRowIndex(null);

        } else {
          console.error(data.message);
        }
      } else {
        console.error('Failed to update the course');
      }
    } catch (error) {
      console.error('Failed to update the course');
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditedRowIndex(null);

  };

  const search = (data) => {
    return data.filter((item) => {
      const courseName = item.course_name || '';
      return courseName.toLowerCase().includes(query.toLowerCase());
    });
  };





   const searchUsers = courses.filter(user => {
        let text1 = query.toLowerCase()
        return text1
            ? user?.courseName?.toLowerCase().includes(text1)
            : true;
    })


  return (
    <div>
      <AppHeader />
      <Space className='SideMenuAndPageContent'>
        <SideMenu />
        <section className='coursesCard'>
          <div className='container grid2 coursetable'>
            <input value={query} type='text' placeholder='Search.....' className='search' onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className='container grid2 coursetable'>
            <table className='table dataTable'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Lectures</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchUsers.map((item, index) => (
                  <tr key={index}>
                    <td>{editedRowIndex === index ? <input type='text' value={updatedCourseName} onChange={(e) => setUpdatedCourseName(e.target.value)} /> : item.courseName}</td>
                    <td>{editedRowIndex === index ? <input type='text' value={updatedLectures} onChange={(e) => setUpdatedLectures(e.target.value)} /> : item.Lectures}</td>
                    <td>{editedRowIndex === index ? <input type='text' value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} /> : item.price}</td>
                    <td>
                      {editedRowIndex === index ? (
                        <React.Fragment>
                          <button className='courseBtn' onClick={handleUpdate}>Update</button>
                          <button className='courseBtn' onClick={handleCancelEdit}>Cancel</button>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <button className='courseBtn' onClick={() => handleEdit(index, item._id, item.courseName, item.Lectures, item.price)}>Edit</button>
                          <button className='courseBtn' onClick={() => deleteModal(item._id)}>Delete</button>
                        </React.Fragment>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Space>
      <AppFooter />
    </div>
  );
};

export default EditCourses;



