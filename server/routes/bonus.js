const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Utils = require('../utils/const')
const Matrix = require('../models/matrix')
const matrix = require('../utils/MatrixFactorization/matrix')
const fetch = require('node-fetch');

require('dotenv').config()

const uri = process.env.CLIENT_DB_URL

async function getUsers(){
    const res = await fetch(process.env.GET_USERS)
    const data = res.json()
    return data
}

router.patch('/api/recommend/:userId', getUserById, async(req,res) => {
    try{
        const userid = res.user.userId
        const dbmatrix = await Matrix.findOne()
        const timestampNow = new Date()
        const timestamp = dbmatrix.timestamp
        const msBetweenDates = Math.abs(timestamp.getTime() - timestampNow.getTime());
        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

        //If the 24hrs hasn't pass or the matrix is null then run the algorithm.
        if (hoursBetweenDates >= 24 || dbmatrix.matrix.length === 0){

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
            dbmatrix.matrix = ratings
            dbmatrix.timestamp = timestampNow
            const updatedMatrix = await dbmatrix.save()

            //Translate the array of ratings to array of ids and return it here
            return ratings[userid-1]
        }
        else{
            //else return the saved row that is for the spesific user
            //Translate the array of ratings to array of ids and return it here
            return dbmatrix.matrix[userid-1]
        }
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
router.post('/api/submit-matrix', async(req,res) => {
    const now = new Date()
    const matrix = new Matrix({
        timestamp: now,
        matrix: []
    })
    
    try{
        const newMatrix = await matrix.save()
        res.status(201).json(newMatrix)
    }
    catch(err){
        res.status(400).json({message : err.message})
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