var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

router.get('/', (req, res)=> {
    res.send({
        "id": "4",
        "content": "I am post #4."
    })
})

router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save()
    .exec()
    .then(data => {
        res.status(201).json({message: 'Post created', data})
    })
    .catch(err => { res.status(500).json({message: 'Failed to post', err})})
})

module.exports = router;