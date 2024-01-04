import React from 'react'
import { Space } from 'antd'
import SideMenu from '../../components/AdminDashboard/SideMenu'
import Typography from 'antd/es/typography/Typography'
import AppHeader from '../../components/AdminDashboard/AppHeader'
import AppFooter from '../../components/AdminDashboard/AppFooter'

const Eventmanagement = () => {
  return (
    <div>
       <AppHeader/>
       <Space className="SideMenuAndPageContent">
        <SideMenu/>
        <Typography>Eventmanagement</Typography>
       </Space>
       <AppFooter/>
    </div>
  )
}

export default Eventmanagement