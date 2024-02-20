const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  isAdminApproved: {
    type: String,
    default:'Rejected'
  }
}, {
    timestamps:true
});

const blogModel = mongoose.model('Blog', blogSchema)

module.exports = blogModel