# AI Usage — LLD Practice Platform

AI tools were used as a development assistant during the implementation of this project.

The AI was used for architecture discussion, implementation assistance, debugging, and documentation. Final implementation decisions were reviewed and tested manually.

## 1. Evaluation Architecture

### AI suggestion
Keep evaluation logic separate from Express controllers by implementing it as a dedicated evaluation service.

### Decision
Accepted.

### Why
Separating evaluation logic from HTTP handling makes the evaluator easier to test and replace later. It also allows a future LLM evaluator to use the same interface without rewriting the API layer.

---

## 2. Structured Evaluation Feedback

### AI suggestion
Instead of returning only an overall score, evaluate multiple LLD dimensions and return:

- Criterion
- Score
- Evidence
- Concern
- Suggestion
- Confidence

### Decision
Accepted.

### Why
A single score does not tell the learner how to improve. Structured feedback makes the evaluation explainable and supports the learning loop.

---

## 3. Attempt and Evaluation Lifecycle

### AI suggestion
Represent an attempt using explicit states:

`in-progress → submitted → evaluating → completed`

and allow a `failed` state when evaluation fails.

### Decision
Accepted.

### Why
Explicit states make the evaluation lifecycle easier to understand and allow asynchronous or retryable evaluation to be added later.

---

## 4. Prevent Duplicate Evaluation

### AI suggestion
Store one evaluation per submission and prevent a submission from being evaluated multiple times.

### Decision
Accepted.

### Why
A submission represents one learner attempt. Allowing multiple accidental evaluations could create inconsistent history and unnecessary evaluation work.

A unique constraint is therefore used on the evaluation's submission reference.

---

## 5. Deterministic Evaluation for the MVP

### AI suggestion
Use a deterministic rule-based evaluator for the first version and keep the evaluation layer isolated so an LLM evaluator can be introduced later.

### Decision
Accepted.

### Why
The assignment deadline required a reliable working MVP. A deterministic evaluator is fast, testable, predictable, and does not depend on an external AI API.

An LLM-based evaluator is a possible future extension for deeper reasoning and recognition of multiple valid designs.

---

## Human Verification

AI-generated suggestions were not treated as automatically correct.

The implementation was manually tested through:

- API requests
- MongoDB persistence checks
- Frontend user flow
- Evaluation output verification
- Automated evaluation tests

The evaluation service currently has four automated tests covering normal submissions, weak submissions, unrelated submissions, and score/confidence boundaries.

All four tests pass.