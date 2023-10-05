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
    return resp
      .status(400)
      .json({ status: "error", msg: "email or password must not empty" });
  } else {

    dbConnect(process.env.account)
      .then((database) => {
        database
          .findOne({ email: email })
          .then((result) => {
            if (result && result.password === password) {
              resp.send("Login success");
            } else {
              resp.send("Username or password Incorrect or not exist");
            }
          })
          .catch((err) => {
            console.log("Error in finding username. " + err);
          });
      })
      .catch((err) => {
        console.log("Unable to connect to Database"+ err);
      });
  }
});

module.exports = router;
