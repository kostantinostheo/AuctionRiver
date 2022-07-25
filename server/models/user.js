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
        required: false
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
        required: false
    },
    phone:{
        type: Number,
        required: false
    },
    vatNumber:{
        type: Number,
        required: false
    },
    latitude:{
        type: Number,
        required: false
    },
    longitude:{
        type: Number,
        required: false
    },
    userStatus:{
        type: String,
        required: false
    },
})

module.exports = mongoose.model('User', userSchemma)