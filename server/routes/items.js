require('dotenv').config()
const express = require('express')
const router = express.Router()
const Item = require('../models/item')
const Image = require('../models/image')
const multer = require('multer')
const Utils = require('../utils/const')

const Storage = multer.diskStorage({
    destination:'uploads',
    filename: (req, file, callback)=>{
        callback(null, file.originalname)
    },
})


const upload = multer({
    storage:Storage
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

router.get('/api/:itemId',  getItemById, async (req,res) => {
    try{
        res.send(res.item)
    }catch (error) {
        res.status(400).json({message: error.message})
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

router.get('/api/images/:itemId',  getImageById, async (req,res) => {
    try{
        res.send(res.image)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})
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
router.post('/api/image/upload', async (req,res)=> {

    upload(req, res, (err) => {
        if(err){
            res.status(400).json({message : err.message})
        }
        else{
            const image = new Image({
                itemId: req.body.itemId,
                imageName: req.body.imageName,
                path: '/server/uploads/',
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })

            image
                .save()
                .then(()=> res.status(201).json(image))
                .catch(()=> res.status(500).json({message : err.message}))
        }
    })
})
//Create and save a new item in the DB
//route url http://localhost:3000/items/api/submit
router.post('/api/submit', async (req,res) => {
    
    const now = new Date()

    const item = new Item({
        itemId: req.body.itemId,
        isAvailable: true,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        buyPrice: req.body.buyPrice,
        firstBid: req.body.firstBid,
        numberOfBids: 0,
        sellerId: req.body.sellerId,
        started: req.body.time,
        ends: req.body.ends,
        images: req.body.images,
        location: req.body.location,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
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
//route url http://localhost:3000/items/api/update_bids/:itemId'
router.post('/api/update_bids/:itemId', getItemById, async (req,res) => {
    try{
        res.item.bids.bid.push(req.body.bid)
        const updatedBid = await res.item.save()
        res.json(updatedBid)

    }catch (error) {
        res.status(400).json({message: error.message})
    }
})

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