import React, { useEffect, useState } from 'react';
import './WidgetEmail.css';
import { BaseUrl } from '../config';

const WidgetEmail = () => {
  const Button = ({ type }) => {
    return <button className={'widgetEmailButton' + type}>{type}</button>;
  };

  useEffect(() => {
    getAdmissionList();
  }, []);

  const [admissionList, setAdmissionList] = useState([]);

  const getAdmissionList = () => {
    fetch(`${BaseUrl}/admisson`)
      .then((res) => res.json())
      .then((data) => {
        setAdmissionList(data.admission);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formetDate = (date) => {
    let result;
    let fd = new Intl.DateTimeFormat('en-us', {
      dateStyle: 'medium',
    });
    result = fd.format(date);
    return result;
  };

  return (
    <div className='WidgetEmail'>
      <h3 className='widgetEmailTitle'>Approved & Decline Email</h3>
      <div className='widgetEmailTableContainer'>
        <table className='widgetEmailTable'>
          <thead>
            <tr className='widgetEmailTr'>
              <th className='widgetEmailTh'>Students</th>
              <th className='widgetEmailTh'>Date</th>
              <th className='widgetEmailStatus'>Status</th>
            </tr>
          </thead>
          <tbody>
            {admissionList.map((item, index) => (
              <tr className='widgetEmailTr m-3' key={index}>
                <td className='widgetEmailUser'>
                  <img
                    src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80'
                    alt=''
                    className='widgetEmailImg'
                  />
                  <span className='widgetEmailName'>{item.name}</span>
                </td>
                <td className='widgetEmailDate'>{formetDate(item.dateofapproved)}</td>
                <td className='widgetEmailButton'>{item.status.toUpperCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WidgetEmail;
