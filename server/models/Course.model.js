const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    courseName: {
        type: String,
    },
    courseImage: {
        type: String
    },
    Rating: {
        type: Array
    },
    price: {
        type: String
    },
    Lectures: {
        type: Number
    },
    courseImage: {
        type: String
    },
    enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Assuming you have a User model


}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})



module.exports = mongoose.model('courses', CourseSchema)