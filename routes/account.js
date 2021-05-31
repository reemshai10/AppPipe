const express = require("express");
const path = require("path");
const router = express.Router();
const AccountModel = require("../models/user");


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
  var name = req.body.usrname;
  var password = req.body.psw;
  var email = req.body.email;
 
  const user = await AccountModel.findOne({ name }, function (err,User){
    if(err ) throw err;
    if(!User ||  User.pw!== password){
      return res.redirect("/account/login");
    }
    req.session.authenticated = true;
	  req.session.userId = User._id;
	  req.session.username = User.username;
    res.redirect(req.baseUrl + "/");
  });
  
  
  



})



router.get("/register", ensureLoggedOut, (req, res) => {

    res.sendFile(path.resolve("views/register.html"));
    
  }); 

router.post("/register",async(req, res) => {
    var name = req.body.usrname;
    var password = req.body.psw[0];
    var email = req.body.email;

    var accounts = await  new AccountModel({
      name: name,
      pw: password,
      email: email
      
    });
    accounts.save(function (err) {
        if (err) throw err;
       // res.send('Account created successfully by: ' + name);
        return res.redirect("/account/login");
     });
     
    
  }); 

  router.get("/logout", ensureLoggedOut, (req, res) => {
    res.redirect("/account/login");
  });

  router.get("/",  authorize, async (req, res) => {
    res.sendFile(path.resolve('views/WebApp.html'));
  });



  module.exports = router;
