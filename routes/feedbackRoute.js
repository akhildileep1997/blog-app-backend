const express = require('express')
const { sentFeedbackController, getAllFeedbackController } = require('../controller/feedbackController')

const router = express.Router()

// sending feed back
router.post('/feed-back', sentFeedbackController)

// getting all feedback
router.get('/all-feedback-responses',getAllFeedbackController)

module.exports = router