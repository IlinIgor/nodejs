const mongoose = require('mongoose');

exports.setUpCollection = function setUpCollection() {
  mongoose.connect('mongodb://localhost:27017/educational', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
