import React from 'react'
import { toast } from 'react-hot-toast';

const UpdateModel = ({
    setTitle, title, setDescription, description, setEnable,
    currentNews,
    enable,
    reload,
    closeModal
}) => {

    const updateNews = () => {
        const url = `http://localhost:5000/api/update-news/${currentNews._id}`;
        const data = {
          title,
          description,
          enable
        }
        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(res => res.json()
        ).then((resp => {
          if (resp.success) {
            closeModal()
            // setShowModal(false);
            // fetchAllNews()
            reload()
            toast.success('Update Successfully')
          }
          console.log(resp)
        })).catch(err => {
          console.log(err)
        })
    
      };
    

    return (
        <>
            <div className='modal-wrapper' onClick={closeModal}></div>
            <div className='modal-container'>
                <h3>Update news</h3>
                {/* <form action=''> */}
                <label htmlFor='title'>Title:</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} defaultValue={title} type='text' />
                <label htmlFor='description'>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} defaultValue={description} cols='30' rows='30'
                />
                <input onChange={(e) => setEnable(e.target.checked)} type='checkbox' />
                <button type='submit' onClick={updateNews}>
                    Update
                </button>
                {/* </form> */}
            </div>
        </>
    )
}

export default UpdateModel


// const MyModal = React.memo(({  }) => {
//     return (
//         <>

//         </>
//     );
// })