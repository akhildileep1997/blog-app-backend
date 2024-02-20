const express = require('express')
const { userRegisterController, userLoginController, allRegisteredUsersController } = require('../controller/userController')

const router = express.Router()

//for register
router.post('/register', userRegisterController)

// for login
router.post("/login", userLoginController);

// for all users
router.get('/all-registered-users',allRegisteredUsersController)

module.exports = router