const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');



mongoose.connect("mongodb://localhost:27017/AppPipeDB" ,{useNewUrlParser: true , useUnifiedTopology: true});
var Schema = mongoose.Schema;

var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;
const AccountSchema = new mongoose.Schema({
  id : "String",
  pw: "String",
  email: "String"
});
const ContactUsSchema = new mongoose.Schema({
  name: "String",
  email:"String",
  message : "String"
});

const Account = mongoose.model("Account",AccountSchema);
const ContactUs = mongoose.model("ContactUs",ContactUsSchema);


const port = 3001;




const app = express();
app.use(express.json());


//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// logger setup
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static files
app.use(express.static("public"));
app.use('/images', express.static('images'));






//routes.




app.get("/",(req, res) => {

 
  res.sendFile(path.resolve("views/index.html"));
  
});


app.post("/",(req,res)=>{

 
  ContactUs.find({}, function(err, data){
        for(const i in data){
          if(req.body.name != data[i]){
            const contact_us = new ContactUs({
              name: req.body.name,
              email: req.body.email,
              message: req.body.message
          });
          contact_us.save();
        }
        
    }
    
  });

  
 

})

app.get("/login",(req, res) => {

  
    res.sendFile(path.resolve("views/login.html"));
    
  });

app.get("/register",(req, res) => {

  
    res.sendFile(path.resolve("views/signup.html"));
    
  }); 
  
  

app.listen(port,function(){
    console.log("server started on port 3001 ")
});