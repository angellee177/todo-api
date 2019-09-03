const router = require('express').Router();
const todoController = require('./../controllers/todoController');
const auth = require('./../middleware/auth');


router.post('/new', auth, todoController.createTodo);
router.get('/', todoController.showTodo);
router.get('/show/:id', auth, todoController.show_by_id);
router.delete('/delete/:id', auth, todoController.deleteTodo);
router.put('/update/:id', auth, todoController.updateTodo);

module.exports = router;
