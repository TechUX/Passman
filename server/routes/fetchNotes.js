const express = require("express") ;
const dbConnect = require("../component/dbconfig") ;
const dotenv = require("dotenv") ;

dotenv.config()

var router = express.Router();

router.get("/", (req, resp) => {
    var savedBy = req.query.username ;
    if(savedBy == undefined){
        return resp.status(400).send({status:"error",code:"NO_DATA_PASSED", msg:"username is required"}) ;
    }

    resp.send({status:"ok"});
});

module.exports = router ;