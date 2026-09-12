const Problem = require("../models/problemModel");

const createProblem = async (req, res) => {
    try {
        const { title, description, difficulty, requirements, expectedConcepts } = req.body;

        if (!title || !description || !difficulty || !requirements || !expectedConcepts) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const problem = await Problem.create({
            title,
            description,
            difficulty,
            requirements,
            expectedConcepts
        });

        res.status(201).json({
            message: "Problem created successfully",
            problem
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create problem"
        });
    }
};


const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().sort({ createdAt: -1 });

        res.status(200).json({
            problems
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch problems"
        });
    }
};


module.exports = {
    createProblem,
    getProblems
};