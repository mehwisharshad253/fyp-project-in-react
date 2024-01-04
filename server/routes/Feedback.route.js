


const express = require('express')
const router = express.Router()
const Feedback = require('../models/Feedback.model')

router.post('/add-feedback', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the data (you can add more validation as needed)
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message' });
  }

  try {
    // Create a new feedback document using the Feedback model
    const feedback = new Feedback({ name, email, message });

    // Save the feedback document to the database
    await feedback.save();

    res.status(201).json({ message: 'Feedback added successfully', feedback });
  } catch (err) {
    console.error(`Error adding feedback: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET route to retrieve all feedback
router.get('/get-feedback', async (req, res) => {
  try {
    // Find all feedback documents in the database
    const feedbackList = await Feedback.find();

    res.status(200).json({ feedbackList });
  } catch (err) {
    console.error(`Error retrieving feedback: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
