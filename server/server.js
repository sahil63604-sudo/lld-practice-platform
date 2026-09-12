const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();
app.use(cors());
app.use(express.json());
const problemRouter = require("./routes/problemRoutes");
const attemptRouter = require("./routes/attemptRoutes");
const submissionRouter = require("./routes/submissionRoutes");
const evaluationRouter = require("./routes/evaluationRoutes");

app.use("/api/evaluations", evaluationRouter);
app.use("/api/submissions", submissionRouter);
app.use("/api/attempts", attemptRouter);
app.use("/api/problems", problemRouter);
app.get("/", (req, res) => {
    res.json({
        message: "LLD Practice Platform API is running 🚀"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});