var express = require("express");
var index_r = express.Router();

index_r.get("/",(req,res)=>{
    res.render("home");
})
index_r.get("/login",(req,res)=>{
    res.send("home");
})
module.exports = index_r;