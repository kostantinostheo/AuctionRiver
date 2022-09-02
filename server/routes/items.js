require('dotenv').config()
const fetch = require('node-fetch');
const express = require('express')
const router = express.Router()
const Item = require('../models/item')
const Image = require('../models/image')
const multer = require('multer')
const Utils = require('../utils/const')
const { NominatimJS } = require('nominatim-js');

require('dotenv').config()

/**
 * Returns the highest item id from the database
 * @returns int itemId
 */
async function GetHighestId(){
    const res = await fetch(process.env.GET_ITEMS)
    const items = await res.json()
    if(items.length !== 0){
        let maxItem = items.reduce((max, item) => max.itemId > item.itemId ? max : item);
        const maxId = maxItem.itemId
        return maxId
    }
    return 0
}

const Storage = multer.diskStorage({
    destination:'uploads',
    filename: (req, file, callback)=>{
        callback(null, file.originalname)
    },
})


const upload = multer({
    storage:Storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
}).single('testImage')


//Get all items from the db
//route url http://localhost:3000/items/api
router.get('/api/', async(req,res) => {
    try{
        const items = await Item.find()
        res.json(items)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
//Get all available for auction items
//route url http://localhost:3000/items/api/available
router.get('/api/available', async(req,res) => {
    try{
        const available = await Item.find( { isAvailable: true })
        res.json(available)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
//Get item details from the db
//route url http://localhost:3000/items/api/1
router.get('/api/:itemId',  getItemById, async (req,res) => {
    try{
        res.send(res.item)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Get item from the db based on seller id
//route url http://localhost:3000/items/api/seller/1
router.get('/api/seller/:sellerId',  getItemBySellerId, async (req,res) => {
    try{
        res.send(res.item)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Get all items ascending ordered from the db
//route url http://localhost:3000/items/api/sorted
router.post('/api/sorted', async(req,res) => {
    try{
        const items = await Item.find()
        items.sort((a, b) => (a.ends > b.ends) ? 1 : -1)
        if(req.body.sort === Utils.orderType.Descending){
            items.reverse()
        }
        res.json(items)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
//Get all available items for auction items
//route url http://localhost:3000/items/api/categorized
router.post('/api/categorized', async(req,res) => {
    try{
        const categorizedItems = await Item.find( { isAvailable: true, category: req.body.category })
        res.json(categorizedItems)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
//Search items based on plane text
//route url http://localhost:3000/items/api/search
router.post('/api/search', async(req,res) => {
    try{
        const searchItems = await Item.find( { isAvailable: true, name : { "$regex": req.body.text, "$options": "i" }})
        res.json(searchItems)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
//Create and save a new item in the DB
//route url http://localhost:3000/items/api/submit
router.post('/api/submit', async (req,res) => {
    
    let lastItem = await GetHighestId()
    //creating the location string we want
    const location = req.body.location + " " + req.body.country
    //wating for the result
    const val = await NominatimJS.search({q: location})
    const lat = val[0].lat // save latitude from the response
    const lon = val[0].lon // save longtitude from the response

    const now = new Date()

    const item = new Item({
        itemId: ++lastItem,
        isAvailable: true,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        buyPrice: req.body.buyPrice,
        firstBid: req.body.firstBid,
        numberOfBids: 0,
        sellerId: req.body.sellerId,
        started: req.body.started,
        ends: req.body.ends,
        images: req.body.images,
        location: req.body.location,
        country: req.body.country,
        latitude: lat,
        longitude: lon,
        bids: {
            bid: [{
                userId: req.body.sellerId,
                rating: req.body.rating,
                time: now,
                amount: req.body.firstBid,
                bidder:{
                    location: req.body.location,
                    country: req.body.country,
                }
            }]
        }
    })
    
    try{
        const newItem = await item.save()
        res.status(201).json(newItem)
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})
//Create a new bid to an item
//route url http://localhost:3000/items/api/update_bids/1'
router.post('/api/update_bids/:itemId', getItemById, async (req,res) => {
    try{
        res.item.bids.bid.push(req.body.bid)
        const updatedBid = await res.item.save()
        res.json(updatedBid)

    }catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Deletes an item
//route url http://localhost:3000/items/api/delete/1'
router.delete('/api/delete/:itemId', getItemById, async(req, res)=>{
    try {
        await res.item.remove()
        res.json({ message: "Item Deleted" })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//Update the data of an item
//route url http://localhost:3000/items/api/update_item/1'
router.patch('/api/update_item/:itemId', getItemById, async (req,res)=>{
    if (req.body.title != null)
        res.user.title = req.body.title
    if(req.body.categories != null)
        res.user.categories = req.body.categories
    if(req.body.description != null)
        res.user.description = req.body.description
    if(req.body.buyPrice != null)
        res.user.buyPrice = req.body.buyPrice
    if(req.body.firstBid != null)
        res.user.firstBid = req.body.firstBid
    if(req.body.city != null)
        res.user.city = req.body.city
    if(req.body.country != null)
        res.user.country = req.body.country
    if(req.body.started != null)
        res.user.started = req.body.started
    if(req.body.ends != null)
        res.user.ends = req.body.ends
    
    try {
        const updatedItem = await res.item.save()
        res.json(updatedItem)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//#region images api

//Get all images from the db
//route url http://localhost:3000/items/api/images
router.get('/api/images', async(req,res) => {
    Image.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
            res.status(500).send('An error occurred', err);
        } 
        else { 
            res.json({ items: items }); 
        } 
    }); 
});
//Get image by itemId from the db
//route url http://localhost:3000/items/api/images
router.get('/api/images/:itemId',  getImageById, async (req,res) => {
    try{
        res.send(res.image)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Uploads a new image
//route url http://localhost:3000/items/api/image/upload'
router.post('/api/image/upload', (req, res, next) => {

    upload(req, res, (err) => {
        if(err){
            //res.status(400).json({message : err.message})
            console.log("error")
        }
        else{
            const image = new Image({
                name: req.body.name,
                path: '/server/uploads/',
                image: {
                    data: req.file.filename,
                    contentType: 'image/jpg'
                }
            })

            image
                .save()
                .then(()=>res.send("Uploaded"))
                .catch(()=> console.log("error 2"))
            
        }
    })
})

//#endregion

async function getItemById(req, res, next){
    const item = await Item.findOne( { itemId: req.params.itemId} )
    try {
        if(item == null){
            return res.status(404).json({ message: "Can't Find Item" })
        }
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }

    res.item = item
    next()
}
async function getItemBySellerId(req, res, next){
    const item = await Item.find( { sellerId: req.params.sellerId} )
    try {
        if(item == null){
            return res.status(404).json({ message: "Can't Find Item" })
        }
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }

    res.item = item
    next()
}
async function getImageById(req, res, next){
    const image = await Image.find( { itemId: req.params.itemId} )
    try {
        if(image == null){
            return res.status(404).json({ message: "Can't Find Images" })
        }
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }

    res.image = image
    next()
}
module.exports = router