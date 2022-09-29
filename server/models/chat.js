const mongoose = require('mongoose')

const chatChema = new mongoose.Schema({
    chatId: {type: String},
    membersIds: {type: Array},
    messages: [{
         sender: {type: Number}, 
         message: {type: String}, 
         timestamp: {type: Date}
      }],
})
module.exports = mongoose.model('Chat', chatChema)
