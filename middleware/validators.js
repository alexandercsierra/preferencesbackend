module.exports = {
    validateUser,
    validateUserId
}

const Users = require('../auth/authModel')

function validateUser (req, res, next){
    if (!req.body){
        res.status(400).json({message: 'must have a user'})
    }
    if (!req.body.username || !req.body.password){
        res.status(400).json({message: 'user must have a username and password property'})
    }
    next();
}

function validateUserId(req, res, next){
    Users.findBy(req.params.id)
        .then(user=>{
            user ? next() : res.status(404).json({message: 'no user exists with that id'})
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'there was an error validating the user id'})
        })
}