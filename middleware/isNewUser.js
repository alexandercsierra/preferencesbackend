const Users = require('../auth/authModel')

module.exports = (req, res, next) => {

    const email = req.jwt.claims.sub
    Users.findByEmail(email)
        .then(user=>{
            if(user.length !== 0){
                console.log('same user')
                next();
            } else{
                console.log('newuser')
                newUser = {
                    name: email,
                    email: email,
                    username: email,
                    password: email,
                    img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_from_a_camera.jpg/640px-Black_from_a_camera.jpg'
                }
                Users.add(newUser)
                .then(user=>{res.status(200).json(user)})
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({message: `server error ${err.message}`})
                })
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: `server error ${err.message}`})
        })
}