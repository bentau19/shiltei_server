const express = require('express');
const mongoose = require('mongoose');
const emailRoute = require('./Routes/email')
const sellsRoute = require('./Routes/sells')
const manageRoute = require('./Routes/manage')
const productsRoute = require('./Routes/products')
const tagsRoute = require('./Routes/tags')
var bodyParser = require('body-parser')

const app = express();
app.use(emailRoute);
app.use(productsRoute);
app.use(sellsRoute);
app.use(manageRoute);
app.use(tagsRoute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT || 8000}`);
        });
        console.log("Connected to mongoDB");
    }catch(e){
        console.log(e);
    }
}

connect();


