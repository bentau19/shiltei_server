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
router.post('/get-products',(req,res)=>{
    const query ={}
    if (req.body.title!="") {
        
        query.title = { $regex: req.body.title, $options: "i"  };
        }
        if (req.body.tags!="All") {
        query.tags = { $elemMatch: { $eq: req.body.tags } };
        }
    Product.find(query)
    .skip(req.body.skip)  // Skip the first 4 items (0-based index)
    .limit(req.body.limit)
    .then((result)=>{
        res.send(result);})
        .catch((err)=>console.log(err))
})
router.post('/search-product-byTitle',(req,res)=>{
    Product.find({ title: { $regex: req.body.title, $options: "i" } })
    .skip(req.body.skip)  // Skip the first 4 items (0-based index)
    .limit(req.body.limit)
    .then(docs => {
        res.send(docs)
    })
    .catch(err => {
        res.send(err);
    });
})



router.post('/search-product-byId',(req,res)=>{
    Product.findById(req.body.id)
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


router.post('/update-product', async (req, res) => {
    try{
    if (req.body.params.pass === global.pass) {
        const { _id, title, makat, size, price, picture, highlight, tags } = req.body.params;
        try {
            const updatedProduct = await Product.findByIdAndUpdate(_id, {
                title,
                makat,
                size,
                price,
                picture,
                highlight,
                tags
            });
            return res.send('Successfully saved.');
        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    } else {
        return res.status(403).send('Unauthorized');
    }}
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.post('/delete-product',(req,res)=>{
    if (req.body.params.pass ==global.pass){
    if (req.body.params._id!=0){
    Product.deleteOne({_id:req.body.params._id}).then(()=>{
        res.send("success!!")
    }).catch((err)=>{
    res.send(err)}
    )}else{
        res.send("refresh the page!!")
    }}
})


module.exports = router;