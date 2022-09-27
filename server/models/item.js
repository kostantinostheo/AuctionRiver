const mongoose = require('mongoose')

const itemSchemma = new mongoose.Schema({
    itemId: {type:Number, required: true},
    isAvailable: {type:Boolean, required: true},
    name: {type:String},
    description: {type:String},
    category: {type:Array},
    buyPrice: {type:Number},
    firstBid: {type:Number},
    numberOfBids: {type:Number},
    started: {type:Date},
    ends: {type:Date},
    images: {type:Array},
<<<<<<< HEAD
=======
    buyerId: {type: Number},
>>>>>>> develop
    sellerId: {type:Number},
    location: {type:String},
    country: {type:String},
    latitude:{type:Number},
    longitude:{type:Number},
    bids: {
        bid: [
            {
                userId: {type:String},
                rating: {type:Number},
                time: {type:Date},
                amount: {type:Number},
                bidder: {
                    location: {type:String},
                    country: {type:String}
                }
            }
            ]
    }
})

module.exports = mongoose.model('Item', itemSchemma)