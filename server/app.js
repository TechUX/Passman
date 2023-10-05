const express = require('express') ;
const dotenv = require("dotenv") ;
const app = express() ;
dotenv.config() ;

const PORT = process.env.PORT ;

// Adding Grouped routes
var account = require('./routes/account.js');
var dashboard = require("./routes/dashboard.js");
var tools = require("./routes/tools.js");
var admin = require("./routes/admin.js");


app.route("/")
.get((_,resp)=>{
    resp.send({status:"ok",port:PORT,"datetime":new Date()}) ;
})
.post((_,resp)=>{
    resp.send({status:"ok",port:PORT,"datetime":new Date()}) ;
  
})

app.use("/account", account) ;
app.use("/dashboard", dashboard) ;
app.use("/tools", tools) ;
app.use("/admin", admin) ;


app.all("*",(req,resp)=>{
    resp.status(404).send("404 Resource not found or Invalid Method called") ;
})

// Starting the application server
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT : ${PORT}`) ;
})