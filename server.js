const express = require('express');
const server = express();
const apiRouter = require('./api/apiRouter');
const cors = require('cors');
const helmet = require('helmet')

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', apiRouter)

server.get('/', (req, res)=>{
    res.status(200).json({message: 'Welcome to my API'})
})


module.exports = server