import { Space } from 'antd'
import React from 'react'
import AppHeader from '../../components/AdminDashboard/AppHeader'
import SideMenu from '../../components/AdminDashboard/SideMenu'
import AppFooter from '../../components/AdminDashboard/AppFooter'
import Widget from '../../widget/Widget'
import WidgetEmail from '../../WidgetEmail/WidgetEmail'
import './Students.css'

const AllStudents = () => {
  return (
    <div>
        <div>
       <AppHeader/>
       <Space className="SideMenuAndPageContent">
        <SideMenu/>
        
       </Space>
       <AppFooter/>
    </div>
    </div>
  )
}

export default AllStudents