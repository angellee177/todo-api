const router = require('express').Router();
const todoController = require('./../controllers/todoController');

router.post('/new', todoController.createTodo);
router.get('/show', todoController.showTodo);
router.get('/show/:id', todoController.show_by_id);
router.delete('/delete', todoController.deleteTodo);
router.put('/update/:id', todoController.updateTodo);

module.exports = router;
