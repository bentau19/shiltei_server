const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sellSchema = new Schema({
    items:{type:Array,required:true},
    totalPrice:{type:Number,required:true},
    tradeNum:{type: String,required:true},
    ship:{
        house: String,
        street: String,
        city: String,
      },
    name: {type:String,required:true},
    email: {type:String,required:true},
    stage:{type:Number},
    ip:{type:String,required:true}},{timestamps:true}
    
    );

const Sell = mongoose.model('sellsHistory',sellSchema);
module.exports=Sell;