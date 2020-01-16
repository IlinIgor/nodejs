const Users = require("../models/users");

exports.getAllUsers = function () {
  return Users.find();
}

exports.createUser = function (data) {
  const newUser= new Users({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email
  })

  return Users.findOne({ email: newUser.email }).exec()
    .then(function(user) {
      if (user) {
        throw 'this user already exist'
      } else {
        return newUser.save();
      }
    });
}

exports.removeUser = function (data) {
  return Users.findOneAndRemove({ email: data.email });
}
