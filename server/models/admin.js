const mongoose = require('mongoose')

const adminSchemma = new mongoose.Schema({
    adminId:{
        type: Number,
        required: false
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Admin', adminSchemma)