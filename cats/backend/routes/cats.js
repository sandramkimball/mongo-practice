var express = require('express');
var router = express.Router();
var Cat = require('../models/Cat');


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

router.put('/:id', (req, res) => {
    var id = req.params.id
    Cat.findByIdAndUpdate({id})
    .then(cat => {
        res.json({message: 'Fixed the cat.', data: cat})
    })
    .catch( err => {
        res.json({message: err.message, error: err})
    })
})

router.delete('/:id', (req, res) => {
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