const express = require('express')
const app = express()
const PORT = 5000 || process.env.PORT;
const cors = require('cors')
const loginRoutes = require('./routes/Login.route')
const admissionRoutes = require('./routes/Admission.Route')
const courseRoute = require('./routes/Course.Route')
const staffRoute = require('./routes/Staff.route');
const newsRoute = require('./routes/NewsUpdates.route');
const feedbackRoute = require('./routes/Feedback.route');
const mongoose = require('mongoose');
const { mogoUrl } = require('./keys');
const path = require('path');
var nodemailer = require('nodemailer');


mongoose.connect(mogoUrl)
    .then(() => {
        console.log('database connected')
    }).catch(err => {
        console.log(err)
    })

// using middlewares 
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use('/uploads', express.static('./uploads'));


app.use('/api', loginRoutes)
app.use('/api', admissionRoutes)
app.use('/api', courseRoute)
app.use('/api', staffRoute)
app.use('/api', newsRoute)
app.use('/api', feedbackRoute)





app.get('/', (req, res) => {
    res.send('hello from server')
})



app.post('/api/send-mail', (req, res, next) => {

    const { message, subject, email } = req.body

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'heritageelms@gmail.com',
            pass: 'jfdl oziq nknw ovbj'
        }
    });

    var mailOptions = {
        from: 'heritageelms@gmail.com',
        to: email,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false, error: error })
        } else {
            res.status(200).json({ success: true, messgae: 'Send successfully' })
        }
    });

})

// listening server on portt 5000

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})