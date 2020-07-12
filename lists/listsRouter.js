const express = require('express');
const router = express.Router();
const Lists = require('./listsModel')


router.post('/', (req, res)=>{

    let id = req.decodedToken.subject
    let body = req.body
    body.user_id = id
    Lists.add(body)
        .then(list=>res.status(201).json(list))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})


//gets all lists belonging to a user
router.get('/', (req, res)=>{

    Lists.findByUserId(req.decodedToken.subject)
        .then(list=>res.status(200).json(list))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

//get list of a particular user
router.get('/:id', (req, res)=>{
    const {id} = req.params
    Lists.findByUserId(id)
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
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    Lists.remove(id)
        .then(list=>res.status(200).json(list))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

module.exports = router;