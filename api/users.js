const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;


function hash(fields,res){
	bcrypt.hash(fields.pw,saltRounds,function(err,hash){
		if (err) return res.sendStatus(400);
		const ac = new UserModel({
			email: fields.email,
			pw: hash
		});
		return ac;
	});
}




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

// post a user in the db
router.post('/', async (req, res) => {
	const fields = req.body;
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
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	const fields = req.body;

	const user = await UserModel.findOne({ email }, function (err,User){
		if (err) return res.sendStatus(500);	
		if (!User) return res.sendStatus(404); // not found
		
	});
	const fieldsHash = hash(fields);
	const userUpdate = await UserModel.updateOne( fieldsHash );
	res.send(userUpdate);
		
	
	
});
	





//delete a user
router.delete('/:email', async (req, res) => {
	const { email } = req.params;
	if (!email) {
		return res.sendStatus(400); // bad request
	}
	const user = await UserModel.findOneAndUpdate(req.params.id,{$set:{email:req.body.email,pw:req.body.pw}}, function (err,User){
		if (err) return res.sendStatus(500);	
		if (!User) return res.sendStatus(404); // not found
		
	});
	
	res.send(user);
	
});

module.exports = router;
