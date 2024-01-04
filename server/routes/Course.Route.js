
const express = require('express')
const CourseSchema = require('../models/Course.model')
const Rating = require('../models/Rating.model')
const Router = express.Router()
const multer = require('multer');
const path = require('path');

// Create storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

// get all course

Router.get('/courses', async (req, res) => {
    try {
        const allCourses = await CourseSchema.find();
        res.status(200).send({ success: true, courses: allCourses });
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while fetching the courses' });
    }
});

// returing number of courses 
// length of courses
Router.get('/coursecount', async (req, res) => {
    try {
        const allCourses = await CourseSchema.find();
        res.status(200).send({ success: true, Totalcourses: allCourses.length });
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while fetching the courses' });
    }
});



// adding new course

Router.post('/addcourse', upload.single('image'), async (req, res, next) => {
    const { courseName, Rating, price, Lectures } = req.body
    const courseImage = req.file.path

    try {

        const newCourse = new CourseSchema({
            courseName,
            Rating,
            price,
            Lectures,
            courseImage: `${req.protocol}://${req.get('host')}/${courseImage}`
        })

        newCourse.save()

        res.status(200).send({ success: true, newCourse, message: 'Course Created Successfully' })

    } catch (error) {
        res.status(500).send(error)
    }
    // next()
})



// updating new course
Router.put('/course/:id', async (req, res) => {
    const { id } = req.params;
    const { courseName, Rating, price, Lectures } = req.body;

    try {
        const updatedCourse = await CourseSchema.findByIdAndUpdate(
            id,
            { courseName, Rating, price, Lectures },
            { new: true }
        );

        if (!updatedCourse) {
            res.status(404).send({ success: false, message: 'Course not found' });
        } else {
            res.status(200).send({ success: true, updatedCourse });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while updating the course' });
    }
});



// delete course

Router.delete('/course/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await CourseSchema.findOneAndDelete({ _id: id });

        if (!deletedCourse) {
            res.status(404).send({ success: false, message: 'Course not found' });
        } else {
            res.status(200).send({ success: true, message: 'Course deleted successfully' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while deleting the course' });
    }
});



Router.post('/addrating/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    // const userId = req.body.userId; // Assuming you have user authentication in place
    const { rating, userId, text } = req.body;

    try {
        // Find the course by its ID
        const course = await CourseSchema.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Validate the rating value (you can add more validation as needed)
        //   if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        //     return res.status(400).json({ error: 'Invalid rating value' });
        //   }

        // Check if the user has already rated this course
        const existingRating = await Rating.findOne({ userId, courseId,text });

        if (existingRating) {
            return res.status(400).json({ error: 'User has already rated this course' });
        }
        

        // Create a new rating document
        const newRating = new Rating({ userId, courseId, rating,text });

        course.Rating.push(userId);
        // Save the new rating
        await newRating.save();

        // Save the updated course
        await course.save();

        res.status(200).json({ success: true, newRating, message: 'Rating added successfully' });
    } catch (error) {
        console.error(`Error adding rating: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});


Router.post('/enroll/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    const { userId } = req.body;

    try {
        // Find the course by its ID
        const course = await CourseSchema.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the user has already enrolled in the course
        if (course.enrolledUsers.includes(userId)) {
            return res.status(400).json({ error: 'User is already enrolled in this course' });
        }

        // Add the user to the list of enrolled users for the course
        course.enrolledUsers.push(userId);

        // Save the updated course
        await course.save();

        res.status(200).json({ success: true, message: 'Enrolled in the course successfully' });
    } catch (error) {
        console.error(`Error enrolling in the course: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});



Router.get('/mycourses/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find courses where the user is enrolled
        const enrolledCourses = await CourseSchema.find({ enrolledUsers: userId });

        if (enrolledCourses.length == 0) {
            res.status(404).json({ success: true, message: 'You have not enrolled on any course' })
        }

        res.status(200).json({ success: true, courses: enrolledCourses });
    } catch (error) {
        console.error(`Error fetching user's courses: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = Router