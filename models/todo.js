const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    author: { type: Schema.Types.ObjectId, ref: "User" }
})

const Todo = mongoose.model("Todo", todoSchema);



module.exports = Todo;


