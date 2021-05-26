const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");





const port = 3001;




const app = express();
app.use(express.json());


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// logger setup
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static files
app.use(express.static("public"));
app.use('/images', express.static('images'));






// routes.




app.get("/",(req, res) => {

  
  res.sendFile(path.resolve("views/index.html"));
  
});

app.get("/login",(req, res) => {

  
    res.sendFile(path.resolve("views/login.html"));
    
  });

app.get("/register",(req, res) => {

  
    res.sendFile(path.resolve("views/signup.html"));
    
  }); 
  
  

app.listen(port,function(){
    console.log("server started on port 3001 ")
});