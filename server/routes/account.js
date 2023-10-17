const express = require("express") ;
const dbConnect = require("../component/dbconfig") ;
const dotenv = require("dotenv") ;

dotenv.config()

var router = express.Router();

router.get("", (req, resp) => {
  resp.send("I am Account Home Page");
});

router.post("/login", (req, resp) => {
  let email = req.query.email;
  let password = req.query.password;

  if (!email || !password) {
    return resp.status(400).json({ status: "error", msg: "email or password must not empty" });
  } else {
    dbConnect(process.env.account)
      .then((database) => {
        database
          .findOne({ email: email })
          .then((result) => {
            console.log(result) ;
            if (result && result.password === password) {
              resp.status(200).send({status:"ok",code:"SUCCESS", msg:"Login Success"});
            } else {
              resp.status(400).send(resp.send({status:"ok",code:"FAILED", msg:"Username or Password Invalid"})) ;
            }
          })
          .catch((err) => {
            console.log("Error in finding username. " + err) ;
            resp.status(500).send({status:"error",code:"DATA_FETCH_ERROR", msg:err}) ;
          });
      })
      .catch((err) => {
        console.log("Unable to connect to Database"+ err) ;
        resp.status(500).send({status:"error",code:"DB_CONNECT_ERROR", msg:err}) ;
      });
  }
});



router.post("/register", (req,resp)=>{
  let data = req.query ;

  dbConnect(process.env.account)
  .then((database)=>{

    database.insertOne({name:data.name, username:data.username, email:data.email, password:data.password, createdAt: new Date()})
    .then((result)=>{
      if (result.acknowledged) {
        resp.status(201).send({status:"ok",code:"DATA_INSERTED",id:result.insertedId}) ;
      } else {
        resp.status(200).send({status:"error", code:"UNKNOWN_ERROR", msg:String(result)}) ;
      }
    })
    .catch((err)=>{
      resp.status(400).send({status:"error",code:"DATA_INSERT_ERROR", msg:err}) ;
    })
  })
  .catch((err)=>{
    resp.status(500).send({status:"error",code:"DB_CONNECT_ERROR", msg:err})
  })
})


module.exports = router;
