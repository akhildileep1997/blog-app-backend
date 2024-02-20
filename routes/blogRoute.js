const express = require('express')
const { addBlogController, adminPageDisplayBlogController, approveBlogByAdminController, displayApprovedBlogToDashboardController, displayAllAddedBlogsByUserToTheirAccountController, deleteBlogByUserController } = require('../controller/blogController')

const router = express.Router()

// adding-blog
router.post('/add-blog', addBlogController)

//fetching blog to admin page
router.get('/blog-to-admin-page', adminPageDisplayBlogController)

//admin approving blog
router.post('/approve-blog/:id', approveBlogByAdminController)

//fetching admin approved blog to dashboard
router.get('/dashboard-blogs', displayApprovedBlogToDashboardController)

//fetching and displaying all user added blog to their account
router.get('/user/user-added-blogs/:id', displayAllAddedBlogsByUserToTheirAccountController)

//deleting added blog by user
router.delete('/delete-blog/:id',deleteBlogByUserController)

module.exports = router