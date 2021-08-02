const express = require('express');
const router = express.Router();
const msgModel = require('../models/msg');

//find all msg in db
router.get('/msg', async (req, res) => {
	const msg = await msgModel.find();
	res.send(msg);
});

//find by email one msg
router.get('/:email', async (req, res) => {
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	const emailmsg = await msgModel.findOne({ email }, function (err,User){
		if (err) return res.sendStatus(500);		
	});
	if (!emailmsg) return res.sendStatus(404); // not found
	res.send(emailmsg);
});

//make new msg
router.post('/', async (req, res) => {
	const fields = req.body;
	const check = await msgModel.findOne({ email: fields.email });
	if(check) {
		return res.status(500).send({
			success: false,
			message: 'User Already In Use!'
		});
	}
	try {
		const msg = await msgModel.create({name : fields.name, email : fields.email, message : fields.message});
		res.send(msg);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
});


//update msg make chenge by email in put.
router.put('/:email', async (req, res) => {
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	const fields = req.body;
	try {
		const msg = await msgModel.findOneAndUpdate({email:email}, fields, { new: true ,useFindAndModify:false });
		res.send(msg);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
});

//delete msg by email delete 
router.delete('/:email', async (req, res) => {
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	const check = await msgModel.findOne({ email: email });
	if(!check) {
		return res.status(500).send({
			success: false,
			message: 'User Not Found!'
		});
	}

	const msg_contact= await msgModel.findOneAndDelete({ email: email });
	res.send(msg_contact);
});

module.exports = router;