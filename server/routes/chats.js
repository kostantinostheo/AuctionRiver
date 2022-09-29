const express = require('express')
const router = express.Router()
const Chat = require('../models/chat')
const Utils = require('../utils/const')

router.get('/api/find-all/:userId', async (req,res) => {
    try{
        const userChats = []
        const chats = await Chat.find()

        for(const chat of chats){
            if(chat.membersIds.includes(req.params.userId)){
                userChats.push(chat)
            }
        }

        res.status(200).json(userChats)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/api/message/:chatId', async(req,res) => {
    
    //First we need to check if chat with id exist
    //We check both for charId and the inverted of it
    const chatId = req.params.chatId
    let chatIdInv = chatId.split("-")
    chatIdInv = String(chatIdInv[1] + "-" + chatIdInv[0])

    const chat1 = await Chat.findOne( { chatId: chatId} )
    const chat2 = await Chat.findOne( { chatId: chatIdInv} )
    let tryExist = false;
    chat1 || chat2 ? tryExist = true : tryExist = false
    ///////////////////////////////////////////////////////

    if(tryExist){
        //Update the current chat
        let chat = null
        if(chat1 != null)
            chat = chat1
        else 
            chat = chat2
        
        let now = new Date()
        const body = {
            sender: req.body.sender, 
            message: req.body.message, 
            timestamp: now
        }

        try{
            chat.messages.push(body)
            const updatedChat = await chat.save()
            res.json(updatedChat)
        }catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    else{
        //Start a new chat
        const user1 = String(req.body.members[0])
        const user2 = String(req.body.members[1])
        const chatId = user1+"-"+user2
        let now = new Date()
        console.log(req.body.message)
        const chat = new Chat({
            chatId: chatId,
            membersIds: req.body.members,
            messages: [{
                sender: req.body.sender, 
                message: req.body.message, 
                timestamp: now
            }],
        })
        try{
            const newChat = await chat.save()
            res.status(201).json(newChat)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    }
})

module.exports = router