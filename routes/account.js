const express = require("express");
const path = require("path");
const router = express.Router();
const AccountModel = require("../models/user");




router.get("/login",(req, res) => {

  
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
    res.redirect(req.baseUrl + "/");
  });
  
  
  



})



router.get("/register",(req, res) => {

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

  router.get("/logout", (req, res) => {
    res.redirect("/account/login");
  });

  router.get("/", async (req, res) => {
    res.sendFile(path.resolve('views/WebApp.html'));
  });



  module.exports = router;
