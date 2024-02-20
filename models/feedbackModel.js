const mongoose = require('mongoose')

const feedBackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
}, {
    timestamps:true
});

const Feedback = mongoose.model('Feedback', feedBackSchema)

module.exports = Feedback