const mongoose = require('mongoose')

const matrixSchemma = new mongoose.Schema({
    timestamp: {type:Date},
    matrix: {type:Array}
})
module.exports = mongoose.model('Matrix', matrixSchemma)