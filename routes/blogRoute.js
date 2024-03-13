const express = require('express')
const { addBlogController, adminPageDisplayBlogController, approveBlogByAdminController, displayApprovedBlogToDashboardController, displayAllAddedBlogsByUserToTheirAccountController, deleteBlogByUserController } = require('../controller/blogController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// adding-blog
router.post('/add-blog',authMiddleware, addBlogController)

//fetching blog to admin page
router.get('/blog-to-admin-page',authMiddleware, adminPageDisplayBlogController)

//admin approving blog
router.post("/approve-blog/:id", authMiddleware, approveBlogByAdminController);

//fetching admin approved blog to dashboard
router.get(
  "/dashboard-blogs",
  authMiddleware,
  displayApprovedBlogToDashboardController
);

//fetching and displaying all user added blog to their account
router.get(
  "/user/user-added-blogs/:id",
  authMiddleware,
  displayAllAddedBlogsByUserToTheirAccountController
);

//deleting added blog by user
router.delete("/delete-blog/:id", authMiddleware, deleteBlogByUserController);

module.exports = router