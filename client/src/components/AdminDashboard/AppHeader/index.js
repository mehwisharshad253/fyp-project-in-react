import React, { useEffect, useState } from 'react';
import { Image, Typography, Space, Badge, Drawer, List } from 'antd';
import { MailOutlined, BellFilled, LogoutOutlined } from '@ant-design/icons';
import MyModal from '../../ShowModal';
import { BaseUrl } from '../../../config';

const AppHeader = () => {
  const [showModal, setShowModal] = useState(false);

  // Start Modal
  const closeModal = () => setShowModal(false);
  // End Modal

  const [admissionList, setAdmissionList] = useState([]);
  const [selectedObj, setSelectedObj] = useState({});
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedbackList, setNewFeedbackList] = useState([]);

  // Define getFeedbackList before using it in the useEffect dependency array
  const getFeedbackList = () => {
    fetch(`${BaseUrl}/get-feedback`) // this is post request dear mehwish
      .then((res) => res.json())
      .then((data) => {
        setFeedbackList(data.feedbackList);
        
        // Filter new feedback by comparing with the existing feedback list
        const newFeedback = data.feedbackList.filter((feedback) => !feedbackList.some((existingFeedback) => existingFeedback._id === feedback._id));
        setNewFeedbackList(newFeedback);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAdmissionList();
    getFeedbackList();

    // getEmail().then(res => {
    //   setEmail(res.comments.length);
    // });

    // Removed 'getComments()' as it was unused and not defined
  }, []); // Added 'getFeedbackList' to the dependency array

  const getAdmissionList = () => {
    fetch(`${BaseUrl}/admisson`)
      .then(res => res.json())
      .then((data) => {
        let filtered = data.admission.filter(adm => adm.status === 'pending');
        setAdmissionList(filtered);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className='AppHeader'>
      <Image
        width={40}
        src="https://scontent.flhe7-2.fna.fbcdn.net/v/t39.30808-6/217483582_100754308963930_8976996361540997892_n.png?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PwP_p9ujUn8AX-o6JiF&_nc_ht=scontent.flhe7-2.fna&oh=00_AfASWJWm_HQxjtOKH5En1Z4OnInntzgp4yZXisc6FLfidA&oe=648B9964"
      />
      <Typography.Title style={{ color: 'white' }}>Admin Dashboard</Typography.Title>
      <Space>
        <Badge count={admissionList.length}>
          <MailOutlined
            style={{ fontSize: 24, color: 'white' }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge>
          <BellFilled
            style={{ fontSize: 24, color: 'white' }}
            onClick={() => {
              setNotificationOpen(true);
            }}
          />
        </Badge>
        <LogoutOutlined
          onClick={() => {
            localStorage.clear()
            window.location.href = '/'
          }} style={{ fontSize: 24, color: 'white', marginLeft: 10, cursor: 'pointer' }} />
      </Space>
      <Drawer title="Emails" open={commentsOpen} onClose={() => setCommentsOpen(false)} maskClosable >
        {showModal && <MyModal reload={() => getAdmissionList()} item={selectedObj} closeModal={closeModal} />}
        <List dataSource={admissionList} renderItem={(item) => {
          return <List.Item>
            <Typography.Link
              onClick={() => {
                console.log(item._id)
                setSelectedObj(item)
                setShowModal(true)
              }}>
              {`${item.name} Send Addmission Application`}</Typography.Link>

          </List.Item>
        }}></List>
      </Drawer>
      <Drawer title="Notifications" open={notificationOpen} onClose={() => setNotificationOpen(false)} maskClosable >
        {/* Display new feedback notifications */}
        <List dataSource={newFeedbackList} renderItem={(item) => {
          return <List.Item>
            <Typography.Text>
              {`${item.name} sent feedback`}
            </Typography.Text>
          </List.Item>
        }}></List>
      </Drawer>
    </div>
  );
};

export default AppHeader;

