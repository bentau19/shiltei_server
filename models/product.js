const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    size:{
        type:String
    },
    makat:{
        type:String,
        required:true
    },
    price:{type:Number},
    picture:{type:String},
    description:{type:String},
    highlight:{
        type:Boolean,
        required:true
    },
    tags:{
        type:Array,
    },
    sellCount:{type:Number,required:true}}
    );
    productSchema.index({title:'text'});
const Product = mongoose.model('Product',productSchema);

module.exports=Product;