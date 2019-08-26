const router = require('express').Router();
const todoController = require('./../controllers/todoController');

router.post('/new', todoController.createTodo);
router.get('/show', todoController.showTodo);
router.get('/show/:id', todoController.show_by_id);
router.delete('/delete/:id', todoController.deleteTodo);


module.exports = router;
