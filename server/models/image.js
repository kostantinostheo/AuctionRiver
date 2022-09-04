const mongoose = require('mongoose')

const imageSchemma = new mongoose.Schema({
    name: {type:String, required: true},
    image: {type:String}
})
module.exports = mongoose.model('Image', imageSchemma)