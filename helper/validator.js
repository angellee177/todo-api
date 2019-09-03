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

// for Validate Category Function
function validationCategory(categorySchema){
    const schema = {
        name: Joi.string().required()
    }
    return Joi.validate(categorySchema, schema);
}

// for Validate Register Function
function validationRegister(userSchema){
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(userSchema, schema)
}

module.exports = { validationTodo, validationCategory, validationRegister };
