const Todo = require('./../models/todo');
const Category = require('./../models/category');
const User = require('./../models/user');
const { success, errorMessage } = require('./../helper/response');
const { validationTodo } = require('./../helper/validator');

// 1. Create new Todo
async function createTodo(req, res){
    // checking if there is any error inputs
    const { error } = validationTodo(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // find the user
    let user = await User.findById(req.user._id);

    // Find Category based on category ID
    let category = await Category.findById(req.body.category);
    if(!category) return res.status(422).json(errorMessage("Category Not Found!"));

    // New and Create Function
    const populateQuery = [{path:'category', select: 'name'}, {path:'author', select: 'name'}];
    const todo = new Todo({task: req.body.task, status: req.body.status, category: req.body.category, author: req.user._id}).populate(populateQuery)
    
    // save new todo in todo schema
    const todo_result = await todo.save();
    // save new todo in User Schema
    user.todo.push(todo);
    await user.save();
    // save new todo in Category schema
    category.todo.push(todo);
    await category.save();
    

    res.status(200).json(success(todo_result, "Success create new task !"))
}


// 2. Show all Todo
async function showTodo(req, res){
    const populateQuery = [{path:'category', select: 'name'}, {path:'author', select: 'name'}];
    // show all todo
    const todoList = await Todo.find({}).populate(populateQuery);
    res.status(200).json(success(todoList, "here is your Todo List:"))
}


// 3. Show Todo By Id
async function show_by_id(req, res){
    const populateQuery = [{path:'category', select: 'name'}, {path:'author', select: 'name'}];
    // find the Todo based on Id
    const todo = await Todo.findById(req.params.id).populate(populateQuery)
    res.status(200).json(success(todo, "Detail Todo List:"))
}


// 4. Update Todo List
async function updateTodo(req, res){
    // checking if there is any error inputs
    const { error } = validationTodo(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // Request the User token
    let user = await User.findById(req.user._id);
    if(!user) return res.status(421).json(errorMessage("user not found"));
    
            /** delete the Old Category Data */
    // get the Todo Id at Todo Schema
    let todo = await Todo.findById(req.params.id);
    if(!todo) res.status(422).json(errorMessage("Id not found"))

    // get the Category Data based on Req.body.categoryId
    category = await Category.findOne({todo: req.params.id});
    if(!category) res.status(422).json(errorMessage("Id not found"))

    // delete the Todo from Category Id
    removeTodo(category.todo, todo._id);


    // Update the Todo
    const populateQuery = [{path:'category', select: 'name'}, {path:'author', select: 'name'}];
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, 
        {
            $set: {task: req.body.task, status: req.body.status, category: req.body.category, user: req.user._id}
        },
        {new: true}).populate(populateQuery);
    
    // check if the Todo ID already saved!
    if(!updateTodo) return res.status(422).json(errorMessage("failed to updated!"));

    res.status(200).json(success(updateTodo, "successfully update"))
    };

// 5. Delete Todo Based on Id
// Remove Todo from index
function removeTodo(todo, elem){
    var index = todo.indexOf(elem);
    if(index > -1){
        todo.splice(index, 1);
    }
}

async function deleteTodo(req, res){
    // get the Todo Id at Todo Schema
    let todo = await Todo.findById(req.params.id);
    if(!todo) res.status(422).json(errorMessage("Id not found"))


            /** DELETE TODO FROM CATEGORY */
    // get the Category Data based on Req.body.categoryId
    category = await Category.findOne({todo: req.params.id});
    if(!category) res.status(422).json(errorMessage("Id not found"))

    // delete the Todo from Category Id
    removeTodo(category.todo, todo._id);


            /** DELETE TODO FROM USER */
    // get the User Data based on Req.body.userId
    user = await User.findOne({todo: req.params.id});
    
    // delete the Todo from User Id
    removeTodo(user.todo, todo._id);


            /** DELETE TODO FROM TODO */
    // delete the Todo from Todo List
    todo = await Todo.findByIdAndDelete(req.params.id);
    if(!todo) res.status(422).json(errorMessage("Id not found"))

    res.status(200).json(success(todo, "successfully deleted!"))
}


module.exports = { createTodo, showTodo, show_by_id, updateTodo, deleteTodo}
