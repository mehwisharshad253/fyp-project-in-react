const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    father_name: {
        type: String
    },
    dateofbirth: {
        type: String
    },
    cnic: {
        type: String
    },
    gender: {
        type: String
    },
    religion: {
        type: String
    },
    matric_result: {
        type: String
    },
    father_id_card: {
        type: String
    },
    certificate: {
        type: String
    },
    email: {
        type: String
    },
    id_card_pic: {
        type: String
    },
    phone_number: {
        type: String
    },
    other_mobile_number: {
        type: String
    },
    department: {
        type: String
    },
    intermediate_result: {
        type: String
    },
    picture_passport: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    },
    dateofapproved: {
        type: String,

    },
    matricMarks: {
        type: String,

    },
    interMarks: {
        type: String,

    }

}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

module.exports = mongoose.model('Admission', AdmissionSchema);
