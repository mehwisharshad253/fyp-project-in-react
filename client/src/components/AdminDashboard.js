import React from 'react'
import { Space } from 'antd'
import AppHeader from './AdminDashboard/AppHeader'
import AppFooter from './AdminDashboard/AppFooter'
import SideMenu from './AdminDashboard/SideMenu'
import PageContent from './AdminDashboard/PageContent'
import './Admindashboard.css' 

const AdminDashboard = () => {
  return (
    <>
    <div className="App">
      <AppHeader/>
      <Space className='SideMenuAndPageContent'>
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
      <AppFooter/>
    </div>
    </>
  )
}

export default AdminDashboard