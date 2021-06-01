const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccountSchema = new mongoose.Schema({
    name : {type: String, required: true, unique: true, },
    pw: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, default: Date.now },
  });

  
const Account = mongoose.model("Account",AccountSchema);


module.exports = Account;