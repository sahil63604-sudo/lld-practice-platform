# LLD Practice Platform

A full-stack Low-Level Design (LLD) practice platform that helps learners practice software design problems, submit their solutions, receive structured and explainable feedback, and review previous attempts.

The platform is designed around a simple learning loop:

Choose Problem → Think / Design → Submit → Receive Feedback → Review → Try Again

---

## Project Overview

Low-Level Design problems are difficult to learn by simply reading solutions. Learners need an environment where they can:

- Understand a design problem
- Think about classes and responsibilities
- Explain their design decisions
- Submit their approach
- Receive meaningful feedback
- Identify weaknesses
- Review previous attempts
- Try again and improve

This project provides a small end-to-end practice experience focused specifically on these needs.

The MVP focuses on code-level and domain-level design rather than High-Level Design, microservices, Kubernetes, or infrastructure.

---

## Goals

The main goals of this platform are:

1. Provide a small collection of LLD problems.
2. Allow learners to start a practice attempt.
3. Allow learners to submit a text-based LLD solution.
4. Evaluate the submission using a structured rubric.
5. Provide explainable feedback instead of only a score.
6. Store previous attempts and evaluations.
7. Allow learners to review feedback and try again.
8. Keep the evaluation layer replaceable so more advanced evaluators can be added later.

---

## Features

### LLD Problem Library

The platform currently provides five practice problems:

- Parking Lot
- Library Management System
- Tic-Tac-Toe
- Elevator System
- Movie Ticket Booking

Each problem contains:

- Title
- Description
- Difficulty
- Requirements
- Expected LLD concepts

### Practice Attempt

A learner can select a problem and start an attempt.

Each attempt tracks its current state:

in-progress → submitted → evaluating → completed

If evaluation fails, the attempt can move to:

evaluating → failed

Multiple attempts for the same problem are supported, allowing learners to practice the same problem more than once.

### Text-Based Solution Submission

The MVP uses a text-based submission format.

Learners can describe:

- Classes
- Objects
- Responsibilities
- Relationships
- Interfaces
- Abstractions
- Design patterns
- Extensibility
- Edge cases
- Testing considerations

Only one submission is allowed for a particular attempt.

---

## Evaluation and Feedback

The evaluation system is designed to provide more useful feedback than a simple pass/fail result.

Each submission is evaluated across six dimensions:

| Criterion | Description |
|---|---|
| Requirements | Whether important requirements are addressed |
| Responsibilities | Whether responsibilities are reasonably separated |
| Encapsulation / Interfaces | Whether boundaries and interfaces are considered |
| Abstraction / Patterns | Whether useful abstractions or patterns are considered |
| Extensibility | Whether the design can accommodate future changes |
| Edge Cases / Testability | Whether edge cases and testing are considered |

Each criterion produces:

- Score
- Evidence
- Concern
- Suggestion
- Confidence

The evaluation also contains:

- Overall score
- Overall summary

Example:

