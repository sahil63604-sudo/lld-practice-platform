const ProblemCard = ({ problem, onStart }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                    {problem.title}
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {problem.difficulty}
                </span>
            </div>

            <p className="mb-4 text-gray-600">
                {problem.description}
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
                {problem.expectedConcepts.map((concept) => (
                    <span
                        key={concept}
                        className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
                    >
                        {concept}
                    </span>
                ))}
            </div>

            <button
                onClick={() => onStart(problem._id)}
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
                Start Practice
            </button>
        </div>
    );
};

export default ProblemCard;