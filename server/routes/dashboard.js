const express = require('express');

var router = express.Router() ;

router.get("",(req,resp)=>{
    resp.send("I am Account Dashboard Page"); 
}) ;

module.exports = router ;