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
    const res = await fetch('http://localhost:3000/users/api')
    const data = res.json()
    return data
}
async function getItems(){
    const res = await fetch(process.env.GET_ITEMS)
    const data = res.json()
    return data
}
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

router.patch('/api/recommend/:userId', getUserById, async(req,res) => {
    try{
        const dbmatrix = await Matrix.findOne()
        const timestampNow = new Date()
        const timestamp = dbmatrix.timestamp
        const msBetweenDates = Math.abs(timestamp.getTime() - timestampNow.getTime());
        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

        //If the 24hrs hasn't pass or the matrix is null then run the algorithm.
        if (hoursBetweenDates >= 24 || dbmatrix.matrix.length === 0){

            const users = await getUsers()
            const items = await getItems()

            users.sort((a,b)=>(a.userId > b.userId) ? 1 : -1)

            const userIds = []
            array = []
            var i = 0
            for (const user of users){
                var columns = []

                userIds.push(user.userId)
                var likedItems = user.saved
                var recentItems = user.recent
                var boughtItems = user.shoppingList
                var j = 1
                for (const item of items){
                    if(likedItems.includes(item.itemId) && boughtItems.includes(item.itemId)){
                        columns[j-1] = 4
                    }
                    else if(likedItems.includes(item.itemId)){
                        columns[j-1] = 2
                    }
                    else if(boughtItems.includes(item.itemId)){
                        columns[j-1] = 3
                    }
                    else if(recentItems.includes(item.itemId)){
                        columns[j-1] = 1
                    }
                    else{
                        columns[j-1] = 0
                    }
                    j++
                }
                array[i] = columns
                i++
            }

            ratings = matrix.matrixFactorization(array)
            dbmatrix.users = userIds
            dbmatrix.matrix = ratings
            dbmatrix.timestamp = timestampNow
            const updatedMatrix = await dbmatrix.save()

            //get index of user from the saved array of user ids.......example of userIds array: [1,2,4,6,7,8] and we get the index
            var index = userIds.indexOf(res.user.userId)
            console.log("user with id: " + res.user.userId + " is at position: " + index)
            //get the row with the ratings of the specific user
            const userRatings = ratings[index]
            //create the array of objects
            let temp = []
            let count = 1
            for(const rating of userRatings){
                temp.push({itemId: count, rating: rating})
                count++
            }
            //sort the array of objects based of the biggest rating 
            temp.sort((a,b)=>(a.rating < b.rating) ? 1 : -1)
            console.log(temp)
            //create the array of item ids
            let idArray = []
            for (let i = 0; i < temp.length; i++) {
                idArray.push(temp[i].itemId)
            }
            console.log(idArray)
            return idArray
        }
        else{
            //get index of user from the saved array of user ids.......example of userIds array: [1,2,4,6,7,8] and we get the index
            var index = dbmatrix.users.indexOf(res.user.userId)
            console.log("User with id: '" + res.user.userId + "' is at row position: '" + index + "' of the matrix")
            //get the row with the ratings of the specific user
            const userRatings = dbmatrix.matrix[index]
            //create the array of objects
            let temp = []
            let count = 1
            for(const rating of userRatings){
                temp.push({itemId: count, rating: rating})
                count++
            }
            //sort the array of objects based of the biggest rating 
            temp.sort((a,b)=>(a.rating < b.rating) ? 1 : -1)
            console.log(temp)
            //create the array of item ids
            let idArray = []
            for (let i = 0; i < temp.length; i++) {
                idArray.push(temp[i].itemId)
            }
            console.log(idArray)
            return idArray
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
        users: [],
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