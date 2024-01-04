import React from 'react'
// import AppRoutes from '../AppRoutes'
import Dashboard from '../../../pages/Dashboard/Dashboard'
import DashChatboxIcon from '../DashboardChatbox/DashChatboxIcon'
// import Staff from '../../../pages/Staff/Staff'

const PageContent = () => {
  return (
    <div className='PageContent'>
      <Dashboard/>
      {/* <AppRoutes/> */}
      <DashChatboxIcon/>
    </div>
  )
}

export default PageContent