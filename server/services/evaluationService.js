const evaluateSubmission = (content, problem) => {
    const text = content.toLowerCase();

    const criteria = [
        {
            name: "Requirements",
            keywords: ["requirement", "vehicle", "parking", "spot"],
            suggestion: "Clearly identify the main functional requirements before designing the classes."
        },
        {
            name: "Responsibilities",
            keywords: ["class", "manage", "handle", "responsibility"],
            suggestion: "Explain what responsibility belongs to each class instead of putting too much logic in one class."
        },
        {
            name: "Encapsulation / Interfaces",
            keywords: ["interface", "encapsulation", "private", "method"],
            suggestion: "Consider interfaces or well-defined public methods to keep responsibilities separated."
        },
        {
            name: "Abstraction / Patterns",
            keywords: ["strategy", "pattern", "abstract", "inheritance"],
            suggestion: "Explain where abstraction or a design pattern improves extensibility."
        },
        {
            name: "Extensibility",
            keywords: ["extend", "future", "new", "different"],
            suggestion: "Explain how the design can accommodate new vehicle types or pricing rules without major changes."
        },
        {
            name: "Edge Cases / Testability",
            keywords: ["edge", "error", "test", "full", "available"],
            suggestion: "Mention important edge cases and how the design could be tested."
        }
    ];

    const results = criteria.map((criterion) => {
        const matchedKeywords = criterion.keywords.filter((keyword) =>
            text.includes(keyword)
        );

        const score = Math.min(
            10,
            Math.round((matchedKeywords.length / criterion.keywords.length) * 10)
        );

        return {
            criterion: criterion.name,
            score,
            evidence:
                matchedKeywords.length > 0
                    ? `Mentioned: ${matchedKeywords.join(", ")}`
                    : "No clear evidence found in the submission.",
            concern:
                score < 5
                    ? "This area is not sufficiently explained."
                    : "This area is reasonably covered.",
            suggestion: criterion.suggestion,
            confidence: matchedKeywords.length > 0 ? 0.8 : 0.6
        };
    });

    const totalScore = Math.round(
        results.reduce((sum, item) => sum + item.score, 0) / results.length
    );

    return {
        totalScore,
        criteria: results,
        summary:
            totalScore >= 7
                ? "The solution demonstrates a reasonable understanding of the problem and LLD concepts."
                : "The solution needs more explanation around responsibilities, relationships, and extensibility."
    };
};

module.exports = evaluateSubmission;