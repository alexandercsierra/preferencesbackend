const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./authModel');
const generateToken = require('../config/generateToken')
const {validateUser} = require('../middleware/validators')
const restricted = require ('../middleware/restricted')

router.post('/register', validateUser, (req, res)=>{

    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    user.img_url = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fboingboing.net%2F2020%2F06%2F02%2Fstop-using-the-blm-hashtag-on.html&psig=AOvVaw1BLy0N5HCEFccqEgd4g72a&ust=1594513133839000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCICRrLr2w-oCFQAAAAAdAAAAABA0'

    User.add(user)
        .then(user=>res.status(200).json(user))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: `server error ${err.message}`})
        })
})


router.post('/login', validateUser, (req, res)=>{
    
    const {username, password} = req.body;

    console.log('body', req.body)

    User.findByUsername({username}).first()
        .then(user=>{
            console.log('found', user)
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({user, token})
            } else{
                res.status(401).json({message: 'invalid credentials'})
            }

        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: `server error ${err.message}`})
        })

})

router.put('/img_url', restricted, (req, res) => {

    const id = req.decodedToken.subject
    const img_url = req.body;
    
    console.log('image', img_url)
    User.editImage(id, img_url)
        .then(img=>res.status(200).json(img))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: `server error ${err.message}`})
        })
})


router.get('/', restricted, (req, res)=>{

    let id = req.decodedToken.subject


    User.findBy(id)
        .then(user=>res.status(200).json(user))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: `server error ${err.message}`})
        })
})

module.exports = router;