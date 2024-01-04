const mongoose = require('mongoose')

const StaffSchema = mongoose.Schema({
    StaffImage: {
        type: String
    },
    accounts: {
        type: Array
    },
    StaffName: {
        type: String,
    },
    Position: {
        type: String
    },

}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})



module.exports = mongoose.model('Staff', StaffSchema)