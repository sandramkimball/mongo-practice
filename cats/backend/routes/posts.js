var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var catData = require('../data.json');
var Post = require('../models/Post');
var MongoClient = require('mongodb').MongoClient;

// Connect to DB wtih Mongo
const client = new MongoClient(`${process.env.DB_CONNECT}`, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.once('open', ()=> console.log('  ---DB: connected'))
db.on('error', err => console.log('  ---DB: error!', err))


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


router.get('/newcat', (req, res) => {
    const client = new MongoClient(`${process.env.DB_CONNECT}`, { useNewUrlParser: true, useUnifiedTopology: true});
    
    client.db("cats").collections('posts').find()
    // Post.find()
    .then( posts => {
        res.status(200).json(posts)
    })
    .catch( err => {
        res.status(400).json({message: err.message, error: err})
    })
        
})


router.post('/newcat', (req, res, client) => {
    const post = new Post({
        name: req.body.name,
        url: req.body.url,
        hobbies: req.body.hobbies
    })
    client.connect(err => {
        if(err){
            throw new Error('...ouch. No connection.', err)
        } else {            
            client.db("cats").collection("posts").insert_one(post)
            // post.save()
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