const router = require('express').Router();
const todoRouter = require('./todoRouter');
const categoryRouter = require('./categoryRouter');
const userRouter = require('./userRouter');

router.use('/todo', todoRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);

module.exports = router;

