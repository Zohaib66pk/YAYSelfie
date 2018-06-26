'user strict'
var mongoose =  require('mongoose');
var Schema = mongoose.Schema

var UsersSchema = new Schema ({
  name: {
    type: String,
    required: ["Name is required!"]
  },
  email: {
    type: String,
    required: ["Email is required!"]
  },
  user_type: {
    type:Number,
    default: 0
  },
  gender: {
    type: String,
    required: ["Gener is required!"]
  },
  password: {
    type: String,
    required: [function() {
      return this.user_type === 0;
    }, 'Password is required!']
  },
}, {timestamps: true});

module.exports = mongoose.model("Users", UsersSchema);