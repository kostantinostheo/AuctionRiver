const mongoose = require('mongoose')

const matrixSchemma = new mongoose.Schema({
    timestamp: {type:Date},
    users: {type:Array},
    items: {type:Array},
    matrix: {type:Array}
})
module.exports = mongoose.model('Matrix', matrixSchemma)