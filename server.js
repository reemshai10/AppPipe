const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const accountRouter = require('./routes/account');
const msgRouter = require('./routes/message');
const webappRouter = require('./routes/webapp');
const ApiUser = require('./api/users');
const cookieParser = require('cookie-parser')
const session = require('express-session');
require('dotenv').config();





mongoose.connect(process.env.MONGO_URI ,{
	useCreateIndex: true,
	useNewUrlParser: true ,
	useUnifiedTopology: true
}).then(() => { console.log("connected to mongo db")},
   error => {
     console.error('Eror connected to mongo db');
  });

  
var Schema = mongoose.Schema;








const port = process.env.PORT || 3001;


const app = express();
app.use(express.json());
app.use(cookieParser());

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// logger setup
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static files
app.use(express.static("public"));
app.use('/images', express.static('images'));




app.use(session({
	name: 'session-cookie',
	secret: 'secret string used to encrypt the cookie',
	cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
	resave: false,
	saveUninitialized: false
}));

//routes.




app.get("/",(req, res) =>  res.sendFile(path.resolve("views/index.html")))
app.use("/message", msgRouter);
app.use("/account", accountRouter);
app.use("/webapp", webappRouter);
app.use("/api",ApiUser);


app.use("/", (req, res) => res.sendStatus(404));


app.listen(port,function(){
    console.log("server started on port :" + port)
});