const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model("Users", usersSchema);
