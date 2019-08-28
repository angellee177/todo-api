const Joi = require('@hapi/joi');

// for Validate Todo Function
function validationTodo(todoSchema){
    const schema = {
        task: Joi.string().required(),
        status: Joi.boolean(),
        category: Joi.string().required()
    }
    return Joi.validate(todoSchema, schema);
}

function validationCategory(categorySchema){
    const schema = {
        name: Joi.string().required()
    }
    return Joi.validate(categorySchema, schema);
}

module.exports = { validationTodo, validationCategory };
