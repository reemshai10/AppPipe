const express = require("express");
const path = require("path");
const router = express.Router();
const AccountModel = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

function authorize(req, res, next) {
	if (!req.session.authenticated) {
		return res.redirect("/account/login");
	}
	next();
}

function ensureLoggedOut(req, res, next) {
	if (req.session.authenticated) {
		req.session.destroy();
	}
	next();
}

router.get("/login", ensureLoggedOut , (req, res) => {

  
    res.sendFile(path.resolve("views/login.html"));
    
  });


router.post("/login",async(req,res) =>{
  
  var password = req.body.psw;
  var email = req.body.email;
  

  const user = await AccountModel.findOne({ email }, function (err,User){
    if(err )return res.status(500).send({
      success: false,
      message: 'User already exist!'
    });
      if(!User){
        return res.status(500).send({
          success: false,
          message: 'User Didnt Found ,Go Back And Try Agian or Register!!'
        });
      }
      if(User){
        bcrypt.compare(password, User.pw, function(err,result){
            if (result === true) {
              req.session.authenticated = true;
              req.session.userId = User._id;
              req.session.username = User.username;
              res.redirect(req.baseUrl + "/");
            }
           else
           return res.status(500).send({
            success: false,
            message: 'Worng Password!!,Go Back And Try Agian'
          });
            
        });
             
      }
    
      
  });
 
  

});



router.get("/register", ensureLoggedOut, (req, res) => {

    res.sendFile(path.resolve("views/register.html"));
    
  }); 

router.post("/register",async (req, res) => {
  var password = req.body.psw[0];
  var email = req.body.email;
 

  bcrypt.hash(password,saltRounds,function(err,hash){
    const accounts = new AccountModel({
      email: email,
      pw: hash
    });
  
  accounts.save(function (err) {
      if (err) {
        return res.sendFile(path.resolve("views/registerProblems.html"));         
      }
    return res.redirect("/account/login");
   });
   
  });
}); 
  

  router.get("/logout", ensureLoggedOut, (req, res) => {
    res.redirect("/account/login");
  });

  router.get("/",  authorize, async (req, res) => {
    res.sendFile(path.resolve('views/WebApp.html'));
  });



  module.exports = router;
