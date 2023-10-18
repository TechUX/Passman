const express = require("express") ;
const dbConnect = require("../component/dbconfig") ;
const dotenv = require("dotenv") ;

dotenv.config()

var router = express.Router();

router.get("/",(_,resp)=>{
    resp.send({status:"ok"}) ;
})

router.get("/get", (req, resp) => {
    var savedBy = req.query.username ;

    if(savedBy == undefined || savedBy == ""){
        return resp.status(400).send({status:"error",code:"NO_DATA_PASSED", msg:"username is required"}) ;
    }
    
    dbConnect(process.env.notes)
    .then((database)=> {
        database.find({createdBy:savedBy}).toArray().then((result)=>{
            if (result) {
                resp.status(200).send({status:"ok", notes: result}) ;
            } else {
                resp.status(200).send({status:"ok",notes:"No notes found", result:result}) ;
            }
        })
        .catch((err)=>{
            resp.status(500).send({status:"error",code:"DATA_FETCH_ERROR", msg:err}) ;
        })
    })
    .catch((err)=>{
        resp.status(500).send({status:"error",code:"DB_CONNECT_ERROR", msg:err}) ;
    })
});

router.post("/save",(req,resp)=>{
    
    let data = req.query ;
    console.log(data);

    if (!data.title || !data.content || !data.createdBy) {
        resp.status(500).send({status:"error",code:"NO_DATA_PASSED", msg:"Title, Content and Savedby is required"}) ;
    } else {
        if (!data.category){
            categories = "Uncategorized" ; 
        } else {
            categories = data.category;
        }
    }

    dbConnect("notesman").then((database)=>{
        database.insertOne({title:data.title, slug:slug(data.title), content:data.content, category:categories.split(","), createdAt: new Date(), createdBy:data.createdBy})
        .then((result)=>{
            if (result.acknowledged){
                resp.status(200).send({status:"ok",code:"SUCCESS",msg:"Notes Saved Successfully",dbresponse:toString(result)}) ;
            } else {
                resp.status(500).send({status:"error",code:"DATA_INSERT_ERROR", msg:err}) ;
            }
        })
        .catch((err)=>{
            resp.status(500).send({status:"error", code:"UNKNOWN_ERROR", msg:err}) ;
        })
    })
    .catch((err)=> {
        resp.status(500).send({status:"error",code:"DB_CONNECT_ERROR", msg:err}) ;
    })
})


function slug(title) {
    const slug = title
      .toLowerCase() // Convert to lowercase
      .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove consecutive hyphens
    return slug+"-"+Math.floor(new Date().getTime() / 1000) ;
  }
module.exports = router ;