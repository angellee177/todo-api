const Joi = require('@hapi/joi');


// 1. for Validate Todo Function
function validationTodo(todoSchema){
    const schema = {
        task: Joi.string().required(),
        status: Joi.boolean(),
        category: Joi.string().required()
    }
    return Joi.validate(todoSchema, schema);
}


// 2. for Validate Category Function
function validationCategory(categorySchema){
    const schema = {
        name: Joi.string().required()
    }
    return Joi.validate(categorySchema, schema);
}


// 3. for Validate Register Function
function validationRegister(userSchema){
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(userSchema, schema);
}


// 4. for Validate Login Function
function validationLogin(userSchema){
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(userSchema, schema);
}

module.exports = { validationTodo, validationCategory, validationRegister, validationLogin };
