const Submission = require("../models/submissionModel");
const Attempt = require("../models/attemptModel");
const mongoose = require("mongoose");

const submitSolution = async (req, res) => {
    const { attemptId } = req.params;
    const { content } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(attemptId)) {
            return res.status(400).json({
                message: "Invalid attempt ID"
            });
        }

        if (!content || !content.trim()) {
            return res.status(400).json({
                message: "Solution content is required"
            });
        }

        const attempt = await Attempt.findById(attemptId);

        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found"
            });
        }

        if (attempt.status !== "in-progress") {
            return res.status(400).json({
                message: "This attempt cannot be submitted"
            });
        }

        const existingSubmission = await Submission.findOne({
            attempt: attemptId
        });

        if (existingSubmission) {
            return res.status(409).json({
                message: "Solution already submitted for this attempt"
            });
        }

        const submission = await Submission.create({
            attempt: attemptId,
            content
        });

        attempt.status = "submitted";
        await attempt.save();

        res.status(201).json({
            message: "Solution submitted successfully",
            submission
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to submit solution"
        });
    }
};

module.exports = {
    submitSolution
};