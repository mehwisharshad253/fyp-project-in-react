const express = require('express')

const router = express.Router()
const multer = require('multer');
const path = require('path');
const Admission = require('../models/Admission.model');
const User = require('../models/User.model');
const nodemailer = require('nodemailer');



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



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'heritageelms@gmail.com',
        pass: 'pac9#YLa.y*I*j@',
    },
    logger: true, // Enable logging
    debug: true, // Enable debug output
});



// File upload middleware
const upload = multer({ storage });

// POST route for admission form submission
router.post('/admission', upload.fields([
    { name: 'id_card_pic', maxCount: 1 },
    { name: 'picture_passport', maxCount: 1 },
    { name: 'matric_result', maxCount: 1 },
    { name: 'father_id_card', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
    { name: 'intermediate_result', maxCount: 1 }
]), async (req, res) => {
    // Handle form submission and file uploads
    const admissionData = req.body;



    // Retrieve file paths from req.files

    const idCardPic = req.files['id_card_pic'][0].path;
    const picturePassport = req.files['picture_passport'][0].path;
    const matricResult = req.files['matric_result'][0].path;
    const fatherIdCard = req.files['father_id_card'][0].path;
    const intermediate_result = req.files['intermediate_result'][0].path;
    const certificate = req.files['certificate'][0].path;

    // Create a new Admission document
    const admission = new Admission({
        user_id: admissionData.user_id,
        name: admissionData.name,
        father_name: admissionData.father_name,
        dateofbirth: admissionData.dateofbirth,
        cnic: admissionData.cnic,
        gender: admissionData.gender,
        status: admissionData.status,
        religion: admissionData.religion,
        interMarks: admissionData.interMarks,
        matricMarks: admissionData.matricMarks,
        matric_result: `${req.protocol}://${req.get('host')}/${matricResult}`,
        father_id_card: `${req.protocol}://${req.get('host')}/${fatherIdCard}`,
        certificate: `${req.protocol}://${req.get('host')}/${certificate}`,
        email: admissionData.email,
        id_card_pic: `${req.protocol}://${req.get('host')}/${idCardPic}`,
        phone_number: admissionData.phone_number,
        other_mobile_number: admissionData.other_mobile_number,
        department: admissionData.department,
        intermediate_result: `${req.protocol}://${req.get('host')}/${intermediate_result}`,
        picture_passport: `${req.protocol}://${req.get('host')}/${picturePassport}`
    });
 
    try {
        // Save the admission document to the database
        await admission.save();

        // User.findByIdAndUpdate({ _id: admissionData.user_id })
        const updatedNews = await User.findByIdAndUpdate(admissionData.user_id, { isAdmited: true }, { new: true });
        console.log('edhr tak gy ho?')


        res.status(200).json({ success: true, message: 'Admission submitted successfully', user: updatedNews });
    } catch (error) {
        res.status(500).json({ success: false, error: 'An error occurred while saving the admission', msg: error });
    }
});



router.get('/admisson', async (req, res) => {
    try {
        const allAdmission = await Admission.find();
        res.status(200).send({ success: true, admission: allAdmission, count: allAdmission.length });
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while fetching the admission' });
    }
})


//return number of admissions 
// counting of admissions


router.get('/getadmissioncount', async (req, res) => {
    try {
        const allAdmission = await Admission.find();
        res.status(200).send({ success: true, count: allAdmission.length });
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while fetching the admission' });
    }
})



router.get('/getgraphdata', async (req, res) => {
    try {
        const allAdmission = await Admission.find();
        console.log(allAdmission);
        const monthlyData = {};
        allAdmission.forEach(admission => {
            const month = new Date(admission.created_at).getMonth() // Get the month (0-indexed)
            const monthName = getMonthName(month); // Helper function to get the month name
            if (!monthlyData[monthName]) {
                monthlyData[monthName] = 0;
            }
            monthlyData[monthName] += 1; // Increment the count for the month
        });

        console.log(monthlyData)

        const graphData = Object.entries(monthlyData).map(([name, count]) => {
            return {
                name,
                "Active User": count
            };
        });

        res.status(200).send({ success: true, data: graphData });
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while fetching the data', error });
    }
});

// Helper function to get the month name based on index
function getMonthName(monthIndex) {
    const monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[monthIndex];
}




// PUT route for updating admission status
router.put('/admission/:id/status', async (req, res) => {
    const admissionId = req.params.id;
    const newStatus = req.body.status;

    try {
        // Find the admission document by ID
        const admission = await Admission.findById(admissionId);

        if (!admission) {
            // Admission not found
            return res.status(404).json({ success: false, message: 'Admission not found' });
        }

        // Update the status
        admission.status = newStatus;
        admission.dateofapproved = Date.now();

        // Save the updated admission document
        await admission.save();
        sendEmail(admission.email)
        res.status(200).json({ success: true, message: 'Admission status updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'An error occurred while updating the admission status' });
    }
});


const sendEmail = (email) => {
    const mailOptions = {
        from: 'heritageelms@gmail.com', // Sender's email address
        to: email, // Recipient's email address
        subject: 'Test Email from Node.js', // Subject of the email
        text: 'This is a test email sent from Node.js.', // Plain text version of the email
        html: '<p>This is a test email sent from <b>Node.js</b>.</p>', // HTML version of the email (optional)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}




module.exports = router