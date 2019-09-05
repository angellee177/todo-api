const User = require('./../models/user');
const Todo = require('./../models/todo');
const { success, errorMessage } = require('./../helper/response');
const { validationRegister, validationLogin } = require('./../helper/validator');
// pick the varibabel we need
const _ = require('lodash');
// bcrypt the password
const bcrypt = require('bcrypt');



// 1. Register New User
async function registerUser(req, res){
     // checking if there is any error inputs
     const { error } = validationRegister(req.body);
     if(error) return res.status(400).json(error.details[0].message);

    // check if the email already register
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(422).json(errorMessage("email already register."));

    // create new user
    user = new User({name: req.body.name, email: req.body.email, password: req.body.password});
    // save the data
    const result = await user.save();

    res.status(200).json(success(_.pick(result, ['_id', 'name', 'email']), "success register user."))
}


// 2. User Login
async function loginUser(req, res){
    // checking if there is any error inputs
    const { error } = validationLogin(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // Check if the email already register or not
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(422).json(errorMessage("email are not register"));

    // Compare the Password
    const password = await bcrypt.compare(req.body.password, user.password);
    if(!password) return res.status(421).json(errorMessage("password are invalid"));

    // Generate the Token
    const token = user.generateAuthToken();

    res.status(200).json(success(token, "success login."))
}


// 3. Show All User
async function showAllUser(req, res){
    const userList = await User.find({}).populate({path: "post", select: "title"});
    res.status(200).json(success(userList, "here is your User List:"))
}


// 4. Delete User by Id
function deleteUser(req, res){
    User.findByIdAndDelete(req.user._id, 
        function(err, data){
            if(err) return res.status(422).json({error: err});

            res.status(200).json(success(`successfully Deleted!! ${data.name}`))
    })
}


// 5. Update User by Id
async function updateUser(req, res){
    // find the User Id based Token
    let updateUser = await User.findByIdAndUpdate(req.user._id, 
        {
            $set: {name: req.body.name, email: req.body.email}
        }, {new: true})
    // if failed to update
    if(!updateUser) return res.status(422).json(errorMessage("failed to updated."));
    // if success to update
    res.status(200).json(success(updateUser, "successfully update"))
}


// 6. Show User by Token
async function current_user(req, res){

    // find the User Id based Token 
    let user = await User.findById(req.user._id).populate({path:'todo', select:'task'});
    // if token false
    if (!user) return res.status(404).json(errorMessage("Invalid user"));
    // the Token Found out
    res.status(200).json(success(_.pick(user, ['_id', 'name', 'email', 'todo']), "current user information:"))
}

module.exports = { registerUser, loginUser, showAllUser, deleteUser, updateUser, current_user };
