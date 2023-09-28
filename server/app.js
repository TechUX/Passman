const express = require('express') ;
const dotenv = require("dotenv") ;
const app = express() ;

dotenv.config() ;

const PORT = process.env.PORT ;

app.get("/",(req,resp)=>{
    resp.send("Working...") ;
})

// Adding Grouped routes
var account = require('./routes/account.js');
var dashboard = require("./routes/dashboard.js");
var tools = require("./routes/tools.js");

app.listen(PORT) ;