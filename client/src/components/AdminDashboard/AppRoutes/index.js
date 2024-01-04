import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Dashboard from '../../../pages/Dashboard/Dashboard'
import Staff from '../../../pages/Staff/Staff'
import Students from '../../../pages/Students/Students'
import Courses from '../../../pages/Courses/Courses'
import Departments from '../../../pages/Departments/Departments'
import Holidays from '../../../pages/Holidays/Holidays'
import Logout from '../../../pages/Logout/Logout'
// import AllStudents from '../../../pages/Students/Students'
import FeedBack from '../../../pages/feedback/FeedBack'

const AppRoutes = () => {
  return (
    <div className='AppRoutes'>
      <BrowserRouter>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/staff' element={<Staff/>}></Route>
        <Route path='/students' element={<Students/>}></Route>
        <Route path='/courses' element={<Courses/>}></Route>
        <Route path='/departments' element={<Departments/>}></Route>
        <Route path='/holidays' element={<Holidays/>}></Route>
        <Route path='/feedback' element={<FeedBack/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes