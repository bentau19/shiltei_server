const {Router} = require('express');
const router = Router();
const cors=require("cors");
const Review = require('../models/review');
var bodyParser = require('body-parser')
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
router.use(cors(corsOptions))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/send-review',(req,res)=>{
    try{
    if (req.body.name !=""&&req.body.content !=""&&req.body.rate !=""){
        console.log("name - "+req.body.name)
        console.log("content - "+ req.body.content)
        console.log("rate - "+req.body.rate)
        const review = new Review({
            name:req.body.name,
            content:req.body.content,
            rate:req.body.rate
        });
        review.save()
        .then((result)=>{
            res.send(result)
        }).catch((err)=>{
            console.log(err);
        });
    }
    }catch(e){
        res.send("error shel hasmahot!!")
    }
})

router.post('/get-reviews',(req,res)=>{
    Review.find()
    .then((result)=>{
        res.send(result);})
        .catch((err)=>console.log(err))
})

module.exports = router;