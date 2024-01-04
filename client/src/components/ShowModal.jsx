import { useEffect, useState } from "react";
import { BaseUrl } from "../config";
import { toast } from 'react-hot-toast'
import emailjs from '@emailjs/browser';


const MyModal = ({ item, closeModal, reload }) => {

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'scroll';
    }
  }, [])


  const [isLoading, setisLoading] = useState(false)



  console.log("inter marks", item);

  const updateStatue = (status) => {
    setisLoading(true)
    const data = {
      status
    }

    fetch(`${BaseUrl}/admission/${item._id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.success(resp.message)
          setisLoading(false)
          closeModal()
          reload()
          sendEmail(status)
        } else {
          setisLoading(false)
          toast.error('Something went wrong')
        }
      }).catch(err => {
        setisLoading(false)

        console.log(err);
      })
  }


  const sendEmail = (status) => {
    fetch(`${BaseUrl}/send-mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: item.email,
        subject: status.toLocaleUpperCase(),
        message: `Your Application ${status.toLocaleUpperCase()}`
      })
    }).then(res=>res.json())
    .then((data)=>{
      console.log(data)
    }).catch(err=>{
      console.log('while sending mail',err)
    })
  }


  const getInterPer = (totalmarks, gainmarks) => {
    let result = 0

    // console.log(totalmarks);
    // console.log(gainmarks);

    var percentage = (gainmarks / totalmarks) * 100;

    // let persetage = (gainmarks / totalmarks) * 100

    let final = Number(percentage)

    result = final

    return result
  }







  return (
    <>
      <div className="modals-wrapper" onClick={closeModal}></div>
      <div className="modals-container">
        <p>
          Are you sure you want to update status of this Admission?
        </p>

        <div>
          <span>Inter Persentage {getInterPer(1100, item.interMarks).toFixed(2)}%</span>
        </div>
        <div>
          <span>Matric Persentage {getInterPer(1100, item.matricMarks).toFixed(2)}%</span>
        </div>

        {
          isLoading ? <span className="spinner spinner-border"></span>
            : <>
              <button className="btn btn-success" onClick={() => updateStatue('approved')}>Accept</button>
              <button className="btn btn-danger m-3" onClick={() => updateStatue('reject')}>Reject</button>
              {/* <button className="btn btn-danger m-3" onClick={() => sendEmail()}>Test</button> */}
            </>
        }

      </div>
    </>
  )
}

export default MyModal