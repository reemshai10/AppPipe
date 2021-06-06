const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const webApp = new mongoose.Schema({
    platform : {type: String, required: true, unique: true, },
    appName : {type: String, required: true, unique: true, },
    url: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, default: Date.now },
  });

  
const web_app = mongoose.model("CusWebApp",webApp);


module.exports = web_app;