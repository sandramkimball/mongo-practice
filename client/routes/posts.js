var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var catData = require('../data.json');


router.get('/', (req, res) => {
    res.send({catData})
})

router.post('/newcat', (req, res) => {
    const post = new Post(req.body);

    post.insert()
    .then(() => 
        res.status(201).json(data)
    )
    .catch(err => 
        res.status(500).json({message: 'Failed to post', err})
    )
})

// router.post('/newcat', (req, res) => {
//     const post = new Post({
//         name: req.body.name,
//         hobbies: req.body.hobbies,
//         url: req.body.url
//     });

//     post.save()
//     .then(() => 
//         res.status(201).json(data)
//     )
//     .catch(err => 
//         res.status(500).json({message: 'Failed to post', err})
//     )
// })

module.exports = router;