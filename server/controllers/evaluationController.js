const Submission = require("../models/submissionModel");
const Attempt = require("../models/attemptModel");
const Problem = require("../models/problemModel");
const Evaluation = require("../models/evaluationModel");

const evaluateSubmission = require("../services/evaluationService");
const evaluate = async (req, res) => {
    const { submissionId } = req.params;

    let attempt = null;

    try {
        const submission = await Submission.findById(submissionId);

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        attempt = await Attempt.findById(submission.attempt);

        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found"
            });
        }

        const problem = await Problem.findById(attempt.problem);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        // Prevent duplicate evaluation
        const existingEvaluation = await Evaluation.findOne({
            submission: submissionId
        });

        if (existingEvaluation) {
            return res.status(409).json({
                message: "This submission has already been evaluated",
                evaluation: existingEvaluation
            });
        }

        // Evaluation started
        attempt.status = "evaluating";
        await attempt.save();

        const result = evaluateSubmission(
            submission.content,
            problem
        );

        const evaluation = await Evaluation.create({
            submission: submissionId,
            totalScore: result.totalScore,
            criteria: result.criteria,
            summary: result.summary
        });

        // Evaluation completed
        attempt.status = "completed";
        await attempt.save();

        res.status(200).json({
            message: "Evaluation completed successfully",
            evaluation
        });

    } catch (error) {
        console.error(error);

        // Mark attempt as failed if evaluation fails
        if (attempt) {
            attempt.status = "failed";
            await attempt.save();
        }

        res.status(500).json({
            message: "Evaluation failed"
        });
    }
};
const getEvaluation = async (req, res) => {
    const { evaluationId } = req.params;

    try {
        const evaluation = await Evaluation
            .findById(evaluationId)
            .populate({
                path: "submission",
                select: "content submittedAt"
            });

        if (!evaluation) {
            return res.status(404).json({
                message: "Evaluation not found"
            });
        }

        res.status(200).json({
            evaluation
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch evaluation"
        });
    }
};
module.exports = {
    evaluate,getEvaluation
};