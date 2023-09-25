const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
    },
}
    );
const Others = mongoose.model('Others',tagsSchema);

module.exports=Others;