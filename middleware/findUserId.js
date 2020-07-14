const Users = require('../auth/authModel')

module.exports = (req, res, next) => {

    const email = req.jwt.claims.sub
    Users.findByEmail(email)
        .then(user=>{
            if(user.length !== 0){
                req.body.the_user_id = user[0].id
                next();
            } else{
                res.status(404).json({message:'user not found'})
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: `server error ${err.message}`})
        })
}