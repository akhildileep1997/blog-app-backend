const FeedbackModel = require('../models/feedbackModel')

// for sending feedback
const sentFeedbackController = async (req, res) => {
    try {
        const { name, email, response } = req.body
        const newFeedback = new FeedbackModel({ name, email, response })
        await newFeedback.save()
        if (newFeedback) {
            return res.status(200).send({
                success: true,
                message: 'feedback send successfully',
                feedback:newFeedback
            })
        } else {
            return res.status(400).send({
                message: 'cannot send feedback',
                success:false
            })
        }
    } catch (error) {
            console.log(error);
            res.status(500).send({
              message: "something went wrong while sending feedback",
              success: false,
              error,
            });
    }
}

// for getting all feedbacks
const getAllFeedbackController = async (req, res) => {
    try {
        const feedback = await FeedbackModel.find({})
        if (feedback) {
            return res.status(200).send({
                success: true,
                message: 'all feedbacks fetched successfully',
                feedback:feedback
            })
        } else {
            return res.status(400).send({
                success: false,
                message:'unable to fetch the feedbacks'
            })
        }
    } catch (error) {
                  console.log(error);
                  res.status(500).send({
                    message: "something went wrong while fetching all feedbacks",
                    success: false,
                    error,
                  });  
    }
}

module.exports = {
    sentFeedbackController,
    getAllFeedbackController
}