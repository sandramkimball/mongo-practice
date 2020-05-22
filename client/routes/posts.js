var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var catData = require('../data.json');


router.get('/', (req, res, err, client) => {
    db = client.db.cats('posts')

    db.find()
    .then( res => {
        res.status(200).json({message: '.......meow.......'})
        console.log('.......meow.......')
        db.close() 
    })
    .catch( err => res.status(400).json({message: err.message, error: err}) )
})


router.post('/', (req, res, err, client) => {
    const post = new Post({
        name: req.body.name,
        url: req.body.url,
        hobbies: req.body.hobbies
    })

    db = client.db.cats('posts')
    db.insertOne(post)
    .then( res => {
        res.status(201).json({message: 'Cat added!'})
        db.close() 
    })
    .catch( err => res.status(400).json({message: err.message, error: err}) )
})

module.exports = router;