import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BaseUrl } from '../../config';
import '../ForgotPassword/forgetpassword.css'


const ResetPassword = () => {


    const [password, setpassword] = useState('')




    const resetPassword = () => {
        
        const token = new URLSearchParams(window.location.search).get("token");
        const email = new URLSearchParams(window.location.search).get("email");


        fetch(`${BaseUrl}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email,token:token,newPassword:password })
        }).then(res => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Password reset successfully')
                    setpassword('')
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

            <input value={password} placeholder='Password' onChange={(e) => setpassword(e.target.value)} />

            <button onClick={resetPassword}>Reset Password</button>
        </div>
        </div>
    )
}

export default ResetPassword