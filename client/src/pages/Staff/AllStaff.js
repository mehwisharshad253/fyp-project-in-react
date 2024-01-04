import { Space, Typography } from 'antd'
import React from 'react'
import AppHeader from '../../components/AdminDashboard/AppHeader'
import SideMenu from '../../components/AdminDashboard/SideMenu'
import AppFooter from '../../components/AdminDashboard/AppFooter'
import './Staff.css'

const AllStaff = () => {
  return (
    <div>
        <AppHeader/>
        <Space className='SideMenuAndPageContent'>
          <SideMenu/>
        <Typography.Title level={4}>Staff</Typography.Title>
        </Space>
        <AppFooter/>
    </div>
  )
}

export default AllStaff