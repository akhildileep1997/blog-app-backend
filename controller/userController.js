const User = require("../models/userModel");

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
        const { userId, password } = req.body
        const userCheck = await User.findOne({ userId, password })
        if (userCheck) {
            return res.status(200).send({
                success: true,
                message: 'logged in successfully',
                user:userCheck
            })
        } else {
            return res.status(400).send({
                success: true,
                message:'incorrect user id or password'
            })
        }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong while logging in",
      success: false,
      error,
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

module.exports = {
    userRegisterController,
  userLoginController,
    allRegisteredUsersController
};
