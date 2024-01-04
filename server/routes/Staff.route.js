
const express = require('express')
const StaffSchema = require('../models/StaffModals')
const Router = express.Router()
const cors = require('cors');
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

Router.get('/staff', async (req, res) => {
    try {
      const allStaff = await StaffSchema.find();
      res.status(200).send({ success: true, staff: allStaff });
    } catch (error) {
      res.status(500).send({ success: false, message: 'An error occurred while fetching the Staff' });
    }
  });
  


// adding new course

Router.post('/addstaff',upload.single('StaffImage'), async (req, res) => {
    const { StaffName, accounts, Position } = req.body
    const img = req.file.path

    console.log(req.body)
    try {
        const newStaff = new StaffSchema({
          StaffName,
          accounts: accounts.map((accountString) => JSON.parse(accountString)),
          Position,
          StaffImage:`${req.protocol}://${req.get('host')}/${img}`
        });
      
        await newStaff.save();
      
        res.status(200).send({ success: true, newStaff });
      } catch (error) {
        console.error('Error saving staff:', error);
        res.status(500).send({ success: false, error: 'Internal Server Error' });
      }      
})



// updating new course
Router.put('/Staff/:id', async (req, res) => {
    const { id } = req.params;
    const { StaffName, accounts, Position, StaffImage } = req.body;

    try {
        const updatedStaff = await StaffSchema.findByIdAndUpdate(
            id,
            { StaffName, accounts, Position, StaffImage },
            { new: true }
        );

        if (!updatedStaff) {
            res.status(404).send({ success: false, message: 'Staff not found' });
        } else {
            res.status(200).send({ success: true, updatedStaff });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while updating the Staff' });
    }
});




// delete course

Router.delete('/staff/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStaff = await StaffSchema.findOneAndDelete({ _id: id });

        if (!deletedStaff) {
            res.status(404).send({ success: false, message: 'Staff not found' });
        } else {
            res.status(200).send({ success: true, message: 'Staff deleted successfully' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'An error occurred while deleting the Staff' });
    }
});








module.exports = Router