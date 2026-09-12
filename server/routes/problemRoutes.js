const express = require("express");

const problemRouter = express.Router();

const {
    createProblem,
    getProblems
} = require("../controllers/problemController");


problemRouter.post("/create", createProblem);

problemRouter.get("/", getProblems);


module.exports = problemRouter;