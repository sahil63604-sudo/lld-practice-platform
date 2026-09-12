const express = require("express");

const attemptRouter = express.Router();

const {
    createAttempt,
    getAttempts
} = require("../controllers/attemptController");


attemptRouter.post("/:problemId", createAttempt);

attemptRouter.get("/", getAttempts);


module.exports = attemptRouter;