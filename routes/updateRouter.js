const router = require('express').Router();
const todoController = require('./../controllers/todoController');

router.put('/:id', todoController.updateTodo);


module.exports = router;