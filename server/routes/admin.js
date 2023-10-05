const express = require('express');

var router = express.Router() ;

router.get("",(req,resp)=>{
    resp.send("I am Admin Dashboard"); 
}) ;

module.exports = router ;