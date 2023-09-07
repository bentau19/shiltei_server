const {Router} = require('express');
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


router.post('/manager-login',(req,res)=>{
    if (req.body.params.password == global.pass)
    {
        res.send("/managerHome")
    }else{
        res.send("wrong")
    }
})



module.exports = router;