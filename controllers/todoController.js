const Todo = require('./../models/todo');
const Category = require('./../models/category');
const { success, errorMessage } = require('./../helper/response');
const { validationTodo } = require('./../helper/validator');

// 1. Create new Todo
async function createTodo(req, res){
    // checking if there is any error inputs
    const { error } = validationTodo(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // Find Category based on category ID
    let category = await Category.findById(req.body.category);
    if(!category) return res.status(422).json(errorMessage("Category Not Found!"));

    // New and Create FUnction
    const todo = new Todo({task: req.body.task, status: req.body.status, category: req.body.category})
    .populate('category', 'name')
    // save new todo in todo schema
    const todo_result = await todo.save();

    // save new todo in Category schema
    category.todo.push(todo);
    const category_result = await category.save();
    

    res.status(200).json(success(todo_result, "Success create new task !"))
}


// 2. Show all Todo
async function showTodo(req, res){

    const todoList = await Todo.find({}).populate('category', 'name');
    res.status(200).json(success(todoList, "here is your Todo List:"))
}


// 3. Show Todo By Id
async function show_by_id(req, res){
    const todo = await Todo.findById(req.params.id).populate('category', 'name');
    res.status(200).json(success(todo, "Detail Todo List:"))
}


// 4. Update Todo List
async function updateTodo(req, res){
    // checking if there is any error inputs
    const { error } = validationTodo(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // Update the Todo
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, 
        {
            $set: {task: req.body.task, status: req.body.status, category: req.body.category}
        },
        {new: true})
    
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

    // get the Category Data based on Req.body.categoryId
    category = await Category.findOne({todo: req.params.id});
    if(!category) res.status(422).json(errorMessage("Id not found"))

    // delete the Todo from Category Id
    removeTodo(category.todo, todo._id);
    // delete the Todo from Todo List
    todo = await Todo.findByIdAndDelete(req.params.id);
    if(!todo) res.status(422).json(errorMessage("Id not found"))

    res.status(200).json(success(todo, "successfully deleted!"))
}


module.exports = { createTodo, showTodo, show_by_id, updateTodo, deleteTodo}
