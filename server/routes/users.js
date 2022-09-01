const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Utils = require('../utils/const')

const {MongoClient}  = require('mongodb')

require('dotenv').config()

const uri = process.env.CLIENT_DB_URL

/**
 * Returns the number of users in the db.
 */
async function dbGetLastUserId() {
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    try {
        await client.connect()
        const db = client.db("tedi")
        const users = db.collection("users")
        const number = await users.estimatedDocumentCount()
        return number
    }catch (error){
        console.error(error)
    }
    finally{
        client.close()
    }
}


//Get all users from the db
//route url http://localhost:3000/users/api
router.get('/api/', async(req,res) => {
    try{
        const users = await User.find( { userType: Utils.userType.User })
        res.json(users)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
//Get all admins from the db
//route url http://localhost:3000/users/api/admins
router.get('/api/admins', async(req,res) => {
    try{
        const admins = await User.find( { userType: Utils.userType.Admin })
        res.json(admins)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
//Get all users with pending status
//route url http://localhost:3000/users/api/status/pending/
router.get('/api/status/pending/', async(req, res) => {
    try{
        const users = await User.find( { userStatus: Utils.userStatus.Pending, userType: Utils.userType.User } )
        res.json(users)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
//Get user data by his/her id
//route url http://localhost:3000/users/api/100 (example)
router.get('/api/:userId', getUserById, (req,res) => {
    res.send(res.user)
})
//Registers a new user in the DB
//route url http://localhost:3000/users/api/register
router.post('/api/register', async (req,res) => {

    const userCredentialExists = await User.findOne( { $or: [{email: req.body.email}, {username: req.body.username}]} )
    if(userCredentialExists != null){
        return res.status(409).send('User Already Exists')
    }

    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    let lastId = await dbGetLastUserId()
    let user = null;

    if(req.body.email.includes("admin@admin.")){
        user = new User({
            userId: ++lastId,
            userType: Utils.userType.Admin,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: "admin",
            email: req.body.email,
            password: hashedPass
        })
    }
    else{
        user = new User({
            userId: ++lastId,
            userType: Utils.userType.User,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            mobile: req.body.mobile,
            SSN: req.body.SSN,
            address: req.body.address,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
            userStatus: Utils.userStatus.Pending,
            rating: 0,
            saved: [],
            recent: []
        })
    }
    console.log(user)
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})
//Login a user based on his/her credentials.
//route url http://localhost:3000/users/api/login
router.post('/api/login', async (req, res) => {
    
    const user = await User.findOne( { $or: [{email: req.body.email}, {username: req.body.username}]} )

    if(user == null){
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password))
        {
            //token contains user id and role. This allow us to modify our page with different ways according to user role.
            const token = jwt.sign({
                userId: user.userId,
                userType: user.userType,
                userStatus: user.userStatus
            },
            'secretcode123' //You can change it if you want for better encription
            )
            return res.json({token: token})
        }
        else
            res.status(400).send('Cannot find user')
    } catch {
        res.status(500).send("Fail")
    }
})
//Updates user data. Example when change profile info.
//route url http://localhost:3000/users/api/100 (example)
router.patch('/api/:userId', getUserById, async (req,res) => {
    if (req.body.firstname != null){
        res.user.firstname = req.body.firstname
    }if(req.body.lastname != null){
        res.user.lastname = req.body.lastname
    }if(req.body.address != null){
        res.user.address = req.body.address
    }if(req.body.phone != null){
        res.user.phone = req.body.phone
    }

    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Updates user status.
//route url http://localhost:3000/users/api/update/status/1
router.patch('/api/update/status/:userId', getUserById, async (req,res) => {
    try{
        res.user.userStatus = req.body.userStatus
        const updatedUserStatus = await res.user.save()
        res.json(updatedUserStatus)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Updates user rating.
//route url http://localhost:3000/users/api/update/status/1
router.patch('/api/update/rating/:userId', getUserById, async (req,res) => {
    try{
        const ratings = res.user.ratings // Number of user ratings
        ratings.push(req.body.score)

        let sum = 0
        for (let i = 0; i < ratings.length; i++) {
            sum += (res.user.ratings[i])
        }

        const rating = sum/(ratings.length)

        res.user.rating = rating
        const updateRating = await res.user.save()
        res.json(updateRating)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Save user's favorite items. Saving item ids
//route url http://localhost:3000/users/api/monitor/7
router.patch('/api/save/:userId', getUserById, async (req, res) => {
    try {
        const saved = res.user.saved
        if (saved.includes(req.body.itemId)) {
            return
        }
        saved.unshift(req.body.itemId)
        const savedItemsUpdate = await res.user.save()
        res.json(savedItemsUpdate)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})
//Monitors users visits in the site.
//route url http://localhost:3000/users/api/monitor/7
router.patch('/api/monitor/:userId', getUserById, async (req, res) => {
    try {
        const recent = res.user.recent
        if (recent.includes(req.body.itemId)) {
            return
        }
        recent.unshift(req.body.itemId)
        const recentListUpdate = await res.user.save()
        res.json(recentListUpdate)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})


/**
 * Returns the information of a user with a spesific userId
 */
async function getUserById(req, res, next){
    const user = await User.findOne( { userId: req.params.userId} )
    try {
        if(user == null){
            return res.status(404).json({ message: "Can't Find User" })
        }
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router