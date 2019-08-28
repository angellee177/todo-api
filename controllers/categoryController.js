const Category = require('./../models/category');
const Todo = require('./../models/todo');
const { success, errorMessage } = require('./../helper/response');
const { validationCategory } = require('./../helper/validator');

// 1. Create new Category
async function createCategory(req, res){
    // checking if there is any error inputs
    const { error } = validationCategory(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    
    // New and Create FUnction
    const new_category = new Category({name: req.body.name});

    await new_category.save();
    res.status(200).json(success(new_category, "Success create new Category !"))
}


// 2. Show All Category 
async function showAllCategory(req, res){
    const categoryList = await Category.find({})
    .populate('todo', 'task');
    res.status(200).json(success(categoryList, "here is your Category List"));
}


// 3. Show Category based on ID
async function show_category_id(req, res){
    const category = await Category.findById(req.params.id);
    res.status(200).json(success(category, "Detail Category"));
}


// 4. Update Category based on ID
async function updateCategory(req, res){
    const update_category = await Category.findByIdAndUpdate(req.params.id,{
        $set: {name: req.body.name}
    }, { new: true })

    if(!update_category) return res.status(422).json(errorMessage("failed to Updated Category!"));
    res.status(200).json(success(update_category, "Successfully Update!"));
}


// 5. Delete Category based on ID
async function deleteCategory(req, res){
    const delete_category = await Category.findByIdAndDelete(req.params.id)

    if(!delete_category) return res.status(422).json(errorMessage("Failed to Deleted Category!"));
    res.status(200).json(success(delete_category, "Successfully Deleted!"))
}

module.exports = { createCategory, showAllCategory, show_category_id, updateCategory, deleteCategory };

