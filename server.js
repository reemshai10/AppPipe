const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const accountRouter = require('./routes/account');
const msgRouter = require('./routes/message');

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




app.get("/",(req, res) =>  res.sendFile(path.resolve("views/index.html")))

 
 
  




app.use("/message", msgRouter);
app.use("/account", accountRouter);


app.use("/", (req, res) => res.sendStatus(404));
app.listen(port,function(){
    console.log("server started on port 3001 ")
});