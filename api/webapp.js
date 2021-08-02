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
	const WebApp = await WebAppModel.findOne({ email  },function (err,User){
		if (err) return res.sendStatus(500);	
		if (!WebApp) {
			return res.sendStatus(404); // not found
		}
	});
	res.send(WebApp);
});

//make new webapps
router.post('/', async (req, res) => {
	const fields = req.body;
	const check = await WebAppModel.findOne({ email: fields.email });
	if(check) {
		return res.status(500).send({
			success: false,
			message: 'User Already In Use!'
		});
	}
	try {
		const WebApp = await WebAppModel.create(fields);
		res.send(WebApp);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
});

//delete webapps by email 
router.delete('/:email', async (req, res) => {
	const check = await WebAppModel.findOne({ email: req.params.email });
	if(!check) {
		return res.status(500).send({
			success: false,
			message: ' Webapp Not Found!'
		});
	}
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	try{
		const webapps = await WebAppModel.findOneAndDelete({email:email});
		res.send(webapps);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
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