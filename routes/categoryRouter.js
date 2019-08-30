const router = require('express').Router();
const categoryController = require('./../controllers/categoryController');

router.post('/new', categoryController.createCategory);
router.get('/', categoryController.showAllCategory);
router.get('/show/:id', categoryController.show_category_id);
router.put('/updated/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);

module.exports = router;

