const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true
        },

        requirements: {
            type: [String],
            required: true
        },

        expectedConcepts: {
            type: [String],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Problem", problemSchema);