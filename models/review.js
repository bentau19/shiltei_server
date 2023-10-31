const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: {type:String,required:true},
    content: {type:String,required:true},
    rate:{type:Number,required:true}
  });

const Review = mongoose.model('reviews',reviewSchema);
module.exports=Review;