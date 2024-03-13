const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
// logic for register
const userRegisterController = async (req, res) => {
  try {
    const { userName, userId, password } = req.body;
    const userChecked = await User.findOne({ userId });
    if (userChecked) {
      return res.status(200).send({
        success: true,
        message: "user id already exist please login",
      });
    } else {
      const newUser = new User({ userName, userId, password });
      await newUser.save();
      return res.status(200).send({
        success: true,
        message: "registration successful",
        user: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong while Registering",
      success: false,
      error,
    });
  }
};

//logic for login
const userLoginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const userCheck = await User.findOne({ userId, password });
    if (userCheck) {
      const token = jwt.sign({ id: userCheck._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      console.log(token);
      return res.status(200).send({
        success: true,
        message: "logged in successfully",
        user: userCheck,
        token: token,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Incorrect user id or password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong while logging in",
      error: error.message,
    });
  }
};


// for displaying all users
const allRegisteredUsersController = async (req, res) => {
  try {
    const users = await User.find({})
    if (users) {
      return res.status(200).send({
        success: true,
        message: 'all users fetched successfully',
        users:users
     }) 
    } else {
      return res.status(400).send({
        success: false,
        message: 'unable to fetch user details'
      })
    }
  } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "something went wrong while fetching all users",
          success: false,
          error,
        });
  }
}

//delete user account
const deleteUserAccountController = async (req, res) => {
  try {
    const { id } = req.params
    console.log('inside delete blog');
    const deletedUser = await User.findByIdAndDelete(id)
    const remainingUser = await User.find({})
    return res.status(200).send({
      success: true,
      message: 'user account deleted successfully',
      users:remainingUser
    })

  } catch (error) {
            console.log(error);
            res.status(500).send({
              message: "something went wrong while deleting user account",
              success: false,
              error,
            });
  }
}

module.exports = {
    userRegisterController,
  userLoginController,
  allRegisteredUsersController,
    deleteUserAccountController
};
