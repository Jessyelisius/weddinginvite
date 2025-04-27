const express = require('express');
const inviteesModel = require('../model/invitees.model');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("inviteCard");
});

// Submit invitee

router.get('/inviteForm', (req, res) => {
    res.render('inviteForm');
});

router.post('/invite', async (req, res) => {
  try {
    const { fullname, phoneno } = req.body;
    if (!fullname || !phoneno) {
      return res.status(400).render('inviteForm', { message: 'All fields are required.' });
    }

    const invitee = new inviteesModel({ fullname, phoneno });
    await invitee.save();

    res.redirect('viewInvite');
  } catch (error) {
    console.error(error);
    res.status(500).json('inviteForm',{ message: 'Server error.' });
  }
});

// View all invitees
router.get('/viewInvite', async (req, res) => {
  try {
    const invitees = await inviteesModel.find().sort({ createdAt: -1 });
    res.render(invitees);
  } catch (error) {
    console.error(error);
    res.status(500).render('inviteForm', { message: 'Server error.' });
  }
});


module.exports = router;