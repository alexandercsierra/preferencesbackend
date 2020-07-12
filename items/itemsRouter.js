const express = require('express');
const router = express.Router();
const Items = require('./itemsModel')

router.post('/:id', (req, res)=>{

    let body = req.body;
    body.list_id = req.params.id

    Items.add(body)
        .then(item=>res.status(201).json(item))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})


//id of the list the item belongs to
router.get('/:id', (req, res)=>{
    const {id} = req.params
    Items.findByListId(id)
        .then(item=>res.status(200).json(item))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

//id of the item
router.put('/:id', (req, res)=>{
    const {id} = req.params
    const item = req.body
    Items.update(id, item)
        .then(newItem=>res.status(200).json(newItem))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

//id of the item
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    Items.remove(id)
        .then(item=>res.status(200).json(item))
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

module.exports = router;