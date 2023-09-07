const {Router} = require('express');
const Product = require('../models/product');
const router = Router();
global.pass = "I@3K>26st3HO>)&pq6`("
const cors=require("cors");

var bodyParser = require('body-parser')
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
router.use(cors(corsOptions))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/search-product',(req,res)=>{
    Product.find({ title: { $regex: req.body.params.title, $options: "i" } }).limit(3)
    .then(docs => {
        res.send(docs)
    })
    .catch(err => {
        res.send(err);
    });
})

router.post('/add-product',(req,res)=>{
    if (req.body.params.pass ==global.pass){
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




router.post('/update-product',(req,res)=>{
    if (req.body.params.pass ==global.pass){
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

router.post('/delete-product',(req,res)=>{
    if (req.body.params.pass ==global.pass){
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
router.post('/get-products',(req,res)=>{
    Product.find()
    .then((result)=>{
        res.send(result);})
        .catch((err)=>console.log(err))
})

module.exports = router;