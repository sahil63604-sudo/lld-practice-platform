const express = require("express");

const submissionRouter = express.Router();

const {
    submitSolution
} = require("../controllers/submissionController");

submissionRouter.post("/:attemptId", submitSolution);

module.exports = submissionRouter;