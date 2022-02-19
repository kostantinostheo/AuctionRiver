const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {MongoClient}  = require('mongodb')

require('dotenv').config()


const uri = process.env.CLIENT_DB_URL

/*
    Creating a mongodb client. We can have access to the mongodb and its collection
    Here I create a simple async command that brings the number of users in the db. 
    I use this number to create the next user id. 
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
router.get('/api/:user_id', getUserById, (req,res) => {
    res.send(res.user)
})



//Registers a new user in the DB
//route url http://localhost:3000/users/api/register
router.post('/api/register', async (req,res) => {

    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    let lastId = await dbGetLastUserId()

    const user = new User({
        user_id: ++lastId,
        role: req.body.email.includes("admin@admin.") ? "admin" : "user",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPass,
        date: req.body.date,
        sex: req.body.sex,
        address: req.body.address, 
        phone: req.body.phone,
        mobile: req.body.mobile
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
                user_id: user.user_id,
                role: user.role,
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
    }if(req.body.email != null){
        res.user.email = req.body.email
    }if(req.body.address != null){
        res.user.address = req.body.address
    }if(req.body.phone != null){
        res.user.phone = req.body.phone
    }if(req.body.mobile != null){
        res.user.mobile = req.body.mobile
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//Delete user
router.delete('/:user_id', (req,res) => {
    
})


async function getUserById(req, res, next){
    const user = await User.findOne( { user_id: req.params.user_id} )
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