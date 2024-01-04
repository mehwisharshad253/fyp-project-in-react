// import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect ,setError} from 'react';
// import { BaseUrl } from '../../config';

const TeamCard = () => {
  const [staff,setStaff]=useState([]);
  const fetchStaff = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/staff');
      if (response.ok) {
        const data = await response.json();
        setStaff(data.staff);
      } else {
        throw new Error('Failed to fetch Staff');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const getSocialIcon = (type) => {
    switch (type) {
      case 0:
        return 'fab fa-twitter icon';
      case 1:
        return 'fab fa-facebook-f icon';
      case 2:
      return 'fab fa-instagram icon'
      case 3:
        return 'fab fa-tiktok icon'
        case 4: 
        return 'fab fa-instagram icon'
      // Add more cases for other social media types if needed
      default:
        return 'fab fa-globe'; // Default icon for unknown social media types
    }
  };


  return (
    <>
      {staff.map((val) => {
  console.log(val.accounts); // Check the structure of accounts object
  return (
    <div className='items shadow' key={val._id}>
      <div className='img'>
        <img src={val.StaffImage} alt='' />
        <div className='overlay'>
          {val.accounts.map((account, index) => (
            <a
              href={account.value} // Use account.value as the href
              target='_blank' // Opens the link in a new tab/window
              rel='noopener noreferrer' // Recommended for security reasons
              key={index}
            >
              <i className={getSocialIcon(index)}></i>
            </a>
          ))}
          {/* Add other social media links here */}
        </div>
      </div>
      <div className='details'>
        <h2>{val.StaffName}</h2>
        <p>{val.Position}</p>
      </div>
    </div>
  );
})}

    </>
  );
};

export default TeamCard;






{/* <i className='fab fa-facebook-f icon'></i>
<i className='fab fa-twitter icon'></i>
<i className='fab fa-instagram icon'></i>
<i className='fab fa-tiktok icon'></i> */}