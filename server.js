const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/config.js');
const route = require('./routes/route');
const session = require('express-session');
const crypto = require('crypto');
const env = require('dotenv');
const app =  express();

// session
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: true
  }));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
// Set view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Connect to MongoDB
connectDB();
const PORT =  process.env.PORT;


app.use('/', route);
app.use('/api', route);

app.listen(PORT,()=>{
    console.log("Rishabh Portfolio started at port "+ PORT);
});