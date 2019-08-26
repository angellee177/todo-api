const Joi = require('@hapi/joi');

// for Validate Todo Function
function validationTodo(todoSchema){
    const schema = {
        task: Joi.string().required(),
        status: Joi.boolean()
    }
    return Joi.validate(todoSchema, schema);
}


module.exports = { validationTodo };
