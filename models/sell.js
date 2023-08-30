const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sellSchema = new Schema({
    items:{type:Array,required:true},
    totalPrice:{type:Number,required:true},
    tradeNum:{type:Number,required:true},
    ip:{type:String,required:true}},{timestamps:true}
    
    );

const Sell = mongoose.model('sellsHistory',sellSchema);
module.exports=Sell;