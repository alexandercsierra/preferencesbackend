const express = require('express');
const router = express.Router();
const Friends = require('./friendsModel')

// router.post('/', (req, res)=>{

//     let id = req.decodedToken.subject
//     let body = {};
//     body.user1 = id
//     body.user2 = req.body.user2
//     Friends.add(body)
//         .then(friends=>res.status(201).json(friends))
//         .catch(err=>{
//             console.log(err)
//             res.status(500).json({message: err.message})
//         })
// })

router.post('/', (req, res)=>{
    let id = req.decodedToken.subject
    Friends.findByUsername(req.body.user)
        .then(user=>{
            let body = {};
            body.user1 = id
            body.user2 = user[0].id
            Friends.add(body)
                .then(friends=>res.status(201).json({friend: user[0].username}))
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


router.get('/', (req, res)=>{

    Friends.findByUserId(req.decodedToken.subject)
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
router.delete('/:user2', (req, res)=>{
    let id = req.decodedToken.subject
    const {user2} = req.params;
    Friends.remove(id, user2)
        .then(list=>res.status(200).json(list))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

module.exports = router;