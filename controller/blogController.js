const blogModel = require("../models/blogModel");
const BlogModel = require("../models/blogModel");
const User = require("../models/userModel");

// logic for adding blog

const addBlogController = async (req, res) => {
  try {
    const { title, subTitle, content, imageUrl } = req.body;
    const newBlog = new BlogModel({
      title,
      subTitle,
      content,
      imageUrl,
      user: req.user,
    });
    await newBlog.save();
    return res.status(200).send({
      success: true,
      message: "blog added successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong while adding the blog",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { addBlogController };


//logic for displaying blog in admin page
const adminPageDisplayBlogController = async (req, res) => {
  try {
    const blog = await blogModel.find({ isAdminApproved: "Rejected" });
    if (blog) {
      return res.status(200).send({
        success: true,
        message: "all non approved blogs fetched successfully to admin page",
        blog: blog,
      });
    } else {
      return res.status(400).send({
        success: true,
        message: "cannot fetch the non approved blogs",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong while fetching the blog to admin page",
      success: false,
      error,
    });
  }
};

//logic for approving the blog by the admin
const approveBlogByAdminController = async (req, res) => {
  try {
    console.log('inside admin approved api');
    const { id } = req.params;
    console.log(id);
    const blog = await BlogModel.findByIdAndUpdate(id);
    blog.isAdminApproved = "Approved";
    await blog.save();
    return res.status(200).send({
      success: true,
      message: "blog approved by admin",
      blog: blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong while approving the blog",
      success: false,
      error:error.message,
    });
  }
};

// logic for displaying approved blog to dashboard
const displayApprovedBlogToDashboardController = async (req, res) => {
  try {
    const blog = await blogModel.find({ isAdminApproved: 'Approved' })
    if (blog) {
      return res.status(200).send({
        success: true,
        message: 'admin approved blog fetched successfully',
        blog:blog
      })
    } else {
      return res.status(400).send({
        success: false,
        message:'unable to fetch the blogs'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong while fetching the approved blogs  ",
      success: false,
      error,
    });
  }
};

// logic for displaying user added blogs to their account
const displayAllAddedBlogsByUserToTheirAccountController = async (req, res) => {
  try {
    console.log('inside user added blog api');
    const id = req.params.id
    console.log(id);
    const blog = await blogModel.find({ user: id })
    if (blog) {
      res.status(200).send({
        success: true,
        message: 'successfully fetched user added blogs to their account',
        blog:blog
      })
    } else {
      res.status(400).send({
        success: false,
        message:'unable to fetch user added blogs'
      })
    }
  } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "something went wrong while fetching the user added blogs  ",
          success: false,
          error,
        });
  }
}

// logic for deleting blog by user
const deleteBlogByUserController = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id);
    const deletedBlog = await blogModel.findByIdAndDelete({ _id: id })
    return res.status(200).send({
      success: true,
      message: 'blog deleted successfully',
      blog:deletedBlog
    })
  } catch (error) {
           console.log(error);
           res.status(500).send({
             message:
               "something went wrong while deleting the blog ",
             success: false,
             error,
           }); 
  }
}


module.exports = {
  addBlogController,
  adminPageDisplayBlogController,
  approveBlogByAdminController,
  displayApprovedBlogToDashboardController,
  displayAllAddedBlogsByUserToTheirAccountController,
  deleteBlogByUserController
};
