import React, { useState } from 'react'
import AppHeader from '../../components/AdminDashboard/AppHeader'
import { Space } from 'antd'
import AppFooter from '../../components/AdminDashboard/AppFooter'
import SideMenu from '../../components/AdminDashboard/SideMenu'
import './feedback.css'
import { BaseUrl } from '../../config'
import { useEffect } from 'react'

const FeedBack = () => {


  useEffect(() => {
    getFeedback()
  }, [])


  const [feedbackList, setFeedback] = useState([])

  const getFeedback = () => {
    fetch(`${BaseUrl}/get-feedback`)
      .then(res => res.json())
      .then((data) => {

        setFeedback(data.feedbackList)

      }).catch(err => {
        console.log(err)
      })
  }




  const calculateTime = (datetime) => {
    let result = ''
    let newdd = new Date(datetime)
    let dd = new Intl.DateTimeFormat('en-us', {
      timeStyle: 'medium',
      dateStyle: 'medium'
    })

    result = dd.format(newdd)
    return result;


  }


  return (
    <div className='App'>
      <AppHeader />
      <Space className='SideMenuAndPageContent'>
        <SideMenu />
        <div className='feedback'>
          {
            feedbackList.map(feedback => (
              <div className='feedbackItem' style={{ marginLeft: '30%' }}>
                <span><b>Name:</b> {feedback.name}</span>
                <span><b>Email:</b>{feedback.email}</span>
                <span><b>Message :</b>{feedback.message}</span>

                <span><b>Send at :</b> {calculateTime(feedback.timestamp) }</span>
              </div>
            ))
          }

        </div>
      </Space>
      <AppFooter />
    </div>
  )
}

export default FeedBack
