const express = require('express')
const { userRegisterController, userLoginController, allRegisteredUsersController, deleteUserAccountController } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router()

//for register
router.post('/register', userRegisterController)

// for login
router.post("/login", userLoginController);

// for all users
router.get('/all-registered-users',authMiddleware, allRegisteredUsersController)

//for deleting account
router.delete('/delete/:id',authMiddleware,deleteUserAccountController)

module.exports = router