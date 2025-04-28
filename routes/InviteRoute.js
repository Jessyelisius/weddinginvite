const express = require('express');
const inviteesModel = require('../model/invitees.model');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("inviteCard");
});

router.get('/invite', async(req, res) => {
    let username= req.query.username

    let getuser= await inviteesModel.findOne({FullName:username})

    if(!getuser)return res.status(404).render(404)

    res.render("invite",{username:username.toUpperCase()});
});

// Submit invitee

router.get('/inviteForm', (req, res) => {
    res.render('inviteForm', {message:''});
});

router.post('/invite', async (req, res) => {
  try {
    const { FullName, PhoneNo } = req.body;
    if (!FullName || !PhoneNo) {
      return res.status(400).render('inviteForm', { message: 'All fields are required.' });
    }

    const invitee = new inviteesModel({ FullName, PhoneNo });
    await invitee.save();

    res.redirect('viewInvite');
  } catch (error) {
    console.error(error);
    res.status(500).render('inviteForm',{ message: 'Server error.' });
  }
});

// View all invitees
router.get('/viewInvite', async (req, res) => {
  try {
    const invitees = await inviteesModel.find().sort({ createdAt: -1 });

    if (!invitees || invitees.length === 0) {
        return res.render('viewInvite', { message: "No invitees records found", invitees: [], link:process.env.weblink });
    }
    res.render('viewInvite',{invitees, message:null,link:process.env.weblink});
  } catch (error) {
    console.error(error);
    res.status(500).render('inviteForm', { message: 'Server error.', invitees: [],link:process.env.weblink});
  }
});


module.exports = router;