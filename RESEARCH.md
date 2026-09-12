# Research Note — LLD Practice Platform

## 1. Problem

Most LLD practice platforms focus on showing a problem and providing a solution, but the learner needs a repeatable practice loop with feedback.

The goal of this platform is to help a learner:

1. Choose an LLD problem
2. Think about the design
3. Submit a solution
4. Receive useful and explainable feedback
5. Review previous attempts
6. Try the problem again and improve

The platform focuses on code-level design decisions such as classes, responsibilities, interfaces, relationships, patterns, extensibility, and edge cases.

---

## 2. What Makes a Meaningful Attempt?

A meaningful LLD attempt should contain enough information to understand the learner's design decisions.

The submission should ideally describe:

- Main classes and objects
- Responsibilities of each class
- Relationships between classes
- Interfaces or abstractions
- Design patterns where appropriate
- Extensibility considerations
- Important edge cases
- Testing considerations

A submission should not be judged only by whether specific class names appear. The evaluator should look for evidence that the learner understands why the design was chosen.

---

## 3. Feedback Approach

Useful feedback should be structured rather than only returning a single score.

The platform evaluates the submission across multiple dimensions:

- Requirements
- Responsibilities
- Encapsulation / Interfaces
- Abstraction / Patterns
- Extensibility
- Edge Cases / Testability

For each criterion, the feedback contains:

- Score
- Evidence
- Concern
- Suggestion
- Confidence

This makes the evaluation explainable and gives the learner a clear next step.

---

## 4. Multiple Valid Designs

LLD problems usually have multiple valid solutions.

For example, a Parking Lot system could use different approaches for:

- Vehicle modelling
- Parking spot allocation
- Pricing
- Payment
- Extensibility

Therefore, evaluation should focus on design quality and evidence of reasoning rather than requiring one exact class structure.

A learner should not receive a low score simply because their design differs from an expected implementation.

---

## 5. Deterministic Evaluation vs AI Evaluation

There are two possible approaches.

### Deterministic Evaluation

A rule-based evaluator can check for explicit evidence such as:

- Mention of important requirements
- Classes and responsibilities
- Interfaces
- Design patterns
- Edge cases
- Testing

Advantages:

- Predictable
- Fast
- Easy to test
- No external AI dependency
- Easy to explain

Limitations:

- Keyword matching can miss valid reasoning
- It may not understand context
- Different wording can produce different results

The current MVP uses a deterministic evaluator because it is reliable and works without an external AI service.

### LLM Evaluation

An LLM could evaluate the submitted design using a rubric and provide deeper reasoning.

Advantages:

- Better understanding of natural language
- Can recognize different valid designs
- Can provide richer suggestions

Limitations:

- Non-deterministic
- Requires an external model/API
- Higher cost and latency
- Requires handling model failures

A future version can use an LLM as a second evaluator while keeping deterministic checks as a baseline.

---

## 6. Submission Formats

The MVP supports text-based submissions.

A text submission is sufficient for the first version because learners can describe:

- Classes
- Responsibilities
- Relationships
- Interfaces
- Patterns
- Design decisions

Future versions could support:

- Code submissions
- UML diagrams
- Combined text + diagram submissions

The evaluation model should remain independent of the submission format so new formats can be added without redesigning the entire domain.

---

## 7. Handling Evaluation Failures

Evaluation should not lose the learner's submission if evaluation fails.

The intended state flow is:

`in-progress → submitted → evaluating → completed`

If evaluation fails:

`evaluating → failed`

The submission is stored before evaluation begins, so the learner's work remains available even when evaluation cannot be completed.

This also makes it possible to retry evaluation later.

---

## 8. Key Research Conclusions

The MVP should prioritize:

1. A small number of high-quality LLD problems
2. A clear practice and submission flow
3. Structured and explainable feedback
4. Multiple valid design approaches
5. Persistent attempt history
6. Separation between submission and evaluation
7. An evaluator that can later be replaced or extended

The platform therefore uses a simple monolithic architecture while keeping the evaluation component isolated as a service.