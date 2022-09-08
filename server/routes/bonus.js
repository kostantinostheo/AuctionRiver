const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Utils = require('../utils/const')
const matrix = require('../utils/MatrixFactorization/matrix')
const fetch = require('node-fetch');
var request = require('request');

const {MongoClient}  = require('mongodb')

require('dotenv').config()

const uri = process.env.CLIENT_DB_URL

async function getUsers(){
    const res = await fetch('http://localhost:3000/users/api')
    const data = res.json()
    return data
}

router.get('/api/recommend/:userId', getUserById, async(req,res) => {
    try{
        const userid = res.user.userId
        const users = await getUsers()
        users.sort((a,b)=>(a.userId > b.userId) ? 1 : -1)

        array = []
        var i = 0
        for (const user of users){
            var columns = []
            var likedItems = user.saved
            var recentItems = user.recent
            var boughtItems = user.shoppingList
            for (var j = 1; j < 21; ++j){
                if(likedItems.includes(j) && boughtItems.includes(j)){
                    columns[j-1] = 4
                }
                else if(likedItems.includes(j)){
                    columns[j-1] = 2
                }
                else if(boughtItems.includes(j)){
                    columns[j-1] = 3
                }
                else if(recentItems.includes(j)){
                    columns[j-1] = 1
                }
                else{
                    columns[j-1] = 0
                }
            }
            array[i] = columns
            i++
        }

        ratings = matrix.matrixFactorization(array)

        return ratings[userid-1]
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})

async function getUserById(req, res, next){
    const user = await User.findOne( { userId: req.params.userId, userType: Utils.userType.User} )
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