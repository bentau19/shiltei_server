const {Router} = require('express');
const router = Router();

const nodemailer = require('nodemailer');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
router.use(cors(corsOptions))
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shilteiHatzafon@gmail.com',
    pass: 'fofwqqlirhqijfxq'
  }
});

const mailOptions = {
    from: 'shilteiHatzafon@gmail.com',
    to: 'bentau19@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  router.post('/send-mail',(req,res)=>{
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})

module.exports = router;