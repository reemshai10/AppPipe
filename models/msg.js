
const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const ContactUsSchema = new mongoose.Schema({
    name: "String",
    email:"String",
    message : "String"
  });
  
  
  const ContactUs = mongoose.model("ContactUs",ContactUsSchema);



  module.exports = ContactUs;