const router = require('express').Router();
const userController = require('./../controllers/userController');
const auth = require('./../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.showAllUser);
router.delete('/:id', auth, userController.deleteUser);
router.get('/profile', auth, userController.current_user);
router.put('/profile', auth, userController.updateUser);

module.exports = router;


