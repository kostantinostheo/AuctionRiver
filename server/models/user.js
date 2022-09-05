const mongoose = require('mongoose')

const userSchemma = new mongoose.Schema({
    userId:{type: Number},
    userType:{type: String},
    firstname:{type: String,required: true},
    lastname:{type: String, required: true},
    username:{type: String},
    email:{type: String, required: true},
    password:{type: String, required: true},
    mobile:{type: Number},
    SSN:{type: Number},
    address:{type: String},
    zip:{type: Number},
    city:{type: String},
    country:{type: String},
    userStatus:{type: String,},
    saved: {type: Array},
    recent: {type: Array},
    rating:{type: Number},
    ratings:{type: Array},
    shoppingList:{type: Array}
})

module.exports = mongoose.model('User', userSchemma)