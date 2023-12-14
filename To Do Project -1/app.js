const express=require('express');
const bodyParser=require('body-parser')
var app=express();
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/todo");
const trySchema=new mongoose.Schema({
        name:String
});

const item=mongoose.model("task",trySchema);

app.get("/",function(req,res){
    item.find().then(function(foodItems){
        res.render("list",{ejes:foodItems});
    });
         
});

app.post("/",function(req,res){
    const val=req.body.ele1;

    const todoPush=new item({
        name:val
    });
    todoPush.save();
    res.redirect("/");
    
});

app.post("/delete",function(req,res){
    const checked=req.body.checkbox1;
    item.findByIdAndDelete(checked).then(function(){
        console.log("deleted");
        res.redirect("/");
    })
})



app.listen(3000,function(){
    console.log("server start");
});