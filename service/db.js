const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blogApp')
const User= mongoose.model('User',{
    userName:String,
    userId:Number,
    password:String,
})
const Blog = mongoose.model('Blog',{
    blogId:String,
    title:String,
    subTitle:String,
    content:String,
    imageUrl:String,
    UserId:String,
})
const Message = mongoose.model('Message',{
    name:String,
    mail:String,
    feedback:String
})
const DashboardBlog = mongoose.model('DashboardBlog',{
    blogId:String,
    title:String,
    subTitle:String,
    content:String,
    imageUrl:String,
    UserId:String
})
module.exports={
    User,
    Blog,
    Message,
    DashboardBlog
}