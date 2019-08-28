const router = require('express').Router();
const todoRouter = require('./todoRouter');
const categoryRouter = require('./categoryRouter');

router.use('/todo', todoRouter);
router.use('/category', categoryRouter);


module.exports = router;

