const mongoose = require('mongoose');
const   Schema = mongoose.Schema;
// for encrypt the Password
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
// get the configuration
const config = require('config');
// get jwt token for login
const jwt = require('jsonwebtoken');

var userSchema = new Schema(
  {
    name: {
        type: String,
        required: [true, "Why you don't have a name?"]
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      validate: function (email) {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
      }
    },
    password: {
      type: String,
      required: true
    },
    todo: [{type: Schema.Types.ObjectId, ref: 'Todo'}],
  }
)


// encrypt the password before save user register data
userSchema.pre('save', function (next) {
    let user = this
    user.password = bcrypt.hashSync(user.password, saltRounds);
    next()
})

// generate token for user
userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, name: this.name, email: this.email}, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
