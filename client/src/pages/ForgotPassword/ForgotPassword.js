import React, { useState } from 'react'
import { BaseUrl } from '../../config'
import toast from 'react-hot-toast'
import './forgetpassword.css'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')




    const sendEmail = () => {
        fetch(`${BaseUrl}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        }).then(res => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Email send successfully please check your mailbox')
                    setEmail('')
                } else {
                    toast.error(data.error)
                }
            }).catch(err => {
                console.log(err)
            })
    }



    return (
        <div className='mainContainer'>
        <div className='forget-password'>
            <h>ForgotPassword</h>
            <input value={email} placeholder='Enter email address' onChange={(e) => setEmail(e.target.value)} />

            <button onClick={sendEmail}>Send</button>
        </div>
        </div>
    )
}

export default ForgotPassword