```text
Requirements
Score: 8/10

Evidence:
Mentioned vehicle, parking and parking spots.

Concern:
Some requirements are not explained in detail.

Suggestion:
Clearly identify the main functional requirements before designing the classes.

Confidence:
80%

This structure makes the feedback explainable and gives the learner a clear improvement path.

Evaluation Approach

The current MVP uses a deterministic rule-based evaluator.

The evaluator analyzes the submitted solution against predefined criteria and produces structured feedback.

Why deterministic evaluation?

The deterministic approach was chosen for the MVP because it provides:

Predictable results
Fast evaluation
Easy testing
No external API dependency
Reproducible behavior

LLD problems can have multiple valid designs. Therefore, the evaluator is intentionally isolated from the rest of the application.

A future version can introduce an LLM-based evaluator without changing the core practice flow.

Possible future architecture:

                  ┌─────────────────────┐
                  │ Deterministic       │
                  │ Evaluator           │
                  └──────────┬──────────┘
                             │
Submission ──────────────────┼──→ Structured Feedback
                             │
                  ┌──────────┴──────────┐
                  │ LLM Evaluator       │
                  └─────────────────────┘
Architecture

The project uses a simple monolithic MERN architecture.

┌──────────────────────┐
│      React Client    │
└──────────┬───────────┘
           │
           │ HTTP / REST API
           ↓
┌──────────────────────┐
│ Node.js + Express    │
│                      │
│ Problem APIs         │
│ Attempt APIs         │
│ Submission APIs      │
│ Evaluation APIs      │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│       MongoDB        │
└──────────────────────┘

The evaluation logic is separated into a dedicated service:

Evaluation Controller
        ↓
Evaluation Service
        ↓
Structured Evaluation Result
        ↓
Evaluation Model
        ↓
MongoDB

This keeps HTTP handling separate from evaluation/business logic.

Domain Model

The core domain contains four main entities:

Problem
   │
   │ 1
   │
   │ *
   ↓
Attempt
   │
   │ 1
   │
   │ 1
   ↓
Submission
   │
   │ 1
   │
   │ 1
   ↓
Evaluation
Problem

Represents an LLD exercise.

Responsibilities:

Store problem title
Store description
Store difficulty
Store requirements
Store expected concepts
Attempt

Represents one practice session.

Responsibilities:

Associate an attempt with a problem
Track the practice lifecycle
Represent whether the attempt is in progress, submitted, evaluating, completed, or failed
Submission

Represents the learner's solution.

Responsibilities:

Store submitted content
Associate the solution with an attempt
Store submission time

The submission is persisted before evaluation so learner work is not lost if evaluation fails.

Evaluation

Represents the feedback generated for a submission.

Responsibilities:

Store overall score
Store criterion-level results
Store evidence
Store concerns
Store suggestions
Store confidence
Store summary

Each submission can have only one evaluation in the MVP.

End-to-End User Flow
┌───────────────────┐
│  Browse Problems  │
└─────────┬─────────┘
          ↓
┌───────────────────┐
│  Select Problem   │
└─────────┬─────────┘
          ↓
┌───────────────────┐
│  Start Attempt    │
└─────────┬─────────┘
          ↓
┌───────────────────┐
│ Read Requirements │
└─────────┬─────────┘
          ↓
┌───────────────────┐
│ Write LLD Solution│
└─────────┬─────────┘
          ↓
┌───────────────────┐
│ Submit Solution   │
└─────────┬─────────┘
          ↓
┌───────────────────┐
│ Evaluate Solution │
└─────────┬─────────┘
          ↓
┌───────────────────┐
│ View Feedback     │
└─────────┬─────────┘
          ↓
┌───────────────────┐
│ Review History    │
└─────────┬─────────┘
          ↓
┌───────────────────┐
│ Try Again         │
└───────────────────┘
Project Structure
lld-practice-platform/
│
├── client/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── ProblemCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Problems.jsx
│   │   │   ├── Practice.jsx
│   │   │   ├── Feedback.jsx
│   │   │   └── History.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── problemController.js
│   │   ├── attemptController.js
│   │   ├── submissionController.js
│   │   └── evaluationController.js
│   │
│   ├── models/
│   │   ├── problemModel.js
│   │   ├── attemptModel.js
│   │   ├── submissionModel.js
│   │   └── evaluationModel.js
│   │
│   ├── routes/
│   │   ├── problemRoutes.js
│   │   ├── attemptRoutes.js
│   │   ├── submissionRoutes.js
│   │   └── evaluationRoutes.js
│   │
│   ├── services/
│   │   └── evaluationService.js
│   │
│   ├── tests/
│   │   └── evaluationService.test.js
│   │
│   ├── seedProblems.js
│   ├── server.js
│   └── package.json
│
├── README.md
├── RESEARCH.md
├── DESIGN.md
└── AI_USAGE.md
API Documentation
Problems
Get all problems
GET /api/problems

Returns all available LLD practice problems.

Create a problem
POST /api/problems/create

Creates a new LLD practice problem.

Attempts
Start an attempt
POST /api/attempts/:problemId

Creates a new practice attempt for a problem.

Get attempt history
GET /api/attempts

Returns previous attempts along with their related problem, submission, and evaluation information.

Submissions
Submit a solution
POST /api/submissions/:attemptId

Request body:

{
  "content": "Describe your LLD solution here..."
}

The submission is stored and the attempt moves to the submitted state.

Evaluations
Evaluate a submission
POST /api/evaluations/:submissionId

Evaluates a submission and stores the resulting feedback.

Get an evaluation
GET /api/evaluations/:evaluationId

Returns the stored evaluation and submission information.

Technology Stack
Frontend
React
Vite
React Router
Axios
Tailwind CSS
Backend
Node.js
Express.js
MongoDB
Mongoose
Testing
Node.js built-in test runner
Node Assert
Installation and Setup
Prerequisites

Make sure the following are installed:

Node.js
npm
MongoDB or MongoDB Atlas
Backend Setup

Move into the server directory:

cd server

Install dependencies:

npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Start the development server:

npm run dev

The backend will run on:

http://localhost:5000
Seed Practice Problems

From the server directory:

node seedProblems.js

This creates the initial five LLD practice problems in MongoDB.

Frontend Setup

Open another terminal:

cd client

Install dependencies:

npm install

Start the frontend:

npm run dev

Open the Vite development URL shown in the terminal.

Testing

The backend uses Node's built-in test runner.

Run:

cd server
npm test

The test suite covers:

Normal LLD evaluation
Weak submissions
Unrelated submissions
Score boundaries
Confidence boundaries

Current test result:

4 tests
4 passed
0 failed
Data Validation and Integrity

The backend includes several validation checks.

Invalid IDs

Invalid MongoDB ObjectIds are rejected before database operations.

Missing Records

The API handles missing:

Problems
Attempts
Submissions
Evaluations
Empty Submissions

Empty or whitespace-only solutions are rejected.

Duplicate Submissions

An attempt cannot receive multiple submissions.

Duplicate Evaluations

A submission cannot have multiple evaluations.

The evaluation model uses a unique constraint on the submission reference.

Evaluation State Management

The attempt model represents the evaluation lifecycle:

in-progress
     ↓
submitted
     ↓
evaluating
     ↓
completed

Failure path:

evaluating
     ↓
failed

The submission is stored before evaluation starts.

This means the learner's solution remains available even if evaluation fails.

The state model also provides a foundation for future asynchronous evaluation.

Extensibility

The system is designed so that the core practice flow does not depend heavily on the current evaluator implementation.

New Problems

Problems are stored in MongoDB rather than hardcoded into the React UI.

New LLD problems can therefore be added without changing the frontend.

New Submission Formats

The current MVP supports text submissions.

Possible future formats include:

Text
Code
Diagram
Text + Diagram
New Evaluators

The current evaluator is deterministic.

Future evaluators could include:

LLM evaluator
Human evaluator
Additional rule-based evaluator

The evaluation service boundary makes this extension easier.

MVP Scope and Trade-offs

The project intentionally focuses on the core learning experience.

The following features are outside the current MVP:

User authentication
User profiles
Real-time collaboration
Microservices
Kubernetes
Complex infrastructure
Multiple submission formats
Advanced AI orchestration
Human evaluation workflows

These features were excluded to keep the implementation focused on the core LLD practice loop within the available development time.

Future Improvements
Authentication

Add learner accounts so attempts and history can be associated with individual users.

Rich Submission Editor

Support a richer editor for structured LLD responses and code.

UML / Diagram Support

Allow learners to submit class diagrams and UML diagrams.

LLM Evaluation

Use an LLM to provide deeper reasoning-based feedback while retaining deterministic checks as a baseline.

Asynchronous Evaluation

Move evaluation into a background job:

Submitted
    ↓
Evaluating
    ↓
Completed / Failed

This would make the system more realistic for slower evaluators.

Retry Failed Evaluations

Allow failed evaluations to be retried without requiring the learner to submit the solution again.

Progress Tracking

Track:

Average score
Improvement between attempts
Weakest criteria
Problems completed
Practice frequency
Admin Problem Management

Provide an interface for creating, editing, and managing LLD problems.

Learning Philosophy

The platform is designed around practice rather than answer consumption.

Instead of immediately showing a model solution, the learner is encouraged to:

Understand the requirements.
Make their own design decisions.
Explain their reasoning.
Receive feedback.
Identify weaknesses.
Try again.

This creates a repeatable learning loop:

Practice
   ↓
Feedback
   ↓
Reflection
   ↓
Improvement
   ↓
Retry
Documentation

Additional project documentation is available in the repository.

RESEARCH.md

Contains:

Problem research
Meaningful attempt considerations
Feedback design
Multiple valid LLD designs
Deterministic vs LLM evaluation
Submission format considerations
Evaluation failure handling
Research conclusions
DESIGN.md

Contains:

Architecture
Domain model
Entity relationships
Evaluation design
Rubric
API design
State transitions
Extensibility decisions
MVP trade-offs
AI_USAGE.md

Contains:

AI-assisted decisions
Suggestions made by AI
Accepted decisions
Reasoning behind decisions
Human verification
AI Usage

AI was used as a development assistant during the project for:

Architecture discussions
Domain modelling
Implementation assistance
Debugging
Testing ideas
Documentation
Evaluation design

AI-generated suggestions were reviewed and tested before being included in the implementation.

See AI_USAGE.md for the detailed record of meaningful AI-assisted decisions.

Current MVP Status
Feature	Status
LLD Problem Library	✅
5 Practice Problems	✅
Start Attempt	✅
Attempt State	✅
Text Submission	✅
Duplicate Submission Prevention	✅
Deterministic Evaluation	✅
Structured Feedback	✅
Evaluation Persistence	✅
Duplicate Evaluation Prevention	✅
Attempt History	✅
Review Feedback	✅
Retry Practice	✅
Automated Tests	✅
Research Documentation	✅
Design Documentation	✅
AI Usage Documentation	✅
Author

Sahil Kumar

Junior Full Stack Developer | MERN Stack

Built as an engineering assignment demonstrating:

Full-stack development
REST API design
MongoDB data modelling
Domain-oriented LLD thinking
Evaluation architecture
Testing
Product thinking
AI-assisted engineering workflow