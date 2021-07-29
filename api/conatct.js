const express = require('express');
const router = express.Router();
const MsgModel = require('../models/msg');








// get all the user in the db
router.get('/', async (req, res) => {
	const users = await MsgModel.find();
	res.send(users);
});


module.exports = router;