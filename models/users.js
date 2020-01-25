const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model("Users", usersSchema);
