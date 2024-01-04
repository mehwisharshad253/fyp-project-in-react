import React, { useState, useEffect } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import './NewsList.css';
import toast from 'react-hot-toast'
import UpdateModel from './UpdateModel';

const NewsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState({ title: '', description: '' });



  // state s
  const [currentNews, setCurrentNews] = useState({})
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [enable, setEnable] = useState(false)

  useEffect(() => {
    // document.body.style.overflowY = 'hidden';
    fetchAllNews();

    // return () => {
    //   document.body.style.overflowY = 'scroll';
    // };
  }, []);

  const fetchAllNews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getallnews');
      if (response.ok) {
        const data = await response.json();
        setRows(data.news);
      } else {
        throw new Error('Failed to fetch news updates');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteRow = (item) => {
    // setCurrentNews(item)
    deleteModal(item._id)

    // const updatedRows = [...rows];
    // updatedRows.splice(index, 1);
    // setRows(updatedRows);
  };

  const openModal = (news) => {
    setCurrentNews(news)
    setTitle(news.title)
    setDescription(news.description)

    // const { title, description } = rows[index];
    // setModalData({ title, description });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({ title: '', description: '' });
  };



  const deleteModal = (id) => {
    let url = `http://localhost:5000/api/delete-news/${id}`
    fetch(url, {
      method: 'DELETE',
    }).then(res => res.json()
    ).then((resp => {
      if (resp.success) {
        // setShowModal(false);
        fetchAllNews()
        toast.success('Delete Successfully')
      }
      console.log(resp)
    })).catch(err => {
      console.log(err)
    })
  }

  //Alt+R

  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th className='expand'>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.title}</td>
              <td>{row.description}</td>
              <td>
                <span className='actions'>
                  <BsFillTrashFill className='delete-btn' onClick={() => deleteRow(row)} />
                  <BsFillPencilFill onClick={() => openModal(row)} />
                  {showModal && <UpdateModel
                    title={title}
                    currentNews={currentNews}
                    setTitle={setTitle}
                    description={description}
                    enable={enable}
                    reload={fetchAllNews}
                    closeModal={closeModal}
                    setDescription={setDescription}
                    setEnable={setEnable}

                  />}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default NewsList;

