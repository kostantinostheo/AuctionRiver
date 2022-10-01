const mongoose = require('mongoose')

const chatChema = new mongoose.Schema({
    chatId: {type: String},
    username1: {type: String},
    username2: {type: String},
    membersIds: {type: Array},
    messages: [{
         sender: {type: Number}, 
         message: {type: String}, 
         timestamp: {type: Date}
      }],
})
module.exports = mongoose.model('Chat', chatChema)
