const {Router} = require('express');
const router = Router();
const Others = require('../models/Tags');
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


router.post('/get-tags',(req,res)=>{
  Others.find()
  .then((result)=>{
      res.send(result[0].tags);})
      .catch((err)=>console.log(err))
})

  router.post('/update-tags', async (req, res) => {
    try{
    if (req.body.params.pass === global.pass) {
        const { tags } = req.body.params;
        try {
            await Others.findOneAndUpdate( { title: "tags" },{tags:tags} 
                
            );
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


module.exports = router;