const test = require("node:test");
const assert = require("node:assert");
const evaluateSubmission = require("../services/evaluationService");

const problem = {
    title: "Parking Lot",
    requirements: [
        "Support vehicles",
        "Manage parking spots",
        "Calculate parking fees"
    ]
};

test("should evaluate a reasonably detailed LLD solution", () => {
    const submission = `
        I would create Vehicle, ParkingLot and ParkingSpot classes.
        ParkingLot will manage available spots.
        I would use an interface and Strategy Pattern for pricing.
        The design should support different vehicle types and future pricing rules.
        Important edge cases should be tested when the parking lot is full.
    `;

    const result = evaluateSubmission(submission, problem);

    assert.ok(result);
    assert.ok(result.totalScore >= 0);
    assert.ok(result.totalScore <= 10);
    assert.strictEqual(result.criteria.length, 6);
    assert.ok(result.summary);
});

test("should return low scores when the submission has little design information", () => {
    const submission = `
        I will make some classes for the system.
    `;

    const result = evaluateSubmission(submission, problem);

    assert.ok(result);
    assert.ok(result.totalScore < 7);
});

test("should return zero evidence for completely unrelated content", () => {
    const submission = `
        This application is about weather forecasting and temperature.
    `;

    const result = evaluateSubmission(submission, problem);

    assert.ok(result);
    assert.strictEqual(result.totalScore, 0);

    result.criteria.forEach((criterion) => {
        assert.strictEqual(criterion.score, 0);
    });
});

test("scores should always remain between 0 and 10", () => {
    const submission = `
        class Vehicle
        class ParkingLot
        class ParkingSpot
        interface PricingStrategy
        Strategy Pattern
        encapsulation
        responsibility
        future extension
        edge cases
        testing
    `;

    const result = evaluateSubmission(submission, problem);

    result.criteria.forEach((criterion) => {
        assert.ok(criterion.score >= 0);
        assert.ok(criterion.score <= 10);
        assert.ok(criterion.confidence >= 0);
        assert.ok(criterion.confidence <= 1);
    });

    assert.ok(result.totalScore >= 0);
    assert.ok(result.totalScore <= 10);
});