const express = require('express');
const router = express.Router();
const restricted = require('../middleware/restricted')
const authRouter = require('../auth/authRouter')
const listsRouter = require ('../lists/listsRouter')
const itemsRouter = require('../items/itemsRouter')
const friendsRouter = require('../friends/friendsRouter')

router.use('/auth', authRouter);
router.use('/lists', restricted, listsRouter);
router.use('/items', restricted, itemsRouter);
router.use('/friends', restricted, friendsRouter);

module.exports = router;