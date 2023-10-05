const express = require('express');
const HIBP = require("haveibeenpwned-checker");

var router = express.Router() ;

function generatePassword(length = 10) {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()_-+=<>?/[]{}|';
  
    let password = [
      uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length)),
      lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length)),
      digits.charAt(Math.floor(Math.random() * digits.length)),
      symbols.charAt(Math.floor(Math.random() * symbols.length)),
    ];

    const allCharacters = uppercaseLetters + lowercaseLetters + digits + symbols;
  
    const remainingLength = length - password.length;
    for (let i = 0; i < remainingLength; i++) {
      const randomChar = allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
      password.push(randomChar);
    }
  
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }
  
    return password.join('');
  }


router.get("",(_,resp)=>{
    resp.send({status:"error",msg:"Call not allowed, available endpoints are /tools/generate and /tools/check"}); 
}) ;

router.get("/generate",(req,resp)=>{
    if (req.query.length < 5 ){
        resp.send({status:"error",msg:"Length of password must be greated than 5 digits"}) ;
    } else {
        resp.send({status:'ok', password:generatePassword(req.query.length)}) ;
    }
})


router.post("/check",(req,resp)=>{
    HIBP.PasswordChecker(req.query.password,(s)=>{
        console.log(s);
        if (s.count){
            resp.send(JSON.stringify({status:"ok", breached:true, count:s.count})) ;
        } else {
            resp.send(JSON.stringify({status:"ok", breached:false, count:s.count})) ;
        }
    }
    ,100);
})


module.exports = router ;