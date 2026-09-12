const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
    {
        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true
        },

        learner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },

        status: {
            type: String,
            enum: ["in-progress", "submitted", "evaluating", "completed", "failed"],
            default: "in-progress"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Attempt", attemptSchema);