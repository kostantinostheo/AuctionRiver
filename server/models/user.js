const mongoose = require('mongoose')

const userSchemma = new mongoose.Schema({
    userId:{
        type: Number,
        required: false
    },
    userType:{
        type: String,
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
    username:{
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
    address:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    vatNumber:{
        type: Number,
        required: true
    },
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    userValidation:{
        type: String,
        required: false
    },
})

module.exports = mongoose.model('User', userSchemma)