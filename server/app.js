const express = require('express') ;
const dotenv = require("dotenv") ;
const app = express() ;
dotenv.config() ;

const PORT = process.env.PORT ;

// Adding Grouped routes
var account = require('./routes/account.js');
// var dashboard = require("./routes/dashboard.js");
// var tools = require("./routes/tools.js");



app.get("/",(req,resp)=>{
    resp.send("Working...") ;
})

app.use("/account",account) ;

// app.use("/account", account) ;
// app.use("/dashboard", dashboard) ;
// app.use("/tools", tools) ;


app.all("*",(req,resp)=>{
    resp.send("Error 404 !!   Resource Not Found") ;
})

// Starting the application server
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT : ${PORT}`) ;
})