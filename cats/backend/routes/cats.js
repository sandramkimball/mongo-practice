var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var catData = require('../data.json');
var Cat = require('../models/Cat');
var MongoClient = require('mongodb').MongoClient;

// Connect to DB wtih Mongo
// const client = new MongoClient(`${process.env.DB_CONNECT}`, { useNewUrlParser: true, useUnifiedTopology: true});
// const db = mongoose.connection
// db.once('open', ()=> console.log('  ---DB: connected'))
// db.on('error', err => console.log('  ---DB: error!', err))


// GET
router.get('/', (req, res) => {
    Cat.find()
    .then(cats => {
        res.json({data: cats})
    })
    .catch( err => {
        res.json({message: err.message, error: err})
    })
})

router.post('/', (req, res) => {
    const cat = new Cat({
        name: req.body.name,
        url: req.body.url,
        hobbies: req.body.hobbies
    })
    cat.save()
    .then( (cat)=> {
        res.json({message:'.....meow.....', data: cat})
    })
    .catch( err => {
        res.json({message: err.message, error: err}) 
    })    
})

router.put('/', (req, res) => {
    var id = req.params.id
    Cat.findByIdAndUpdate({id})
    .then(cat => {
        res.json({message: 'Fixed the cat.', data: cat})
    })
    .catch( err => {
        res.json({message: err.message, error: err})
    })
})

router.delete('/', (req, res) => {
    var id = req.params.id
    Cat.findByIdAndDelete({id})
    .then( () => {
        res.json({message: 'Cat was adopted.'})
    })
    .catch( err => {
        res.json({message: err.message, error: err})
    })
})



module.exports = router;