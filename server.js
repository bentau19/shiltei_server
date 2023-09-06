const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const pass = "I@3K>26st3HO>)&pq6`("
const Product = require('./models/product');
const Sell = require('./models/sell');
const uri ='mongodb+srv://server:serverPass0544221414@cluster0.okzawgb.mongodb.net/site?retryWrites=true&w=majority'
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
async function connect(){
    try{
        await mongoose.connect(uri);
        app.listen(8000,()=>{
            console.log('server on port 8000')
        })
        console.log("Connected to mongoDB");
    }catch(e){
        console.log(e);
    }
}

app.post('/search-product',(req,res)=>{
    Product.find({ title: { $regex: req.body.params.title, $options: "i" } }).limit(3)
    .then(docs => {
        res.send(docs)
    })
    .catch(err => {
        res.send(err);
    });
})

app.post('/add-product',(req,res)=>{
    if (req.body.params.pass ==pass){
    const product = new Product({
        title:req.body.params.title,
        makat:req.body.params.makat,
        size:req.body.params.size,
        price:req.body.params.price,
        picture:req.body.params.picture,
        highlight:req.body.params.highlight,
        tags:req.body.params.tags,
        sellCount:0
    });
    product.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err);
    });}else{
        res.send("try to login again!!")
    }
})


app.post('/update-product',(req,res)=>{
    if (req.body.params.pass ==pass){
    const product = new Product({
        title:req.body.params.title,
        makat:req.body.params.makat,
        size:req.body.params.size,
        price:req.body.params.price,
        picture:req.body.params.picture,
        highlight:req.body.params.highlight,
        tags:req.body.params.tags,
        sellCount:0
    });
    product.save()
    .then((result)=>{
        console.log("delete!!");
        Product.deleteOne({_id:req.body.params._id}).then((r)=>
        {res.send(result)})
    }).catch((err)=>{
        console.log(err);
    });}else{
        res.send("try to login again!!")
    }
})

app.post('/delete-product',(req,res)=>{
    if (req.body.params.pass ==pass){
    if (req.body.params._id!=0){
    console.log(req.body.params_id);
    Product.deleteOne({_id:req.body.params._id}).then(()=>{
        res.send("success!!")
    }).catch((err)=>{
    res.send(err)}
    )}else{
        res.send("refresh the page!!")
    }}
})


app.post('/add-sell',(req,res)=>{
    const sell = new Sell({
        items:req.body.params.items,
        totalPrice:req.body.params.totalPrice,
        tradeNum:16515151,
        ip:req.body.params.ip});
        console.log(sell);
        sell.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err);
    });
    
})
app.post('/get-products',(req,res)=>{
    Product.find()
    .then((result)=>{
        res.send(result);})
        .catch((err)=>console.log(err))
})
app.post('/manager-login',(req,res)=>{
    if (req.body.params.password == pass)
    {
        res.send("pass")
    }else{
        res.send("wrong")
    }
})
connect();


