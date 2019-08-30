const router = require('express').Router();
const todoController = require('./../controllers/todoController');

router.post('/new', todoController.createTodo);
router.get('/', todoController.showTodo);
router.get('/show/:id', todoController.show_by_id);
router.delete('/delete/:id', todoController.deleteTodo);
router.put('/update/:id', todoController.updateTodo);

module.exports = router;
