
const express = require("express");
const path = require("path");
const router = express.Router();
const ContactUsModel = require("../models/msg");



router.post("/",(req,res)=>{
    const contact_us = new ContactUsModel({
       name: req.body.name,
       email: req.body.email,
       message: req.body.message
    });
            
          
    contact_us.save();
    return res.redirect("/");
  });





  module.exports = router;