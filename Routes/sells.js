const {Router} = require('express');
const Sell = require('../models/sell');
const router = Router();
const cors=require("cors");

var bodyParser = require('body-parser');
const Product = require('../models/product');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
router.use(cors(corsOptions))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/get-sells',(req,res)=>{
    if (req.body.params.password ==global.pass){
    Sell.find()
    .then((result)=>{
        res.send(result);})
        .catch((err)=>console.log(err))
    }
})
router.post('/update-sells',async(req,res)=>{
    try{
        if (req.body.params.pass === global.pass) {
            const { _id,stage,key} = req.body.params;
            try {
                if(key=="+"){
                    await Sell.findByIdAndUpdate(_id, {stage:stage+1});
                }else{
                    await Sell.findByIdAndUpdate(_id, {stage:stage-1});
                }
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
})
router.post('/sell-search', async (req, res) => {
    const { _id, tradeNum } = req.body.params;
  
    // Define your query using _id and tradeNum
    const query = {
      _id, // Assuming _id is a unique identifier for your Sell documents
      tradeNum: { $regex: tradeNum} // Case-insensitive regex search for tradeNum
    };
  
    try {
      // Perform the search using the defined query
      const results = await Sell.find(query);
  
      // Handle the results as needed
      res.json(results);
    } catch (err) {
      // Handle any errors
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
router.post('/add-sell',(req,res)=>{
    const items =req.body.params.items; 
    const sell = new Sell({
        items:req.body.params.items,
        totalPrice:req.body.params.totalPrice,
        ship:req.body.params.ship,
        email:req.body.params.email,
        name:req.body.params.name,
        stage:1,
        tradeNum:16515151,
        ip:req.body.params.ip});
        sell.save()
    .then((result)=>{
        for (let i = 0; i < items.length; i++) {
            Product.findOneAndUpdate(
                { _id: items[i].id }, // Filter to identify the product by its ID
                { $inc: { sellCount: 1 } }, // Use $inc to increment sellCount by 1
                { new: true })// Set to true to return the updated document
                .then(updatedProduct => {
                    if (!updatedProduct) {
                      console.error('Product not found');
                    } else {
                      console.log('Product updated:', updatedProduct);
                    }
                  })
                  .catch(err => {
                    console.error('Error updating product:', err);
                  });
        }
        res.send(result)
    }).catch((err)=>{
        console.log(err);
    });
    
})

module.exports = router;