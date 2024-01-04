import React, { useState } from 'react';

const TableCourses = ({ data, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [updatedCourseName, setUpdatedCourseName] = useState('');
  const [updatedLectures, setUpdatedLectures] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');

  const handleEdit = (id, ) => {
    setEditId(id);
    // setUpdatedCourseName(courseName);
    // setUpdatedLectures(lectures);
    // setUpdatedPrice(price);
  };

  // const handleUpdate = () => {
  //   const updatedData = {
  //     courseName: updatedCourseName,
  //     lectures: updatedLectures,
  //     price: updatedPrice,
  //   };
  //   onUpdate(editId, updatedData);
  //   setEditId(null);
  // };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  return (
    <div className='container'>
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
          {
          data.map((item,index) => (
                item.id=== editId ? 
                  <tr>
                    <td>{item.id}</td>
                    <td><input type='text' value={item.courseName} /></td>
                    <td><input type='text' value={item.Lectures} /></td>
                    <td> <input type='text' value={item.price} /></td>
                    <td><button className='courseBtn'>Update</button>
                    <button className='courseBtn' onClick={handleCancelEdit}>Cancel</button></td>
                  </tr>
                  :
                  <tr  key={index}>
                    <td>{item.courseName}</td>
                    <td>{item.Lectures}</td>
                    <td>{item.price}</td>
                    <td>
                    <button className='courseBtn' onClick={() => handleEdit(item.id, item.courseName, item.lectures, item.price)}>Edit</button>
                    <button className='courseBtn' onClick={() => onDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};

export default TableCourses;










