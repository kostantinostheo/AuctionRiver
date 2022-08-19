const mongoose = require('mongoose')

const imageSchemma = new mongoose.Schema({
    itemId: {type:String, required: true},
    imageName: {type:String, required: true},
    path: {type:String},
    image:{
        data:{type:Buffer},
        contentType:{type:String}
    },
})
module.exports = mongoose.model('Image', imageSchemma)