const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    const product = new Product({
        title:req.body.params.title,
        makat:req.body.params.makat,
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
    });
    
})


app.post('/add-sell',(req,res)=>{
    // res.send(req.body.todo);
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
    if (req.body.params.password == "eg8*O@0Jw!5BveV@a8E5")
    {
        res.send("pass")
    }else{
        res.send("wrong")
    }
})
connect();


