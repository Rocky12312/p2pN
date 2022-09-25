const cors = require('cors');
var express = require('express');
const ngrok = require('ngrok');
const nodemon = require("nodemon");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const config = require("./config.js");
const peerHandler = require('./routes/peers.js');

var app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//connecting to mongoDB
var options = {
    keepAlive: 1,
    connectTimeoutMS: 30000
};
mongoose.connect(config.dbUrl, options)
.then(() => {
    console.log("Database connected!");
})
.catch(err => console.log(err));

/* ----------- All api calls ---------------*/
app.use('/peer', peerHandler)

app.get('/healthPing', (req,res)=>{
    res.send('Checking the Server health, responding back as health is good!');
})

const port = process.env.PORT || 6000;

app.listen(port, ()=>{
    console.log(`App is up and running at port ${port}`);
});


ngrok
.connect({
    proto: "http",
    addr: "6000",
})
.then(async(url) => {
    console.log(`ngrok tunnel opened at: ${url}`);
    console.log("Open the ngrok dashboard at: https://localhost:4040\n");
})
.catch((error) => {
    console.error("Error opening ngrok tunnel: ", error);
    process.exitCode = 1;
});
  


module.exports = app;
