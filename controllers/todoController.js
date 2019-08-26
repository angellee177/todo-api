const Todo = require('./../models/todo');
const { success, errorMessage } = require('./../helper/response');
const { validationTodo } = require('./../helper/validator');

// 1. Create new Todo
async function createTodo(req, res){
    // checking if there is any error inputs
    const { error } = validationTodo(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // New and Create FUnction
    const new_todo = new Todo({task: req.body.task, status: req.body.status});

    await new_todo.save();
    res.status(200).json(success(new_todo, "Success create new task !"))
}


// 2. Show all Todo
async function showTodo(req, res){

    const todoList = await Todo.find({});
    res.status(200).json(success(todoList, "here is your Todo List:"))
}


// 3. Show Todo By Id
async function show_by_id(req, res){
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(success(todo, "Detail Todo List:"))
}


// 4. Update Todo List
async function updateTodo(req, res){
    // checking if there is any error inputs
    const { error } = validationTodo(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, 
        {
            $set: {task: req.body.task, status: req.body.status}
        },
        {new: true})

        if(!updateTodo) return res.status(422).json(errorMessage("failed to updated!"));
        res.status(200).json(success(updateTodo, "successfully update"))
    };

// 5. Delete Todo Based on Id
async function deleteTodo(req, res){
    const delete_todo = await Todo.findByIdAndDelete(req.params.id)

    if(!delete_todo) return res.status(422).json(errorMessage("Failed to deleted"));
    res.status(200).json(success(deleteTodo, "successfully deleted!"))
}


module.exports = { createTodo, showTodo, show_by_id, updateTodo, deleteTodo}
