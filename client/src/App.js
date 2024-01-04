import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/home/Home';
import About from './components/about/About';
import courseHome from './components/allcourses/courseHome';
import Team from './components/team/Team';
import Contact from './components/contact/Contact';
import Addmission from './components/addmission/Addmission';
import { Toaster } from 'react-hot-toast';
import Academic from './components/Academic/Academic';
import AdminDashboard from './components/AdminDashboard';
// import Dashboard from './components/AdminDashboard/Dashboard'; // Uncomment this line
import Eventmanagement from './pages/Eventmanagement/Eventmanagement';
import AllStaff from './pages/Staff/AllStaff';
import AllCourses from './pages/Courses/AllCourses';
import Students from './pages/Students/Students';
import Departments from './pages/Departments/Departments';
import Holidays from './pages/Holidays/Holidays';
import Logout from './pages/Logout/Logout';
import Dashboard from './pages/Dashboard/Dashboard';
import AddCourses from './pages/Courses/AddCourses';
import EditCourses from './pages/Courses/EditCourses';
import ChatboxIcon from './components/chatbox/ChatboxIcon';
import AllStudents from './pages/Students/Students';
import FeedbackForm from './components/Feedback/FeedbackForm';
import FeedBack from './pages/feedback/FeedBack';
// import addStaff from './pages/Staff/addStaff';
import Profile from './pages/Profile/Profile';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import editStaff from './pages/Staff/editStaff';
import AddStaff from './pages/Staff/addStaff';

const App = () => {



  return (
    <>
      <Toaster position='top-center' />
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/courses" exact component={courseHome} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/team" exact component={Team} />
          <Route path="/academic" exact component={Academic} />
          <Route path="/addmission" exact component={Addmission} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/feedbackForm" exact component={FeedbackForm} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/reset-password" exact component={ResetPassword} />

          {/* admin routes */}
          <Route path="/dashboard" exact component={AdminDashboard} />                 

          <Route path='/eventmanagement' exact component={Eventmanagement} />
          <Route path='/staff/allstaff' exact component={AllStaff}/>
          <Route path='/staff/addstaff' exact component={AddStaff} />
          <Route path='/staff/editstaff' exact component={editStaff} />
          <Route path='/courses/allcourses' exact component={AllCourses}/>
          <Route path='/students/allstudents' exact component={Students}/>
          <Route path='/courses/addcourses' exact component={AddCourses}/>
          <Route path='/courses/editcourses' exact component={EditCourses}/>
          <Route path='/departments' exact component={Departments}/>
          <Route path='/holidays' exact component={Holidays}/>
          <Route path='/feedback' exact component={FeedBack}/>
          <Route path='/logout' exact component={Logout}/>
          <Route path='/dashboard' exact component={Dashboard}/>
        </Switch>
    {/* <AdminDashboard/> */}
      </Router>

    </>
  )
}

export default App;