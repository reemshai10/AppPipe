const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;







// get all the user in the db
router.get('/users', async (req, res) => {
	const users = await UserModel.find();
	res.send(users);
});
// get spcific user in the db
router.get('/:email', async (req, res) => {
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	const user = await UserModel.findOne({ email }, function (err,User){
		if (err) return res.sendStatus(500);	
		if (!User) return res.sendStatus(404); // not found
		
	});
	res.send(user);
});

// post a user in the db - pw must contain least one numeric digit,one lowercase letter AND no less then 6 characters .
router.post('/', async (req, res) => {
	const fields = req.body;
	const check = await UserModel.findOne({ email: fields.email });
	if(check) {
		return res.status(500).send({
			success: false,
			message: 'User Already In Use!'
		});
	}
	bcrypt.hash(fields.pw,saltRounds,function(err,hash){
		if (err) return res.sendStatus(400);
		const ac = new UserModel({
			email: fields.email,
			pw: hash
		});
		ac.save(function (err) {
			if (err) return res.sendStatus(400);
			res.send(ac);
		});
	
	
	});
});



// update a user in the db
router.put('/:email', async (req, res) => {
	const check = await UserModel.findOne({ email: req.params.email });
	if(!check) {
		return res.status(500).send({
			success: false,
			message: 'User Not Found!'
		});
	}
	const { email } = req.params;
	const fields = req.body;
	res.send(req.body.pw);
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.pw, salt);
	const user ={
		email: req.body.email,
		password: hashPassword
	};
	const userUpdate = await UserModel.findOneAndUpdate({email:email},user,{runValidators: true,useFindAndModify: false, new: true }, (error, result) => {
		if (error) {
			console.log('error');
			return res.status(400).send(error);
		}
		
	}); 

		

});



//delete a user
router.delete('/:email', async (req, res) => {
	const check = await UserModel.findOne({ email: req.params.email });
	if(!check) {
		return res.status(500).send({
			success: false,
			message: 'User Not Found!'
		});
	}
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	try{
		const user = await UserModel.findOneAndDelete({email:email});
		res.send(user);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
	
});

module.exports = router;
