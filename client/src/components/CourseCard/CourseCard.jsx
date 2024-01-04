import React, { useState } from 'react'
import CourseSingleCard from '../common/Card/Card'
import RatingModel from '../common/RatingModel/RatingModel'

const CourseCard = ({
    courses,
    reload
}) => {

    const [modelVisible, setModalVisible] = useState(false)
    const [courseId, setcourseId] = useState(null)

    return (
        <div className="container grid2">
            {courses.map((course, index) => (
                <CourseSingleCard
                    id={course._id}
                    title={course.courseName}
                    imageUrl={course.courseImage}
                    price={course.price}
                    rating={course.Rating}
                    setcourseId={(id) => setcourseId(id)}
                    openModel={() => setModalVisible(true)}
                    isButtonVisible={true}
                />
            ))}



            <RatingModel reload={reload} courseId={courseId} open={modelVisible} setOpen={() => setModalVisible(false)} />

        </div>
    )
}

export default CourseCard