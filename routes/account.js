const express = require("express");
const path = require("path");
const router = express.Router();
const AccountModel = require("../models/user");




router.get("/login",(req, res) => {

  
    res.sendFile(path.resolve("views/login.html"));
    
  });


router.post("/login",async(req,res) =>{
  var name = req.body.usrname;
  var password = req.body.psw[0];
  var email = req.body.email;
  
  
  const user = await AccountModel.find({name:name});
  console.log(user);
  if(user.name!=name || user.pw!= password){
    return res.redirect("/account/login");
  }
  res.send('Account successfully logIn by: ' + name);



})



router.get("/register",(req, res) => {

    res.sendFile(path.resolve("views/register.html"));
    
  }); 

router.post("/register",(req, res) => {
    var name = req.body.usrname;
    var password = req.body.psw[0];
    var email = req.body.email;

    
    
    var accounts = new AccountModel({
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

  module.exports = router;
