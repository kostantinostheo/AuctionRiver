//Database url and other sensitive data are hidden inside a .env file.
//This file must always stay local and never be commited.
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');

//Create a new mongoose connection.
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

//Handle connection error.
db.on('error', (error) => console.error(error))
//Open the connection and connect with the database.
db.once('open', () => console.log('Conected to Database'))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

//Get access to users route.
const usersRouter = require('./routes/users')
const itemsRouter = require('./routes/items')
const imageRouter = require('./routes/images')

app.use('/users', usersRouter)
app.use('/items', itemsRouter)
app.use('/images', imageRouter)

app.listen(3000, ()=> console.log('Api started with no errors..'))