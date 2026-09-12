const Attempt = require("../models/attemptModel");
const Problem = require("../models/problemModel");
const mongoose = require("mongoose");
const Submission = require("../models/submissionModel");
const Evaluation = require("../models/evaluationModel");

const createAttempt = async (req, res) => {
    const { problemId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            return res.status(400).json({
                message: "Invalid problem ID"
            });
        }

        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        const attempt = await Attempt.create({
            problem: problemId
        });

        res.status(201).json({
            message: "Attempt started successfully",
            attempt
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create attempt"
        });
    }
};


const getAttempts = async (req, res) => {
    try {
        const attempts = await Attempt
            .find()
            .populate("problem", "title difficulty")
            .lean();

        const attemptsWithDetails = await Promise.all(
            attempts.map(async (attempt) => {
                const submission = await Submission.findOne({
                    attempt: attempt._id
                }).lean();

                let evaluation = null;

                if (submission) {
                    evaluation = await Evaluation.findOne({
                        submission: submission._id
                    }).lean();
                }

                return {
                    ...attempt,
                    submission,
                    evaluation
                };
            })
        );

        res.status(200).json({
            attempts: attemptsWithDetails
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch attempt history"
        });
    }
};


module.exports = {
    createAttempt,
    getAttempts
};