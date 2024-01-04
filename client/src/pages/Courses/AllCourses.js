import { Space} from 'antd'
import React from 'react'
import AppHeader from '../../components/AdminDashboard/AppHeader'
import SideMenu from '../../components/AdminDashboard/SideMenu'
import AppFooter from '../../components/AdminDashboard/AppFooter'
import './courses.css'

const AllCourses = () => {
  return (
    <div>
        <AppHeader/>
        <Space className='SideMenuAndPageContent'>
          <SideMenu/>
        <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light m-3">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Courses</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <form className="d-flex">
      <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/">Courses</a></li>
    <li class="breadcrumb-item" aria-current="page"><a href="/">AllCourses</a></li>
  </ol>
</nav>
      </form>
    </div>
  </div>
</nav>

   <form action="#">
   <div className="row">
  <div className="col">
    <input type="text" className="form-control" placeholder="course name" aria-label="Course name"/>
  </div>
  <div class="col">
    <input type="number" className="form-control" placeholder="course Price" aria-label="Course Price"/>
  </div>
</div>
<div className="row">
  <div className="col">
  <input type="file" className="dropify" data-default-file="" />
  </div>
</div>
<div className="row">
  <div className="col">
    <button className='btn btn-success mx-1'>Submit</button>
    <button className='btn btn-primary'>Cancel</button>
  </div>
</div>
   </form>
        </div>
        </Space>
        <AppFooter/>
    </div>
  )
}

export default AllCourses