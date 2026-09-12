const mongoose = require("mongoose");

const criterionSchema = new mongoose.Schema(
    {
        criterion: {
            type: String,
            required: true
        },

        score: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },

        evidence: {
            type: String,
            required: true
        },

        concern: {
            type: String,
            required: true
        },

        suggestion: {
            type: String,
            required: true
        },

        confidence: {
            type: Number,
            required: true,
            min: 0,
            max: 1
        }
    },
    { _id: false }
);

const evaluationSchema = new mongoose.Schema(
    {
        submission: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Submission",
            required: true,
            unique: true
        },

        totalScore: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },

        criteria: {
            type: [criterionSchema],
            required: true
        },

        summary: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);