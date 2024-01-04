// import { Card, Space, Statistic, Typography } from 'antd'
import React , {useEffect , useState} from 'react'
import { FaUserGraduate } from 'react-icons/fa';
import { AiOutlineBook } from 'react-icons/ai';
import './Dashboard.css'
import Chart from '../../components/chart/Chart';
import { Userdata } from '../../dummydata';
import Widget from '../../widget/Widget';
import WidgetEmail from '../../WidgetEmail/WidgetEmail';
import { BaseUrl } from '../../config';



const Dashboard = () => {

   const [totalStudents, setTotalStudents] = useState(0);
   const [newStudents, setNewStudents] = useState(0);
   const[totalCourses,setTotalCourses]=useState(0);

   fetch(`${BaseUrl}/getadmissioncount`)
  .then((response) => response.json())
  .then((data) => {
    
    const admissionCount = data.count;
    setTotalStudents(admissionCount);
    setNewStudents(admissionCount);
  })
  .catch((error) => {
    
    console.error('Error fetching admission count:', error);
  });


  //fetch course count
  fetch(`${BaseUrl}/coursecount`)
  .then((response) => response.json())
  .then((data) => {
    const courseCount = data.Totalcourses;
    setTotalCourses(courseCount);
  })
  .catch((error) => {
    console.error('Error fetching course count:', error);
  });




  return (
    <>
      <div className="dashboard">
         <div className="dashboarditem">
            <span className="dashboardicon"><FaUserGraduate/></span>
            <span className="dashboardTitle">Total Students</span>
            <div className="dashboardstudentscontainer">
               <span className="dashboardstudents">{totalStudents}</span>
            </div>
            <span className="dashboardsub">Compare to last year</span>
         </div>
         <div className="dashboarditem">
            <span className="dashboardicon"><FaUserGraduate/></span>
            <span className="dashboardTitle">New Students</span>
            <div className="dashboardstudentscontainer">
               <span className="dashboardstudents">{newStudents}</span>
            </div>
            <span className="dashboardsub">Compare to last year</span>
         </div>
         <div className="dashboarditem">
            <span className="dashboardicon"><AiOutlineBook/></span>
            <span className="dashboardTitle">Course</span>
            <div className="dashboardstudentscontainer">
               <span className="dashboardstudents">{totalCourses}</span>
            </div>
         </div>
      </div>
      <Chart data={Userdata} title="University Survey" grid dataKey="Active User"/>
      <div className="dashboardWidgets">
         <Widget/>
         <WidgetEmail/>
      </div>
    </>
  )
}


export default Dashboard