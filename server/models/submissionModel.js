const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        attempt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attempt",
            required: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        submittedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Submission", submissionSchema);