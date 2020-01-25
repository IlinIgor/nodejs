const Users = require("../models/users");

exports.getAllUsers = function () {
  return Users.find();
}

exports.createUser = async function (data) {
  const newUser= new Users({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email
  })
  try {
    const user = await Users.findOne({ email: newUser.email }).exec();
    if (user) throw {
      status: 409,
      message: 'this user already exist'
    };
  } catch (error) {
    throw error;
  }
  return newUser.save();
}

exports.removeUser = function ({ email }) {
  return Users.findOneAndRemove({ email });
}
