import React, { useState } from 'react';
import { Button, Modal } from 'antd';

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Input } from 'antd';
import toast from 'react-hot-toast';



const { TextArea } = Input;
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};


function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const RatingModel = ({
    open,
    setOpen,
    courseId,
    reload
}) => {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [text, setText] = useState('')


    const user = localStorage.getItem('userDetails')

    const loggedUser = JSON.parse(user)


    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        // setModalText('The modal will be closed after two seconds');
        // setConfirmLoading(true);
        // setTimeout(() => {
        //     setOpen(false);
        //     setConfirmLoading(false);
        // }, 2000);
        setConfirmLoading(true);
        fetch(`http://localhost:5000/api/addrating/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: value,
                userId: loggedUser._id,
                text: text
            })
        }).then(res => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success(data.message)
                    setOpen()
                    setConfirmLoading(false)
                    setText("")
                    reload()
                } else {
                    toast.error(data.error)
                    setConfirmLoading(false)

                }
            }).catch(err => {
                setConfirmLoading(false)

                console.log(err)
            })



    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <Modal
            title="Give Rating"
            open={open}
            onOk={handleOk}
            okText="Rate Now"
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Rating
                    name="hover-feedback"
                    value={value}
                    size='large'
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}



            </Box>
            <div className='col-md-12'>

                <TextArea onChange={(e) => setText(e.target.value)} rows={4} placeholder="Write a review" maxLength={150} />
            </div>
        </Modal>
    );
};
export default RatingModel;