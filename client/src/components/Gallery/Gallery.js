import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './gallery.css'
import img1 from './img/img1.jpg'
import img2 from './img/img2.avif'
import img3 from './img/img3.jpg'
import img4 from './img/img4.avif'
import img5 from './img/img5.avif'
import img6 from './img/img6.jpg'

const Gallery = () => {
    let data=[
        {
            id:1,
            imgSrc:img1
        },
        {
            id:2,
            imgSrc:img2
        },
        {
            id:3,
            imgSrc:img3
        },
        {
            id:4,
            imgSrc:img4
        },
        {
            id:5,
            imgSrc:img5
        },
        {
            id:6,
            imgSrc:img6
        }
    ]
    const [model,setModel]=useState(false);
    const [tempimgSrc,setTempImgSrc]=useState('');
    const getImg=(imgSrc)=>{
     setTempImgSrc(imgSrc);
     setModel(true);
    }

  return (
    <>
    <div className={model? 'model open':"model"}>
        <img src={tempimgSrc} />
        <CloseIcon onClick={()=> setModel(false)} />
    </div>
      <div className='gallery'>
        {
            data.map((item,index)=>{
                return(
                   <div className='pics' key={index} onClick={()=>getImg(item.imgSrc)}>
                       <img src={item.imgSrc} style={{width:'100%'}} />
                   </div>
                )
            })
        }
      </div>
    </>
  )
}

export default Gallery
