const express = require("express");

const evaluationRouter = express.Router();

const {
    evaluate,getEvaluation
} = require("../controllers/evaluationController");

evaluationRouter.post("/:submissionId", evaluate);
evaluationRouter.get("/:evaluationId", getEvaluation);
module.exports = evaluationRouter;