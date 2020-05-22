var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var catData = require('../data.json');
var mongo = require('mongodb').MongoClient;
var assert = require('assert')
require('dotenv').config()
var url = `${process.env.DB_CONNECT}`


router.get('/', (req, res) => {
    res.send({catData})
})

router.post('/', (req, res) => {
    post.save()
    .then( res => res.status(201).json(post) )
    .catch( err => res.status(400).json({err}) )
})

router.get('/newcat', (req, res) => {
    mongo.connect(url, (err, db) => {
        if(err){ throw new Error('Cannot connect to database.', err) }
        
        assert.equal(null, err)

        db.cats('posts').find()
        .then( res => {
            res.status(201).json({message: '.......meow.......'})
            console.log('.......meow.......')
            db.close() 
        })
        .catch( err => res.status(400).json({err}) )
    })
})


router.post('/newcat', (req, res) => {
    const post = new Post({
        name: req.body.name,
        url: req.body.url,
        hobbies: req.body.hobbies
    })
    
    mongo.connect(url, (err, db)=> {
        if(err){
            throw new Error('Cannot connect to database.')
        }

        assert.equal(null, err)

        db.cats('posts').insertOne(post)
        .then( res => {
            res.status(201).json({message: 'Cat added!'})
            db.close() 
        })
        .catch( err => res.status(400).json({err}) )
    })
    
})

module.exports = router;