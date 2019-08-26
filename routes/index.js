const router = require('express').Router();
const todoRouter = require('./todoRouter');
const UpdateTodo = require('./updateRouter');

router.use('/todo', todoRouter);
router.use('/update', UpdateTodo);

module.exports = router;

