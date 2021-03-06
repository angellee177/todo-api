const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    todo: [{type: Schema.Types.ObjectId, ref: 'Todo'}]

})

const   Category = mongoose.model("Category", categorySchema);



module.exports = Category;
