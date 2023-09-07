const {Router} = require('express');
const Sell = require('../models/sell');
const router = Router();
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


router.post('/add-sell',(req,res)=>{
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

module.exports = router;