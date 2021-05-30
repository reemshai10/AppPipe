const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccountSchema = new mongoose.Schema({
    name : "String",
    pw: "String",
    email: "String"
  });

  
const Account = mongoose.model("Account",AccountSchema);


module.exports = Account;