const express = require('express');
const router = express.Router();
const WebAppModel = require('../models/webapp');


//find all webapps in db
router.get('/webapp', async (req, res) => {
	const webapp = await WebAppModel.find();
	res.send(webapp);
});

//find by url one webapps
router.get('/:url', async (req, res) => {
	const { url } = req.params;
	if (!url) {
		return res.sendStatus(400); // bad request
	}
	const WebApp = await WebAppModel.findOne({ url: url  },function (err,User){
		if (err) return res.sendStatus(500);	
		
	});
	if (!WebApp) {
		return res.sendStatus(404); // not found
	}
	res.send(WebApp);
});

//make new webapps
router.post('/', async (req, res) => {
	const fields = req.body;
	if (!fields) return res.sendStatus(400);

	const check = await WebAppModel.findOne({ url: fields.url });
	if(check) {
		return res.status(500).send({
			success: false,
			message: 'url Already In Use!'
		});
	}
	try {
		const WebApp = await WebAppModel.create({platform : fields.platfrom,appName : fields.appName,url : fields.url,email : fields.email});
		res.send(WebApp);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
});

//delete webapps by url 
router.delete('/:url', async (req, res) => {
	const { url } = req.params;
	if (!url) {
		return res.sendStatus(400); // bad request
	}
	const check = await WebAppModel.findOne({ url: url });
	if(!check) {
		return res.status(500).send({
			success: false,
			message: ' url Not Found!'
		});
	}
	
	try{
		const webapps = await WebAppModel.findOneAndDelete({url:url});
		res.send(webapps);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
});

//update webapps make chenge by url in put.
router.put('/:url', async (req, res) => {
	const { url } = req.params;
	if (!url) {
		return res.sendStatus(400); // bad request
	}
	const fields = req.body;
	const WebApp = await WebAppModel.findOneAndUpdate({url:url}, fields, { new: true,useFindAndModify:false });
	if (!WebApp) 
		return res.status(500).send({
			success: false,
			message: ' url Not Found!'
		});
	res.send(WebApp);
});



module.exports = router;