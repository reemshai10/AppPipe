const express = require('express');
const router = express.Router();
const WebAppModel = require('../models/webapp');


//find all webapps in db
router.get('/webapp', async (req, res) => {
	const webapp = await WebAppModel.find();
	res.send(webapp);
});

//find by email one webapps
router.get('/:email', async (req, res) => {
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	const WebApp = await WebAppModel.findOne({ email });
	
	if (!WebApp) {
		return res.sendStatus(404); // not found
	}
	res.send(WebApp);
});

//make new webapps
router.post('/', async (req, res) => {
	const fields = req.body;
	try {
		const WebApp = await WebAppModel.create(fields);
		res.send(WebApp);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
});

//delete webapps by email delete all msg
router.delete('/:email', async (req, res) => {
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	await WebAppModel.findOneAndDelete({ WebAppModel: email });
	res.sendStatus(200);
});

//update webapps make chenge by email in put.
router.put('/:email', async (req, res) => {
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	const fields = req.body;
	try {
		const WebApp = await WebAppModel.findOneAndUpdate(email, fields, { new: true });
		res.send(WebApp);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
});



module.exports = router;