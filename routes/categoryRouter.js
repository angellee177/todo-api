const router = require('express').Router();
const categoryController = require('./../controllers/categoryController');
const auth = require('./../middleware/auth');


router.post('/new', auth, categoryController.createCategory);
router.get('/', categoryController.showAllCategory);
router.get('/show/:id', auth, categoryController.show_category_id);
router.put('/updated/:id', auth, categoryController.updateCategory);
router.delete('/delete/:id', auth, categoryController.deleteCategory);

module.exports = router;

