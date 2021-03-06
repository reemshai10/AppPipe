const mongoose = require('mongoose');


const webApp = new mongoose.Schema({
	platform : {
		type: String,
		required: true
	},
	appName : {
		type: String,
		required: true,
		unique: true
	},
	url: { 
		type: String, 
		required: true,
		unique: true
	},
	email: {
		type: String, 
		required: true
	},
	created: { 
		type: Date,
		default: Date.now
	}
});

  
const web_app = mongoose.model('cuswebapps',webApp);


module.exports = web_app;