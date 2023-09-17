const {Router} = require('express');
const router = Router();

const nodemailer = require('nodemailer');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
var bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors(corsOptions))

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shilteiHatzafon@gmail.com',
    pass: 'fofwqqlirhqijfxq'
  }
});

  
  router.post('/send-mail',(req,res)=>{
    // secretKey:"itIsMe!",
    // _id:res.data._id,
    // tradeNum:res.data.tradeNum,
    // name:res.data.name,
    // email:res.data.email,
    console.log(req.body)
    const { _id,tradeNum,secretKey,name,email} = req.body.params;
    if(secretKey==="itIsMe!"){
    transporter.sendMail({
      from: 'shilteiHatzafon@gmail.com',
      to: email,
      subject:tradeNum + 'קבלה למספר עסקה ',
      text:"שלום "+name+'\n שמחים שרכשת אצלנו!!! \n מצ"ב לינק לקבלה דיגיטלית! \n '+"https://shiltei.vercel.app/accaptance/"+_id+"/"+tradeNum+"\n המשך קניה מהנה ונשמח לראותך שוב!!"
    }, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });}else{
        res.send("this is not you!!")
      }
})

module.exports = router;