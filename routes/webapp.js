
const express = require('express');
const path = require('path');
const router = express.Router();
const webAppModel = require('../models/webapp');



router.post('/webapp',async (req,res)=>{
	var platform = req.body.choose;
	var appName = req.body.appname;
	var url = req.body.urlname;
	var email = req.body.emailname;
    
	const contact_us = await new webAppModel({
		platform: platform,
		appName: appName,
		url: url,
		email: email
	});


            
          
	contact_us.save();
	return res.redirect('/account/dashbord');
});
router.get('/download', function(req, res){
	const file = `${__dirname}/myApp.apk`;
	res.download(file);
});







module.exports = router;