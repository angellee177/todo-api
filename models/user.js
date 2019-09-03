var mongoose = require('mongoose')
const bcrypt = require('bcrypt'); 
const saltRounds = 10;

var   Schema = mongoose.Schema

var userSchema = new schema(
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
    todo: [{type: Schema.Types.ObjectId, ref: 'Todo'}] 
  }
)

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next()
})


const User = mongoose.model("User", userSchema);

module.exports = User;
