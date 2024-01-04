


const express = require('express')
const NewsUpdates = require('../models/NewsandUpdates.model')
const router = express.Router()





// get all course

router.get('/getallnews', async (req, res) => {
  try {
    const Allnews = await NewsUpdates.find();
    res.status(200).send({ success: true, news: Allnews });
  } catch (error) {
    res.status(500).send({ success: false, message: 'An error occurred while fetching the Staff' });
  }
});

router.post('/news', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newobj = new NewsUpdates({
      title,
      description
    })
     await newobj.save();
    res.status(200).send({ success: true, news: newobj });
  } catch (error) {
    res.status(500).send({ success: false, message: 'An error occurred while fetching the Staff' });
  }
});


// Update news
router.put('/update-news/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description,enable } = req.body;

  try {
    const updatedNews = await NewsUpdates.findByIdAndUpdate(id, { title, description,enable}, { new: true });

    if (!updatedNews) {
      return res.status(404).send({ success: false, message: 'News not found' });
    }

    res.status(200).send({ success: true, updatedNews });
  } catch (error) {
    res.status(500).send(error);
  }
});



// Delete news
router.delete('/delete-news/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNews = await NewsUpdates.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).send({ success: false, message: 'News not found' });
    }

    res.status(200).send({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
