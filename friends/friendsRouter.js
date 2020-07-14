const express = require('express');
const router = express.Router();
const Friends = require('./friendsModel')
const findUserId = require('../middleware/findUserId')



router.post('/', findUserId, (req, res)=>{
    let id = req.body.the_user_id
    Friends.findByUsername(req.body.user)
        .then(user=>{
            let body = {};
            body.user1 = id
            body.user2 = user[0].id
            Friends.add(body)
                .then(friends=>res.status(201).json({friend: user[0].username, id: user[0].id}))
                .catch(err=>{
                    console.log(err)
                    res.status(500).json({message: err.message})
                })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})


router.get('/', findUserId, (req, res)=>{
    Friends.findByUserId(req.body.the_user_id)
        .then(list=>res.status(200).json(list))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

//id of the list
router.put('/:id', (req, res)=>{
    const {id} = req.params
    const list = req.body
    Lists.update(id, list)
        .then(newList=>res.status(200).json(newList))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

//id of the list
router.delete('/:user2', findUserId, (req, res)=>{
    // let id = req.decodedToken.subject
    const {user2} = req.params;
    Friends.remove(req.body.the_user_id, user2)
        .then(list=>res.status(200).json(list))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

module.exports = router;