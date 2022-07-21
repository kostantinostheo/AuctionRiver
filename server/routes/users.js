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
        const users = await User.find()
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

    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    let lastId = await dbGetLastUserId()

    const user = new User({
        userId: ++lastId,
        userType: req.body.email.includes("admin@admin.") ? Utils.userType.Admin : Utils.userType.User,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        address: req.body.address,
        phone: req.body.phone,
        vatNumber: req.body.vatNumber,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        userValidation: Utils.userValidation.Pending
    })

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
    
    const user = await User.findOne( { email: req.body.email } )

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
            },
            'secretcode123' //You can change it if you want for better encription
            )
            return res.json({token: token})
        }
        else
            res.send('Fail')
    } catch {
        res.status(500).send("Fail")
    }
})


//Updates user data. Example when change profile info.
//route url http://localhost:3000/users/api/100 (example)
router.patch('/api/:user_id', getUserById, async (req,res) => {
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


//Delete user
router.delete('/:user_id', (req,res) => {
    
})


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