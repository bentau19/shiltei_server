const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    makat:{
        type:String,
        required:true
    },
    price:{type:Number},
    picture:{type:String},
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