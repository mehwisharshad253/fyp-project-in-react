const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../keys')
const User = require('../models/User.model')
const router = express.Router()
var randomstring = require("randomstring");
const nodemailer = require('nodemailer');



router.post('/signup', async (req, res) => {

    const { name, email, password, phoneNumber, gender } = req.body;

    try {
        const user = new User({ name, email, password, phoneNumber, gender });
        await user.save();
        const token = jwt.sign({ userId: user._id }, jwtkey)
        res.status(200).send({ success: true, token, user })

    } catch (err) {
        return res.status(422).send(err.message)
    }

})



router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).send({ error: "must provide email or password" })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(422).send({ error: "user not found" })
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, jwtkey)
        res.status(200).send({ success: true, token, user })
    } catch (err) {
        return res.status(422).send({ error: "must provide email or password" })
    }
})





router.get('/getallusers', async (req, res) => {
    try {
        const allStaff = await User.find();
        res.status(200).send({ success: true, users: allStaff });
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while fetching the Users' });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const allStaff = await User.findById({ _id: id });
        res.status(200).send({ success: true, user: allStaff });
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while fetching the Users' });
    }
});


router.post('/create-facility-user', async (req, res) => {
    const { name, email, password, phoneNumber, gender } = req.body;

    try {

        const findd = User.findOne({ email })
        if (findd) {
            res.status(422).json({ success: false, message: "User already exits" })
        }
        // Create a new user with the "facility" role
        const user = new User({ name, email, password, phoneNumber, gender, role: 'faculty' });
        await user.save();
        const token = jwt.sign({ userId: user._id }, jwtkey);
        res.status(200).send({ success: true, token, user });
    } catch (err) {
        return res.status(422).send(err.message);
    }
});



const sendResetPasswordEmail = async (email, resetToken,req) => {
    // Create a nodemailer transporter (replace with your email provider's settings)
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service
        auth: {
            user: 'heritageelms@gmail.com',
            pass: 'jfdl oziq nknw ovbj'
        }
    });

    // Define email content
    const mailOptions = {
        from: 'heritageelms@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: ${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}&email=${email}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};




// Route for sending a password reset email
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Generate a unique token for password reset
        const resetToken = randomstring.generate({ length: 20 });

        // Set the reset token and expiration time for the user
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Set expiration to 1 hour from now

        // Save the user with the updated reset token
        await user.save();

        // Send an email to the user with a link to reset their password
        await sendResetPasswordEmail(user.email, resetToken,req);

        res.status(200).json({ success: true, message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while processing the request' });
    }
});

// Add a route for resetting the password (after clicking the link in the email)
router.post('/reset-password', async (req, res) => {
    const { email, token, newPassword } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the reset token is valid and not expired
        if (user.resetToken !== token || user.resetTokenExpiration < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        // Update the user's password and clear the reset token fields
        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        // Save the updated user
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while processing the request' });
    }
});




module.exports = router