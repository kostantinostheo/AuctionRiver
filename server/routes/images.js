const multer = require('multer')
const express = require('express')
const router = express.Router()
const Image = require('../models/image')

const storage = multer.diskStorage({
    destination:'uploads',
    filename: (req, file, callback)=>{
        callback(null, file.originalname)
    },
})


var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


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

//Uploads a new image
//route url http://localhost:3000/items/api/image/upload'
router.post('/api/image/upload', upload.single('image'), (req, res, next) => {
    
    const url = req.protocol + '://' + req.get('host')
    const image = new Image({
        name: req.body.name,
        image: url + '/public/' + req.file.filename
    })
    image.save().then(result => {
        res.status(201).json({
            message: "Image uploaded successfully!",
            imageCreated: {
                name: result.name,
                image: result.image
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})


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