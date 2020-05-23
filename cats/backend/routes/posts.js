var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var catData = require('../data.json');
var MongoClient = require('mongodb').MongoClient;

// Connect to DB wtih Mongo
const url = process.env.DB_CONNECT
const collection = client.db("cats").collection("posts");
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true}, ()=> {
  console.log('---MONGODB: Connected')
});



router.get('/', (req, res) => {
    res.send({catData})
})

router.post('/', (req, res) => {
    res.send('.....meow.....')
    // post.save()
    // .then(res=> {
    //     res.status(201).json({message:'Cat added.', data: post})
    // })
    // .catch( err => {
    //     res.status(400).json({message: err.message, error: err}) 
    // })    
})


router.get('/newcat', (req, res, client, collection) => {
    client.connect(err => {
        if(err){
            throw new Error('...ouch. No connection.')
        } else {
            collection.find()
            .then( res => {
                res.status(201).json({res})
            })
            .catch( err => {
                res.status(400).json({message: err.message, error: err})
            })
        }
        client.close()
    })
})


router.post('/newcat', (req, res, collection, client) => {
    const post = new Post({
        name: req.body.name,
        url: req.body.url,
        hobbies: req.body.hobbies
    })

    client.connect(err => {
        if(err){
            throw new Error('...ouch. No connection.')
        } else {
            collection.insertOne(post)
            .then( res => {
                res.status(201).json({message: 'Cat added!'})
            })
            .catch( err => {
                res.status(400).json({message: err.message, error: err})
            })
        }
        client.close()
    })
})



module.exports = router;